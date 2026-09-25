import Image from "next/image";
import { CopyText } from "@/components/ui/CopyText";
import type { SiteDetails } from "@/lib/data/types";

const buildRows = (site: SiteDetails) => [
  {
    small: "Preferred · no fees",
    label: "Zelle / QuickPay",
    body: (
      <>
        <CopyText value={site.zelle} />
        <span>Donations via Zelle are preferred as there are no fees incurred.</span>
      </>
    ),
  },
  {
    small: "Online",
    label: "Venmo",
    body: (
      <>
        <CopyText value={site.venmo} />
        <span>Or scan the code on the right in the Venmo app.</span>
      </>
    ),
  },
  {
    small: "By mail",
    label: "Check",
    body: (
      <>
        <span>
          Payable to <b>{site.addressName}</b>, mailed to {site.street}, {site.cityStateZip}.
        </span>
        <span className="font-sans text-[0.92rem]">Include your email address in the memo line so we can acknowledge your donation for tax purposes.</span>
      </>
    ),
  },
  {
    small: "Your time",
    label: "Volunteer",
    body: (
      <span>
        Please reach out to <CopyText value={site.email} className="text-[0.95rem]" /> if you are interested in volunteering with our organization.
      </span>
    ),
  },
];

/** The single white panel on the Support page: four ways to give beside the QR codes. */
export function WaysToGive({ site }: { site: SiteDetails }) {
  const rows = buildRows(site);
  return (
    <div className="grid overflow-hidden rounded-card bg-white shadow-card md:grid-cols-[1.6fr_1fr]">
      <div className="flex flex-col px-9 py-[34px]">
        {rows.map((r) => (
          <div key={r.label} className="grid items-start gap-4 border-b border-dashed border-line py-5 last:border-b-0 sm:grid-cols-[130px_1fr]">
            <div className="flex flex-col gap-0.5 font-sans font-bold">
              <small className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-maroon">{r.small}</small>
              {r.label}
            </div>
            <div className="flex flex-col gap-1.5 text-base text-ink-2">{r.body}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-3.5 bg-plum p-[30px] text-center font-sans text-[0.9rem] text-on-plum-2">
        <Image
          src="/images/support/zelle-venmo-qr.png"
          alt="QR codes for donating to Varosha by Zelle and by Venmo"
          width={1000}
          height={667}
          className="w-full max-w-[420px] rounded-card-sm"
        />
        <span>Scan to give: Zelle (left), Venmo (right)</span>
      </div>
    </div>
  );
}
