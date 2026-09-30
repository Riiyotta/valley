# Changelog

## 1.1.0 — Independent recheck pass (2026-09-30)

A fresh recheck of the whole repo (BUILD-GUIDE.md section 4) against the
current source. What held up: all 530 sitemap routes map to exactly one
template; the validator rejects a swapped template, a removed required node
and an injected foreign node; every required field in the example is present
and all 30 text fields are within budget; pinned endpoint URLs match `src/`;
no source file changed since the build. What didn't:

- **The pinned asset-policy re-check was documented but never ran.** The
  schema and the registry both said `verify_all.py` re-checks each pinned
  role's policy against the registry. It didn't: setting `customer-logo` to
  `may-generate-new` in the registry passed silently. The asset-role check
  also ran one way only, despite its docstring saying "and vice versa".
  `check_asset_role_parity` now checks parity both ways, fails if any pinned
  role allows `may-generate-new` in the registry or in any section contract,
  and fails if the pinned list disagrees with the schema's `assetRef`
  conditional. Proven in scratch copies: registry `customer-logo` weakened,
  registry `brand-animation` weakened, a section use weakened, an orphan
  registry role, and schema pinned-list drift each fail; the real repo passes.
- **Rive animations were recorded as no motion.** `automation.feature-cards`
  and `automation.step-rows` had `motion.pattern: "none"` and empty
  `assetRoles`, but they render Valley's own Rive animations (four looping
  feature illustrations, and a flow diagram that plays once at 50%
  visibility). New motion pattern `rive-state-machine` and new asset role
  `brand-animation` (`must-reuse-exact`, pinned), wired through the schema,
  registry, both section contracts, responsive canvas sizes and two new
  adversarial cases. Evidence: `spec/pages/ASSETS_GAPFILL.md:38-55`,
  `Features.jsx:11-18`, `Steps.jsx:11-53`.
