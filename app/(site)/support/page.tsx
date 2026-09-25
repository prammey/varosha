import type { Metadata } from "next";
import { Callout } from "@/components/ui/Callout";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { StatsBar } from "@/components/ui/StatsBar";
import { WaysToGive } from "@/components/sections/WaysToGive";
import { getSiteDetails } from "@/lib/data";

export const metadata: Metadata = {
  title: "Support Varosha",
  description: "Donate by Zelle, Venmo or check. Varosha is a registered 501(c)(3); 100% of donations go to project expenses.",
};

const facts = [
  { value: "501(c)(3)", label: "Registered organization. All donations are tax deductible to the extent allowed by law." },
  { value: "100%", label: "of donations are spent on project expenses. Administrative expenses are donated by directors and volunteers." },
  { value: "Direct", label: "All donations are paid directly to Varosha. No platform takes a cut." },
  { value: "Zelle", label: "is preferred, because there are no fees incurred." },
];

export default async function SupportPage() {
  const site = await getSiteDetails();
  return (
    <>
      <PageHeader
        eyebrow="Support Varosha"
        title={<>Join us in making <em className="text-maroon">a difference</em>.</>}
        lede="Varosha is a nonprofit organization dedicated to providing education, resources, and expertise to empower individuals. We rely on the support and involvement of our community to make a lasting impact."
      />
      <Container className="flex flex-col gap-7 pb-[clamp(60px,8vw,120px)]">
        <Reveal><StatsBar items={facts} /></Reveal>
        <Reveal delay={1}><WaysToGive site={site} /></Reveal>
        <Reveal delay={2}>
          <Callout tone="rose">
            <b>For your tax receipt:</b> please send an email to {site.email} to ensure we have your contact information to send a donation confirmation for tax purposes.
          </Callout>
        </Reveal>
      </Container>
    </>
  );
}
