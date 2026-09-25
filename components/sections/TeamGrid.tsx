import { Reveal } from "@/components/ui/Reveal";
import { people } from "@/content/people";
import { cn } from "@/lib/cn";

/** Board members on the teal Team page, with initials in place of headshots. */
export function TeamGrid() {
  return (
    <div className="grid grid-cols-2 gap-[18px] md:grid-cols-4">
      {people.map((p, i) => (
        <Reveal key={p.name} delay={(i % 4) as 0 | 1 | 2 | 3}>
          <div className="rounded-card-sm bg-white/[0.06] px-5 py-[22px] text-center transition-[background-color,transform] duration-200 hover:-translate-y-1 hover:bg-white/[0.12]">
            <div
              className={cn(
                "display mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full text-[1.25rem] font-semibold",
                i % 2 === 0 ? "bg-rose-2 text-maroon-2" : "bg-gold text-plum-2",
              )}
              aria-hidden="true"
            >
              {p.name.split(" ").map((w) => w[0]).join("")}
            </div>
            <strong className="display block text-[1.2rem] font-medium">{p.name}</strong>
            <span className="font-sans text-[0.9rem] text-on-plum-2">{p.role}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
