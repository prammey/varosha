import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CopyText } from "@/components/ui/CopyText";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { scholarship } from "@/content/scholarship";
import { getScholarship, getSiteDetails } from "@/lib/data";

export const metadata: Metadata = {
  title: scholarship.title,
  description: `${scholarship.intro} ${scholarship.amount}, renewable for four years.`,
};

export default async function ScholarshipPage() {
  const [live, site] = await Promise.all([getScholarship(), getSiteDetails()]);
  return (
    <div className="bg-plum text-on-plum">
      <PageHeader
        tone="dark"
        eyebrow="Scholarship"
        title={<>Ananda Chakrabarty <em className="text-gold">Memorial Scholarship</em></>}
        lede={scholarship.intro}
      />
      <Container narrow className="flex flex-col items-center gap-9 pb-[clamp(60px,8vw,120px)] text-center">
        <Reveal as="p" className="lede text-on-plum-2">
          The scholarship is for <strong className="font-semibold text-gold">{scholarship.amount}</strong>, {scholarship.amountDetail}
        </Reveal>

        <Reveal className="grid w-full gap-5 text-left md:grid-cols-2">
          <div className="rounded-card bg-plum-3 px-8 py-7">
            <h3 className="text-[clamp(1.35rem,2vw,1.65rem)] text-gold">Eligibility</h3>
            <p className="mt-2.5 text-on-plum-2">{scholarship.eligibility}</p>
          </div>
          <div className="rounded-card bg-plum-3 px-8 py-7">
            <h3 className="text-[clamp(1.35rem,2vw,1.65rem)] text-gold">Include with your application</h3>
            <ul className="mt-2.5 list-disc pl-5 text-on-plum-2">
              {scholarship.documents.map((d) => <li key={d} className="my-1.5">{d}</li>)}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <span className="inline-block -rotate-[1.5deg] rounded-xl bg-gold px-[1.1em] py-[0.6em] font-sans font-bold text-plum-2">{live.deadline}</span>
        </Reveal>

        <Reveal delay={2} className="flex flex-wrap items-center justify-center gap-3">
          <Button href={live.applyUrl} variant="gold" external>Start application</Button>
          <span className="font-sans text-on-plum-2">
            Questions? Email <CopyText value={site.email} className="bg-plum-3 text-on-plum hover:bg-plum-3/80" />
          </span>
        </Reveal>

        <Reveal as="figure" className="m-0 w-full max-w-[640px]">
          <div className="arch-sm relative aspect-[3/2] w-full rotate-[1.5deg] overflow-hidden">
            <Image src={scholarship.image} alt={scholarship.imageAlt} fill sizes="640px" className="object-cover" />
          </div>
          <figcaption className="mt-3.5 font-sans text-[0.85rem] text-on-plum-2">{scholarship.imageCaption}</figcaption>
        </Reveal>
      </Container>
    </div>
  );
}
