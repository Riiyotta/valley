# Valley Design Repo

An AI-ready, machine-validated PageSpec system for **Valley** (joinvalley.co),
extracted from a pixel-audited React 18.3.1 + Vite 5.4.10 + Tailwind 3.4.14 +
react-router-dom 6.30.6 (+ @rive-app/webgl2 2.27.5 for the
/linkedin-automation animations) clone of the real, live company Valley
(source project, sibling to this folder during the build — not part of this
package; see "Self-containment" below).

**Valley is a real, live company.** This is not a fictional example brand.
Case studies, customer logos, and third-party form endpoints reference real
companies, real named people, and real live URLs. See "Compliance" below
before generating anything from this repo.

## What's here (real counts, recomputed from disk)

| Category | Count |
|---|---|
| Token files (00-foundation + 10-semantic + 20-component + 30-layout + themes + llm) | 18 |
| Primitives | 10 |
| Components | 10 |
| Sections | 62 |
| Templates (distinct page shapes) | 16 |
| Real routes mapped | 530 |

These counts are enforced, not hand-maintained: `extraction/verify_all.py`
recomputes every one of them from the actual files on disk and fails the run
if `registry.manifest.json`'s `counts` block drifts from reality.

### Route-count math (16 template shapes covering 530 real routes)

```
6 main pages (home, pricing, product, about, compare, playbooks)
+ 3 landing-template routes            (1 shape: template.landing-seo-template)
+ 3 other unique landing pages         (3 shapes: agency, tryvalley, automation)
+ 1 blog-index route
+ 1 blog-archive route
+ 492 blog-post routes                 (1 shape: template.blog-post)
+ 1 casestudies-index route
+ 21 casestudy routes                  (1 shape: template.casestudy)
+ 2 legal routes                       (1 shape: template.legal)
= 6 + 3 + 3 + 1 + 1 + 492 + 1 + 21 + 2 = 530 routes -> 16 template shapes
```

Verified against `src/App.jsx`'s real route table, `spec/pages/blog/posts.json`
(`count: 492`) and `spec/pages/casestudies/cases.json` (`count: 21`).

## Folder structure

```
design-repo/
  README.md, CHANGELOG.md, registry.manifest.json
  tokens/{00-foundation,10-semantic,20-component,30-layout,themes,llm}/
  primitives/       10 atomic building blocks
  components/       10 composed, still content-agnostic pieces
  sections/         62 section contracts (one per distinct real section TYPE)
  templates/templates.json   16 template shapes, each an explicit node list
  compatibility/graph.json   rhythm/adjacency rules, severity-tagged
  schema/{pagespec.schema.json, example.pagespec.json, semantic_validate.py, tests/adversarial_test.py}
  extraction/{measured-values.json, verify_all.py}
```

## Methodology

Built per this workspace's `DESIGN-REPO-BUILD-GUIDE.md`: tokens → primitives
→ components → sections → templates → compatibility graph → schema → example
instance → semantic validator → adversarial tests → manifest/allowlist/docs.

Every token, section, and template decision cites real evidence — a real file
path and line range in the source project, or a real spec-document section —
recorded in `extraction/measured-values.json`. Nothing was invented.

## Content policy: what's measured-real vs. generated-placeholder

Most content in this repo (headings, nav copy, CTAs, short marketing copy,
metadata like blog post title/date/author/category/excerpt) is **measured-real**,
cited directly from the source project.

**Three content areas are deliberately generated placeholder, not scraped
real content** — this is a documented, in-code decision from the original
build, not an oversight:

1. **Blog post bodies** (492 posts) and **case study bodies** (21 cases) —
   `src/components/longform/placeholderArticle.js`. Every post/case renders
   generic outbound-sales filler text, deterministic per-slug (so pages
   differ from each other but never change between loads), inside the
   faithful real template structure.
2. **Legal page bodies** (`/terms-of-service`, `/privacy-policy`) —
   `src/components/legal/legalPlaceholder.js`. Neutral lorem-style text
   following the real structural counts (paragraph count, bold-lead-in count,
   external-link count) but never Valley's real legal text.

See `sections/content.article-body.json`, `sections/content.legal-prose.json`,
and `sections/casestudy.result-stats.json` for the exact per-field
distinction, and `extraction/measured-values.json`'s `placeholderBodyContent`
key fact.

## Compliance: real company, real endpoints

- **Real logos/photos.** Every `assetRole` touching a customer logo,
  competitor logo, customer photo, employee photo, or blog author photo
  carries explicit AI-generation guidance in
  `tokens/llm/asset-role-registry.json` forbidding fabrication of a real
  person's likeness or alteration of a real company's trademark. Five roles
  (`customer-logo`, `competitor-logo`, `customer-photo`, `employee-photo`,
  `author-photo`) are structurally pinned away from `may-generate-new` at
  both the JSON Schema layer (`schema/pagespec.schema.json`) and the semantic
  validator layer (`schema/semantic_validate.py`).
- **Real third-party endpoints.** The Surface booking form
  (`https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b`), the beta
  signup URL (`https://beta.joinvalley.co/signup`), and the HubSpot booking
  embed (`https://meetings.hubspot.com/zayd-from-valley/tryvalley`) are real,
  live endpoints referenced in 18 real source files. Every content field
  carrying one of these values is PINNED via JSON Schema `const` — not just
  validated as one of a closed enum — per `compatibility/graph.json`'s
  `PINNED_LIVE_ENDPOINT_VALUES` rule. A dedicated adversarial test in
  `schema/tests/adversarial_test.py` proves a mutation to a
  different-but-plausible URL is rejected.

**Do not publish this design-repo publicly.** See
`registry.manifest.json`'s `realCompanyComplianceFlag`.

## Structurally unusual things (documented, not silently normalized)

- `/blog/archive` is a bare top-level route rendered **outside** the shared
  nav/footer `<Layout>` — `src/App.jsx:29`. `template.blog-archive` has no
  chrome nodes at all.
- `/blog_featured/*` is a deliberate dead-route redirect shim (`Navigate` to
  `/blog`), reproducing a real 308 the live site performs. It is **not** a
  missing template.
- The jobs section (`.vstack`) has a real pinning quirk at viewport
  801–816px, documented in `sections/jobs.stack.json` and
  `tokens/00-foundation/breakpoint.json`.
- The `/linkedin-outreach-for-agencies` path cards collapse to 56px tall and
  clip content on phone — a real quirk of the original, reproduced
  deliberately (`sections/agency.paths.json`).
- The `/linkedin-automation` case-study bento cards use `href="./"` verbatim
  (linking to the home page) — a real quirk, not a broken link to silently
  fix (`sections/automation.case-bento.json`).

## Verification

Run all checks from this folder:

```bash
pip3 install jsonschema   # if not already installed
python3 schema/tests/adversarial_test.py
python3 extraction/verify_all.py --source-root /path/to/sibling/source/project
```

`--source-root` is optional; omit it (or point it at a nonexistent path) to
exercise the graceful-degradation path for the citation-range check, which
then WARNS instead of FAILING (this design-repo has zero runtime dependency
on that sibling tree).

See `CHANGELOG.md` for the full verification transcript from the build
session that produced this repo.
