# Varosha publishing setup

The existing `/admin` stays the editor. Sanity is storage behind it, not another
website the volunteers need to learn. Public fonts, CSS, layouts and content have
not been redesigned. No production deployment is authorized by this guide.

## Current status

Verified October 24, 2026: the server-only adapter, authenticated publishing and
conflict protection passed TypeScript, ESLint, the local production build and 16
simulated tests. A separate local production preview connected to the real
`varosha-test` dataset passed 15 browser checks and 7 checks after an actual server
restart, including real image/PDF uploads, public content, ordering, hidden state,
repeated saves, stale tabs and all eight mutation action types with missing/forged
sessions. All six test sections were restored to the original JSON and verified.
Uploaded test assets (existing public website material) are retained.

Sanity project `x93tpr9i` is configured locally. No production dataset writes,
commits, pushes or deployments occurred. A Vercel preview/runtime test and the
production release gates below remain before a public handoff.

## Account setup (do this one step at a time with Codex)

1. Sign in at https://www.sanity.io/manage. Use an account you control for now;
   transferring infrastructure to Varosha is a later, explicitly approved step.
2. Create a project named `Varosha`. Use the **Free** plan. New projects may show
   a Growth trial; this implementation needs none of its paid features.
3. Create **public** datasets named `varosha-test` and `production`. Free currently
   includes two public datasets. Private datasets are not a permanent Free feature.
4. Under project settings/API, add a server token that can read/write documents
   and upload assets. Choose the Editor API token role, which is available on all plans; this is
   separate from the paid Editor user role. Keep the token private.
5. Enter the project ID, test dataset name and token **in `.env.local` on your
   computer**, never in chat. Codex can open that file without displaying its
   contents. Also set a new admin password (at least 16 characters) and a separate
   random session secret (at least 32 characters). Do not reuse the old demo password.
6. Use `CONTENT_STORAGE=sanity` and `SANITY_DATASET=varosha-test` locally. All Sanity
   requests happen on the server; no browser CORS origin or Studio deployment is
   required. Never add a `NEXT_PUBLIC_` prefix to Sanity credentials.

Official references checked October 24, 2026:
- https://www.sanity.io/pricing
- https://www.sanity.io/docs/content-lake/http-auth
- https://www.sanity.io/docs/content-lake/datasets
- https://www.sanity.io/docs/http-reference/mutation
- https://www.sanity.io/docs/content-lake/assets

## How publishing works

Each section has a `varosha.<section>` document with JSON content. Until a section
is first published, its current `data/site-data.json` value is used, preserving all
existing content. An intentionally empty published list stays empty. No initial
seed/reset operation is needed. Network or malformed-content errors are reported,
rather than silently showing older seed content.

Public pages read Sanity's uncached API on each request. A publish waits until the
mutation is query-visible and invalidates Next's routes. Refreshing the public page
then fetches current content; no Git push, build, or browser subscription is involved.
React shares the read across components within a render, not across visitors.

A revision travels with every editing form, ordering/visibility list and delete
button. Sanity atomically rejects conflicting writes, including simultaneous first
publication. An old tab is rejected with instructions to copy edits and reload.
A successful save updates that form's revision so repeat saves work.

Only authenticated server actions publish/delete/upload. Sanity tokens are never
returned to clients. Production login fails closed with weak/missing credentials;
cookies are signed, HttpOnly, Secure in production, SameSite=Lax, and expire after
seven days. Changing either password or session secret invalidates old sessions.
Next's same-origin Server Action checks are retained.

## Test gate before production

Use **only `varosha-test`**, with a local server or separate preview deployment:

- Log out: protected pages redirect; forged and absent sessions cannot save/upload/delete.
- Log in; edit a real section. Click **Publish changes**, refresh public site.
- Publish twice from the same form to check revision updates.
- Open the same section in two tabs; publish in one, verify the old tab is rejected.
- Upload a JPG/PNG and PDF through `/admin`; verify the assets open and render.
- Hide an item and reorder a list; verify public filtering and ordering.
- Verify delete confirmation and a stale delete are handled safely.
- Stop the server, restart, and verify content, order and URLs remain published.
- Verify unchanged public pages at desktop/mobile widths against the baseline.
- Restore any temporary content in the test dataset; do not modify live content.

## Before an approved deployment

Read-only Vercel API inspection confirmed GitHub `prammey/varosha` is connected,
with production branch `main`. Historical contradictory notes are superseded. Do not push: a connected branch can deploy automatically.
Configure preview environment variables to use `varosha-test`; production variables
will eventually use `production`. Keep production content writes disabled until
explicit approval. Create/review a local diff, then ask Prameet before any push or
production deployment. After deploying, repeat the real tests on a protected
preview before approving the production configuration.

Set Vercel's Node.js runtime to a supported current LTS; the inspected project uses
24.x. Never copy `.env.local` into Git, patches, deployment notes or logs.

## Known limits and handoff items

- Each new upload is limited to **3 MiB**, with the action body limited to 4 MiB,
  below Vercel's 4.5 MB function limit. JPG/PNG/WebP/GIF and PDF signatures are
  checked. SVG uploads are rejected. Existing larger newsletter PDFs remain in
  `public/newsletters` and keep working. Several exceed 3 MiB, so future large PDFs
  require compression or a separately designed larger-upload workflow.
- JSON-based asset URLs do not provide Sanity reference tracking. Replaced,
  deleted, abandoned or failed-save assets remain stored. Do not automatically
  delete assets that another published record may use; a developer can audit them.
- Login attempts are limited per process (30 per 15 minutes), **not across all
  Vercel instances**. Configure and verify a suitable edge/firewall login rate
  limit before a public production handoff. No MFA or individual accounts yet.
- Public datasets and uploaded files are public, including hidden items. Hiding
  controls website visibility only. Do not store credentials, applications, donor
  details or other confidential data. Secrets belong only in server environment
  variables. Quotas are finite; check the account usage before organizational handoff.
- Safe reads retry brief outages; mutation/upload requests have a longer timeout
  and are never blindly retried. The admin route allows 60 seconds per request.
- Under the unchanged layout, past events need a photo to appear on the Events
  page. The successful event browser test included a photo.
- A publish timeout can occur after Sanity has committed. Reload to check before
  retrying; revision checks prevent blindly overwriting newer content.
- Stale scholarship wording, old fundraiser/newsletter and placeholder social
  links await confirmation from Varosha. No replacement dates were invented.
- Ownership, domain changes and production content need separate approval.

Limits reference: https://vercel.com/docs/functions/limitations
