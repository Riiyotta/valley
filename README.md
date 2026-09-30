# Valley clone

A local, study-only React clone of https://www.joinvalley.co/ (React 18, Vite 5,
Tailwind v3, react-router). It carries Valley's branding and copy, so keep it
on your machine: don't deploy or publish it.

```bash
npm install && npm run dev   # http://localhost:5190
```

## Information architecture

`ia.json` is the only IA file to edit by hand. `IA.md` and `matrix.csv` are
generated from it and will be overwritten:

```bash
node validate.mjs   # checks route/template totals and section references
node build.mjs      # regenerates IA.md and matrix.csv
```

`ia.json` covers all 530 routes in the live sitemap across 16 templates and 77
sections. Section order was read from each page component in `src/pages/`, and
every section names the component that renders it (`implementedBy`).

What the data shows:

- **97% of routes are two detail templates.** Blog post (492) and case study
  (21) account for 513 of 530 routes. The remaining 17 routes use 14
  templates, and that's where most of the distinct build work is.
- **Little is shared beyond the chrome.** 16 sections appear in more than one
  template; 61 are single-use. The nav and footer cover 529 routes. The most
  reused content block is the FAQ accordion on its own (9 routes, 7 templates).
  Every other shared section is shared by exactly 2 templates.
- **The nav changes by route, not by section.** It's one component, but the
  `chrome` field records per-route behaviour: slides in on load (/pricing,
  /product, /about), sticky with a 1440px desktop breakpoint (/playbooks),
  desktop from 1280px (blog posts, case studies) or 1100px (/casestudies).
  /blog/archive is the only route with no nav or footer.
- **Same component, different section.** Where one component renders
  different content by prop, it's listed as two sections: customer stories
  with or without the heading, pricing FAQ with or without the offer panel,
  and the full vs compact competitor comparison.

Not counted as routes: `/blog_featured/*` (redirects to `/blog`, as on the live
site) and the not-found fallback. Blog post, case-study and legal body text is
generated placeholder, not the live copy; titles, dates, authors, images and
stats are real.

## Other docs in this folder

- `CLONE_SPEC.md`, `spec/`: recon measurements from the live site.
- `ASSET_MANIFEST.md`: where each downloaded asset came from.
- `design-repo/`: a separate machine-validated design repo with its own
  templates and section contracts. It's a snapshot and isn't generated from
  `ia.json`, so the two can drift; its section ids are coarser than the IA's.
