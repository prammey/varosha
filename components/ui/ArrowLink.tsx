import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** A text link with an arrow that nudges right on hover. */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-1.5 font-sans font-bold no-underline", className)}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </Link>
  );
}
