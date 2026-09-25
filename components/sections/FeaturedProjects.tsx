import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getFeaturedProjects } from "@/lib/data";

/** Teal band on the home page with three project cards. */
export async function FeaturedProjects() {
  const featuredProjects = await getFeaturedProjects();
  return (
    <section className="bg-teal-2 pb-[clamp(60px,8vw,120px)] pt-[clamp(40px,6vw,80px)] text-on-plum">
      <Container className="flex flex-col gap-9">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <span className="eyebrow text-gold">Projects</span>
          <h2 className="text-[clamp(2rem,3.8vw,3.1rem)]">What your support has built.</h2>
        </Reveal>

        <div className="grid gap-[clamp(20px,3vw,36px)] sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i as 0 | 1 | 2}>
              <Link
                href={`/projects#${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card bg-white/[0.07] text-on-plum no-underline transition-[transform,translate,rotate,scale,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-card"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image src={p.image} alt={p.imageAlt} fill unoptimized={p.image.startsWith("http")} sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col gap-2.5 px-6 pb-[26px] pt-[22px]">
                  <span className="font-sans text-[0.82rem] font-bold uppercase tracking-[0.06em] text-gold">{p.stat}</span>
                  <h3 className="text-[clamp(1.35rem,2vw,1.65rem)]">{p.title}</h3>
                  <p className="text-base text-[#bfdadb]">{p.paragraphs[0].slice(0, 140)}…</p>
                  <span className="mt-auto pt-2 font-sans font-bold text-gold">
                    Read more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center">
          <Button href="/projects" variant="gold">All eleven projects</Button>
        </Reveal>
      </Container>
    </section>
  );
}
