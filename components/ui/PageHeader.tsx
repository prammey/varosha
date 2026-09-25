import { Container } from "./Container";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  /** "dark" for pages on plum or teal backgrounds */
  tone?: "light" | "dark";
};

/** Centered page title block with the load-in animation. */
export function PageHeader({ eyebrow, title, lede, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <div className="pt-[clamp(48px,7vw,96px)] pb-[clamp(28px,4vw,56px)]">
      <Container className="flex flex-col items-center gap-3.5 text-center">
        <span className={cn("eyebrow a1", dark ? "text-gold" : "text-maroon")}>{eyebrow}</span>
        <h1 className="a2 text-[clamp(2.6rem,6vw,4.8rem)]">{title}</h1>
        {lede && <p className={cn("lede a3 mt-2.5 max-w-[58ch]", dark ? "text-on-plum-2" : "text-ink-2")}>{lede}</p>}
      </Container>
    </div>
  );
}
