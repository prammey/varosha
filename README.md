# Varosha — website

The website of **Varosha**, a registered 501(c)(3) nonprofit in Palatine, Illinois, that
funds skills training and interest-free micro-loans for women and young people in West
Bengal, India. Live at **https://varosha.vercel.app** (varosha.org to follow).

Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4. Every page is static.

## Admin panel

Board members can edit the site at **/admin** without touching code: projects, team members
(with photos and bios), newsletters, events, the scholarship deadline, and contact details.

**Demo / local mode (now).** Edits are saved to `data/site-data.json` and uploads to
`public/uploads/`. Both are committed, so `git push` publishes them.

1. Copy `.env.example` to `.env.local` and set `ADMIN_PASSWORD=` to a password of your choice.
2. `npm run dev`, then open http://localhost:3000/admin.
3. After editing, commit and push (`git add . && git commit -m "content" && git push`).

On varosha.vercel.app the panel is read-only until Supabase is connected, because Vercel's
servers cannot write files.

**Supabase mode (later).** Run `supabase/schema.sql` in the Supabase SQL editor, invite board
members as users in the Supabase dashboard, then add `SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` and to the
Vercel project's environment variables. The panel switches over on its own; use "Load starting
content" on the admin home page once to copy the existing content in.

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
data/site-data.json   the live editable content (projects, team, newsletters, events,
                scholarship deadline, contact details). The admin panel writes here.
lib/
  data/         the storage layer: types, local file store, Supabase store, public getters
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
npm run build
```

## Deploy

The GitHub repo is connected to Vercel. Every push to `main` builds and goes live at
varosha.vercel.app within about a minute; there is no separate deploy step.

```bash
git add .
git commit -m "what you changed"
git push
```

To deploy from the terminal without pushing (rarely needed): `vercel deploy --prod`.

Old Wix URLs (`/about-us`, `/services-2`, `/members`, ...) redirect to the new pages; see `next.config.ts`.

## Project notes

- `PROGRESS.md` — what is done and what is next
- `CONTEXT.md` — audit of the old site, design decisions, open questions
