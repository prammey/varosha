/**
 * The starting data, taken from the original site.
 * Used once to create data/site-data.json (local mode) or to fill Supabase.
 */
import { projects as seedProjects } from "@/content/projects";
import { people as seedPeople } from "@/content/people";
import { newsletters as seedNewsletters } from "@/content/newsletters";
import { concertFundraiser, events as seedEvents } from "@/content/events";
import { scholarship as seedScholarship } from "@/content/scholarship";
import { site as seedSite } from "@/content/site";
import type { SiteData } from "./types";

export function seedData(): SiteData {
  return {
    projects: seedProjects.map((p) => ({
      id: p.slug,
      slug: p.slug,
      title: p.title,
      where: p.where,
      category: p.category,
      stat: p.stat,
      image: p.image,
      imageAlt: p.imageAlt,
      paragraphs: [...p.paragraphs],
      featured: Boolean(p.featured),
      hidden: false,
    })),
    people: seedPeople.map((m) => ({
      id: m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: m.name,
      role: m.role,
      bio: "",
      photo: null,
      hidden: false,
    })),
    newsletters: seedNewsletters.map((n) => ({ id: String(n.year), year: n.year, file: n.file })),
    events: seedEvents.map((e, i) => ({
      id: `event-${i}`,
      date: e.date,
      title: e.title,
      summary: e.current ? [concertFundraiser.title + ". " + concertFundraiser.paragraphs[0], concertFundraiser.paragraphs[1], concertFundraiser.footnotes.join("\n"), concertFundraiser.closing, concertFundraiser.contact].join("\n\n") : e.summary,
      image: e.image,
      imageAlt: e.imageAlt ?? "",
      current: Boolean(e.current),
      hidden: false,
    })),
    scholarship: { deadline: seedScholarship.deadline, applyUrl: seedScholarship.applyUrl },
    site: {
      email: seedSite.email,
      phone: seedSite.phone,
      addressName: seedSite.address.name,
      street: seedSite.address.street,
      cityStateZip: seedSite.address.cityStateZip,
      zelle: seedSite.donate.zelle,
      venmo: seedSite.donate.venmo,
      facebook: seedSite.social.facebook,
      x: seedSite.social.x ?? "",
      youtube: seedSite.social.youtube ?? "",
      instagram: seedSite.social.instagram ?? "",
    },
  };
}
