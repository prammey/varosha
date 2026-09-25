import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** A soft rounded note with an icon. Tone "gold" or "rose". */
export function Callout({ children, tone = "gold", icon = "✉", className }: { children: ReactNode; tone?: "gold" | "rose"; icon?: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-card px-[26px] py-[22px] font-sans text-base leading-normal",
        tone === "gold" ? "bg-gold-soft text-plum-2" : "bg-rose text-maroon-3",
        className,
      )}
    >
      <span aria-hidden="true" className="text-[1.4rem] leading-tight">{icon}</span>
      <span>{children}</span>
    </div>
  );
}
