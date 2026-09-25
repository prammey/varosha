import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { homeQuote } from "@/content/about";

/** Maroon band with the pull-quote and a tilted arch photo. */
export function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-maroon py-[clamp(60px,8vw,120px)] text-on-plum">
      {/* faint "alo" (light) watermark: nearly every Varosha project is named for light */}
      <div aria-hidden="true" className="display pointer-events-none absolute -bottom-[6vw] -right-[2vw] select-none text-[28vw] italic leading-none text-white/5">
        alo
      </div>
      <Container className="grid items-center gap-[clamp(24px,5vw,72px)] md:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="flex flex-col gap-4">
          <span className="eyebrow text-gold">{homeQuote.eyebrow}</span>
          <p className="display max-w-[28ch] text-[clamp(1.5rem,2.9vw,2.4rem)] font-light italic leading-[1.3]" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
            <span aria-hidden="true" className="mb-2 mt-8 block text-[5rem] not-italic leading-[0] text-gold">“</span>
            {homeQuote.text}
          </p>
          <p className="font-sans text-[#f0d4dc]">{homeQuote.source}</p>
        </Reveal>
        <Reveal delay={1}>
          <div className="arch-sm relative aspect-square w-full rotate-[1.5deg] overflow-hidden">
            <Image src={homeQuote.image} alt={homeQuote.imageAlt} fill sizes="(max-width: 860px) 100vw, 45vw" className="object-cover" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
