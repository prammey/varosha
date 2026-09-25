import { cn } from "@/lib/cn";

/**
 * Section divider: a row of small arches.
 * `bg` is the color of the section above, `fill` the color of the section below.
 * Pass Tailwind classes, e.g. <Scallop bg="bg-cream" fill="fill-plum-2" />
 */
export function Scallop({ bg, fill }: { bg: string; fill: string }) {
  return (
    <div className={cn("h-[22px] w-full", bg)} aria-hidden="true">
      <svg className={cn("block h-full w-full", fill)}>
        <use href="#scallop" />
      </svg>
    </div>
  );
}
