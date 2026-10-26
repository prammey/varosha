import type { Collection, SiteData } from "./types";

export const sections = ["projects", "people", "newsletters", "events", "scholarship", "site"] as const;
export type Section = typeof sections[number];
export const collections: readonly Collection[] = ["projects", "people", "newsletters", "events"];
export function assertCollection(value: unknown): asserts value is Collection {
  if (!collections.includes(value as Collection)) throw new Error("Unknown content section.");
}
export function assertSection(value: unknown): asserts value is Section {
  if (!sections.includes(value as Section)) throw new Error("Unknown content section.");
}
export function assertLink(value: string, allowLocal = false) {
  if (!value) return;
  if (allowLocal && /^\/(?!\/)[^\\\s]*$/.test(value)) return;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error();
  } catch { throw new Error("Please use a complete http:// or https:// link."); }
}
const fields = {
  projects: ["id", "slug", "title", "where", "category", "stat", "image", "imageAlt"],
  people: ["id", "name", "role", "bio"],
  newsletters: ["id", "file"],
  events: ["id", "date", "title", "summary", "imageAlt"],
  scholarship: ["deadline", "applyUrl"],
  site: ["email", "phone", "addressName", "street", "cityStateZip", "zelle", "venmo", "facebook", "x", "youtube", "instagram"],
} as const;
export function validateSection<K extends Section>(section: K, value: unknown): asserts value is SiteData[K] {
  assertSection(section);
  const list = collections.includes(section as Collection);
  if (list && (!Array.isArray(value) || value.length > 1000)) throw new Error("Invalid content list.");
  const rows = list ? value as unknown[] : [value];
  const ids = new Set();
  for (const row of rows) {
    if (!row || typeof row !== "object" || Array.isArray(row)) throw new Error("Invalid content record.");
    const r = row as Record<string, unknown>;
    for (const field of fields[section]) {
      if (typeof r[field] !== "string" || (r[field] as string).length > 100000) throw new Error(`Invalid ${field}.`);
    }
    if (list) {
      if (!r.id || !/^[a-zA-Z0-9_-]+$/.test(r.id as string) || ids.has(r.id)) throw new Error("Content IDs must be unique.");
      ids.add(r.id);
    }
    if (["projects", "people", "events"].includes(section) && typeof r.hidden !== "boolean") throw new Error("Invalid visibility.");
    if (section === "projects") {
      if (!["skills", "children", "health", "farm"].includes(r.category as string) || typeof r.featured !== "boolean" || !Array.isArray(r.paragraphs) || r.paragraphs.length > 1000 || r.paragraphs.some(p => typeof p !== "string" || p.length > 100000)) throw new Error("Invalid project details.");
    }
    if (section === "events" && typeof r.current !== "boolean") throw new Error("Invalid current event.");
    if (section === "newsletters" && (!Number.isInteger(r.year) || Number(r.year) < 2000 || Number(r.year) > 2100)) throw new Error("Invalid newsletter year.");
    for (const field of section === "site" ? ["facebook", "x", "youtube", "instagram"] : section === "scholarship" ? ["applyUrl"] : section === "people" ? ["photo"] : section === "newsletters" ? ["file"] : ["image"]) {
      if (r[field] === null && ["people", "events"].includes(section)) continue;
      if (typeof r[field] !== "string") throw new Error(`Invalid ${field}.`);
      assertLink(r[field] as string, !["site", "scholarship"].includes(section));
    }
  }
}
