import { cn } from "@/lib/cn";

type Stat = { readonly value: string; readonly label: string };

/** The dark rounded bar of big gold numbers. */
export function StatsBar({ items, className }: { items: readonly Stat[]; className?: string }) {
  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-card bg-plum text-on-plum shadow-card",
        "grid-cols-2 md:grid-cols-4",
        className,
      )}
    >
      {items.map((s, i) => (
        <div
          key={s.value + i}
          className={cn(
            "px-[22px] py-[26px] transition-colors hover:bg-plum-3",
            "md:border-r md:border-white/10 md:last:border-r-0",
            "border-white/10 max-md:[&:nth-child(-n+2)]:border-b max-md:odd:border-r",
          )}
        >
          <strong className="display block text-[2.2rem] font-medium leading-none text-gold" style={{ fontVariationSettings: '"SOFT" 80' }}>
            {s.value}
          </strong>
          <span className="mt-2 block font-sans text-[0.9rem] text-on-plum-2">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
