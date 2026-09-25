import Link from "next/link";

/** Heading for an admin page, with an optional back link and a right-hand action. */
export function PageTitle({ title, back, action, intro }: { title: string; back?: { href: string; label: string }; action?: React.ReactNode; intro?: string }) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      {back && <Link href={back.href} className="text-[0.85rem] font-semibold text-mute no-underline hover:text-maroon">← {back.label}</Link>}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="display text-[2rem] leading-none">{title}</h1>
        {action}
      </div>
      {intro && <p className="text-[0.95rem] text-mute">{intro}</p>}
    </div>
  );
}

export function AddButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="rounded-full bg-maroon px-5 py-2 text-[0.95rem] font-bold text-white no-underline hover:bg-maroon-2">
      + {label}
    </Link>
  );
}
