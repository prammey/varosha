import { Container } from "./Container";
import { Button } from "./Button";
import type { ReactNode } from "react";

type Props = {
  title: string;
  sub?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  children?: ReactNode;
};

/** The gold band with a headline on the left and buttons on the right. */
export function CtaStrip({ title, sub, primary, secondary }: Props) {
  return (
    <div className="bg-gold py-[clamp(40px,5vw,72px)] text-plum-2">
      <Container className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[clamp(1.6rem,2.8vw,2.3rem)]">{title}</h2>
          {sub && <p className="font-sans text-maroon-3">{sub}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button href={primary.href} variant="maroon">{primary.label}</Button>
          {secondary && <Button href={secondary.href} variant="outline">{secondary.label}</Button>}
        </div>
      </Container>
    </div>
  );
}
