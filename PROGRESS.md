# Release preparation — October 25, 2026

Prameet has authorized deploying the Sanity work and latest visual changes,
excluding the local font picker. The shared display font remains Fraunces;
both hero versions share the highlight animation and 10px photo shift. The main
heading is smaller and the alternate introduction larger. The local font picker,
its font assets and extra experimental routes are excluded from the release.

The correct address is https://varosha.vercel.app (without www).
A build issue swallowing Next.js dynamic-rendering signals was fixed and covered
by a regression test. Production build, lint, 17 simulated tests, and desktop/mobile
release checks pass. Vercel CLI sign-in/environment configuration remain pending;
this note does not claim the new release has deployed.

# Publishing update — October 24, 2026

- Current priority: reliable publication through existing `/admin`, using Sanity.
- Public appearance and original content/assets are preserved.
- Implementation: server-only Sanity adapter, per-form/list/delete revision checks,
  authenticated actions, production credential checks, safe uploads, dynamic reads.
- Verified: 16 simulated tests, TypeScript, ESLint and production build passed.
- Real Sanity: 15 browser checks and 7 restart checks passed against varosha-test.
  All six test sections were restored and verified; uploaded test assets retained.
- No production content writes, commits, pushes or deployments occurred.
- Read-only metadata inspection: Vercel project is accessible; GitHub has production
  deployments by vercel[bot]. Check live project linkage before any push.
- Sanity account/project/test dataset and local credentials are configured.
- Vercel API confirmed GitHub prammey/varosha, production branch main.
- Next: review a separate Vercel preview, production login protection, release
  configuration and Varosha ownership/content. Ask before production changes.
- Older entries below describe the September state and are historical.

# Progress

## Done
- [x] 2026-09-25 — Crawled every page of varosha.org (11 pages incl. hidden `/projects-8` Events page)
- [x] 2026-09-25 — Inventoried all text, 27 images, 9 newsletter PDFs, external links, fonts, and theme colors → `CONTEXT.md`
- [x] 2026-09-25 — Created README / PROGRESS / CONTEXT tracking files
- [x] 2026-09-25 — Drafted aesthetic options + color palette recommendation (sent to Prameet)

- [x] 2026-09-25 — Built complete v1 mock-up (`mockup/varosha-mockup.html` + 22 photos in `mockup/img/`), published privately at https://claude.ai/artifact/5NFRxTi8UAysYMNvMtWggW

- [x] 2026-09-25 — Admin panel built (/admin): projects, team (bios + photos), newsletters, events, scholarship, site details. Local-file storage now, Supabase store + schema ready to connect. Tested end to end with a scripted browser session.

## In progress
- [x] 2026-09-25 — v1 reviewed by Prameet; v2 built to the feedback (maroon/gold/plum palette, Fraunces, animations, social rail, dark Projects/Scholarship, business-card Contact)
- [x] 2026-09-25 — v2 reviewed ("super impressed"); v3 applied: straddling stats bar, dark How-it-works, teal projects band, modal redesign, About dropdown (Our Story / Our Team / Newsletters), Support tab removed (Donate → support page), new Newsletters page
- [x] 2026-09-25 — v3 approved by Prameet (two small fixes: dropdown stuck open, support-page overlap)
- [x] 2026-09-25 — Built the real site: Next.js 16 + TypeScript + Tailwind 4, typed content layer, 12 pages, redirects, sitemap; lint/types/build clean; phone-width verified
- [x] 2026-09-25 — Deployed to https://varosha.vercel.app (Vercel project "varosha", CLI deploy from Prameet's account)
- [x] 2026-09-25 — Palette decided: Option A "Lamplight" (copper/paper/night)

## Next
- [ ] Prameet demos the admin panel locally (set ADMIN_PASSWORD in .env.local, npm run dev, /admin)
- [ ] Connect Supabase when the other person is available (schema in supabase/schema.sql)
- [ ] Real URLs for X / YouTube / Instagram (or drop those icons) → `content/site.ts`
- [ ] Board to review the three legal pages (marked "Draft for board review")
- [ ] Update scholarship deadline when the next cycle opens → `content/scholarship.ts`
- [ ] Higher-resolution originals of photos, if they exist (Wix served ~1200px)
- [ ] Connect the GitHub repo to Vercel for automatic deploys (optional)
- [ ] Point varosha.org DNS at Vercel when ready; old Wix URLs already redirect
- [ ] Lighthouse / accessibility pass on the live site

- [x] 2026-09-25 — Chrome extension connected; screenshotted rendered layout of all main pages, found the diya logo (notes in `CONTEXT.md` §3)

## Blocked / waiting on
- Nothing blocked. Waiting on Prameet's aesthetic + palette choice.
