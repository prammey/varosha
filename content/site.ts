/**
 * Organization-wide facts. Edit here and every page updates.
 */
export const site = {
  name: "Varosha",
  tagline: "Hope and Empowerment through Education and Opportunity",
  description:
    "Varosha is a 501(c)(3) nonprofit that funds skills training for women and young people in West Bengal, India, then backs each graduate with an interest-free loan to start a business of their own.",
  founded: "April 2004",
  foundedYear: 2004,
  location: "Palatine, IL",
  email: "contact@varosha.org",
  phone: "847-920-8153",
  address: {
    name: "Varosha",
    street: "1157 E Patten Dr",
    cityStateZip: "Palatine, IL 60074",
  },
  donate: {
    zelle: "donate@varosha.org",
    venmo: "@varosha",
  },
  social: {
    facebook: "https://www.facebook.com/varoshaorg",
    // No accounts yet for these three. They link to the contact page until there are.
    x: null as string | null,
    youtube: null as string | null,
    instagram: null as string | null,
  },
  url: "https://varosha.vercel.app",
} as const;

/** The four numbers on the home page stats bar. */
export const stats = [
  { value: "2004", label: "Founded in Chicago, at work in Kolkata ever since" },
  { value: "100%", label: "of donations spent on project expenses" },
  { value: "11", label: "program areas supported over the years" },
  { value: "0%", label: "interest on the loans our graduates receive" },
] as const;

/** The three steps in "How it works". */
export const howItWorks = [
  {
    title: "Train",
    body: "Beautician work, tailoring, jewelry making, mushroom cultivation, healthcare assistance, computers and spoken English. Courses run three to six months at partner centers in Kolkata, Bolpur and Birbhum.",
  },
  {
    title: "Lend",
    body: "Once training is complete, Varosha provides interest-free loans to trainees so they can buy a sewing machine, stock a parlor, or set up a stall.",
  },
  {
    title: "Thrive",
    body: "Trainees start their own businesses and become self-sufficient. Many come back to recommend the course to the next group.",
  },
] as const;
