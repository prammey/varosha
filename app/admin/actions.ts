"use server";

/**
 * Everything the admin panel can do. Each action checks the session first,
 * writes through the store, then tells Next to re-render the public pages.
 */
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createPasswordSession, requireAdmin, signOut } from "@/lib/admin/auth";
import { getStore } from "@/lib/data/store";
import { randomUUID } from "node:crypto";
import { assertRevision } from "@/lib/data/revisions";
import { assertCollection, type Section } from "@/lib/data/validation";
import { validateUpload, MAX_UPLOAD_BYTES } from "@/lib/admin/uploads";
import { allowLoginAttempt } from "@/lib/admin/login-limit";
import type { Collection, Newsletter, Person, Project, ProjectCategory, SiteEvent } from "@/lib/data/types";

export type ActionState = { ok: boolean; message: string; revision?: string; redirectTo?: string } | null;

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const bool = (fd: FormData, key: string) => fd.get(key) === "on";
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";

function formRevision(fd: FormData, key: Section, revisions: Record<Section, string>) {
  const revision = str(fd, "revision");
  assertRevision(revision, revisions[key]);
  return revision;
}

function refresh() {
  revalidatePath("/", "layout");
}

async function saveUpload(fd: FormData, field: string, kind: "image" | "pdf", folder: string): Promise<string | null> {
  const file = fd.get(field);
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("That file is over 3 MB. Please choose a smaller file.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  validateUpload(kind, file.type, bytes);
  const store = await getStore();
  if (!(await store.canWrite())) throw new Error("Uploads are not available on this server. Run the site on your computer to make changes.");
  return store.upload(kind, folder, file.name, bytes, file.type);
}

async function guardWrite() {
  await requireAdmin();
  const store = await getStore();
  if (!(await store.canWrite())) throw new Error("Publishing is not configured on this server. Connect Sanity before publishing.");
  return store;
}

function fail(e: unknown): ActionState {
  return { ok: false, message: e instanceof Error ? e.message : "Something went wrong. Please try again." };
}

/* ---------- sign in / out ---------- */

export async function login(_prev: ActionState, fd: FormData): Promise<ActionState> {
  if (!allowLoginAttempt()) return { ok: false, message: "Too many login attempts. Please try again in 15 minutes." };
  const password = fd.get("password");
  if (typeof password !== "string" || !checkPassword(password)) return { ok: false, message: "That password isn’t right, or admin login is not configured." };
  await createPasswordSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await signOut();
  redirect("/admin/login");
}

/* ---------- shared list operations ---------- */

/** Applies a new order and hidden flags for one list, all at once (from the list page's Save button). */
export async function saveListState(collection: Collection, entries: { id: string; hidden: boolean }[], expectedRevision: string): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    const { data, revisions } = await store.snapshot();
    assertCollection(collection);
    assertRevision(expectedRevision, revisions[collection]);
    if (!Array.isArray(entries) || entries.length > 1000 || entries.some(e => !e || typeof e.id !== "string" || typeof e.hidden !== "boolean") || new Set(entries.map(e => e.id)).size !== entries.length) throw new Error("Invalid list order.");
    const byId = new Map((data[collection] as { id: string }[]).map((x) => [x.id, x]));
    const ordered = entries
      .map((e) => {
        const item = byId.get(e.id);
        if (!item) return null;
        return collection === "newsletters" ? item : { ...item, hidden: e.hidden };
      })
      .filter(Boolean);
    // anything added since the page loaded stays, at the end
    const seen = new Set(entries.map((e) => e.id));
    for (const item of byId.values()) if (!seen.has(item.id)) ordered.push(item);
    const revision = await store.writeCollection(collection, ordered as never, expectedRevision);
    refresh();
    return { ok: true, message: "Published. The website is updated.", revision };
  } catch (e) {
    return fail(e);
  }
}

export async function deleteItem(collection: Collection, id: string, expectedRevision: string): Promise<ActionState> {
  await requireAdmin();
  try {
    assertCollection(collection);
    const store = await guardWrite();
    const { data, revisions } = await store.snapshot();
    assertRevision(expectedRevision, revisions[collection]);
    const items = (data[collection] as { id: string }[]).filter(x => x.id !== id);
    const revision = await store.writeCollection(collection, items as never, expectedRevision);
    refresh();
    return { ok: true, message: "Deleted. The website is updated.", revision, redirectTo: `/admin/${collection === "people" ? "team" : collection}` };
  } catch (e) { return fail(e); }
}

/* ---------- projects ---------- */

