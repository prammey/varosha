/**
 * Shapes of everything the admin panel can edit.
 * The public pages and the admin panel both use these.
 */
export type ProjectCategory = "skills" | "children" | "health" | "farm";

export type Project = {
  id: string;
  slug: string;
  title: string;
  where: string;
  category: ProjectCategory;
  stat: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  featured: boolean;
  hidden: boolean;
};

export type Person = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
  hidden: boolean;
};

export type Newsletter = {
  id: string;
  year: number;
  file: string;
};

export type SiteEvent = {
  id: string;
  date: string;
  title: string;
  summary: string;
  image: string | null;
  imageAlt: string;
  /** shown large at the top of the Events page (only one should be current) */
  current: boolean;
  hidden: boolean;
};

export type Scholarship = {
  deadline: string;
  applyUrl: string;
};

export type SiteDetails = {
  email: string;
  phone: string;
  addressName: string;
  street: string;
  cityStateZip: string;
  zelle: string;
  venmo: string;
  facebook: string;
  x: string;
  youtube: string;
  instagram: string;
};

export type SiteData = {
  projects: Project[];
  people: Person[];
  newsletters: Newsletter[];
  events: SiteEvent[];
  scholarship: Scholarship;
  site: SiteDetails;
};

export type Collection = "projects" | "people" | "newsletters" | "events";

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "skills", label: "Skills training" },
  { id: "children", label: "Children and education" },
  { id: "health", label: "Health" },
  { id: "farm", label: "Farming and livelihoods" },
];

export const categoryLabel: Record<ProjectCategory, string> = {
  skills: "Skills training",
  children: "Children",
  health: "Health",
  farm: "Farming",
};
