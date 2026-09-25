import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Scallop } from "@/components/ui/Scallop";
import { Timeline } from "@/components/sections/Timeline";
import { missionFacts, story } from "@/content/about";
import { site } from "@/content/site";
import { getEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Story",
  description: story.paragraphs[0],
};

export default async function AboutPage() {
  const events = await getEvents();
  return (
    <>
      <PageHeader
        eyebrow={story.eyebrow}
        title={<>A simple idea, held for <em className="text-maroon">twenty years</em>.</>}
        lede={story.lede}
      />

      <Container className="grid items-center gap-[clamp(28px,5vw,72px)] pb-[clamp(40px,5vw,72px)] md:grid-cols-2">
        <Reveal className="flex max-w-[64ch] flex-col gap-[18px]">
          {story.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        </Reveal>
        <Reveal delay={1}>
          {/* photo on a tilted gold backer */}
          <div className="relative pb-6 pr-6 after:absolute after:bottom-0 after:right-0 after:z-0 after:h-4/5 after:w-4/5 after:-rotate-2 after:rounded-card after:bg-gold">
            <div className="arch-sm relative z-[1] aspect-[5/4] w-full overflow-hidden">
              <Image src={story.image} alt={story.imageAlt} fill sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </Reveal>
      </Container>

      <Scallop bg="bg-cream" fill="fill-maroon" />
      <section className="bg-maroon pb-[clamp(60px,8vw,120px)] pt-[clamp(40px,6vw,80px)] text-on-plum">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex flex-col items-center gap-2.5 text-center">
            <span className="eyebrow text-gold">Our mission</span>
            <p className="display mx-auto max-w-[24ch] text-[clamp(1.5rem,2.9vw,2.4rem)] font-light leading-[1.3]" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
              {site.tagline}.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {missionFacts.map((f, i) => (
              <Reveal key={f.title} delay={i as 0 | 1 | 2} className="flex flex-col gap-1.5 rounded-card bg-black/[0.18] p-6">
                <h4 className="font-sans text-[1.1rem] font-bold text-gold">{f.title}</h4>
                <p className="text-[#f0d4dc]">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="milestones" className="py-[clamp(60px,8vw,120px)]">
        <Container className="grid gap-[clamp(28px,5vw,72px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <Reveal className="flex flex-col gap-2.5 self-start md:sticky md:top-[110px]">
            <span className="eyebrow text-maroon">Our story and events</span>
            <h2 className="text-[clamp(2rem,3.8vw,3.1rem)]">Milestones</h2>
            <p className="text-mute">Exhibitions, gatherings and the moments that shaped the work.</p>
            <ArrowLink href="/events" className="text-maroon">Full events page</ArrowLink>
          </Reveal>
          <Timeline events={events} />
        </Container>
      </section>

      <CtaStrip title="Support Varosha today." primary={{ href: "/support", label: "Donate" }} />
    </>
  );
}
