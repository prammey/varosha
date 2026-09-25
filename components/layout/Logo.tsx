import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * The Varosha emblem (public/brand/logo.svg) with the wordmark beside it.
 * `tone="dark"` for the footer. `tag` is the small line under the name.
 */
export function Logo({ tone = "light", tag = `Since ${site.foundedYear} · ${site.location}`, className }: { tone?: "light" | "dark"; tag?: string; className?: string }) {
  const dark = tone === "dark";
  return (
    <Link href="/" aria-label="Varosha home" className={cn("group flex items-center gap-3.5 no-underline", dark ? "text-on-plum" : "text-ink", className)}>
      <span className="block h-[50px] w-[50px] flex-none overflow-hidden rounded-xl shadow-[0_4px_12px_-4px_rgba(0,0,0,.35)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
        {/* plain <img>: the logo is a small SVG and needs no optimization */}
        <img src="/brand/logo.svg" alt="" width={50} height={50} className="block h-full w-full" />
      </span>
      <span className="flex flex-col">
        <span className="display text-[1.75rem] font-medium leading-none" style={{ fontVariationSettings: '"SOFT" 80, "WONK" 1' }}>
          {site.name}
        </span>
        <span className={cn("mt-1.5 font-sans text-[0.7rem] font-semibold uppercase leading-none tracking-[0.14em]", dark ? "text-on-plum-2" : "text-mute")}>{tag}</span>
      </span>
    </Link>
  );
}
