import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { events } from "@/content/events";
import { cn } from "@/lib/cn";

/** Vertical milestones list on the Our Story page, built from content/events.ts. */
export function Timeline() {
  return (
    <ul className="relative m-0 list-none p-0 before:absolute before:bottom-2.5 before:left-[9px] before:top-2.5 before:w-0.5 before:rounded before:bg-rose-2">
      {events.map((e, i) => (
        <Reveal key={e.date + e.title} as="li" className="relative pb-9 pl-10 before:absolute before:left-0 before:top-2 before:h-5 before:w-5 before:rounded-full before:border-4 before:border-cream before:bg-gold">
          <div className="font-sans text-[0.82rem] font-bold uppercase tracking-[0.12em] text-maroon">{e.date}</div>
          <h3 className="mb-1.5 mt-1 text-[clamp(1.35rem,2vw,1.65rem)]">{e.title}</h3>
          <p className="max-w-[58ch] text-base text-ink-2">{e.summary}</p>
          {e.image && (
            <div className={cn("relative mt-3.5 aspect-[3/2] max-w-[440px] overflow-hidden rounded-card-sm", i % 2 === 0 ? "-rotate-1" : "rotate-1")}>
              <Image src={e.image} alt={e.imageAlt ?? ""} fill sizes="440px" className="object-cover" />
            </div>
          )}
        </Reveal>
      ))}
    </ul>
  );
}
