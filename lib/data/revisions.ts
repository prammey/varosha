import { createHash } from "node:crypto";
import { sections, type Section } from "./validation";
import type { SiteData } from "./types";
export type Snapshot = { data: SiteData; revisions: Record<Section, string> };
export const conflictMessage = "This section changed since you opened it. Copy your edits, reload the page, and try again.";
export function revisionOf(value: unknown): string {
  return `initial-${createHash("sha256").update(JSON.stringify(value)).digest("hex")}`;
}
export function snapshotOf(data: SiteData): Snapshot {
  return { data, revisions: Object.fromEntries(sections.map(key => [key, revisionOf(data[key])])) as Snapshot["revisions"] };
}
export function assertRevision(expected: string, actual: string) {
  if (!expected || expected !== actual) throw new Error(conflictMessage);
}
