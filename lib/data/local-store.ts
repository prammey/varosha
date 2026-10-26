import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Store, UploadKind } from "./store";
import type { Collection, SiteData } from "./types";
import { assertRevision, snapshotOf } from "./revisions";
import { validateSection, sections, type Section } from "./validation";
const DATA_FILE = path.join(process.cwd(), "data", "site-data.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
let pending: Promise<unknown> = Promise.resolve();
/** Local development only. Sanity provides persistent multi-server storage. */
export class LocalStore implements Store {
  readonly label = "local file (data/site-data.json)";
  async read(): Promise<SiteData> {
    const data = JSON.parse(await fs.readFile(DATA_FILE, "utf8")) as SiteData;
    for (const key of sections) validateSection(key, data[key]);
    return data;
  }
  async snapshot() { return snapshotOf(await this.read()); }
  private write<K extends Section>(key: K, value: SiteData[K], revision: string): Promise<string> {
    const operation = pending.then(async () => {
      if (!(await this.canWrite())) throw new Error("Local content is read-only on this server. Connect Sanity to publish.");
      validateSection(key, value);
      const snapshot = await this.snapshot();
      assertRevision(revision, snapshot.revisions[key]);
      (snapshot.data[key] as unknown) = value;
      const temporary = `${DATA_FILE}.${randomUUID()}.tmp`;
      try {
        await fs.writeFile(temporary, JSON.stringify(snapshot.data, null, 2) + "\n", { flag: "wx" });
        await fs.rename(temporary, DATA_FILE);
      } finally { await fs.unlink(temporary).catch(() => undefined); }
      return snapshotOf(snapshot.data).revisions[key];
    });
    pending = operation.catch(() => undefined);
    return operation;
  }
  writeCollection<K extends Collection>(key: K, items: SiteData[K], revision: string) { return this.write(key, items, revision); }
  writeScholarship(value: SiteData["scholarship"], revision: string) { return this.write("scholarship", value, revision); }
  writeSite(value: SiteData["site"], revision: string) { return this.write("site", value, revision); }
  async upload(_kind: UploadKind, folder: string, fileName: string, bytes: Uint8Array): Promise<string> {
    if (!(await this.canWrite())) throw new Error("Local uploads are read-only on this server.");
    if (!["projects", "team", "events", "newsletters"].includes(folder)) throw new Error("Invalid upload folder.");
    const dir = path.join(UPLOAD_DIR, folder);
    await fs.mkdir(dir, { recursive: true });
    const name = `${randomUUID()}-${fileName.toLowerCase().replace(/[^a-z0-9.]+/g, "-").slice(0,100)}`;
    await fs.writeFile(path.join(dir, name), bytes);
    return `/uploads/${folder}/${name}`;
  }
  async canWrite() {
    if (process.env.VERCEL || process.env.NODE_ENV === "production") return false;
    try { await fs.access(path.dirname(DATA_FILE), fs.constants.W_OK); return true; } catch { return false; }
  }
}
