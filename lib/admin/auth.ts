/**
 * Admin sign-in.
 *
 * Demo / local mode: one password from ADMIN_PASSWORD in .env.local.
 * Supabase mode: each board member has an email + password account (invite them in the Supabase dashboard).
 *
 * Either way the browser gets an httpOnly cookie; the panel and every save checks it.
 */
import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

const COOKIE = "varosha_admin";
const DAY = 60 * 60 * 24;

export type AuthMode = "password" | "supabase";

export function authMode(): AuthMode {
  return process.env.SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "supabase" : "password";
}

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || createHash("sha256").update(`varosha:${process.env.ADMIN_PASSWORD ?? ""}`).digest("hex");
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** ---- password mode ---- */

export function passwordIsConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function createPasswordSession(): Promise<void> {
  const expires = Date.now() + 7 * DAY * 1000;
  const payload = `admin:${expires}`;
  const jar = await cookies();
  jar.set(COOKIE, `${payload}:${sign(payload)}`, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 7 * DAY });
}

function passwordSessionValid(value: string | undefined): boolean {
  if (!value) return false;
  const [who, expires, sig] = value.split(":");
  if (who !== "admin" || !expires || !sig) return false;
  if (Number(expires) < Date.now()) return false;
  const expected = sign(`${who}:${expires}`);
  return expected.length === sig.length && timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

/** ---- supabase mode ---- */

async function supabaseServer() {
  const jar = await cookies();
  return createServerClient(process.env.SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (list) => {
        try {
          for (const c of list) jar.set(c.name, c.value, c.options);
        } catch {
          // called from a server component: cookies are read-only there, which is fine
        }
      },
    },
  });
}

export async function supabaseSignIn(email: string, password: string): Promise<string | null> {
  const client = await supabaseServer();
  const { error } = await client.auth.signInWithPassword({ email, password });
  return error ? error.message : null;
}

/** ---- shared ---- */

export type Session = { name: string } | null;

export async function getSession(): Promise<Session> {
  if (authMode() === "supabase") {
    const client = await supabaseServer();
    const { data } = await client.auth.getUser();
    return data.user ? { name: data.user.email ?? "Board member" } : null;
  }
  const jar = await cookies();
  return passwordSessionValid(jar.get(COOKIE)?.value) ? { name: "Admin" } : null;
}

/** Use at the top of every admin page and action. Sends signed-out visitors to the login page. */
export async function requireAdmin(): Promise<NonNullable<Session>> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function signOut(): Promise<void> {
  if (authMode() === "supabase") {
    const client = await supabaseServer();
    await client.auth.signOut();
  }
  const jar = await cookies();
  jar.delete(COOKIE);
}
