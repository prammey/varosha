import { createHash, createHmac, timingSafeEqual } from "node:crypto";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;
export function passwordConfigured(env = process.env): boolean {
  const password = env.ADMIN_PASSWORD ?? "";
  const secret = env.ADMIN_SESSION_SECRET ?? "";
  if (!password) return false;
  return env.NODE_ENV !== "production" || (password.length >= 8 && secret.length >= 32 && secret !== password);
}
function sessionKey(env = process.env) {
  const passwordHash = createHash("sha256").update(env.ADMIN_PASSWORD ?? "").digest("hex");
  // Password changes invalidate existing sessions even when the signing secret stays the same.
  return `${env.ADMIN_SESSION_SECRET ?? "local-only"}:${passwordHash}`;
}
export function passwordMatches(input: string, env = process.env) {
  if (!passwordConfigured(env) || input.length > 1024) return false;
  const hash = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(hash(input), hash(env.ADMIN_PASSWORD ?? ""));
}
export function sessionValue(now = Date.now(), env = process.env) {
  if (!passwordConfigured(env)) throw new Error("Admin login is not configured securely on this server.");
  const payload = `admin:${now + SESSION_MS}`;
  return `${payload}:${createHmac("sha256", sessionKey(env)).update(payload).digest("hex")}`;
}
export function validSession(value: string | undefined, now = Date.now(), env = process.env) {
  if (!passwordConfigured(env) || !value) return false;
  const parts = value.split(":");
  if (parts.length !== 3) return false;
  const [who, expiry, signature] = parts;
  if (who !== "admin" || !/^\d{13}$/.test(expiry) || !/^[a-f0-9]{64}$/.test(signature)) return false;
  const expiration = Number(expiry);
  if (!Number.isSafeInteger(expiration) || expiration <= now || expiration > now + SESSION_MS + 60000) return false;
  const expected = createHmac("sha256", sessionKey(env)).update(`${who}:${expiry}`).digest("hex");
  return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
}
