import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects supported by Varosha in West Bengal: skills training, children's education, health and farming.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="bg-plum text-on-plum">
      <PageHeader
        tone="dark"
        eyebrow="Projects"
        title={<>{projects.length === 11 ? "Eleven" : projects.length} projects, <em className="text-gold">one method</em>.</>}
        lede="Here you’ll find a selection of projects supported by Varosha over the years. Open any project to learn more about what we do."
      />
      <Container className="flex flex-col gap-8 pb-[clamp(60px,8vw,120px)]">
        <ProjectGrid projects={projects} />
      </Container>
      <CtaStrip
        title="Support our work."
        sub="Every project above was funded by individual donors like you."
        primary={{ href: "/support", label: "Start now" }}
      />
    </div>
  );
}
