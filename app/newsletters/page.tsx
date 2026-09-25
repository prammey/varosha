import type { Metadata } from "next";
import Image from "next/image";
import { Callout } from "@/components/ui/Callout";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterGrid } from "@/components/sections/NewsletterGrid";
import { story } from "@/content/about";
import { latestNewsletter, newsletters } from "@/content/newsletters";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Newsletters",
  description: `Varosha's annual newsletters from ${newsletters[newsletters.length - 1].year} to ${latestNewsletter.year}, as PDFs.`,
};

export default function NewslettersPage() {
  return (
    <div className="bg-plum text-on-plum">
      <PageHeader
        tone="dark"
        eyebrow="Newsletters"
        title={<>Nine years, <em className="text-gold">in print</em>.</>}
        lede="Each annual newsletter reports the year’s projects, the numbers behind them, and photographs from the centers in West Bengal. Every issue opens as a PDF."
      />
      <Container className="flex flex-col gap-10 pb-[clamp(60px,8vw,120px)]">
        <Reveal>
          <a
            href={latestNewsletter.file}
            target="_blank"
            rel="noopener"
            className="grid overflow-hidden rounded-card bg-plum-3 text-on-plum no-underline transition-[transform,translate,rotate,scale,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_50px_-24px_rgba(0,0,0,.6)] md:grid-cols-[1fr_1.4fr]"
          >
            <div className="relative min-h-[280px]">
              <Image src={story.image} alt="" fill sizes="(max-width: 760px) 100vw, 40vw" className="object-cover" />
              <span className="display absolute bottom-5 left-5 -rotate-3 rounded-[14px] bg-gold px-[0.5em] py-[0.1em] text-[2.4rem] font-medium text-plum-2 shadow-card">
                {latestNewsletter.year}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-3 p-9">
              <span className="eyebrow text-gold">Latest issue</span>
              <h2 className="text-[clamp(2rem,3.8vw,3.1rem)]">The {latestNewsletter.year} newsletter</h2>
              <p className="text-on-plum-2">The most recent report from the field: projects funded, trainees supported, and the year’s gatherings in Illinois.</p>
              <span className="inline-flex self-start rounded-full bg-gold px-[1.1em] py-[0.6em] font-sans text-[0.92rem] font-bold text-plum-2">Open the PDF</span>
            </div>
          </a>
        </Reveal>

        <Reveal delay={1} className="flex flex-col gap-4">
          <span className="eyebrow text-gold">The archive</span>
          <NewsletterGrid />
        </Reveal>

        <Reveal delay={2}>
          <Callout tone="gold">
            <b>Want the next issue by email?</b> Write to {site.email} and we will add you to the list.
          </Callout>
        </Reveal>
      </Container>
    </div>
  );
}
