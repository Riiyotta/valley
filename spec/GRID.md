# Valley grid system

Source: https://www.joinvalley.co/ (Framer). Measured 2026-09-29 with headless Chromium using `getComputedStyle` and `getBoundingClientRect`. Viewports measured: 2200, 1920, 1440, 1366, 1280, 1200, 1199, 1100, 1024, 900, 810, 809, 768, 600, 480, 390 and 360. The clone at `http://localhost:5190` matches every value in this document at all of those widths (see "Verification" at the end).

All numbers are CSS px. "c" after a threshold (for example `<=760c`) means a **container query** evaluated against the component's own width. A bare threshold is a **viewport** media query.

---

## 1. Model in one paragraph

The page is a vertical stack of full-bleed sections with **no margins between them**. Each section paints its own background and sets its own side padding (the **gutter**). Inside the gutter, content is capped by a **1360px content max-width**, centered. This is the only site-wide content width: every wrapper reduces to it, as `max-width: 1360px`, or as `max-width: 1456px` plus 48px padding. Some sections sit inside a **1800px frame**, centered, so above 1800px their background stops and white body shows at the sides. The nav is capped at **1600px**. Framer switches layout variants at **1200** and **810** viewport widths. The code components switch at their own **container widths**, so their reflow points move with the gutter.

---

## 2. Breakpoints

### 2.1 Viewport (Framer variants)

| Name | Range | Framer gutter | Nav |
|---|---|---|---|
| Desktop | `>= 1200px` | 48 | 84px tall, inline links, `padding: 20px 48px` |
| Tablet | `810px to 1199.98px` | 28 | 68px tall, hamburger, `padding: 10px 20px` |
| Phone | `<= 809.98px` | 20 | 68px, hamburger, `padding: 10px 20px` |

Tailwind screens (in `tailwind.config.cjs`): `desktop` (min 1200), `tablet` (810 to 1199.98), `phone` (max 809.98), `below-desktop` (max 1199.98), `above-phone` (min 810). In section CSS, use `@media screen(tablet) { ... }`.

### 2.2 Viewport media queries inside code components

| Component | Queries | Used by |
|---|---|---|
| `.vgs` (steps, integrations, wall-of-love) | `max-width: 1100px`, `720px`, `400px` | steps walk, quotes, integration grid, wrap padding |
| `.vcc` (closing CTA) | `max-width: 900px`, `540px` | content padding, form fields |
| `.valley-customer-results` | `max-width: 700px` | minor type only |

### 2.3 Container queries (component root has `container-type: inline-size`)

The container width depends on the gutter, so each threshold maps to a viewport width. Formulas use `g` for the Framer gutter (48, 28 or 20). Where two viewport widths are given, the first is the tablet value and the second is the phone value.

| Root (section) | Container width | Thresholds | Fires at viewport |
|---|---|---|---|
| `.valley-hero-visual` (hero) | desktop `(min(vw-96,1360)-64)/2`; below desktop `min(vw-2g, 1100)` | `600c to 900c`, `<=400c` | 600c to 900c: vw 810 to 928 (tablet) and 640 to 809 (phone). `<=400c`: vw <= 440 |
| `.valley-hero-proof` (hero) | width of hero copy (desktop 640 at 1440; tablet 480; phone vw-40) | `<=380c` | vw <= 420 |
| `.valley-customer-results` (stories) | `min(vw-2g,1360) - 98` | `<=850c`, `<=600c` | 850c: vw <= 1004 (tablet), all phone widths. 600c: vw <= 738 |
| `.valley-endorsement` | full viewport | `<=900c`, `<=600c` | vw <= 900 / vw <= 600 (below 601 it is not pinned, height is content-driven) |
| `.vstack` (jobs) | `min(vw-2g, 1360)` | `<=1100c`, `<=760c` | 1100c: vw <= 1156. 760c: **vw 810 to 816 (tablet) and vw <= 800 (phone)**. See quirk 7.1 |
| `.valley-showcase` | `min(vw-2g, 1360)` | `<=1100c`, `<=1000c`, `<=900c` / `>=900.01c`, `<=600c` / `>=601c` | 1100c: vw <= 1156. 1000c: <= 1056. 900c: <= 956. 600c: <= 640 |
| `.valley-team-fit` | `min(vw-2g, 1360)` | `>=1280c`, `<=900c`, `<=620c` | 1280c: **vw >= 1376**. 900c: <= 956. 620c: <= 660 |
| `.valley-start-questions` (pricing) | `min(vw-2g, 1360)` | `<=850c`, `<=560c` | 850c: vw <= 906 (tablet), all phone widths. 560c: vw <= 600 |
| `.vf` (footer) | full viewport | `<=850c`, `<=560c` | vw <= 850 / vw <= 560 |