export async function saveProject(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    const { data, revisions } = await store.snapshot();
    const expectedRevision = formRevision(fd, "projects", revisions);
    const id = str(fd, "id");
    const existing = data.projects.find((p) => p.id === id);
    if (id && !existing) throw new Error("This item was deleted. Reload the page.");
    const title = str(fd, "title");
    if (!title) return { ok: false, message: "Please give the project a title." };
    const image = (await saveUpload(fd, "imageFile", "image", "projects")) ?? existing?.image ?? "";
    if (!image) return { ok: false, message: "Please add a photo." };
    const paragraphs = str(fd, "story").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    if (paragraphs.length === 0) return { ok: false, message: "Please write the project’s story." };
    const project: Project = {
      id: existing?.id ?? `${slugify(title).slice(0,80)}-${randomUUID()}`,
      slug: existing?.slug ?? `${slugify(title).slice(0,80)}-${randomUUID().slice(0,8)}`,
      title,
      where: str(fd, "where"),
      category: (str(fd, "category") || "skills") as ProjectCategory,
      stat: str(fd, "stat"),
      image,
      imageAlt: str(fd, "imageAlt") || title,
      paragraphs,
      featured: bool(fd, "featured"),
      hidden: bool(fd, "hidden"),
    };
    const projects = existing ? data.projects.map((p) => (p.id === id ? project : p)) : [...data.projects, project];
    const revision = await store.writeCollection("projects", projects, expectedRevision);
    refresh();
    return { ok: true, revision, redirectTo: existing ? undefined : `/admin/projects/${project.id}`, message: existing ? "Saved." : "Project added." };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- team ---------- */

export async function savePerson(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    const { data, revisions } = await store.snapshot();
    const expectedRevision = formRevision(fd, "people", revisions);
    const id = str(fd, "id");
    const existing = data.people.find((p) => p.id === id);
    if (id && !existing) throw new Error("This item was deleted. Reload the page.");
    const name = str(fd, "name");
    if (!name) return { ok: false, message: "Please enter a name." };
    const photo = (await saveUpload(fd, "photoFile", "image", "team")) ?? (bool(fd, "removePhoto") ? null : (existing?.photo ?? null));
    const person: Person = {
      id: existing?.id ?? `${slugify(name)}-${randomUUID()}`,
      name,
      role: str(fd, "role"),
      bio: str(fd, "bio"),
      photo,
      hidden: bool(fd, "hidden"),
    };
    const people = existing ? data.people.map((p) => (p.id === id ? person : p)) : [...data.people, person];
    const revision = await store.writeCollection("people", people, expectedRevision);
    refresh();
    return { ok: true, revision, redirectTo: existing ? undefined : `/admin/team/${person.id}`, message: existing ? "Saved." : "Team member added." };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- newsletters ---------- */

export async function saveNewsletter(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    const { data, revisions } = await store.snapshot();
    const expectedRevision = formRevision(fd, "newsletters", revisions);
    const year = Number(str(fd, "year"));
    if (!year || year < 2000 || year > 2100) return { ok: false, message: "Please enter a four-digit year." };
    if (data.newsletters.some((n) => n.year === year)) return { ok: false, message: `There is already a ${year} newsletter. Delete it first to replace it.` };
    const file = await saveUpload(fd, "pdfFile", "pdf", "newsletters");
    if (!file) return { ok: false, message: "Please choose the PDF." };
    const item: Newsletter = { id: `${year}-${randomUUID()}`, year, file };
    const revision = await store.writeCollection("newsletters", [item, ...data.newsletters], expectedRevision);
    refresh();
    return { ok: true, revision, message: `${year} newsletter added.` };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- events ---------- */

export async function saveEvent(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    const { data, revisions } = await store.snapshot();
    const expectedRevision = formRevision(fd, "events", revisions);
    const id = str(fd, "id");
    const existing = data.events.find((e) => e.id === id);
    if (id && !existing) throw new Error("This item was deleted. Reload the page.");
    const title = str(fd, "title");
    if (!title) return { ok: false, message: "Please give the event a title." };
    const image = (await saveUpload(fd, "imageFile", "image", "events")) ?? (bool(fd, "removeImage") ? null : (existing?.image ?? null));
    const event: SiteEvent = {
      id: existing?.id ?? `${slugify(title)}-${randomUUID()}`,
      date: str(fd, "date"),
      title,
      summary: str(fd, "summary"),
      image,
      imageAlt: str(fd, "imageAlt") || title,
      current: bool(fd, "current"),
      hidden: bool(fd, "hidden"),
    };
    let events = existing ? data.events.map((e) => (e.id === id ? event : e)) : [event, ...data.events];
    // only one event can be the current one
    if (event.current) events = events.map((e) => (e.id === event.id ? e : { ...e, current: false }));
    const revision = await store.writeCollection("events", events, expectedRevision);
    refresh();
    return { ok: true, revision, redirectTo: existing ? undefined : `/admin/events/${event.id}`, message: existing ? "Saved." : "Event added." };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- scholarship + site details ---------- */

export async function saveScholarship(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    const { revisions } = await store.snapshot();
    const revision = await store.writeScholarship({ deadline: str(fd, "deadline"), applyUrl: str(fd, "applyUrl") }, formRevision(fd, "scholarship", revisions));
    refresh();
    return { ok: true, revision, message: "Published. The website is updated." };
  } catch (e) {
    return fail(e);
  }
}

export async function saveSite(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    const { revisions } = await store.snapshot();
    const expectedRevision = formRevision(fd, "site", revisions);
    const revision = await store.writeSite({
      email: str(fd, "email"),
      phone: str(fd, "phone"),
      addressName: str(fd, "addressName"),
      street: str(fd, "street"),
      cityStateZip: str(fd, "cityStateZip"),
      zelle: str(fd, "zelle"),
      venmo: str(fd, "venmo"),
      facebook: str(fd, "facebook"),
      x: str(fd, "x"),
      youtube: str(fd, "youtube"),
      instagram: str(fd, "instagram"),
    }, expectedRevision);
    refresh();
    return { ok: true, revision, message: "Published. The website is updated." };
  } catch (e) {
    return fail(e);
  }
}
