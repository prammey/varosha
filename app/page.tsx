import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { HomeCards } from "@/components/sections/HomeCards";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { Scallop } from "@/components/ui/Scallop";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Scallop bg="bg-plum-2" fill="fill-teal-2" />
      <FeaturedProjects />
      <QuoteBand />
      <HomeCards />
      <CtaStrip
        title="Join us in making a difference."
        sub="Zelle is preferred. There are no fees, so every dollar reaches the field."
        primary={{ href: "/support", label: "Ways to give" }}
        secondary={{ href: "/contact", label: "Volunteer" }}
      />
    </>
  );
}
