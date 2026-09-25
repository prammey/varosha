import Link from "next/link";
import Image from "next/image";
import { logout } from "@/app/admin/actions";
import { cn } from "@/lib/cn";

export const adminSections = [
  { href: "/admin/projects", label: "Projects", blurb: "The work in West Bengal" },
  { href: "/admin/team", label: "Team", blurb: "Board members, bios and photos" },
  { href: "/admin/newsletters", label: "Newsletters", blurb: "One PDF per year" },
  { href: "/admin/events", label: "Events", blurb: "Fundraisers and gatherings" },
  { href: "/admin/scholarship", label: "Scholarship", blurb: "Deadline and application link" },
  { href: "/admin/site", label: "Site details", blurb: "Email, phone, address, donate handles" },
];

/** Sidebar on desktop, top bar on phones. Wraps every signed-in admin page. */
export function AdminShell({ children, current, user, readOnly }: { children: React.ReactNode; current?: string; user: string; readOnly: boolean }) {
  return (
    <div className="min-h-screen bg-[#f7f2ea] font-sans text-ink md:grid md:grid-cols-[240px_1fr]">
      <aside className="flex flex-col gap-6 border-b border-line bg-cream px-5 py-5 md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r">
        <Link href="/admin" className="flex items-center gap-3 no-underline">
          <Image src="/brand/logo.svg" alt="" width={36} height={36} className="rounded-lg" />
          <span className="flex flex-col leading-tight">
            <span className="display text-xl text-ink">Varosha</span>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-mute">Admin</span>
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1 md:flex-col" aria-label="Admin sections">
          {adminSections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              aria-current={current === s.href ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-[0.95rem] font-semibold no-underline transition-colors",
                current === s.href ? "bg-maroon text-white" : "text-ink-2 hover:bg-rose hover:text-ink",
              )}
            >
              {s.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 text-[0.85rem] text-mute">
          <a href="/" target="_blank" rel="noopener" className="font-semibold text-ink-2 no-underline hover:text-maroon">View the website ↗</a>
          <span>Signed in as {user}</span>
          <form action={logout}>
            <button type="submit" className="font-semibold text-ink-2 hover:text-maroon">Sign out</button>
          </form>
        </div>
      </aside>
      <div className="px-5 py-8 md:px-10 md:py-10">
        {readOnly && (
          <div className="mx-auto mb-6 max-w-[760px] rounded-xl bg-gold-soft px-4 py-3 text-[0.9rem] text-plum-2">
            <b>Read-only copy.</b> This server can’t save changes. To edit, run the site on your computer with <code className="rounded bg-white/60 px-1">npm run dev</code> and open /admin there.
          </div>
        )}
        <div className="mx-auto max-w-[760px]">{children}</div>
      </div>
    </div>
  );
}
