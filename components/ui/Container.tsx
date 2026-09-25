import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Centers content at the site's max width with the standard side gutter. */
export function Container({ children, className, narrow }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return (
    <div className={cn("mx-auto w-full px-[clamp(16px,4vw,40px)]", narrow ? "max-w-[820px]" : "max-w-[1180px]", className)}>
      {children}
    </div>
  );
}
