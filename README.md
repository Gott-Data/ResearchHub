# Gott Data Research Hub

The public research hub of Gott Data, the research arm of Laxatunga ehf.

Editorial discipline lives in [`CLAUDE.md`](./CLAUDE.md). Read it before drafting any artifact.

## Stack

- Next.js 15 (App Router)
- MDX for long-form artifacts
- TypeScript (strict)
- Typography per `CLAUDE.md` §8 — Source Serif 4 (display + body), Inter (UI / metadata)

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other scripts:

```bash
npm run check       # publication checklist (CLAUDE.md §3, §10)
npm run typecheck   # tsc --noEmit
npm run build       # runs check, then next build
```

## Deploy to Vercel

The project deploys to Vercel with zero configuration.

1. **Import the repo** in the Vercel dashboard. Framework preset: *Next.js* (detected automatically).
2. **Build settings** (defaults are correct):
   - Install command: `npm install`
   - Build command: `npm run build` (runs the publication check first as `prebuild`, then `next build`)
   - Output directory: `.next`
3. **Environment variables**:

   | Name | Required | Notes |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | recommended | Canonical base URL used by metadata, sitemap, and the RSS feed. Defaults to `https://gottdata.com`. Set this to the actual deployment URL (e.g. `https://researchhub.vercel.app` for previews, the real domain on production). |

4. **Deploy.** A failing `npm run check` will fail the build, by design — see `CLAUDE.md` §10.

Vercel CLI alternative:

```bash
npx vercel        # preview
npx vercel --prod # production
```

## Publication check

```bash
npm run check
```

Scans every MDX artifact in `content/research/` for:

- Banned words from `CLAUDE.md` §3
- Exclamation marks and emojis
- The section headings required by the artifact's type (§6)
- Registration in `lib/artifacts.ts`

The check also runs automatically on `npm run build` (as `prebuild`), so a build cannot ship an artifact that fails the checklist. Templates in `content/templates/` are scaffolds and are skipped.

Shadow case studies are not MDX — their §6.7 structure is enforced by the TypeScript type in `lib/shadow-cases.ts` and the `clientApproved` gate on publication.

## Adding an artifact

1. Pick the template that matches the artifact type from `content/templates/`.
2. Copy it to `content/research/<slug>.mdx`.
3. Register it in `lib/artifacts.ts` (slug, type, title, summary, publishedAt, byline, lenses, content loader).
4. Write the prose. Follow the section comments and `CLAUDE.md` §6 for that type.
5. Run `npm run check`. Fix anything flagged.
6. Commit and open a PR. CI runs the check, typecheck, and build.

## Repository structure

```
app/                     Next.js App Router pages and route handlers
  about/                 Institutional page
  feed.xml/              RSS feed
  research/              /research index and /research/[slug] artifact route
  selected-work/         Shadow case study index and detail routes
  opengraph-image.tsx    Default site OG card
  sitemap.ts             Sitemap generator
  robots.ts              robots.txt
components/              React components (Article, ShadowCaseStudy, site chrome)
content/
  research/              Published artifact MDX
  templates/             One scaffold MDX per §6 artifact type
lib/                     Typed registries and site config
scripts/
  check-publication.mjs  Editorial checklist scanner
.github/workflows/       CI: publication check, typecheck, build
CLAUDE.md                Editorial constitution
```

## Notes

- The display serif and grotesque are placeholders aligned to `CLAUDE.md` §8. Swap to the Gott family fonts when those are licensed and ready. The OG image routes use the same fallback (Georgia / Inter) and will benefit from the same swap.
- Currently published: *The Four-Lens Framework* (`/research/four-lens-framework`). The Selected Work index is intentionally empty until cases are cleared.
