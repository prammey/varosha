"use server";

/**
 * Everything the admin panel can do. Each action checks the session first,
 * writes through the store, then tells Next to re-render the public pages.
 */
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authMode, checkPassword, createPasswordSession, requireAdmin, signOut, supabaseSignIn } from "@/lib/admin/auth";
import { getStore } from "@/lib/data/store";
import { seedData } from "@/lib/data/seed";
import type { Collection, Newsletter, Person, Project, ProjectCategory, SiteEvent } from "@/lib/data/types";

export type ActionState = { ok: boolean; message: string } | null;

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const bool = (fd: FormData, key: string) => fd.get(key) === "on";
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";

function refresh() {
  revalidatePath("/", "layout");
}

async function saveUpload(fd: FormData, field: string, kind: "image" | "pdf", folder: string): Promise<string | null> {
  const file = fd.get(field);
  if (!(file instanceof File) || file.size === 0) return null;
  if (kind === "image" && !file.type.startsWith("image/")) throw new Error("Please choose an image file (JPG or PNG).");
  if (kind === "pdf" && file.type !== "application/pdf") throw new Error("Please choose a PDF file.");
  if (file.size > 25 * 1024 * 1024) throw new Error("That file is over 25 MB. Please choose a smaller one.");
  const store = await getStore();
  if (!(await store.canWrite())) throw new Error("Uploads are not available on this server. Run the site on your computer to make changes.");
  return store.upload(kind, folder, file.name, new Uint8Array(await file.arrayBuffer()), file.type);
}

async function guardWrite() {
  const store = await getStore();
  if (!(await store.canWrite())) throw new Error("This is a read-only copy. Run the site on your computer (npm run dev) to make changes.");
  return store;
}

function fail(e: unknown): ActionState {
  return { ok: false, message: e instanceof Error ? e.message : "Something went wrong. Please try again." };
}

/* ---------- sign in / out ---------- */

export async function login(_prev: ActionState, fd: FormData): Promise<ActionState> {
  if (authMode() === "supabase") {
    const error = await supabaseSignIn(str(fd, "email"), str(fd, "password"));
    if (error) return { ok: false, message: "That email and password didn’t match." };
  } else {
    if (!checkPassword(str(fd, "password"))) return { ok: false, message: "That password isn’t right." };
    await createPasswordSession();
  }
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await signOut();
  redirect("/admin/login");
}

/* ---------- shared list operations ---------- */

export async function moveItem(collection: Collection, id: string, direction: "up" | "down"): Promise<void> {
  await requireAdmin();
  const store = await guardWrite();
  const data = await store.read();
  const items = [...data[collection]] as { id: string }[];
  const i = items.findIndex((x) => x.id === id);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= items.length) return;
  [items[i], items[j]] = [items[j], items[i]];
  await store.writeCollection(collection, items as never);
  refresh();
}

export async function toggleHidden(collection: Exclude<Collection, "newsletters">, id: string): Promise<void> {
  await requireAdmin();
  const store = await guardWrite();
  const data = await store.read();
  const items = (data[collection] as { id: string; hidden: boolean }[]).map((x) => (x.id === id ? { ...x, hidden: !x.hidden } : x));
  await store.writeCollection(collection, items as never);
  refresh();
}

export async function deleteItem(collection: Collection, id: string): Promise<void> {
  await requireAdmin();
  const store = await guardWrite();
  const data = await store.read();
  const items = (data[collection] as { id: string }[]).filter((x) => x.id !== id);
  await store.writeCollection(collection, items as never);
  refresh();
  redirect(`/admin/${collection === "people" ? "team" : collection}`);
}

/* ---------- projects ---------- */

