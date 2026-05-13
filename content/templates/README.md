# Artifact templates

One template per artifact type from `CLAUDE.md` §6. These are scaffolds, not publishable artifacts.

## Workflow

1. Pick the template that matches the artifact type.
2. Copy it to `app/research/<slug>/page.mdx`.
3. Register the artifact in `lib/artifacts.ts` (slug, type, title, summary, publishedAt, byline, lenses).
4. Fill in the prose. The template comments mark what each section must contain.
5. Run the publication checklist (`CLAUDE.md` §10) before merge.

## Templates

| Type | File | Target length | Reference |
| --- | --- | --- | --- |
| Flagship research | `flagship.mdx` | 4,000–7,000 words | §6.1 |
| Whitepaper | `whitepaper.mdx` | 2,500–5,000 words | §6.2 |
| Brief | `brief.mdx` | 800–1,500 words | §6.3 |
| Methodology | `methodology.mdx` | 1,200–3,000 words | §6.4 |
| Framework | `framework.mdx` | 600–1,500 words | §6.5 |
| Essay / Field note | `essay.mdx` | 800–2,000 words | §6.6 |
| Shadow case study | `shadow-case-study.mdx` | 300–600 words | §6.7 |

Title conventions for each type are in `CLAUDE.md` §7. Do not deviate.