**Rule for new pages:** put `container-type: inline-size` on each component root and write the component's internal reflow as `@container` rules. Only the section shell (gutter and vertical padding) should use the 1200/810 viewport breakpoints.

---

## 3. Containers and gutters

### 3.1 Width caps (all centered with `margin-inline: auto`, or `align-items: center` on the Framer column)

| Cap | Applies to |
|---|---|
| **1800** | Section frames of jobs, showcase, pricing, and the "Who it fits" group (team-fit, wall-of-love, pricing). Above 1800 the side strips are body white `#fff`. |
| **1600** | Nav bar (`.nav-bar`, live "Nav Container"), desktop. |
| **1456** | `.vgs-wrap` (steps, integrations, wall-of-love) and `.vf-inner` (footer). Both have 48px side padding at desktop, so content is 1360. |
| **1360** | Main content width: hero row (desktop), logos title and container (desktop), stories container, `.vstack` (jobs), showcase root, team-fit root, pricing container, `.vstack-inner`, `.vcc-scene`. |
| **1100** | Hero row (tablet and phone), logos container (tablet and phone), endorsement `.ve-content`. |
| 890 | `.vgs-header` (vgs section headings). Its `p` is capped at 780. |
| 880 | Stories heading block. |
| 860 | Logos title (tablet and phone). |
| 800 / 650 / 480 | Hero copy: desktop max 800 (flex 1), tablet fixed 650, "Start" block 480 at tablet. |

Where caps engage inside the tested range: hero and logos hit 1100 only in the **1156 to 1199** band (at 1199 the content sits at x = 49.5, not 28). Everything else caps only above 1456 (1360 + 2x48).

### 3.2 Gutter (content left edge = right edge) per section

| Section | >= 1200 | 1100 to 1199 | 901 to 1099 | 810 to 900 | 721 to 809 | 601 to 720 | 541 to 600 | <= 540 |
|---|---|---|---|---|---|---|---|---|
| nav | 48 (bar capped at 1600) | 20, logo inset 16 (at x=36) | 20 / 36 | 20 / 36 | 20 / 36 | 20 / 36 | 20 / 36 | 20 / 36 |
| hero | 48 | 28 (content 49.5 at 1199 due to 1100 cap) | 28 | 28 | 20 | 20 | 20 | 20 |
| logos | 48 | 28 (1100 cap) | 28 | 28 | 20 | 20 | 20 | 20 |
| stories | 48 | 28 | 28 | 28 | 20 | 20 | 20 | 20 |
| endorsement (text) | (vw-1100)/2 | 49.5 at 1199 / 48 | 48 | 28 | 28 | 28 | 20 | 20 |
| steps, integrations, wall-of-love (`.vgs-wrap`) | 48 | 48 | 48 | 48 | 48 | 24 (at <= 720) | 24 | 24 |
| jobs (section) | 48 | 28 | 28 | 28 | 20 | 20 | 20 | 20 |
| showcase | 48 | 28 | 28 | 28 | 20 | 20 | 20 | 20 |
| team-fit (section) | 48 | 28 | 28 | 28 | 20 | 20 | 20 | 20 |
| pricing (section) | 48 | 28 | 28 | 28 | 20 | 20 | 20 | 20 |
| closing CTA (section padding) | 48 | 48 | 48 | 24 (<= 900) | 24 | 24 | 24 | 16 (<= 540) |
| footer (`.vf-inner`) | 48 | 48 | 48 | 48 above 850, 28 at <= 850 | 28 | 28 | 24 (<= 560) | 24 |

Important: **the vgs sections keep a 48px gutter down to 721px**, while Framer sections drop to 28 at tablet and 20 at phone. At 1024, for example, logos and stories start at x=28 but steps starts at x=48. That is correct: it is how the live site looks.

### 3.3 First content left edge per section (measured, identical on live and clone)

