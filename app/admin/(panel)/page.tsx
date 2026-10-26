import Link from "next/link";
import { adminSections } from "@/components/admin/AdminShell";
import { getSiteData } from "@/lib/data";
import { getStore } from "@/lib/data/store";

export default async function AdminHome() {
  const data = await getSiteData();
  const store = await getStore();
  const counts: Record<string, string> = {
    "/admin/projects": `${data.projects.length} projects`,
    "/admin/team": `${data.people.length} members`,
    "/admin/newsletters": `${data.newsletters.length} years`,
    "/admin/events": `${data.events.length} events`,
    "/admin/scholarship": data.scholarship.deadline ? "Deadline set" : "No deadline",
    "/admin/site": data.site.email || "Not set",
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="display text-[2rem] leading-none">What would you like to update?</h1>
        <p className="mt-2 text-[0.95rem] text-mute">Changes appear on the website after you click Publish changes.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {adminSections.map((s) => (
          <Link key={s.href} href={s.href} className="group flex flex-col gap-1 rounded-2xl bg-white p-6 no-underline shadow-[0_1px_2px_rgba(42,30,34,.05)] transition-[transform,translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card">
            <span className="display text-[1.4rem] text-ink group-hover:text-maroon">{s.label}</span>
            <span className="text-[0.9rem] text-mute">{s.blurb}</span>
            <span className="mt-3 text-[0.8rem] font-bold uppercase tracking-wider text-maroon">{counts[s.href]}</span>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-[0.8rem] text-mute">Storage: {store.label}</p>
    </>
  );
}
