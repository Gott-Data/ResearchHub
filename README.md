# Gott Data Research Hub

The public research hub of Gott Data, the research arm of Laxatunga ehf.

Editorial discipline lives in [`CLAUDE.md`](./CLAUDE.md). Read it before drafting any artifact.

## Stack

- Next.js 15 (App Router)
- MDX for long-form artifacts
- TypeScript
- Typography per `CLAUDE.md` §8 — Source Serif 4 (display + body), Inter (UI / metadata)

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Publication check

```bash
npm run check
```

Scans every routed MDX artifact in `app/research/` for:

- Banned words from `CLAUDE.md` §3
- Exclamation marks and emojis
- The section headings required by the artifact's type (§6)
- Registration in `lib/artifacts.ts`

The check also runs automatically on `npm run build` (as `prebuild`), so a build cannot ship an artifact that fails the checklist. Templates in `content/templates/` are scaffolds and are skipped.

Shadow case studies are not MDX — their §6.7 structure is enforced by the TypeScript type in `lib/shadow-cases.ts` and by the `clientApproved` gate on publication.

## Notes

- The display serif and grotesque are placeholders aligned to the brief in `CLAUDE.md` §8. Swap to the Gott family fonts when those are licensed and ready.
- This scaffold deliberately ships no artifact templates yet. Artifact types are defined in `CLAUDE.md` §6 and will be added under `app/` as MDX routes when the editorial pipeline is ready.
