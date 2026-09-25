/**
 * The storage interface the admin panel and the public pages talk to.
 *
 * Two implementations:
 *   local-store.ts     reads/writes data/site-data.json and public/uploads/ (demo + git-based workflow)
 *   supabase-store.ts  Postgres + Storage (set SUPABASE_URL etc. in .env.local to switch)
 */
import type { Collection, SiteData } from "./types";

export type UploadKind = "image" | "pdf";

export interface Store {
  /** everything, in one read */
  read(): Promise<SiteData>;
  /** replace one collection (projects, people, newsletters, events) */
  writeCollection<K extends Collection>(key: K, items: SiteData[K]): Promise<void>;
  writeScholarship(value: SiteData["scholarship"]): Promise<void>;
  writeSite(value: SiteData["site"]): Promise<void>;
  /** store a file and return its public URL */
  upload(kind: UploadKind, folder: string, fileName: string, bytes: Uint8Array, contentType: string): Promise<string>;
  /** human-readable name shown in the admin footer */
  readonly label: string;
  /** false on hosts where local-store cannot write (Vercel) */
  canWrite(): Promise<boolean>;
}

let cached: Store | null = null;

export async function getStore(): Promise<Store> {
  if (cached) return cached;
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { SupabaseStore } = await import("./supabase-store");
    cached = new SupabaseStore();
  } else {
    const { LocalStore } = await import("./local-store");
    cached = new LocalStore();
  }
  return cached;
}
