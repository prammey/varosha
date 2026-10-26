import "server-only";
import type { Collection, SiteData } from "./types";
import type { Snapshot } from "./revisions";
export type UploadKind = "image" | "pdf";
export interface Store {
  read(): Promise<SiteData>;
  snapshot(): Promise<Snapshot>;
  writeCollection<K extends Collection>(key: K, items: SiteData[K], revision: string): Promise<string>;
  writeScholarship(value: SiteData["scholarship"], revision: string): Promise<string>;
  writeSite(value: SiteData["site"], revision: string): Promise<string>;
  upload(kind: UploadKind, folder: string, fileName: string, bytes: Uint8Array, contentType: string): Promise<string>;
  readonly label: string;
  canWrite(): Promise<boolean>;
}
export async function getStore(): Promise<Store> {
  const mode = process.env.CONTENT_STORAGE || "local";
  if (mode === "sanity") {
    const { SanityStore } = await import("./sanity-store");
    return new SanityStore();
  }
  if (mode !== "local") throw new Error("CONTENT_STORAGE must be sanity or local.");
  const { LocalStore } = await import("./local-store");
  return new LocalStore();
}