| Section | 1440 | 1280 | 1199 | 1024 | 900 | 810 | 809 | 768 | 600 | 390 |
|---|---|---|---|---|---|---|---|---|---|---|
| hero | 48 | 48 | 49.5 | 28 | 28 | 28 | 20 | 20 | 20 | 20 |
| logos (grid box) | 48 | 48 | 49.5 | 28 | 28 | 28 | 20 | 20 | 20 | 20 |
| stories | 48 | 48 | 28 | 28 | 28 | 28 | 20 | 20 | 20 | 20 |
| endorsement | 170 | 90 | 49.5 | 48 | 28 | 28 | 28 | 28 | 20 | 20 |
| steps | 48 | 48 | 48 | 48 | 48 | 48 | 48 | 48 | 24 | 24 |
| jobs (section) / vstack text | 48 / 96 | 48 / 96 | 28 / 76 | 28 / 68 | 28 / 68 | 28 / 48 | 20 / 60 | 20 / 40 | 20 / 40 | 20 / 40 |
| showcase | 48 | 48 | 28 | 28 | 28 | 28 | 20 | 20 | 20 | 20 |
| integrations | 48 | 48 | 48 | 48 | 48 | 48 | 48 | 48 | 24 | 24 |
| team-fit (panel text) | 113 | 105 | 85 | 85 | 65 | 65 | 57 | 57 | 45 | 45 |
| wall-of-love | 48 | 48 | 48 | 48 | 48 | 48 | 48 | 48 | 24 | 24 |
| pricing (card text) | 89 | 89 | 69 | 69 | 57 | 57 | 49 | 49 | 41 | 41 |
| closing CTA (text) | 97 | 97 | 97 | 97 | 57 | 57 | 57 | 57 | 57 | 39 |
| footer | 48 | 48 | 48 | 48 | 48 | 28 | 28 | 28 | 28 | 24 |

---

## 4. Vertical rhythm

Sections abut: there is no margin between them. Rhythm comes from each section's own top and bottom padding, listed below as top / bottom.

| Section | Desktop (>= 1200) | Tablet (810 to 1199) | Phone (<= 809) | Internal gap between stacked blocks |
|---|---|---|---|---|
| hero | 140 / 64 (clears the 84 nav) | 124 / 64 | 112 / 48 | row gap 64 (horizontal) / 40 / 36. Copy stack gap 17 / 24 / 24. Heading gap 18 (phone 20) |
| logos | 48 / 56 | 40 / 48 | 36 / 40 | title to logos 36 / 36 / 32. Container padding-top 0 / 40 / 44 |
| stories | 8 / 32 (all) | 8 / 32 | 8 / 32 | heading block top 48 from the section top |
| endorsement | pinned, 2610 tall (container >= 601) | 2610 | 2610 down to 601; <= 600 static about 400 to 470 | text starts 250 below the section top |
| steps, integrations, wall-of-love (`.vgs-wrap`) | 88 / 88 | 88 / 88 | 88 / 88 above 720; 64 / 64 at <= 720 | vgs header, then content |
| jobs | 24 / 32 | 24 / 32 | 24 / 32 | stage padding 48 (<=1100c: 36/40; <=760c: 48/20) |
| showcase | 48 / 96 | 48 / 64 | 48 / 64 | toolbar, intro (26/28 padding; <=600c 22/23), stage |
| team-fit | 32 / 32 | 24 / 24 | 24 / 24 | shell padding 60 64 64 (>=1280c), 52 56 56, 36 (<=900c), 30 24 24 (<=620c) |
| pricing | 64 / 64 | 56 / 56 | 56 / 56 | offer and FAQ cards, each padded 40 / 28 (<=850c) / 24 20 (<=560c) |
| closing CTA | 40 / 64 | 40 / 64 above 900; 32 / 48 at <= 900 | 32 / 48; 24 / 40 at <= 540 | content padding 88 48 30, 64 32 28 (<=900), 52 22 24 (<=540) |
| footer (`.vf-inner`) | 64 / 28 | 64 / 28 above 850; 48 / 24 at <= 850 | 48 / 24; 40 / 24 at <= 560 | top block padding-bottom 48, links padding 44 0, bottom padding-top 24 |

Measured section heights at 1440 (tablet and phone heights are in CLONE_SPEC section 3): nav 84 (fixed), hero 924, logos 658.4, stories 681.8, endorsement 2610, steps 2349.1, jobs 2846, showcase 1167.2, integrations 996.6, team-fit 696.9, wall-of-love 1434.6, pricing 1206.4, CTA 765.9, footer 596.5. The document is 16,933 tall.

---

## 5. Column systems per section

Format: `template | gap (row col) | padding`. Bands are listed from widest to narrowest. Track widths in brackets are measured at the width named.

### hero
- Row (`.hero-row`): flex row, copy `flex:1; max-width:800` plus visual `flex:1`, gap 64, `max-width:1360` [640 + 640 at 1440]. Tablet: flex column, gap 40, `max-width:1100`, copy fixed 650. Phone: column, gap 36, copy 100%.
- Proof story (`.vhp-story`): `56px minmax(0,1fr)`, gap 18, padding-top 24. At `<=380c`: `48px 1fr`, gap 14, padding-top 20.
- Visual tabs (`.vhv-tabs`): 5 equal flex tabs, gap 0 at all widths.

