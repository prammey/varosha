/**
 * What the public pages call. Hidden items are filtered out here,
 * so pages never need to think about drafts.
 */
import { getStore } from "./store";
import type { SiteData } from "./types";

export async function getSiteData(): Promise<SiteData> {
  return (await getStore()).read();
}

export async function getProjects() {
  return (await getSiteData()).projects.filter((p) => !p.hidden);
}

export async function getFeaturedProjects() {
  return (await getProjects()).filter((p) => p.featured).slice(0, 3);
}

export async function getPeople() {
  return (await getSiteData()).people.filter((p) => !p.hidden);
}

/** In the order set in the admin panel; the first one is the featured issue. */
export async function getNewsletters() {
  return (await getSiteData()).newsletters;
}

export async function getEvents() {
  return (await getSiteData()).events.filter((e) => !e.hidden);
}

export async function getScholarship() {
  return (await getSiteData()).scholarship;
}

export async function getSiteDetails() {
  return (await getSiteData()).site;
}

export type { Project, Person, Newsletter, SiteEvent, Scholarship, SiteDetails, ProjectCategory } from "./types";
export { projectCategories, categoryLabel } from "./types";
