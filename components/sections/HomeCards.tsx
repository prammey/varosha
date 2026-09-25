import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { scholarship } from "@/content/scholarship";
import { story } from "@/content/about";
import { newsletters } from "@/content/newsletters";
import { cn } from "@/lib/cn";

const cards = [
  {
    href: "/scholarship",
    tint: "bg-gold-soft",
    image: scholarship.image,
    alt: scholarship.imageAlt,
    meta: "Illinois students",
    title: scholarship.title,
    body: "One award a year of $5,000, renewable for four years, for a low-income Illinois student heading to college or university.",
    link: "Eligibility and application",
  },
  {
    href: "/newsletters",
    tint: "bg-rose",
    image: story.image,
    alt: story.imageAlt,
    meta: "Newsletters",
    title: `${newsletters.length} years of annual reports`,
    body: `Every newsletter since ${newsletters[newsletters.length - 1].year}, with the year’s projects, numbers and photographs from the field.`,
    link: "Read the archive",
  },
];

/** The two tinted cards near the bottom of the home page. */
export function HomeCards() {
  return (
    <section className="bg-cream py-[clamp(60px,8vw,120px)]">
      <Container className="grid gap-[clamp(20px,3vw,36px)] md:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.href} delay={i as 0 | 1}>
            <Link
              href={c.href}
              className={cn("group flex h-full flex-col overflow-hidden rounded-card text-ink no-underline transition-[transform,translate,rotate,scale,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-card", c.tint)}
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image src={c.image} alt={c.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 px-6 pb-[26px] pt-[22px]">
                <span className="font-sans text-[0.82rem] font-bold uppercase tracking-[0.06em] text-maroon">{c.meta}</span>
                <h3 className="text-[clamp(1.35rem,2vw,1.65rem)]">{c.title}</h3>
                <p className="text-base text-ink-2">{c.body}</p>
                <span className="mt-auto pt-2 font-sans font-bold text-maroon">
                  {c.link} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