### logos
- Desktop: featured `repeat(4, 1fr)`, gap 24, padding 24 [306 x4 at 1440]. Grid `repeat(5, 1fr)`, gap 12 20, padding 20 [245 x5].
- Tablet: migrated block is a flex row of 3 groups. Each group is `repeat(2,1fr)`, gap 24 16, padding 44 16 28. Featured 4 columns. Grid `repeat(4,1fr)`, gap 12 20, padding 20 [250 x4 at 1199].
- Phone: the 3 groups stack. Each group is 2 columns, gap 24 20, padding 44 16 24. Featured `repeat(2,1fr)`, grid `repeat(2,1fr)`.

### stories (`.vcr-*`)
- Slide: `1fr 1.12fr`, gap 48, padding 4 0 24 [565 / 633 at 1440]. At `<=850c`: `1fr 1.1fr`, gap 32. At `<=600c`: `minmax(0,1fr)`, gap 26, padding 2 0 28.
- Support stats: `1fr 1fr`, gap 28 / 22 (<=850c) / 23 (<=600c).
- Controls: flex row, gap 40 / 22 (<=850c) / column gap 7 (<=600c).

### endorsement
- Single column `.ve-content` max 1100. The author row is flex with gap 15.

### steps (`.vgs` walkthrough)
- Walk: `160px 1fr`, gap 48 [160 / 1136 at 1440]. At vw <= 1100: `130px 1fr`, gap 28. At vw <= 720: block. The step nav becomes a 3-column flex row with gap 16.
- Step article: 2 columns about `0.85fr 1fr`, gap 36 [505 / 595 at 1440] at vw > 1100. At vw <= 1100 it is 1 column, gap 24, padding-bottom 100 (56 at <= 720).

### jobs (`.vstack`)
- Body: `minmax(0,1.65fr) minmax(0,1fr)`, gap 36 [755 / 457 at 1440]. `<=1100c`: gap 24. `<=760c`: `1fr`.
- Map (the 16 tiles in 4 groups): `repeat(4, minmax(0,1fr))`, gap 10 [181 x4 at 1440]. `<=760c`: `repeat(2,1fr)`, gap 24 16. Each group is a 1-column grid of tiles with gap 10.
- Bottom bar: flex row, gap 24. `<=760c`: column, gap 18.

### showcase (`.valley-showcase`)
- Toolbar: flex row, gap 24 / 16 (<=1100c) / 8 with wrap (<=900c).
- Intro: flex row with 2 items (h3 max 50%, p max 430), gap 40, padding 26 0 28. `<=600c`: block, padding 22 0 23.
- Stage padding: 26 (28 dashboard) / 18 (<=900c) / 12 (<=600c).

### integrations (`.vgs`)
- Main: `1fr 1fr` [671 x2 at 1440]. At vw <= 720: `1fr`.
- Tool rows: `repeat(3, minmax(0,1fr))`, gap 12. `.vgs-toolrow-two` uses `repeat(2,...)`.
- Tabs: flex row with 3 items, gap 24.

### team-fit (`.valley-team-fit`)
- Panel: `minmax(0,1.12fr) minmax(0,1fr)`, gap 56. `>=1280c`: `1.08fr 1fr`, gap 72 [593 / 549 at 1440]. `<=900c`: `1.08fr 1fr`, gap 32. `<=620c`: `1fr`, gap 28.
- Tabs: flex row, gap 0. `<=620c`: `repeat(3, minmax(0,1fr))`.

### wall-of-love (`.vgs`)
- Metrics: `repeat(3, minmax(0,1fr))`, gap 40 / 22 (vw <= 720) / 16 (vw <= 400).
- Quotes: `repeat(3, minmax(0,1fr))`, gap 16 [437 x3 at 1440]. At vw <= 1100: 2 columns. At vw <= 720: 1 column. This is a plain row-major grid, not masonry. Each figure has padding 28 and an internal gap of 32.

### pricing (`.valley-start-questions`)
- Offer: `1fr 1fr`, gap 48, padding 40 [607 x2 at 1440]. `<=850c`: gap 32, padding 28. `<=560c`: `1fr`, gap 28, padding 24 20.
- FAQ: `1fr 1.6fr`, gap 48, padding 40 [467 / 747]. `<=850c`: `0.85fr 1.5fr`, gap 32. `<=560c`: `1fr`, gap 28.

