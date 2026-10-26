import "server-only";
import { unstable_rethrow } from "next/navigation";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Store, UploadKind } from "./store";
import type { Collection, SiteData } from "./types";
import { sections, validateSection, type Section } from "./validation";
import { conflictMessage, revisionOf, snapshotOf, type Snapshot } from "./revisions";

type Document = { _id: string; _rev: string; content: string };
const API_VERSION = "2025-02-19";
export class SanityStore implements Store {
  readonly label: string;
  private base: string;
  private token: string;
  constructor() {
    const project = process.env.SANITY_PROJECT_ID ?? "";
    const dataset = process.env.SANITY_DATASET ?? "";
    const token = process.env.SANITY_API_TOKEN ?? "";
    if (!/^[a-z0-9]+$/.test(project) || !/^[a-z0-9][a-z0-9_-]{0,63}$/.test(dataset) || !token || /\s/.test(token)) {
      throw new Error("Sanity is not configured. Set SANITY_PROJECT_ID, SANITY_DATASET and SANITY_API_TOKEN on the server.");
    }
    this.base = `https://${project}.api.sanity.io/v${API_VERSION}`;
    this.dataset = dataset;
    this.token = token;
    this.label = `Sanity (${dataset})`;
  }
  private dataset: string;
  private async request(endpoint: string, init: RequestInit = {}) {
    // Reads are safe to retry after a brief network failure. Never blindly repeat
    // a mutation: a timeout can happen after Sanity has already committed it.
    const attempts = init.method === "POST" ? 1 : 3;
    for (let attempt = 0; attempt < attempts; attempt++) {
      let response: Response;
      try {
        response = await fetch(`${this.base}${endpoint}`, { ...init, cache: "no-store", headers: { ...init.headers, Authorization: `Bearer ${this.token}` }, signal: AbortSignal.timeout(init.method === "POST" ? 45000 : 8000) });
      } catch (error) {
        // Next interrupts static rendering with an internal error for uncached reads.
        // Let the framework handle it instead of reporting a network outage.
        unstable_rethrow(error);
        if (attempt + 1 < attempts) { await this.retryDelay(attempt); continue; }
        throw new Error("Could not reach Sanity. Check your connection and try again. If a publish timed out, reload to check whether it completed.");
      }
      if ((response.status === 429 || response.status >= 500) && attempt + 1 < attempts) {
        await response.body?.cancel();
        await this.retryDelay(attempt);
        continue;
      }
      if (response.status === 409) throw new Error(conflictMessage);
      if (!response.ok) {
        // Never include response bodies, request headers, or tokens in errors/logs.
        throw new Error(response.status === 401 || response.status === 403 ? "Sanity denied access. Check the server token and its permissions." : `Sanity request failed (${response.status}). Reload before trying again.`);
      }
      try { return await response.json(); } catch { throw new Error("Sanity returned an invalid API response."); }
    }
    throw new Error("Could not reach Sanity. Please try again.");
  }
  private retryDelay(attempt: number) { return new Promise(resolve => setTimeout(resolve, 250 * 2 ** attempt)); }
  async snapshot(): Promise<Snapshot> {
    // Current repository content is the fallback ONLY for documents never published.
    // Network errors and corrupt documents must not silently revert the public site.
    const data = JSON.parse(await fs.readFile(path.join(process.cwd(), "data/site-data.json"), "utf8")) as SiteData;
    for (const key of sections) validateSection(key, data[key]);
    const snapshot = snapshotOf(data);
    const ids = sections.map(key => `varosha.${key}`);
    const query = encodeURIComponent('*[_id in $ids]{_id,_rev,content}');
    const result = await this.request(`/data/query/${this.dataset}?query=${query}&$ids=${encodeURIComponent(JSON.stringify(ids))}&perspective=published`);
    if (!Array.isArray(result.result)) throw new Error("Sanity returned an invalid content response.");
    for (const doc of result.result as Document[]) {
      const section = sections.find(key => doc._id === `varosha.${key}`);
      if (!section || typeof doc.content !== "string" || typeof doc._rev !== "string") throw new Error("Sanity returned an invalid content document.");
      let content: unknown;
      try { content = JSON.parse(doc.content); } catch { throw new Error("A Sanity content document is damaged. Ask the website developer to restore it."); }
      validateSection(section, content);
      (snapshot.data[section] as unknown) = content;
      snapshot.revisions[section] = doc._rev;
    }
    return snapshot;
  }
  async read() { return (await this.snapshot()).data; }
  private async write<K extends Section>(key: K, value: SiteData[K], expected: string): Promise<string> {
    validateSection(key, value);
    if (!expected || !/^[a-zA-Z0-9_-]+$/.test(expected)) throw new Error(conflictMessage);
    if (expected.startsWith("initial-")) {
      const initial = JSON.parse(await fs.readFile(path.join(process.cwd(), "data/site-data.json"), "utf8")) as SiteData;
      if (expected !== revisionOf(initial[key])) throw new Error(conflictMessage);
    }
    // The server action checked the opening revision before reading uploads.
    // The atomic create/patch below checks again at commit time, without another query.
    const id = `varosha.${key}`;
    const fields = { content: JSON.stringify(value), schemaVersion: 1 };
    // create rejects a concurrent first publish; patch rejects any subsequent revision mismatch.
    const mutation = expected.startsWith("initial-")
      ? { create: { _id: id, _type: "varoshaSection", ...fields } }
      : { patch: { id, ifRevisionID: expected, set: fields } };
    const result = await this.request(`/data/mutate/${this.dataset}?returnDocuments=true&visibility=sync`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mutations: [mutation] }) });
    const revision = result.results?.[0]?.document?._rev;
    if (typeof revision !== "string") throw new Error("Sanity saved without confirming a revision. Reload the page to check the published content.");
    return revision;
  }
  writeCollection<K extends Collection>(key: K, items: SiteData[K], revision: string) { return this.write(key, items, revision); }
  writeScholarship(value: SiteData["scholarship"], revision: string) { return this.write("scholarship", value, revision); }
  writeSite(value: SiteData["site"], revision: string) { return this.write("site", value, revision); }
  async upload(kind: UploadKind, _folder: string, fileName: string, bytes: Uint8Array, contentType: string): Promise<string> {
    const endpoint = kind === "image" ? "images" : "files";
    const result = await this.request(`/assets/${endpoint}/${this.dataset}?filename=${encodeURIComponent(fileName.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0,150))}`, { method: "POST", headers: { "Content-Type": contentType }, body: Buffer.from(bytes) });
    const url = result.document?.url;
    if (typeof url !== "string" || !url.startsWith("https://cdn.sanity.io/")) throw new Error("Sanity did not return a valid asset URL.");
    return url;
  }
  async canWrite() { return true; }
}
