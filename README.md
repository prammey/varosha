# Varosha — website

The website of **Varosha**, a registered 501(c)(3) nonprofit in Palatine, Illinois, that
funds skills training and interest-free micro-loans for women and young people in West
Bengal, India. Live at **https://varosha.vercel.app** (varosha.org to follow).

Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4. Every page is static.

## Where things live

```
app/            one folder per page (about, projects, scholarship, team, support,
                events, newsletters, contact, terms, privacy, accessibility)
                layout.tsx = fonts, header, footer, social rail on every page
components/
  layout/       Header (nav + dropdown + Donate block), Footer, SocialRail, Logo, nav.ts
  sections/     the big blocks that make up pages (Hero, HowItWorks, ProjectGrid, ...)
  ui/           small reusable pieces (Button, Container, PageHeader, StatsBar, ...)
content/        ALL the words, numbers, names and links. Edit these, not the components.
  site.ts       name, tagline, email, phone, address, Zelle/Venmo, social links, stats
  projects.ts   the 11 projects
  people.ts     the board
  events.ts     events and milestones
  newsletters.ts  which PDFs exist
  scholarship.ts  amount, eligibility, deadline, Google Form link
  about.ts      Our Story copy and the home-page quote
  legal.ts      Terms, Privacy, Accessibility
public/
  images/<section>/descriptive-name.jpg   photos, grouped by where they appear
  newsletters/varosha-newsletter-YYYY.pdf
  brand/logo.svg
styles/globals.css   colors, fonts and the few shared CSS rules (design tokens at the top)
mockup/         the approved HTML mock-up the site was built from (reference only)
```

## Common edits

- **Change the phone number, email or address:** `content/site.ts`
- **Update the scholarship deadline:** `content/scholarship.ts` → `deadline`
- **Add a newsletter:** drop the PDF in `public/newsletters/`, add a line to `content/newsletters.ts`
- **Add or edit a project:** `content/projects.ts` (put the photo in `public/images/projects/`)
- **Change a board member:** `content/people.ts`
- **Add a social account:** `content/site.ts` → `social` (X, YouTube, Instagram are `null` until then)
- **Change a color or font:** the `@theme` block at the top of `styles/globals.css`

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Deploy

```bash
vercel deploy --prod
```

Old Wix URLs (`/about-us`, `/services-2`, `/members`, ...) redirect to the new pages; see `next.config.ts`.

## Project notes

- `PROGRESS.md` — what is done and what is next
- `CONTEXT.md` — audit of the old site, design decisions, open questions
