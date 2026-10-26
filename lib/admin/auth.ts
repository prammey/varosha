import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { passwordConfigured, passwordMatches, sessionValue, validSession } from "./password";
const COOKIE = "varosha_admin";
// Volunteers use the existing shared-password panel; Sanity credentials stay server-side.
export function authMode(): "password" { return "password"; }
export const passwordIsConfigured = passwordConfigured;
export const checkPassword = passwordMatches;
export async function createPasswordSession(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, sessionValue(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 7 * 24 * 60 * 60 });
}
export type Session = { name: string } | null;
export async function getSession(): Promise<Session> {
  const jar = await cookies();
  return validSession(jar.get(COOKIE)?.value) ? { name: "Admin" } : null;
}
export async function requireAdmin(): Promise<NonNullable<Session>> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
export async function signOut(): Promise<void> { (await cookies()).delete(COOKIE); }
