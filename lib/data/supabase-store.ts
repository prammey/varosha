import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Store, UploadKind } from "./store";
import type { Collection, SiteData } from "./types";

/**
 * Supabase-backed storage. Activated when SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.
 * Tables and buckets are created by supabase/schema.sql. Fill the tables once with `npm run seed`.
 *
 * Layout: one row per record in tables `projects`, `people`, `newsletters`, `events`,
 * each with a `data` jsonb column and a `position` integer for ordering;
 * `settings` holds `scholarship` and `site` as single rows keyed by name.
 */
export class SupabaseStore implements Store {
  readonly label = "Supabase";
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  }

  async read(): Promise<SiteData> {
    const [projects, people, newsletters, events, settings] = await Promise.all([
      this.rows("projects"),
      this.rows("people"),
      this.rows("newsletters"),
      this.rows("events"),
      this.client.from("settings").select("key, data"),
    ]);
    const get = (key: string) => settings.data?.find((r) => r.key === key)?.data;
    return {
      projects: projects as SiteData["projects"],
      people: people as SiteData["people"],
      newsletters: newsletters as SiteData["newsletters"],
      events: events as SiteData["events"],
      scholarship: get("scholarship") ?? { deadline: "", applyUrl: "" },
      site: get("site") ?? ({} as SiteData["site"]),
    };
  }

  async writeCollection<K extends Collection>(key: K, items: SiteData[K]): Promise<void> {
    const rows = (items as { id: string }[]).map((item, position) => ({ id: item.id, position, data: item }));
    const ids = rows.map((r) => r.id);
    const { error: upsertError } = await this.client.from(key).upsert(rows, { onConflict: "id" });
    if (upsertError) throw upsertError;
    const { error: deleteError } = await this.client.from(key).delete().not("id", "in", `(${ids.map((i) => `"${i}"`).join(",") || '""'})`);
    if (deleteError) throw deleteError;
  }

  async writeScholarship(value: SiteData["scholarship"]): Promise<void> {
    const { error } = await this.client.from("settings").upsert({ key: "scholarship", data: value });
    if (error) throw error;
  }

  async writeSite(value: SiteData["site"]): Promise<void> {
    const { error } = await this.client.from("settings").upsert({ key: "site", data: value });
    if (error) throw error;
  }

  async upload(kind: UploadKind, folder: string, fileName: string, bytes: Uint8Array, contentType: string): Promise<string> {
    const bucket = kind === "pdf" ? "newsletters" : "images";
    const safe = fileName.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    const path = `${folder}/${Date.now().toString(36)}-${safe}`;
    const { error } = await this.client.storage.from(bucket).upload(path, bytes, { contentType, upsert: false });
    if (error) throw error;
    return this.client.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }

  async canWrite(): Promise<boolean> {
    return true;
  }

  private async rows(table: Collection) {
    const { data, error } = await this.client.from(table).select("data, position").order("position");
    if (error) throw error;
    return (data ?? []).map((r) => r.data);
  }
}