### closing CTA (`.vcc`)
- Scene max 1360. Content padding 88 48 30 / 64 32 28 (vw <= 900) / 52 22 24 (vw <= 540).
- Form fields: `minmax(0,1fr) auto`, gap 12 [468 / 200]. At vw <= 900: `1fr`. At vw <= 540: `1fr`, gap 18.
- Bottom row: flex row, gap 20. At vw <= 540: column, gap 6.

### footer (`.vf`)
- Top: `1.4fr 1fr`, gap 64 [747 / 533 at 1440]. `<=850c`: `1fr`, gap 28.
- Links: `1.4fr 1fr 1fr`, gap 48, padding 44 0 [514 / 367 / 367]. `<=850c`: `1.2fr 1fr 1fr`, gap 24. `<=560c`: `1fr 1fr`, gap 32.
- Bottom: flex wrap, gap 20. `<=560c`: gap 18 (wraps to 2 rows at 390).

---

## 6. Spacing scale in use

These counts are frequency-ranked from every flex and grid gap and padding on the live page, across all widths.

- **Core ladder (use these):** 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 88, 96.
- **Gutters:** 48 (desktop), 28 (tablet), 20 (phone); vgs 48 then 24; CTA and footer 24 or 16.
- **Section padding:** 8, 24, 32, 40, 48, 56, 64, 88, 96, 112, 124, 140.
- **Grid column gaps:** 10 (tile maps), 12 (fields, tool rows), 16 (quote cards), 20 (logo grid), 24, 28, 32, 36, 40, 48, 56, 64, 72.
- **Off-ladder values the originals use (keep them only when cloning existing parts):** 3, 5, 6, 7, 9, 14, 15, 17, 18, 22, 23, 26, 44, 52, 60, 100.

---

## 7. Quirks to reproduce, not "fix"

1. **Jobs at 801 to 816.** `.vstack` switches at 760c. At 810 to 816 the tablet gutter of 28 makes the container 754 to 760, so jobs is stacked and not pinned (section height 1803.5). At 801 to 809 the phone gutter of 20 makes it 761 to 769, so jobs has **4 columns and is pinned** (height 2846). The live site does this, and the clone matches it.
2. **Hero and logos between 1156 and 1199.** The tablet 1100 cap engages, so content starts at `(vw-1100)/2` instead of 28.
3. **Team-fit at 1376 and up** uses the large shell (60 64 64 padding, 72 gap). At 1366 it uses the medium one.
4. **vgs sections keep a 48 gutter down to 721.** They do not follow the 28/20 Framer gutters.
5. **Showcase dashboard.** The `vs-enter` entrance animation shifts inner content by a couple of px while it plays. That is animation, not layout.

---

## 8. Recipe for a new section or page

```css
/* Framer-style section shell */
.section      { padding: 64px 48px; background: theme('colors.surface.DEFAULT'); }
.section > .container { max-width: 1360px; margin-inline: auto; container-type: inline-size; }
@media screen(tablet) { .section { padding: 56px 28px; } }
@media screen(phone)  { .section { padding: 56px 20px; } }

/* Optional 1800 frame (jobs/showcase/pricing style) */
.section--framed { max-width: 1800px; margin-inline: auto; }

/* vgs-style section (48 gutter until 720) */
.vgs-like .wrap { max-width: 1456px; margin-inline: auto; padding: 88px 48px; }
@media (max-width: 720px) { .vgs-like .wrap { padding: 64px 24px; } }

/* Component columns respond to their own width */
.cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
@container (max-width: 1000px) { .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@container (max-width: 600px)  { .cards { grid-template-columns: 1fr; } }
```

Two-column splits in use, reusable as-is: `1fr 1fr`, `1fr 1.12fr` / `1.12fr 1fr`, `1.08fr 1fr`, `1.4fr 1fr`, `1fr 1.6fr`, `1.65fr 1fr`, `160px 1fr` (side nav), `56px 1fr` (avatar plus text).

---

## Verification

Scripts are in `/private/tmp/claude-504/-Users-riyaghosh-V3-Tennr/c3f21f93-8b9a-4fec-b10c-f31672134584/scratchpad/grid/`:
- `measure.cjs` measures, per section, the box, padding, content edges, headings and every flex or grid row.
- `keys.cjs` measures 60 named containers: template, gaps, padding, max-width and column/row counts.
- `diff.py` compares the two sites.

After the grid-audit fixes, the clone equals live on document height at all 17 widths, and on every section box, content edge, template, gap and column count, within 1.5px.
