import { HeroHeadlineText, HeroPhotoImage } from "./HeroShared";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

const introduction = `Since ${site.founded}, Varosha has funded skills training for women and young people in West Bengal, then backed each graduate with an interest-free loan to start a business of their own.`;

function Heading({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative z-[2] mx-auto flex w-full max-w-[1060px] flex-col items-center text-center">
      <span className="eyebrow a1 text-maroon">A 501(c)(3) nonprofit · Kolkata &amp; West Bengal</span>
      <h1 className={`a2 mt-5 leading-[1.05] ${compact ? "text-[clamp(2.5rem,5.2vw,4.25rem)]" : "text-[clamp(2.55rem,5.8vw,4.8rem)]"}`}>
        <HeroHeadlineText stacked />
      </h1>
    </div>
  );
}

function Actions({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${vertical ? "sm:flex-col sm:items-stretch" : ""}`}>
      <Button href="/support">Donate</Button>
      <Button href="/projects" variant="outline">See the projects</Button>
    </div>
  );
}

function Photo({ id, className = "", tall = false, badgeHigh = false }: { id: string; className?: string; tall?: boolean; badgeHigh?: boolean }) {
  return (
    <figure className={`a4 relative z-[1] m-0 w-full pr-5 pt-5 sm:pr-7 sm:pt-6 ${className}`}>
      <span aria-hidden="true" className="absolute right-0 top-0 z-0 h-[84%] w-[78%] rotate-2 rounded-card bg-maroon" />
      <div className={`arch relative z-[1] w-full overflow-hidden ${tall ? "aspect-[5/4]" : "aspect-[4/3] sm:aspect-[16/9]"}`}>
        <HeroPhotoImage sizes="(max-width: 768px) 92vw, 900px" />
      </div>
      <div aria-hidden="true" className={`absolute -right-1 z-[3] grid h-[86px] w-[86px] place-items-center rounded-full bg-gold text-plum-2 shadow-card sm:-right-3 sm:h-[108px] sm:w-[108px] ${badgeHigh ? "bottom-20 sm:bottom-24" : "bottom-5 sm:bottom-8"}`}>
        <svg viewBox="0 0 120 120" className="h-full w-full animate-[spin_24s_linear_infinite]">
          <defs><path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
          <text className="fill-plum-2 font-sans text-[11.5px] font-bold tracking-[0.2em]"><textPath href={`#${id}`}>100% TO PROJECTS · SINCE 2004 · </textPath></text>
        </svg>
        <b className="display absolute text-[1.25rem] font-medium sm:text-[1.5rem]" style={{ fontVariationSettings: '"SOFT" 80' }}>2004</b>
      </div>
    </figure>
  );
}

/** Editorial: one centered headline, then a quieter portrait-and-copy composition. */
export function AlternateHero() {
  return (
    <div className="pt-[clamp(30px,3.6vw,48px)]">
      <Container className="pb-[clamp(38px,4vw,56px)]">
        <Heading compact />
        <div className="mx-auto mt-8 grid max-w-[1030px] items-center gap-7 md:mt-11 md:grid-cols-[1fr_1.2fr] md:gap-[clamp(36px,5vw,72px)]">
          <Photo id="study-three-stamp" tall className="mx-auto max-w-[560px] md:order-2" />
          <div className="a3 flex flex-col items-center gap-6 text-center md:order-1 md:items-start md:text-left">
            <p className="lede max-w-[38ch] text-ink-2" style={{ fontSize: "clamp(1.25rem,1.8vw,1.5rem)" }}>{introduction}</p>
            <Actions />
          </div>
        </div>
      </Container>
    </div>
  );
}
