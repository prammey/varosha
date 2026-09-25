import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BusinessCard } from "@/components/sections/BusinessCard";
import { getSiteDetails } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Varosha by email or phone. Questions, volunteering, partnerships, or a donation receipt.",
};

export default async function ContactPage() {
  const site = await getSiteDetails();
  return (
    <div className="relative py-[clamp(40px,7vw,100px)]">
      {/* dimmed photo behind the card */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden after:absolute after:inset-0 after:bg-[linear-gradient(180deg,#1e1219_0%,rgba(30,18,25,.55)_50%,#1e1219_100%)]">
        <Image src="/images/contact/embroidered-saree.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-30 saturate-[1.1]" />
      </div>
      <Container className="relative">
        <div className="a1 relative z-[1] mb-10 flex flex-col items-center gap-2 text-center text-on-plum">
          <span className="eyebrow text-gold">Contact Varosha</span>
          <h1 className="text-[clamp(2.6rem,6vw,4.8rem)]">Get involved.</h1>
          <p className="lede text-on-plum-2">Questions, volunteering, partnerships, or a donation receipt. We answer every message.</p>
        </div>
        <div className="a4">
          <BusinessCard site={site} />
        </div>
      </Container>
    </div>
  );
}
