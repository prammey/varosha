import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import type { LegalPage as LegalPageData } from "@/content/legal";

/** Renders Terms, Privacy or Accessibility from content/legal.ts. */
export function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={page.title} />
      <Container narrow className="flex flex-col gap-4 pb-[clamp(40px,5vw,72px)]">
        {page.sections.map((s, i) => (
          <section key={s.heading ?? i} className="flex flex-col gap-3">
            {s.heading && <h3 className={i === 0 ? "text-[clamp(1.35rem,2vw,1.65rem)]" : "mt-6 text-[clamp(1.35rem,2vw,1.65rem)]"}>{s.heading}</h3>}
            {s.paragraphs?.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            {s.bullets && (
              <ul className="list-disc pl-5 text-ink-2">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            )}
          </section>
        ))}
        <p className="mt-4 border-l-[3px] border-gold px-3 py-1.5 font-sans text-[0.85rem] text-mute">{page.draftNote}</p>
      </Container>
    </>
  );
}
