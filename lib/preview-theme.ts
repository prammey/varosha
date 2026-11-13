import { NextResponse, type NextRequest } from "next/server";

/**
 * Design preview for the board: the site opens in brand colors, and the
 * floating switcher links to /original (current design) or /alt (brand
 * colors), each of which sets a session cookie and sends the visitor back.
 */
export const PREVIEW_COOKIE = "varosha-preview";
export type PreviewTheme = "alt" | "original";

/** Sets the preview cookie and sends the visitor on to ?next= (or the home page). */
export function startPreview(request: NextRequest, theme: PreviewTheme) {
  const next = request.nextUrl.searchParams.get("next") ?? "/";
  // only same-site paths, so the link can't be used to bounce people elsewhere
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  const response = NextResponse.redirect(new URL(safeNext, request.url));
  // no maxAge: a session cookie, gone when the browser closes
  response.cookies.set(PREVIEW_COOKIE, theme, { path: "/", sameSite: "lax" });
  return response;
}
