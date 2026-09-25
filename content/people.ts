/**
 * The board. Order here is the order on the Team page.
 * Group photo lives in public/images/team/.
 */
export type Person = { name: string; role: string };

export const people: Person[] = [
  { name: "Shuvani Sanyal", role: "Chair" },
  { name: "Santi Banerjee", role: "Founding Director" },
  { name: "Krishna Chakrabarty", role: "Founding Director" },
  { name: "Shompita Chatterjee", role: "Community Outreach" },
  { name: "Mondira Bhattacharya", role: "Community Outreach" },
  { name: "Sudipta Mandal", role: "Finance" },
  { name: "Bikram Dewanjee", role: "Project Management" },
  { name: "Manjima Bose", role: "Non-profit Operations" },
];

export const boardPhoto = {
  src: "/images/team/board-september-2025.jpg",
  alt: "The Varosha board, eight people standing in front of a Durga Puja pandal, September 2025",
  caption: "The board, September 2025",
};
