import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Scallop } from "@/components/ui/Scallop";
import { concertFundraiser, events } from "@/content/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Fundraisers, exhibitions and summits where Varosha's supporters in Illinois meet the work in West Bengal.",
};

export default function EventsPage() {
  const current = events.find((e) => e.current);
  const past = events.filter((e) => !e.current && e.image);

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title={<>Gatherings, exhibitions <em className="text-maroon">and summits</em>.</>}
        lede="Where Varosha’s supporters in Illinois meet the work happening in West Bengal."
      />

      {current?.image && (
        <Container className="grid items-center gap-[clamp(28px,5vw,72px)] pb-[clamp(40px,5vw,72px)] md:grid-cols-2">
          <Reveal>
            <div className="relative pb-6 pr-6 after:absolute after:bottom-0 after:right-0 after:z-0 after:h-4/5 after:w-4/5 after:-rotate-2 after:rounded-card after:bg-rose-2">
              <div className="relative z-[1] aspect-[3/2] w-full overflow-hidden rounded-card">
                <Image src={current.image} alt={current.imageAlt ?? ""} fill sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={1} className="flex max-w-[64ch] flex-col gap-3.5">
            <span className="eyebrow text-maroon">{concertFundraiser.eyebrow}</span>
            <h2 className="text-[clamp(2rem,3.8vw,3.1rem)]">{concertFundraiser.title}</h2>
            {concertFundraiser.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            <p className="font-sans text-[0.95rem] text-ink-2">
              {concertFundraiser.footnotes.map((f) => <span key={f} className="block">{f}</span>)}
            </p>
            <p>{concertFundraiser.closing}</p>
            <p className="font-sans text-[0.95rem]">{concertFundraiser.contact}</p>
          </Reveal>
        </Container>
      )}

      <Scallop bg="bg-cream" fill="fill-cream-2" />
      <section className="bg-cream-2 pb-[clamp(60px,8vw,120px)] pt-[clamp(40px,6vw,80px)]">
        <Container className="flex flex-col gap-9">
          <Reveal className="flex flex-col items-center gap-2 text-center">
            <span className="eyebrow text-maroon">Past events</span>
            <h2 className="text-[clamp(2rem,3.8vw,3.1rem)]">Rotary, thank-yous and exhibitions</h2>
          </Reveal>
          <div className="grid gap-[clamp(20px,3vw,36px)] md:grid-cols-2">
            {past.map((e, i) => (
              <Reveal key={e.date + e.title} delay={(i % 2) as 0 | 1}>
                <article className="group flex h-full flex-col overflow-hidden rounded-card bg-white transition-[transform,translate,rotate,scale,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-card">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image src={e.image!} alt={e.imageAlt ?? ""} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 px-6 pb-[26px] pt-[22px]">
                    <span className="font-sans text-[0.82rem] font-bold uppercase tracking-[0.06em] text-maroon">{e.date}</span>
                    <h3 className="text-[clamp(1.35rem,2vw,1.65rem)]">{e.title}</h3>
                    <p className="text-base text-ink-2">{e.summary}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
