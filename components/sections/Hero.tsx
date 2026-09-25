import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

/** Home page opener: headline on the left, arch-clipped photo on a tilted maroon block on the right. */
export function Hero() {
  return (
    <div className="pt-[clamp(36px,5vw,72px)]">
      <Container className="grid items-center gap-[clamp(28px,5vw,56px)] pb-[clamp(36px,4vw,56px)] md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-[2] flex flex-col gap-[22px]">
          <span className="eyebrow a1 text-maroon">A 501(c)(3) nonprofit · Kolkata &amp; West Bengal</span>
          <h1 className="a2 text-[clamp(2.6rem,6vw,4.8rem)]">
            Hope and empowerment through <em className="text-maroon">education</em> and <em className="text-maroon">opportunity</em>.
          </h1>
          <p className="lede a3 text-ink-2">
            Since {site.founded}, Varosha has funded skills training for women and young people in West Bengal, then backed each graduate with an interest-free loan to start a business of their own.
          </p>
          <div className="a3 flex flex-wrap items-center gap-3">
            <Button href="/support">Donate</Button>
            <Button href="/projects" variant="outline">See the projects</Button>
          </div>
        </div>

        <figure className="a4 relative z-[1] m-0 pr-7 pt-7">
          {/* the tilted maroon block behind the photo */}
          <span aria-hidden="true" className="absolute right-0 top-0 z-0 h-[84%] w-[78%] rotate-2 rounded-card bg-maroon" />
          <div className="arch relative z-[1] aspect-[4/4.5] w-full overflow-hidden">
            <Image
              src="/images/hero/tailoring-graduates.jpg"
              alt="Six young women in a classroom smiling and holding up garments they tailored themselves"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              className="object-cover object-[center_30%]"
            />
          </div>
          <Stamp />
        </figure>
      </Container>
    </div>
  );
}

/** The slowly rotating gold "100% to projects · since 2004" badge on the hero photo. */
function Stamp() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-14 z-[3] grid h-[120px] w-[120px] place-items-center rounded-full bg-gold text-plum-2 shadow-card max-md:-bottom-8 max-md:right-2 max-md:h-[100px] max-md:w-[100px] md:-left-2"
    >
      <svg viewBox="0 0 120 120" className="h-full w-full animate-[spin_24s_linear_infinite]">
        <defs>
          <path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-plum-2 font-sans text-[11.5px] font-bold tracking-[0.2em]">
          <textPath href="#stamp-circle">100% TO PROJECTS · SINCE 2004 · </textPath>
        </text>
      </svg>
      <b className="display absolute text-[1.6rem] font-medium max-md:text-[1.3rem]" style={{ fontVariationSettings: '"SOFT" 80' }}>
        2004
      </b>
    </div>
  );
}