- **Version and framework drift.** `repositoryVersion` stayed at 1.0.0 after
  the 1.0.1 fix; README and manifest omitted `@rive-app/webgl2` 2.27.5, which
  `package.json` now depends on. `repositoryVersion` and `pageSpecVersion` are
  now 1.1.0 (the schema's enums widened); the example and synthesized controls
  declare 1.1.0.

Counts unchanged except asset roles (9 -> 10). `verify_all.py`: 10 checks.
Adversarial suite: 54. Citations: 363/363 resolve.

## 1.0.1 — /linkedin-automation spec gap closed (2026-09-30)

The 1.0.0 build read `spec/pages/landing.md` only up to about line 528 of 732,
so `landing-automation` was marked as not fully verified. The rest of the file
(section 6 detail, section 7 motion, section 11 heights, section 12 notes) has
now been read and checked against the source:

- `templates/templates.json` `landing-automation`: node order confirmed against
  section 6 and the section 11 height maps. Citation now covers
  `landing.md:495-542`, `:695-718` and `:720-732`; the "truncated read" note is gone.
- `automation.quote-reveal`: records the measured word-by-word rule from
  `QuoteReveal.jsx:11-17`. The per-letter formula in spec M6 (`landing.md:553`)
  drifted against live and is marked as superseded.
- `automation.product-tabs`: pattern corrected from `tab-switch-fade` to
  `appear-on-scroll`. Tab switching is instant, and only the heading block appears
  on scroll. New structured `responsive` field: below 1200px the tab bar is
  removed and the stage is 301px (`tabs.css:166-185`).
- `hero.automation`: adds the h1 word blur-in (`hero.css:274-283`,
  `Hero.jsx:30-31`).
- `hero.landing-template`: records the proof ticker's measured 9.0s cycle
  (`ProofTicker.jsx:10-22`), superseding spec M2's ~2.03s estimate (`landing.md:549`).

Counts are unchanged. Citations: 354/354 resolve (up from 345).

## 1.0.0 — Initial build (2026-09-30)

Built from scratch against the Valley clone project (React 18.3.1 + Vite
5.4.10 + Tailwind 3.4.14 + react-router-dom 6.30.6), per
`DESIGN-REPO-BUILD-GUIDE.md` and `DESIGN-REPO-MASTER-GUIDE.md`.

### Real counts at ship time (recomputed, not hand-carried)

- 18 token files across `00-foundation`, `10-semantic`, `20-component`,
  `30-layout`, `themes`, `llm`
- 10 primitives
- 10 components
- 62 sections
- 16 templates
- 530 real routes mapped (math shown in README.md, independently recomputed
  and verified against `src/App.jsx`'s real route table, `posts.json`
  `count: 492`, and `cases.json` `count: 21`)

### What was built

- Full token stack (color, typography, radius, spacing, breakpoint,
  elevation, motion, icon-size at foundation; semantic color/typography;
  component-scoped button/card tokens; one real theme, `light`; the `llm/`
  curated catalog/policy/allowlist/asset-role-registry layer).
- 10 primitives (button, link, badge, avatar, icon, input, select, logo-mark,
  tab, divider).
- 10 components (card-base, stat-block, quote-block, nav-bar, footer-chrome,
  tab-group, logo-grid, faq-item, rich-text-block, pinned-scroll-stage).
- 62 section contracts, one per distinct real section type observed across
  every page spec — homepage sections (hero.marketing, logos.wall,
  stories.rotating, endorsement.pinned, steps.walkthrough, jobs.stack,
  showcase.product, integrations.tools, team-fit.panel, wall-of-love.grid,
  pricing.plans-faq, closing-cta.form) plus every interior-page and
  landing-page-specific section (about, product, pricing, compare,
  playbooks, blog, casestudies, legal, and all 4 landing-page real shapes:
  SEO template, agency, tryvalley, linkedin-automation).
- 16 templates in `templates/templates.json`, each with a structured node
  list (`{section, required, repeatable}` objects, never bare strings),
  mapping all 530 real routes 1:1 with no gaps and no double-assignment.
- `compatibility/graph.json` with 11 rhythm rules, each severity-tagged,
  including named exceptions for hero-less templates and the two
  compliance-critical pinned-value rules.
- `schema/pagespec.schema.json` (Draft-07): closed template/section/motion
  enums, `additionalProperties: false` throughout, a real `oneOf`-of-
  independent-schemas pattern for the FAQ variant polymorphism (flat-panel
  vs. accordion), `node.required` includes `"motion"`, and a defense-in-depth
  `const` pin on `closing-cta.form.ctaHref` duplicating the semantic
  validator's own pinned-value check.
- `schema/example.pagespec.json`: one complete, real-copy-grounded
  `template.home` instance, validates with zero schema errors and zero
  semantic errors.
- `schema/semantic_validate.py`: cross-references every PageSpec's declared
  `template` against that template's REAL node list in `templates.json` (not
  `nodes[]` in isolation — the single most repeated bug class per
  MASTER-GUIDE.md 3.3), enforces route restrictions, compatibility-graph
  rhythm rules by severity, per-instance `maxWords` (read live from each
  section's own contract file, not hardcoded), and a dedicated pinned-value
  check for every `const`-bearing content field.
- `schema/tests/adversarial_test.py`: 52 checks — every real template gets
  an auto-synthesized minimal control instance (MASTER-GUIDE.md 3.22
  technique: iterates `templates.json` directly, so a new template is
  auto-covered with zero new control code), plus 17 hand-written adversarial
  mutations across schema-layer, structural, and pinned-value categories,
  including the specific MASTER-GUIDE.md 3.23 pattern (mutate a
  compliance-critical field to a different-but-still-plausible value, not an
  invalid one, and prove the DEDICATED pinned-value check — not just generic
  type/enum validation — is what catches it).
- `extraction/measured-values.json`: citation ledger with the real 530-route
  math, the 3 documented content-policy facts, the 2 real third-party
  endpoints (18 files, 25 occurrences), and every structurally-unusual quirk
  found during the build.
- `extraction/verify_all.py`: 9 checks — schema validation, semantic
  validation, allowlist parity, citation-range validity (345/345 real
  citations resolved and in-range against the sibling source tree; degrades
  to warnings when that tree is absent), manifest counts-recompute, asset-role
  registry parity, no-absolute-paths, manifest entryPoints self-containment,
  and allowlist-version parity.

### Drift-proofing proven, not just asserted

All three required drift-proof checks in `extraction/verify_all.py` were
proven to catch injected bugs, via a scratch copy of the whole repo:

- **Allowlist parity**: injected a phantom `sections` entry
  (`phantom.nonexistent-section`) → caught, `FAIL: allowlist parity
  (sections): phantom entries with no matching file: ['phantom.nonexistent-section']`.
- **Citation-range validity**: injected an out-of-range citation
  (`tailwind.config.cjs:99999`) → caught, `FAIL: citation out of range:
  'tailwind.config.cjs:99999' ... cites lines up to 99999 but
  tailwind.config.cjs only has 187 lines`.
- **Manifest counts-recompute**: injected a wrong `counts.templates` value
  (999) → caught, `FAIL: manifest counts drift: counts.templates claims 999
  but real count on disk is 16`.

The real, unmodified repo was re-verified clean immediately after each
injection test (9 passed, 0 warnings, 0 failed).

### Verification run (real output, this build session)

```
$ python3 extraction/verify_all.py --source-root <sibling-source-project>
=== 1. Schema validation ===
PASS: schema/example.pagespec.json validates against schema/pagespec.schema.json with zero errors
=== 2. Semantic validation ===
PASS: schema/example.pagespec.json passes semantic_validate.py (0 warnings)
=== 3. Allowlist parity (drift-proofed) ===
PASS: tokens/llm/component-allowlist.json has 1:1 parity with real primitives/, components/, sections/ files
=== 4. Citation-range validity (drift-proofed, degrades gracefully) ===
PASS: citation-range-validity: 345/345 citations resolved against real sibling files, 0 out of range
=== 5. Manifest counts-recompute (drift-proofed) ===
PASS: registry.manifest.json counts block matches real files on disk exactly: {'tokenFiles': 18, 'primitives': 10, 'components': 10, 'sections': 62, 'templates': 16, 'routes': 530}
=== 6. Asset-role registry parity ===
PASS: every assetRole referenced across sections/*.json (9 distinct roles) is documented in tokens/llm/asset-role-registry.json
=== 7. No absolute local machine paths ===
PASS: no absolute local machine paths found anywhere in the design-repo
=== 8. Manifest entryPoints self-containment ===
PASS: registry.manifest.json's 22 entryPoints all point inside design-repo/ (no '../' or absolute paths)
=== 9. Allowlist version parity ===
PASS: registry.manifest.json's allowlistVersion matches component-allowlist.json's own version ('1.0.0')

9 passed, 0 warnings, 0 failed
```

```
$ python3 schema/tests/adversarial_test.py
... (52 checks)
52 passed, 0 failed
```

### Self-containment

Verified by copying the whole `design-repo/` folder to an isolated temp
directory with zero sibling folders present and re-running both scripts
there — 9/9 and 52/52 pass identically, with the citation-range check
correctly degrading to a WARNING (not a failure) since no sibling source
tree exists in that isolated copy.
