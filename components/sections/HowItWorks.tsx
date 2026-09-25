import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StatsBar } from "@/components/ui/StatsBar";
import { howItWorks, stats } from "@/content/site";
import { cn } from "@/lib/cn";

const tints = ["bg-rose", "bg-gold-soft", "bg-teal-soft"];
const numberColors = ["text-maroon", "text-gold-2", "text-teal"];

/**
 * Dark section under the hero. The stats bar is pulled up so its top quarter
 * sits over the cream hero, which makes it look like it floats between the two.
 */
export function HowItWorks() {
  return (
    <section className="bg-plum-2 pb-[clamp(60px,8vw,120px)] text-on-plum">
      <Container>
        <Reveal>
          <StatsBar items={stats} className="-translate-y-1/4" />
        </Reveal>
      </Container>

      <Container className="mt-[clamp(20px,4vw,48px)] flex flex-col gap-11">
        <Reveal className="mx-auto flex max-w-[60ch] flex-col gap-2.5 text-center">
          <span className="eyebrow text-gold">How it works</span>
          <h2 className="text-[clamp(2rem,3.8vw,3.1rem)]">A hand up, then a way forward.</h2>
          <p className="lede text-on-plum-2">
            Our mission is to give people a hand up. With the help of our partners, we run training centers to equip individuals with the skills they need to thrive.
          </p>
        </Reveal>

        <div className="grid gap-[22px] md:grid-cols-3">
          {howItWorks.map((step, i) => (
            <Reveal key={step.title} delay={i as 0 | 1 | 2} className="h-full">
              <div
                className={cn(
                  "group flex h-full flex-col gap-3 rounded-card px-[30px] pb-9 pt-[34px] text-ink transition-transform duration-300",
                  tints[i],
                  // the middle card sits lower; all three dip further on hover
                  i === 1 ? "md:translate-y-[22px] md:hover:translate-y-[30px] md:hover:rotate-[0.4deg]" : "hover:translate-y-2 hover:-rotate-[0.4deg]",
                  i === 1 && "max-md:hover:translate-y-2",
                )}
              >
                <span className={cn("display text-[3.2rem] font-light leading-none", numberColors[i])} style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
                  {i + 1}
                </span>
                <h3 className="text-[clamp(1.35rem,2vw,1.65rem)]">{step.title}</h3>
                <p className="text-base text-ink-2">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
