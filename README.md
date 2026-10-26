# Varosha — website

The website of **Varosha**, a registered 501(c)(3) nonprofit in Palatine, Illinois, that
funds skills training and interest-free micro-loans for women and young people in West
Bengal, India. Live at **https://varosha.vercel.app** (varosha.org to follow).

Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4. Public pages read published content on each request.

## Admin panel

Board members can edit the site at **/admin** without touching code: projects, team members
(with photos and bios), newsletters, events, the scholarship deadline, and contact details.

**Publishing update (October 24, 2026).** The existing panel now supports Sanity
persistent storage. Real test-dataset publishing, image/PDF uploads, authorization
and persistence after server restart have passed locally. See `SANITY_SETUP.md` for setup and the test/deployment gates.
Choose `CONTENT_STORAGE=sanity`, configure server-only credentials, then click
**Publish changes** in `/admin`. Visitors see published content when they refresh.
Volunteers do not need Git, a terminal, deployments, or the Sanity dashboard.

Local mode reads/writes `data/site-data.json` for development. Production local
mode is read-only. The old Supabase adapter remains as historical source but is
not selected; Supabase environment variables do not select storage or login.

## Where things live

```
app/
  (site)/       one folder per public page (about, projects, scholarship, team, support,
                events, newsletters, contact, terms, privacy, accessibility)
  admin/        the admin panel: login, dashboard, one folder per section, actions.ts
  layout.tsx    fonts; (site)/layout.tsx adds the header, footer and social rail
components/
  layout/       Header (nav + dropdown + Donate block), Footer, SocialRail, Logo, nav.ts
  sections/     the big blocks that make up pages (Hero, HowItWorks, ProjectGrid, ...)
  ui/           small reusable pieces (Button, Container, PageHeader, StatsBar, ...)
  admin/        building blocks of the admin panel (forms, fields, list rows)
data/site-data.json   starting editable content (projects, team, newsletters, events,
                scholarship deadline, contact details). Starting content; local development writes here.
lib/
  data/         the storage layer: types, local/Sanity storage, revisions, validation, public getters
  admin/        sign-in and sessions
content/        copy that is NOT editable in the panel, plus the original seed data
  site.ts       name, tagline, founding year, home-page stats and "How it works"
  about.ts      Our Story copy and the home-page quote
  legal.ts      Terms, Privacy, Accessibility
  projects.ts, people.ts, events.ts, newsletters.ts, scholarship.ts   starting data only
public/
  images/<section>/descriptive-name.jpg   photos, grouped by where they appear
  newsletters/varosha-newsletter-YYYY.pdf
  brand/logo.svg
styles/globals.css   colors, fonts and the few shared CSS rules (design tokens at the top)
```

## Common edits

- **Projects, team, newsletters, events, scholarship deadline, contact details:** the admin panel at /admin
  (or edit `data/site-data.json` by hand)
- **Home-page copy, Our Story, legal pages:** `content/about.ts`, `content/site.ts`, `content/legal.ts`
- **Change a color or font:** the `@theme` block at the top of `styles/globals.css`

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm test           # simulated publishing/authentication tests
npm run build
```

## Deploy

The project is linked to Vercel, and GitHub records past deployments by Vercel's
bot. Verify the current Git linkage/production branch before pushing: a push may
deploy. **Do not push or deploy without Prameet's approval.** Content publishing
through Sanity requires no deployment. See `SANITY_SETUP.md` before release.

Old Wix URLs (`/about-us`, `/services-2`, `/members`, ...) redirect to the new pages; see `next.config.ts`.

## Project notes

- `PROGRESS.md` — what is done and what is next
- `CONTEXT.md` — audit of the old site, design decisions, open questions
