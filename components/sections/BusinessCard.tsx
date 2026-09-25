import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CopyText } from "@/components/ui/CopyText";
import { site } from "@/content/site";

/** The tilted business card in the middle of the Contact page. */
export function BusinessCard() {
  return (
    <div className="relative z-[1] mx-auto grid max-w-[760px] -rotate-[1.2deg] overflow-hidden rounded-card bg-cream shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)] transition-transform duration-300 hover:rotate-0 sm:grid-cols-[1fr_1.4fr]">
      <div className="relative flex flex-col items-start justify-center gap-4 overflow-hidden bg-maroon px-[30px] py-9 text-on-plum after:absolute after:-bottom-[60px] after:-right-[60px] after:h-[180px] after:w-[180px] after:rounded-full after:bg-gold after:opacity-25">
        <span className="block h-[72px] w-[72px] overflow-hidden rounded-[14px] shadow-[0_8px_20px_-8px_rgba(0,0,0,.6)]">
          <Image src="/brand/logo.svg" alt="" width={72} height={72} className="block h-full w-full" />
        </span>
        <span className="display text-[2rem] leading-none" style={{ fontVariationSettings: '"SOFT" 80, "WONK" 1' }}>{site.name}</span>
        <span className="font-sans text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-gold-soft">{site.tagline}</span>
      </div>

      <div className="flex flex-col justify-center gap-3.5 px-[34px] py-9">
        <Row label="Email"><CopyText value={site.email} /></Row>
        <Row label="Phone"><CopyText value={site.phone} /></Row>
        <Row label="Social">
          <a href={site.social.facebook} target="_blank" rel="noopener" className="font-sans font-bold">facebook.com/varoshaorg</a>
        </Row>
        <Row label="Mail">
          <address className="not-italic leading-[1.45] text-ink-2">
            {site.address.name}<br />{site.address.street}<br />{site.address.cityStateZip}
          </address>
        </Row>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button href="/support" size="sm">Support the mission</Button>
          <Button href="/scholarship" size="sm" variant="outline">Scholarship</Button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-baseline gap-3 font-sans text-base">
      <b className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-maroon">{label}</b>
      <div>{children}</div>
    </div>
  );
}