export async function saveProject(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    const data = await store.read();
    const id = str(fd, "id");
    const existing = data.projects.find((p) => p.id === id);
    const title = str(fd, "title");
    if (!title) return { ok: false, message: "Please give the project a title." };
    const image = (await saveUpload(fd, "imageFile", "image", "projects")) ?? existing?.image ?? "";
    if (!image) return { ok: false, message: "Please add a photo." };
    const paragraphs = str(fd, "story").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    if (paragraphs.length === 0) return { ok: false, message: "Please write the project’s story." };
    const project: Project = {
      id: existing?.id ?? slugify(title),
      slug: existing?.slug ?? slugify(title),
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
    await store.writeCollection("projects", projects);
    refresh();
    return { ok: true, message: existing ? "Saved." : "Project added." };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- team ---------- */

export async function savePerson(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    const data = await store.read();
    const id = str(fd, "id");
    const existing = data.people.find((p) => p.id === id);
    const name = str(fd, "name");
    if (!name) return { ok: false, message: "Please enter a name." };
    const photo = (await saveUpload(fd, "photoFile", "image", "team")) ?? (bool(fd, "removePhoto") ? null : (existing?.photo ?? null));
    const person: Person = {
      id: existing?.id ?? `${slugify(name)}-${Date.now().toString(36)}`,
      name,
      role: str(fd, "role"),
      bio: str(fd, "bio"),
      photo,
      hidden: bool(fd, "hidden"),
    };
    const people = existing ? data.people.map((p) => (p.id === id ? person : p)) : [...data.people, person];
    await store.writeCollection("people", people);
    refresh();
    return { ok: true, message: existing ? "Saved." : "Team member added." };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- newsletters ---------- */

export async function saveNewsletter(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    const data = await store.read();
    const year = Number(str(fd, "year"));
    if (!year || year < 2000 || year > 2100) return { ok: false, message: "Please enter a four-digit year." };
    if (data.newsletters.some((n) => n.year === year)) return { ok: false, message: `There is already a ${year} newsletter. Delete it first to replace it.` };
    const file = await saveUpload(fd, "pdfFile", "pdf", "newsletters");
    if (!file) return { ok: false, message: "Please choose the PDF." };
    const item: Newsletter = { id: `${year}-${Date.now().toString(36)}`, year, file };
    await store.writeCollection("newsletters", [item, ...data.newsletters].sort((a, b) => b.year - a.year));
    refresh();
    return { ok: true, message: `${year} newsletter added.` };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- events ---------- */

export async function saveEvent(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    const data = await store.read();
    const id = str(fd, "id");
    const existing = data.events.find((e) => e.id === id);
    const title = str(fd, "title");
    if (!title) return { ok: false, message: "Please give the event a title." };
    const image = (await saveUpload(fd, "imageFile", "image", "events")) ?? (bool(fd, "removeImage") ? null : (existing?.image ?? null));
    const event: SiteEvent = {
      id: existing?.id ?? `${slugify(title)}-${Date.now().toString(36)}`,
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
    await store.writeCollection("events", events);
    refresh();
    return { ok: true, message: existing ? "Saved." : "Event added." };
  } catch (e) {
    return fail(e);
  }
}

/* ---------- scholarship + site details ---------- */

export async function saveScholarship(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    await store.writeScholarship({ deadline: str(fd, "deadline"), applyUrl: str(fd, "applyUrl") });
    refresh();
    return { ok: true, message: "Saved." };
  } catch (e) {
    return fail(e);
  }
}

export async function saveSite(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    const store = await guardWrite();
    await store.writeSite({
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
    });
    refresh();
    return { ok: true, message: "Saved." };
  } catch (e) {
    return fail(e);
  }
}

/** Fills an empty store with the original site's content (used once after connecting Supabase). */
export async function loadStartingContent(): Promise<void> {
  await requireAdmin();
  const store = await guardWrite();
  const seed = seedData();
  await store.writeCollection("projects", seed.projects);
  await store.writeCollection("people", seed.people);
  await store.writeCollection("newsletters", seed.newsletters);
  await store.writeCollection("events", seed.events);
  await store.writeScholarship(seed.scholarship);
  await store.writeSite(seed.site);
  refresh();
}
