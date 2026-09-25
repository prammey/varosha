import type { Newsletter } from "@/lib/data/types";

/** Grid of year tiles, each opening that year's PDF in a new tab. */
export function NewsletterGrid({ newsletters }: { newsletters: Newsletter[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(118px,1fr))] gap-3">
      {newsletters.map((n) => (
        <a
          key={n.id}
          href={n.file}
          target="_blank"
          rel="noopener"
          className="flex flex-col gap-1 rounded-card-sm bg-plum-3 px-3 py-5 text-center font-sans font-bold text-on-plum no-underline transition-[transform,translate,rotate,scale,background-color,color] duration-200 hover:-translate-y-1 hover:-rotate-[1.5deg] hover:bg-gold hover:text-plum-2"
        >
          <span className="text-[0.72rem] uppercase tracking-[0.1em] opacity-70">Newsletter</span>
          <strong className="display text-[1.7rem] font-medium">{n.year}</strong>
        </a>
      ))}
    </div>
  );
}
