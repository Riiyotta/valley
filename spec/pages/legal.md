Source: https://www.joinvalley.co/terms-of-service

# Legal template (`/terms-of-service`, `/privacy-policy`)

Also measured: https://www.joinvalley.co/privacy-policy. Measured 2026-09-29 at 1440, 1280, 768 and 390 (Playwright, cookie banner hidden).

**Content rule.** The legal text is not recorded. Dumps redact every body string and the screenshots blur the body. Build renders placeholder paragraphs.

Raw material in `spec/pages/legal/`:
- `terms/` and `privacy/`, each with `dumps/dump_{w}.txt`, `page_info.json` and `screens/full_*.jpg`
- `components.css`: Terms plus the extra Privacy rules
- `custom-styles.css`: empty apart from a header
- `rich/rich_legal_{terms,privacy}.json`, `rich/roles_by_width.txt`

## 1. Section order and reuse

| # | Section | 1440 y / h (Terms) | Privacy | 768 (T / P) | 390 (T / P) | Reuse |
|---|---|---|---|---|---|---|
| 0 | nav | 0 / 84 | same | 68 | 68 | **Homepage nav** |
| 1 | Legal column (unnamed div) | 0 / 9453 | 0 / 11250 | 7979 / 9626 | 13701 / 17622 | New (`LegalPage`) |
| 2 | Empty 1440x84 div at y=464 | — | — | — | — | Invisible artifact (no children, no paint). Ignore |
| 3 | footer | 9453 / 597 | 11250 / 597 | 643 | 815 | **Homepage footer** |

Page heights:
- Terms: 10050 / 10050 / 8622 / 14516
- Privacy: 11847 / 11847 / 10269 / 18436

There's no closing CTA, no FAQ and no table of contents. The body has no `h2`/`h3` headings; sections are introduced by bold runs. There's no "last updated" date element.

The page background is the body's `#fff`. Neither the legal column nor the page paints its own background; the nav is `#f8f9f7`.

## 2. Layout

- Column wrapper: **856 wide, centered** (x=292 at 1440, x=212 at 1280), `padding: 140px 48px 72px`, so the text measure is **760**. Flex column, gap 32, align start.
- At or below 810 the wrapper is full width with `padding: 112px 20px 48px`, so the text is 728 at 768 and 350 at 390.
- Title block (`Book sales calls at 1/10th of the cost` layer, a leftover layer name):
  - `h1`: PPNM Medium **56/62.72, ls -1.68px**, w500 `#1c292d`. At 768 and 390: 38/42.56, ls -1.14px.
    - Terms: "Valley Terms of Service" (1 line at 1440)
    - Privacy: "Privacy Policy: Valley LinkedIn Outreach Platform" (2 lines at 1440)
  - Terms only: a second, heading-styled `p` directly under the h1. It's 4 words and uses the **same style as the h1** (56/62.72, `#1c292d`), wrapping to 2 lines at 1440. It's a subtitle line; use placeholder text.
- Body block: 32px below the title block.

## 3. Body structure and styles (element types only)

**Terms of Service** (rendered, 1440):
- **103 `p` blocks** in one flex column, with **no margin between paragraphs**: every gap measured `0px after p`. Paragraph separation comes from empty-line paragraphs (`p` elements holding just a line break, 31px tall) inside the sequence.
- 26 `strong` runs, used as inline section lead-ins at the start of a paragraph (for example "N. Heading." followed by text).
- 1 `a` (→ `https://joinvalley.co/`, external).
- Pattern: p (intro ×2), then repeated [p with strong lead-in, p…, empty p] groups.

**Privacy Policy** (rendered, 1440):
- a **single `p`** (10,881px tall) whose content is separated by `<br>` line breaks
- 29 `strong` runs (section headings as bold lines)
- 10 `em > strong` runs (bold-italic sub-heads)
- 5 `a`, all external:
  - 1 × `https://joinvalley.co/`, styled `#002669`
  - 4 × cookie-reference links (aboutcookies.org ×2, macromedia.com ×2), styled `#4e606a` (same as the text)

| Role | 1440 / 1280 | 768 / 390 | Colour and notes |
|---|---|---|---|
| `p` | PPNM Variable 20/31 | 18/27.9 | `#4e606a`, left-aligned, no paragraph margin |
| `strong` | **PPNM Variable w700** 20/31 | 18/27.9 | `#4e606a`. This is the variable font at 700, *not* Inter Bold as in blog posts |
| `em` / `em strong` | PPNM Variable italic (synthetic oblique; there's no italic face) w400 / w700 | | `#4e606a` |
| `a` → joinvalley.co (both pages) | PPNM Variable (`a > strong` w700 on Privacy) | | `#002669`, no underline; **hover → `#000` + underline**, instant (sampled) |
| `a` cookie-reference links (Privacy) | PPNM Variable | | `#4e606a`; **no hover change** (sampled) |

## 4. Interaction and motion

- Hover states: body links only (above). The nav and footer behave as on the homepage.
- Motion: none. There are no appear effects, no IntersectionObserver consumers, no sticky elements (other than the fixed nav) and no scroll-linked styles. Verified by the motion probe: 0 non-identity transforms, 0 opacity-0 elements.

## 5. Links

- Internal:
  - nav and footer (the footer includes `/privacy-policy` and `/terms-of-service`)
  - the in-body links are all external (below)
- External:
  - Terms: 1 in-body link → `https://joinvalley.co/` (`_blank`; a non-www domain, so external)
  - Privacy: 5 in-body links → `https://joinvalley.co/`, `https://www.aboutcookies.org/` ×2, `http://www.macromedia.com/support/documentation/en/flashplayer/…` ×2
  - nav and footer `beta.joinvalley.co` signup and login, Surface demo form, `mailto:hey@joinvalley.co`

## 6. Fonts

Homepage set only: PP Neue Montreal Medium, PP Neue Montreal Variable (100–900) and Inter 400. There are no new files.
