/** The primary navigation. Edit labels and routes here. */
export type NavItem = { label: string; href: string; description?: string };

/** First link in the bar, left of About. The logo also goes home. */
export const homeNav: NavItem = { label: "Home", href: "/" };

export const aboutMenu: NavItem[] = [
  { label: "Our Story", href: "/about", description: "How Varosha began and how it works" },
  { label: "Our Team", href: "/team", description: "The volunteer board" },
  { label: "Newsletters", href: "/newsletters", description: "Annual reports, 2014 to 2022" },
];

export const mainNav: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export const donateHref = "/support";
