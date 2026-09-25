/**
 * Events and milestones. Newest first.
 * The first entry with `current: true` is shown large at the top of the Events page.
 * Everything appears on the About page timeline. Images live in public/images/events/.
 */
export type Event = {
  date: string;
  title: string;
  summary: string;
  image: string | null;
  imageAlt?: string;
  current?: boolean;
};

export const events: Event[] = [
  {
    date: "September 2025",
    title: "Decibel concert fundraiser",
    summary:
      "A night of music with the Varosha Board at The Matrix Club, supporting our partners and projects in India.",
    image: "/images/events/concert-flyer-2025.jpg",
    imageAlt: "Flyer for the Decibel rock band concert fundraiser at The Matrix Club, September 13, 2025",
    current: true,
  },
  {
    date: "February 10, 2018",
    title: "Rotary International Service Summit",
    summary:
      "Varosha was one of 30 exhibitors at the first Rotary International Service Summit. It was a wonderful opportunity for us to connect with other nonprofits doing incredible work throughout the world. So many people took great interest in our activities. It was an inspiring day.",
    image: "/images/events/rotary-summit-2018.jpg",
    imageAlt: "Varosha's booth at the Rotary International Service Summit",
  },
  {
    date: "September 6, 2017",
    title: "Thank You Party",
    summary:
      "What Varosha does wouldn’t be possible without the support it receives. Varosha hosted a party to give gratitude to all the donors and volunteers with songs, dances, and speeches.",
    image: "/images/events/thank-you-party-2017.jpg",
    imageAlt: "Two founders speaking at a podium during the thank-you party",
  },
  {
    date: "2015",
    title: "Exhibition",
    summary: "Embroidery and fabric painting by ladies trained by Varosha.",
    image: "/images/events/exhibition-2015.jpg",
    imageAlt: "A kantha-embroidered saree draped over a woman's shoulder",
  },
  {
    date: "2014",
    title: "Exhibition",
    summary:
      "The exhibition of works by the ladies of our Ashar Alo and Sonar Alo projects (fabric painting and embroidery) who have worked so hard to change their lives with your support.",
    image: "/images/events/exhibition-2014.jpg",
    imageAlt: "Two women wearing embroidered sarees from the exhibition",
  },
  {
    date: "April 2004",
    title: "Varosha is founded",
    summary:
      "Started in Chicago with the simple idea that everyone should have a chance to provide a decent quality of life for themselves and their families.",
    image: null,
  },
];

/** Full text of the concert fundraiser, kept from the original site. */
export const concertFundraiser = {
  eyebrow: "Fundraiser · September 13, 2025",
  title: "Decibel: a Chi-Town rock band concert",
  paragraphs: [
    "Join for a night of music, gathering with the Varosha Board, and community empowerment to support our partners and projects in India. Saturday, September 13, 2025, The Matrix Club, 5:30 to 11:30 PM.",
    "Donations of any and all amounts are welcome. Donate via Zelle at donate@varosha.org or Venmo at @Varosha.",
  ],
  footnotes: [
    "* Special sponsor donations include two tickets to the concert, the cost of which will be subtracted from your tax-deductible amount.",
    "** VIP Table donations include four tickets to the concert and four meal vouchers, the cost of which will be subtracted from your tax-deductible amount.",
  ],
  closing:
    "If you wish to contribute as a special sponsor or for a VIP table, please donate directly to Varosha via Zelle or Venmo, and we will purchase your tickets.",
  contact: "Contact: contact@varosha.org or 630-802-7060 (Bikram Dewanjee)",
};
