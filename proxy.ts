import { NextResponse, type NextRequest } from "next/server";

/** Tells the admin layout which section is open, so the sidebar can highlight it. */
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const [, , section] = request.nextUrl.pathname.split("/");
  headers.set("x-admin-path", section ? `/admin/${section}` : "/admin");
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/admin/:path*"] };
