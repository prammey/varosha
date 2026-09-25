import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

const columns = [
  {
    heading: "Quick links",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Scholarship", href: "/scholarship" },
      { label: "Our Team", href: "/team" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { label: "Support Us", href: "/support" },
      { label: "Volunteer", href: "/contact" },
      { label: "Newsletters", href: "/newsletters" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-plum-2 pb-8 pt-16 font-sans text-[0.95rem] text-on-plum-2">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo tone="dark" tag={site.tagline} />
            <p className="max-w-[36ch]">A registered 501(c)(3) nonprofit. 100% of donations are spent on project expenses.</p>
            <Button href="/support" variant="gold" size="sm" className="self-start">Donate</Button>
          </div>

          <div>
            <h4 className="mb-3.5 font-sans text-[0.78rem] font-bold uppercase tracking-[0.14em] text-gold">Contact</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/contact" className="text-on-plum no-underline hover:text-gold">{site.email}</Link></li>
              <li><Link href="/contact" className="text-on-plum no-underline hover:text-gold">{site.phone}</Link></li>
              <li><a href={site.social.facebook} target="_blank" rel="noopener" className="text-on-plum no-underline hover:text-gold">Facebook</a></li>
              <li>{site.address.street}<br />{site.address.cityStateZip}</li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-3.5 font-sans text-[0.78rem] font-bold uppercase tracking-[0.14em] text-gold">{col.heading}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label + l.href}>
                    <Link href={l.href} className="text-on-plum no-underline hover:text-gold">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-11 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-[0.85rem]">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="text-on-plum no-underline hover:text-gold">Terms &amp; Conditions</Link>
            <Link href="/privacy" className="text-on-plum no-underline hover:text-gold">Privacy Policy</Link>
            <Link href="/accessibility" className="text-on-plum no-underline hover:text-gold">Accessibility Statement</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
