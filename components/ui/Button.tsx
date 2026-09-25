import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Variant = "maroon" | "gold" | "outline" | "outlineLight";

const base =
  "inline-flex items-center gap-2 rounded-full border-2 font-sans font-bold whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(42,30,34,.45)] active:translate-y-0";

const variants: Record<Variant, string> = {
  maroon: "border-maroon bg-maroon text-white hover:border-maroon-2 hover:bg-maroon-2",
  gold: "border-gold bg-gold text-plum-2 hover:border-[#f0b84f] hover:bg-[#f0b84f]",
  outline: "border-ink text-ink hover:bg-ink hover:text-cream",
  outlineLight: "border-white/50 text-on-plum hover:bg-on-plum hover:text-plum",
};

const sizes = {
  md: "px-6 py-[0.85em] text-base",
  sm: "px-[1.1em] py-[0.6em] text-[0.92rem]",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  external?: boolean;
};

/** A pill button that is always a link. Use `external` for links that leave the site. */
export function Button({ href, children, variant = "maroon", size = "md", className, external }: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
