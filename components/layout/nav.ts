/** The primary navigation. Edit labels and routes here. */
export type NavItem = { label: string; href: string; description?: string };

export const aboutMenu: NavItem[] = [
  { label: "Our Story", href: "/about", description: "How Varosha began and how it works" },
  { label: "Our Team", href: "/team", description: "The volunteer board" },
  { label: "Newsletters", href: "/newsletters", description: "Annual reports, 2014 to 2022" },
];

export const mainNav: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Scholarship", href: "/scholarship" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export const donateHref = "/support";
