/**
 * Annual newsletters. Files live in public/newsletters/.
 * To add a year: drop the PDF in that folder and add a line here (newest first).
 */
export type Newsletter = { year: number; file: string };

export const newsletters: Newsletter[] = [
  { year: 2022, file: "/newsletters/varosha-newsletter-2022.pdf" },
  { year: 2021, file: "/newsletters/varosha-newsletter-2021.pdf" },
  { year: 2020, file: "/newsletters/varosha-newsletter-2020.pdf" },
  { year: 2019, file: "/newsletters/varosha-newsletter-2019.pdf" },
  { year: 2018, file: "/newsletters/varosha-newsletter-2018.pdf" },
  { year: 2017, file: "/newsletters/varosha-newsletter-2017.pdf" },
  { year: 2016, file: "/newsletters/varosha-newsletter-2016.pdf" },
  { year: 2015, file: "/newsletters/varosha-newsletter-2015.pdf" },
  { year: 2014, file: "/newsletters/varosha-newsletter-2014.pdf" },
];

export const latestNewsletter = newsletters[0];
