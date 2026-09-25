import { promises as fs } from "node:fs";
import path from "node:path";
import { seedData } from "./seed";
import type { Store, UploadKind } from "./store";
import type { Collection, SiteData } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "site-data.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/**
 * Keeps all editable content in data/site-data.json and uploaded files in public/uploads/.
 * Both are committed to git, so a push publishes the edits.
 * Writing only works on a machine with a writable disk (your laptop), not on Vercel.
 */
export class LocalStore implements Store {
  readonly label = "local file (data/site-data.json)";

  async read(): Promise<SiteData> {
    try {
      const raw = await fs.readFile(DATA_FILE, "utf8");
      return JSON.parse(raw) as SiteData;
    } catch {
      // first run: create the file from the original site's content
      const data = seedData();
      await this.save(data).catch(() => undefined);
      return data;
    }
  }

  async writeCollection<K extends Collection>(key: K, items: SiteData[K]): Promise<void> {
    const data = await this.read();
    data[key] = items;
    await this.save(data);
  }

  async writeScholarship(value: SiteData["scholarship"]): Promise<void> {
    const data = await this.read();
    data.scholarship = value;
    await this.save(data);
  }

  async writeSite(value: SiteData["site"]): Promise<void> {
    const data = await this.read();
    data.site = value;
    await this.save(data);
  }

  async upload(_kind: UploadKind, folder: string, fileName: string, bytes: Uint8Array): Promise<string> {
    const dir = path.join(UPLOAD_DIR, folder);
    await fs.mkdir(dir, { recursive: true });
    const safe = fileName.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-|-$/g, "");
    const name = `${Date.now().toString(36)}-${safe}`;
    await fs.writeFile(path.join(dir, name), bytes);
    return `/uploads/${folder}/${name}`;
  }

  async canWrite(): Promise<boolean> {
    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.access(path.dirname(DATA_FILE), fs.constants.W_OK);
      return !process.env.VERCEL;
    } catch {
      return false;
    }
  }

  private async save(data: SiteData): Promise<void> {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
  }
}
