import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { PageHeader } from "@/components/ui/PageHeader";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { boardPhoto, people } from "@/content/people";

export const metadata: Metadata = {
  title: "Our Team",
  description: `Varosha's volunteer board: ${people.map((p) => p.name).join(", ")}.`,
};

export default function TeamPage() {
  return (
    <div className="bg-teal-2 text-on-plum">
      <PageHeader
        tone="dark"
        eyebrow="Members"
        title={<>The people <em className="text-gold">behind Varosha</em>.</>}
        lede="A volunteer board based in the Chicago area, with deep ties to Kolkata. Every administrative cost is covered by the directors themselves."
      />
      <Container className="a4 max-w-[1000px]">
        <div className="arch relative aspect-video w-full overflow-hidden">
          <Image src={boardPhoto.src} alt={boardPhoto.alt} fill priority sizes="(max-width: 1000px) 100vw, 1000px" className="object-cover" />
        </div>
        <p className="mt-3 text-center font-sans text-[0.85rem] text-[#bfdadb]">{boardPhoto.caption}</p>
      </Container>
      <Container className="py-[clamp(60px,8vw,120px)]">
        <TeamGrid />
      </Container>
      <CtaStrip
        title="Join us in empowering lives today."
        sub="Volunteer, host a gathering, or help us reach new donors."
        primary={{ href: "/contact", label: "Get involved" }}
      />
    </div>
  );
}
