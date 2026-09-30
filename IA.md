# Valley (joinvalley.co) clone: information architecture

Source: https://www.joinvalley.co/ (530 routes in the live sitemap) · React clone in this folder, routes in src/App.jsx
Status: **measured-from-clone** · production approved: **false**
530 routes · 16 templates · 77 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Blog post, Case study, SEO landing) account for 516 of 530 routes (97%). The remaining 14 routes span 13 templates.

| template | routes | share |
|---|---:|---:|
| Blog post | 492 | 93% |
| Case study | 21 | 4% |
| SEO landing | 3 | 1% |
| Legal | 2 | 0% |
| Home | 1 | 0% |
| Pricing | 1 | 0% |
| Product | 1 | 0% |
| About | 1 | 0% |
| Compare | 1 | 0% |
| Playbooks | 1 | 0% |
| Agency landing | 1 | 0% |
| Try Valley | 1 | 0% |
| LinkedIn automation | 1 | 0% |
| Blog index | 1 | 0% |
| Blog archive | 1 | 0% |
| Case studies index | 1 | 0% |

## Page chrome

**11 routes carry chrome = `full`** — Home, Compare, SEO landing, Agency landing, Try Valley, LinkedIn automation, Blog index, Legal.

**3 routes carry chrome = `full, nav slides in on load`** — Pricing, Product, About.

**1 routes carry chrome = `full, sticky nav, desktop nav from 1440px`** — Playbooks.

**1 routes carry chrome = `none`** — Blog archive.

**513 routes carry chrome = `full, desktop nav from 1280px`** — Blog post, Case study.

**1 routes carry chrome = `full, desktop nav from 1100px`** — Case studies index.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.navbar` | SHELL | 15 | 529 | `src/components/Nav.jsx (mounted by src/routes/Layout.jsx)` | Every route except /blog/archive. |
| `shell.footer` | SHELL | 15 | 529 | `src/components/Footer.jsx (mounted by src/routes/Layout.jsx)` | Every route except /blog/archive. |
| `hero.post-header` | HERO | 1 | 492 | `src/components/blog/PostHeader.jsx` | Every blog post. |
| `content.post-sidebar` | CONTENT | 1 | 492 | `src/components/blog/TocCard.jsx + src/components/longform/TryValleyForm.jsx` | Every blog post. |
| `content.post-body` | CONTENT | 1 | 492 | `src/components/blog/AuthorMeta.jsx + src/components/longform/RichText.jsx + src/components/longform/InlineCtaCard.jsx` | Every blog post. |
| `content.related-posts` | CONTENT | 1 | 492 | `src/components/blog/RelatedPosts.jsx` | Every blog post. |
| `hero.case-study` | HERO | 1 | 21 | `src/components/casestudies/CaseHero.jsx` | Every case study. |
| `proof.case-testimonial` | PROOF | 1 | 21 | `src/components/casestudies/CaseTestimonial.jsx` | Every case study. |
| `conversion.waitlist-band` | CONVERSION | 1 | 21 | `src/components/casestudies/WaitlistBand.jsx` | Every case study. |
| `conversion.case-faq` | CONVERSION | 1 | 21 | `src/components/casestudies/FaqAccordion.jsx` | Every case study. |
| `content.case-article` | CONTENT | 1 | 21 | `src/components/casestudies/CaseArticle.jsx + src/components/casestudies/CaseSidebar.jsx` | Every case study. |
| `content.more-case-studies` | CONTENT | 1 | 21 | `src/components/casestudies/MoreCaseStudies.jsx` | Every case study. |
| `conversion.faq` | CONVERSION | 7 | 9 | `src/components/PricingFaq.jsx (variant="faq-only")` | 9 routes: /pricing, every landing page, /blog and /casestudies. |
| `proof.logos-migrated` | PROOF | 2 | 4 | `src/components/landing/shared/LogosMigrated.jsx` | All 4 routes on the SEO and agency landing templates. |
| `proof.video-wall` | PROOF | 2 | 4 | `src/components/landing/shared/VideoWall.jsx` | All 4 routes on the SEO and agency landing templates. |
| `proof.case-banner` | PROOF | 2 | 4 | `src/components/landing/shared/CaseBanner.jsx` | All 4 routes on the SEO and agency landing templates. |
| `shell.sticky-bar` | SHELL | 1 | 3 | `src/components/landing/template/StickyBar.jsx` | The 3 SEO landing pages. |
| `hero.landing-seo` | HERO | 1 | 3 | `src/components/landing/template/TemplateHero.jsx` | The 3 SEO landing pages. |
| `product.feature-tiles` | PRODUCT | 1 | 3 | `src/components/landing/template/FeatureTiles.jsx` | The 3 SEO landing pages. |
| `product.problem-cards` | PRODUCT | 1 | 3 | `src/components/landing/template/Problem.jsx` | The 3 SEO landing pages. |
| `comparison.paths` | COMPARISON | 1 | 3 | `src/components/landing/template/PathsComparison.jsx` | The 3 SEO landing pages. |
| `conversion.demo-calendar` | CONVERSION | 1 | 3 | `src/components/landing/template/DemoSection.jsx` | The 3 SEO landing pages. |
| `hero.scene-cycler` | HERO | 2 | 2 | `src/components/Hero.jsx` | Home and /product. |
| `proof.logo-wall` | PROOF | 2 | 2 | `src/components/Logos.jsx` | Home and /product. |
| `proof.customer-stories-bare` | PROOF | 2 | 2 | `src/components/Stories.jsx (showHeader={false})` | /pricing and /product. |
| `proof.logo-cases` | PROOF | 2 | 2 | `src/components/landing/both/LogoCases.jsx` | /tryvalley and /linkedin-automation. |
| `proof.wall-ticker` | PROOF | 2 | 2 | `src/components/landing/both/WallTicker.jsx` | /tryvalley and /linkedin-automation. |
| `product.showcase-tabs` | PRODUCT | 2 | 2 | `src/components/Showcase.jsx` | Home and /product. |
| `product.team-fit` | PRODUCT | 2 | 2 | `src/components/TeamFit.jsx` | Home and /product. |
| `product.valley-magic` | PRODUCT | 2 | 2 | `src/components/landing/both/ValleyMagic.jsx` | /tryvalley and /linkedin-automation. |
| `comparison.compact` | COMPARISON | 2 | 2 | `src/components/Comparison.jsx (compact)` | /product and /linkedin-outreach-for-agencies. |
| `conversion.offer-faq` | CONVERSION | 2 | 2 | `src/components/PricingFaq.jsx` | Home and /product. |
| `content.legal-document` | CONTENT | 1 | 2 | `src/pages/Legal.jsx` | /terms-of-service and /privacy-policy. |
| `hero.pricing` | HERO | 1 | 1 | `src/components/pricing/PricingHero.jsx` | /pricing only. |
| `hero.about` | HERO | 1 | 1 | `src/components/about/AboutHero.jsx` | /about only. |
| `hero.agency` | HERO | 1 | 1 | `src/components/landing/agency/AgencyHero.jsx` | /linkedin-outreach-for-agencies only. |
| `hero.automation` | HERO | 1 | 1 | `src/components/landing/automation/Hero.jsx` | /linkedin-automation only. |
| `hero.contact-form` | HERO | 1 | 1 | `src/components/landing/tryvalley/ContactForm.jsx` | /tryvalley only. |
| `hero.blog` | HERO | 1 | 1 | `src/components/blog/BlogHero.jsx` | /blog only. |
| `hero.casestudies` | HERO | 1 | 1 | `src/pages/casestudies/CaseStudiesIndex.jsx (inline, .csi-hero)` | /casestudies only. |
| `hero.playbooks` | HERO | 1 | 1 | `src/components/playbooks/PlaybookLibrary.jsx (.vpl-hero)` | /playbooks only. |
| `proof.customer-stories` | PROOF | 1 | 1 | `src/components/Stories.jsx` | Home only. |
| `proof.endorsement` | PROOF | 1 | 1 | `src/components/Endorsement.jsx` | Home only. |
| `proof.wall-of-love` | PROOF | 1 | 1 | `src/components/WallOfLove.jsx` | Home only. |
| `proof.case-bento` | PROOF | 1 | 1 | `src/components/landing/automation/CaseStudies.jsx` | /linkedin-automation only. |
| `proof.quote-reveal` | PROOF | 1 | 1 | `src/components/landing/automation/QuoteReveal.jsx` | /linkedin-automation only. |
| `proof.video-testimonials` | PROOF | 1 | 1 | `src/components/casestudies/VideoTestimonials.jsx` | /casestudies only. |
| `proof.customer-logo-band` | PROOF | 1 | 1 | `src/components/casestudies/CustomerLogoBand.jsx` | /casestudies only. |
| `product.steps-walkthrough` | PRODUCT | 1 | 1 | `src/components/Steps.jsx` | Home only. |
| `product.jobs-stack` | PRODUCT | 1 | 1 | `src/components/Jobs.jsx` | Home only. |
| `product.integrations` | PRODUCT | 1 | 1 | `src/components/Integrations.jsx` | Home only. |
| `product.workflow-stack` | PRODUCT | 1 | 1 | `src/components/product/Workflow.jsx` | /product only. |
| `product.agency-margin` | PRODUCT | 1 | 1 | `src/components/landing/agency/AgencyMargin.jsx` | /linkedin-outreach-for-agencies only. |
| `product.agency-workflow` | PRODUCT | 1 | 1 | `src/components/landing/agency/AgencyWorkflow.jsx` | /linkedin-outreach-for-agencies only. |
| `product.automation-features` | PRODUCT | 1 | 1 | `src/components/landing/automation/Features.jsx` | /linkedin-automation only. |
| `product.automation-steps` | PRODUCT | 1 | 1 | `src/components/landing/automation/Steps.jsx` | /linkedin-automation only. |
| `product.automation-tabs` | PRODUCT | 1 | 1 | `src/components/landing/automation/ProductTabs.jsx` | /linkedin-automation only. |
| `comparison.full` | COMPARISON | 1 | 1 | `src/components/Comparison.jsx` | /compare only. |
| `comparison.agency-paths` | COMPARISON | 1 | 1 | `src/components/landing/agency/AgencyPaths.jsx` | /linkedin-outreach-for-agencies only. |
| `conversion.plans` | CONVERSION | 1 | 1 | `src/components/pricing/Plans.jsx` | /pricing only. |
| `conversion.studios-waitlist` | CONVERSION | 1 | 1 | `src/components/pricing/Studios.jsx` | /pricing only. |
| `conversion.pricing-calendar` | CONVERSION | 1 | 1 | `src/components/pricing/CalendarSection.jsx` | /pricing only. |
| `conversion.automation-calendar` | CONVERSION | 1 | 1 | `src/components/landing/automation/CalendarSection.jsx` | /linkedin-automation only. |
| `conversion.closing-cta` | CONVERSION | 1 | 1 | `src/components/ClosingCta.jsx` | Home only. |
| `conversion.playbook-cta` | CONVERSION | 1 | 1 | `src/components/playbooks/PlaybookLibrary.jsx (.vpl-bottom)` | /playbooks only. |
| `content.research-library` | CONTENT | 1 | 1 | `src/components/blog/ResearchLibrary.jsx` | /blog only. |
| `content.blog-card-grid` | CONTENT | 1 | 1 | `src/components/blog/BlogCardGrid.jsx` | /blog only. |
| `content.case-study-strip` | CONTENT | 1 | 1 | `src/components/blog/CaseStudyStrip.jsx` | /blog only. |
| `content.archive-list` | CONTENT | 1 | 1 | `src/pages/blog/BlogArchive.jsx` | /blog/archive only. |
| `content.case-grid` | CONTENT | 1 | 1 | `src/pages/casestudies/CaseStudiesIndex.jsx + src/components/casestudies/CaseStudyCard.jsx` | /casestudies only. |
| `content.playbook-categories` | CONTENT | 1 | 1 | `src/components/playbooks/PlaybookLibrary.jsx (.vpl-categories)` | /playbooks only. |
| `content.playbook-library` | CONTENT | 1 | 1 | `src/components/playbooks/PlaybookLibrary.jsx (.vpl-toolbar, .vpl-grid)` | /playbooks only. |
| `content.playbook-drawer` | CONTENT | 1 | 1 | `src/components/playbooks/PlayDrawer.jsx` | /playbooks only. |
| `company.mission` | COMPANY | 1 | 1 | `src/components/about/Mission.jsx` | /about only. |
| `company.team` | COMPANY | 1 | 1 | `src/components/about/Team.jsx` | /about only. |
| `company.backers` | COMPANY | 1 | 1 | `src/components/about/Backers.jsx` | /about only. |
| `company.hiring` | COMPANY | 1 | 1 | `src/components/about/Backers.jsx (export Hiring)` | /about only. |

**16 shared sections** appear in more than one template and belong in a component library.

**61 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Home — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.scene-cycler` | shared ×2 |
| 3 | PROOF | `proof.logo-wall` | shared ×2 |
| 4 | PROOF | `proof.customer-stories` | page-local |
| 5 | PROOF | `proof.endorsement` | page-local |
| 6 | PRODUCT | `product.steps-walkthrough` | page-local |
| 7 | PRODUCT | `product.jobs-stack` | page-local |
| 8 | PRODUCT | `product.showcase-tabs` | shared ×2 |
| 9 | PRODUCT | `product.integrations` | page-local |
| 10 | PRODUCT | `product.team-fit` | shared ×2 |
| 11 | PROOF | `proof.wall-of-love` | page-local |
| 12 | CONVERSION | `conversion.offer-faq` | shared ×2 |
| 13 | CONVERSION | `conversion.closing-cta` | page-local |
| 14 | SHELL | `shell.footer` | shared ×15 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **full, nav slides in on load**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.pricing` | page-local |
| 3 | CONVERSION | `conversion.plans` | page-local |
| 4 | CONVERSION | `conversion.studios-waitlist` | page-local |
| 5 | PROOF | `proof.customer-stories-bare` | shared ×2 |
| 6 | CONVERSION | `conversion.pricing-calendar` | page-local |
| 7 | CONVERSION | `conversion.faq` | shared ×7 |
| 8 | SHELL | `shell.footer` | shared ×15 |

### Product — `template.product`

1 route · `/product` · chrome: **full, nav slides in on load**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.scene-cycler` | shared ×2 |
| 3 | PROOF | `proof.logo-wall` | shared ×2 |
| 4 | PRODUCT | `product.showcase-tabs` | shared ×2 |
| 5 | PRODUCT | `product.workflow-stack` | page-local |
| 6 | PROOF | `proof.customer-stories-bare` | shared ×2 |
| 7 | PRODUCT | `product.team-fit` | shared ×2 |
| 8 | COMPARISON | `comparison.compact` | shared ×2 |
| 9 | CONVERSION | `conversion.offer-faq` | shared ×2 |
| 10 | SHELL | `shell.footer` | shared ×15 |

### About — `template.about`

1 route · `/about` · chrome: **full, nav slides in on load**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.about` | page-local |
| 3 | COMPANY | `company.mission` | page-local |
| 4 | COMPANY | `company.team` | page-local |
| 5 | COMPANY | `company.backers` | page-local |
| 6 | COMPANY | `company.hiring` | page-local |
| 7 | SHELL | `shell.footer` | shared ×15 |

### Compare — `template.compare`

1 route · `/compare` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | COMPARISON | `comparison.full` | page-local |
| 3 | SHELL | `shell.footer` | shared ×15 |

### Playbooks — `template.playbooks`

1 route · `/playbooks` · chrome: **full, sticky nav, desktop nav from 1440px**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.playbooks` | page-local |
| 3 | CONTENT | `content.playbook-categories` | page-local |
| 4 | CONTENT | `content.playbook-library` | page-local |
| 5 | CONVERSION | `conversion.playbook-cta` | page-local |
| 6 | CONTENT | `content.playbook-drawer` | page-local |
| 7 | SHELL | `shell.footer` | shared ×15 |

### SEO landing — `template.landing-seo`

3 routes · `/linkedin-lead-generation-for-b2b-saas`, `/lead-generation-for-software-companies`, `/lead-generation-for-content-agencies` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | SHELL | `shell.sticky-bar` | page-local |
| 3 | HERO | `hero.landing-seo` | page-local |
| 4 | PRODUCT | `product.feature-tiles` | page-local |
| 5 | PROOF | `proof.logos-migrated` | shared ×2 |
| 6 | PRODUCT | `product.problem-cards` | page-local |
| 7 | PROOF | `proof.video-wall` | shared ×2 |
| 8 | PROOF | `proof.case-banner` | shared ×2 |
| 9 | COMPARISON | `comparison.paths` | page-local |
| 10 | CONVERSION | `conversion.demo-calendar` | page-local |
| 11 | CONVERSION | `conversion.faq` | shared ×7 |
| 12 | SHELL | `shell.footer` | shared ×15 |

### Agency landing — `template.landing-agency`

1 route · `/linkedin-outreach-for-agencies` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.agency` | page-local |
| 3 | PROOF | `proof.logos-migrated` | shared ×2 |
| 4 | PRODUCT | `product.agency-margin` | page-local |
| 5 | PRODUCT | `product.agency-workflow` | page-local |
| 6 | PROOF | `proof.video-wall` | shared ×2 |
| 7 | PROOF | `proof.case-banner` | shared ×2 |
| 8 | COMPARISON | `comparison.agency-paths` | page-local |
| 9 | COMPARISON | `comparison.compact` | shared ×2 |
| 10 | CONVERSION | `conversion.faq` | shared ×7 |
| 11 | SHELL | `shell.footer` | shared ×15 |

### Try Valley — `template.tryvalley`

1 route · `/tryvalley` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.contact-form` | page-local |
| 3 | PROOF | `proof.logo-cases` | shared ×2 |
| 4 | PRODUCT | `product.valley-magic` | shared ×2 |
| 5 | PROOF | `proof.wall-ticker` | shared ×2 |
| 6 | CONVERSION | `conversion.faq` | shared ×7 |
| 7 | SHELL | `shell.footer` | shared ×15 |

### LinkedIn automation — `template.linkedin-automation`

1 route · `/linkedin-automation` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.automation` | page-local |
| 3 | PROOF | `proof.logo-cases` | shared ×2 |
| 4 | PRODUCT | `product.automation-features` | page-local |
| 5 | PRODUCT | `product.automation-steps` | page-local |
| 6 | PROOF | `proof.case-bento` | page-local |
| 7 | PROOF | `proof.quote-reveal` | page-local |
| 8 | PRODUCT | `product.automation-tabs` | page-local |
| 9 | PRODUCT | `product.valley-magic` | shared ×2 |
| 10 | CONVERSION | `conversion.automation-calendar` | page-local |
| 11 | PROOF | `proof.wall-ticker` | shared ×2 |
| 12 | CONVERSION | `conversion.faq` | shared ×7 |
| 13 | SHELL | `shell.footer` | shared ×15 |

### Blog index — `template.blog-index`

1 route · `/blog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.blog` | page-local |
| 3 | CONTENT | `content.research-library` | page-local |
| 4 | CONTENT | `content.blog-card-grid` | page-local |
| 5 | CONTENT | `content.case-study-strip` | page-local |
| 6 | CONVERSION | `conversion.faq` | shared ×7 |
| 7 | SHELL | `shell.footer` | shared ×15 |

### Blog archive — `template.blog-archive`

1 route · `/blog/archive` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | CONTENT | `content.archive-list` | page-local |

### Blog post — `template.blog-post`

492 routes · `/blog/{slug}` · chrome: **full, desktop nav from 1280px**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.post-header` | page-local |
| 3 | CONTENT | `content.post-sidebar` | page-local |
| 4 | CONTENT | `content.post-body` | page-local |
| 5 | CONTENT | `content.related-posts` | page-local |
| 6 | SHELL | `shell.footer` | shared ×15 |

### Case studies index — `template.casestudies-index`

1 route · `/casestudies` · chrome: **full, desktop nav from 1100px**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.casestudies` | page-local |
| 3 | CONTENT | `content.case-grid` | page-local |
| 4 | PROOF | `proof.video-testimonials` | page-local |
| 5 | PROOF | `proof.customer-logo-band` | page-local |
| 6 | CONVERSION | `conversion.faq` | shared ×7 |
| 7 | SHELL | `shell.footer` | shared ×15 |

### Case study — `template.case-study`

21 routes · `/casestudies/{slug}` · chrome: **full, desktop nav from 1280px**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | HERO | `hero.case-study` | page-local |
| 3 | PROOF | `proof.case-testimonial` | page-local |
| 4 | CONTENT | `content.case-article` | page-local |
| 5 | CONTENT | `content.more-case-studies` | page-local |
| 6 | CONVERSION | `conversion.waitlist-band` | page-local |
| 7 | CONVERSION | `conversion.case-faq` | page-local |
| 8 | SHELL | `shell.footer` | shared ×15 |

### Legal — `template.legal`

2 routes · `/terms-of-service`, `/privacy-policy` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×15 |
| 2 | CONTENT | `content.legal-document` | page-local |
| 3 | SHELL | `shell.footer` | shared ×15 |

## Section reference

### SHELL

_Site chrome that frames a page: top nav, footer, and the fixed landing-page bar._

**`shell.navbar`** — Top navigation: logo, Home/Product dropdown/Case studies/Pricing/Blog links, Log in, and Start for free. Fixed by default; route-level props change only its load animation, stickiness and desktop breakpoint (see each template's chrome).

· Every route except /blog/archive. · appears on 529 routes · implemented by `src/components/Nav.jsx (mounted by src/routes/Layout.jsx)`

**`shell.footer`** — Site footer: sign-up and demo buttons, link columns, contact email and legal links.

· Every route except /blog/archive. · appears on 529 routes · implemented by `src/components/Footer.jsx (mounted by src/routes/Layout.jsx)`

**`shell.sticky-bar`** — Bar fixed to the bottom of the viewport with a short pitch and a demo button; hides on downward scroll, returns on upward scroll, desktop only.

· The 3 SEO landing pages. · appears on 3 routes · implemented by `src/components/landing/template/StickyBar.jsx`

### HERO

_The block that opens a page, above or at the fold._

**`hero.scene-cycler`** — Headline, two buttons and a product visual that autoplays five scenes (Find, Qualify, Research, Write, Send) every 5s, with a customer quote that changes per scene. /product renders a second copy variant of the same block.

· Home and /product. · appears on 2 routes · implemented by `src/components/Hero.jsx`

**`hero.pricing`** — Pricing page heading and intro line, labels revealed on scroll.

· /pricing only. · appears on 1 routes · implemented by `src/components/pricing/PricingHero.jsx`

**`hero.about`** — Full-bleed image hero on a dark teal ground with the company statement.

· /about only. · appears on 1 routes · implemented by `src/components/about/AboutHero.jsx`

**`hero.landing-seo`** — SEO landing hero: eyebrow tag, headline, sub, two buttons, a rotating customer-proof ticker and a demo video.

· The 3 SEO landing pages. · appears on 3 routes · implemented by `src/components/landing/template/TemplateHero.jsx`

**`hero.agency`** — Agency landing hero: restyled headline and sub aimed at lead-gen agencies, with a demo button.

· /linkedin-outreach-for-agencies only. · appears on 1 routes · implemented by `src/components/landing/agency/AgencyHero.jsx`

**`hero.automation`** — Sky-image hero with an outlined label, a headline that blurs in word by word, two buttons, and four floating quote bubbles that cross-fade.

· /linkedin-automation only. · appears on 1 routes · implemented by `src/components/landing/automation/Hero.jsx`

**`hero.contact-form`** — Opening demo-request form (name, work email, company) with a checklist; validates, then hands off to the external demo form.

· /tryvalley only. · appears on 1 routes · implemented by `src/components/landing/tryvalley/ContactForm.jsx`

**`hero.blog`** — Blog heading, email sign-up form and a featured-article card.

· /blog only. · appears on 1 routes · implemented by `src/components/blog/BlogHero.jsx`

**`hero.casestudies`** — Case-studies heading and sub with an email form.

· /casestudies only. · appears on 1 routes · implemented by `src/pages/casestudies/CaseStudiesIndex.jsx (inline, .csi-hero)`

**`hero.post-header`** — Light-teal article header: title, subtitle and cover image.

· Every blog post. · appears on 492 routes · implemented by `src/components/blog/PostHeader.jsx`

**`hero.case-study`** — Dark case-study header: title and three headline stats.

· Every case study. · appears on 21 routes · implemented by `src/components/casestudies/CaseHero.jsx`

**`hero.playbooks`** — Playbooks heading, intro and a product visual.

· /playbooks only. · appears on 1 routes · implemented by `src/components/playbooks/PlaybookLibrary.jsx (.vpl-hero)`

### PROOF

_Evidence from customers: logo grids, stories, testimonials, quotes, case teasers._

**`proof.logo-wall`** — Customer logo grid with a blinking-dot marker and quote tooltips on hover; a separate 'migrated from' layout below 1200px.

· Home and /product. · appears on 2 routes · implemented by `src/components/Logos.jsx`

**`proof.customer-stories`** — Customer-stories carousel with its heading and sign-up button; slides advance every 7s.

· Home only. · appears on 1 routes · implemented by `src/components/Stories.jsx`

**`proof.customer-stories-bare`** — The same customer-stories carousel without its heading, set inside a bordered frame.

· /pricing and /product. · appears on 2 routes · implemented by `src/components/Stories.jsx (showHeader={false})`

**`proof.endorsement`** — Pinned full-height quote whose words fill in as you scroll; static below 600px wide or 650px tall.

· Home only. · appears on 1 routes · implemented by `src/components/Endorsement.jsx`

**`proof.wall-of-love`** — Grid of customer quotes, photos and result metrics.

· Home only. · appears on 1 routes · implemented by `src/components/WallOfLove.jsx`

**`proof.logos-migrated`** — Logo grid of teams that moved to Valley from named competitor tools.

· All 4 routes on the SEO and agency landing templates. · appears on 4 routes · implemented by `src/components/landing/shared/LogosMigrated.jsx`

**`proof.video-wall`** — Four customer video cards (click-to-play YouTube) that rise in on scroll.

· All 4 routes on the SEO and agency landing templates. · appears on 4 routes · implemented by `src/components/landing/shared/VideoWall.jsx`

**`proof.case-banner`** — Single case-study banner whose star columns slide in on hover.

· All 4 routes on the SEO and agency landing templates. · appears on 4 routes · implemented by `src/components/landing/shared/CaseBanner.jsx`

**`proof.logo-cases`** — Logo grid where each logo opens a small case-study popup on hover.

· /tryvalley and /linkedin-automation. · appears on 2 routes · implemented by `src/components/landing/both/LogoCases.jsx`

**`proof.wall-ticker`** — Testimonial cards scrolling left at a constant 70px/s; paused while off-screen.

· /tryvalley and /linkedin-automation. · appears on 2 routes · implemented by `src/components/landing/both/WallTicker.jsx`

**`proof.case-bento`** — Bento of five customer case cards that invert to black on hover.

· /linkedin-automation only. · appears on 1 routes · implemented by `src/components/landing/automation/CaseStudies.jsx`

**`proof.quote-reveal`** — Pinned black stage where one customer quote reveals word by word as you scroll.

· /linkedin-automation only. · appears on 1 routes · implemented by `src/components/landing/automation/QuoteReveal.jsx`

**`proof.video-testimonials`** — 'Hear it from them': four customer video cards.

· /casestudies only. · appears on 1 routes · implemented by `src/components/casestudies/VideoTestimonials.jsx`

**`proof.customer-logo-band`** — Band of customer logos under the case-study listing.

· /casestudies only. · appears on 1 routes · implemented by `src/components/casestudies/CustomerLogoBand.jsx`

**`proof.case-testimonial`** — Customer testimonial with photo and a fixed CTA line, below the case-study header.

· Every case study. · appears on 21 routes · implemented by `src/components/casestudies/CaseTestimonial.jsx`

### PRODUCT

_Blocks that explain what Valley does and how it works._

**`product.steps-walkthrough`** — Three-step walkthrough with a step nav that highlights the step in view.

· Home only. · appears on 1 routes · implemented by `src/components/Steps.jsx`

**`product.jobs-stack`** — Pinned grid of 16 job tiles that fill as you scroll, with a price toggle and savings calculator.

· Home only. · appears on 1 routes · implemented by `src/components/Jobs.jsx`

**`product.showcase-tabs`** — Six product-app mockups behind tabs that autoplay every 6s; a click stops autoplay.

· Home and /product. · appears on 2 routes · implemented by `src/components/Showcase.jsx`

**`product.integrations`** — Integration hub diagram with click-only tabs.

· Home only. · appears on 1 routes · implemented by `src/components/Integrations.jsx`

**`product.team-fit`** — Tabs by team type (founders, sales teams, agencies), each with a pitch and a linked case study.

· Home and /product. · appears on 2 routes · implemented by `src/components/TeamFit.jsx`

**`product.workflow-stack`** — Intro card followed by seven workflow cards that stack as you scroll on desktop.

· /product only. · appears on 1 routes · implemented by `src/components/product/Workflow.jsx`

**`product.feature-tiles`** — Row of feature tiles under the SEO landing hero.

· The 3 SEO landing pages. · appears on 3 routes · implemented by `src/components/landing/template/FeatureTiles.jsx`

**`product.problem-cards`** — Problem statement with three cards describing what breaks in current outbound.

· The 3 SEO landing pages. · appears on 3 routes · implemented by `src/components/landing/template/Problem.jsx`

**`product.agency-margin`** — Agency economics block: what Valley does to an agency's margin.

· /linkedin-outreach-for-agencies only. · appears on 1 routes · implemented by `src/components/landing/agency/AgencyMargin.jsx`

**`product.agency-workflow`** — How an agency runs client campaigns on Valley.

· /linkedin-outreach-for-agencies only. · appears on 1 routes · implemented by `src/components/landing/agency/AgencyWorkflow.jsx`

**`product.valley-magic`** — Calendar slider whose knob steps through four stops, revealing booked meetings; desktop only.

· /tryvalley and /linkedin-automation. · appears on 2 routes · implemented by `src/components/landing/both/ValleyMagic.jsx`

**`product.automation-features`** — Four feature cards, each with a looping Rive illustration.

· /linkedin-automation only. · appears on 1 routes · implemented by `src/components/landing/automation/Features.jsx`

**`product.automation-steps`** — Five step rows beside a Rive flow diagram that plays once when half visible.

· /linkedin-automation only. · appears on 1 routes · implemented by `src/components/landing/automation/Steps.jsx`

**`product.automation-tabs`** — Five click-only product tabs (Dashboard, Warm Leads, Campaigns, Approvals, Inbox) over a screenshot frame; tab bar removed below 1200px.

· /linkedin-automation only. · appears on 1 routes · implemented by `src/components/landing/automation/ProductTabs.jsx`

### COMPARISON

_Valley set against competitors or against other ways of doing outbound._

**`comparison.full`** — Full competitor comparison: picker over 19 competitors, stage track diagram, legend, criteria, differences, pricing, side-by-side table, proof, directory and method.

· /compare only. · appears on 1 routes · implemented by `src/components/Comparison.jsx`

**`comparison.compact`** — Compact comparison: picker and track diagram only, closing with a link to the full /compare page.

· /product and /linkedin-outreach-for-agencies. · appears on 2 routes · implemented by `src/components/Comparison.jsx (compact)`

**`comparison.paths`** — Three paths to pipeline (hire, agency, Valley) compared on cost and outcome.

· The 3 SEO landing pages. · appears on 3 routes · implemented by `src/components/landing/template/PathsComparison.jsx`

**`comparison.agency-paths`** — Agency version of the paths comparison.

· /linkedin-outreach-for-agencies only. · appears on 1 routes · implemented by `src/components/landing/agency/AgencyPaths.jsx`

### CONVERSION

_Blocks that ask for an action: plans, demo calendars, sign-up forms, FAQs next to a pitch._

**`conversion.plans`** — Plan cards with a Monthly/Quarterly price toggle.

· /pricing only. · appears on 1 routes · implemented by `src/components/pricing/Plans.jsx`

**`conversion.studios-waitlist`** — 'Valley Studios' banner with a waitlist form that opens the external demo form.

· /pricing only. · appears on 1 routes · implemented by `src/components/pricing/Studios.jsx`

**`conversion.pricing-calendar`** — Embedded HubSpot meetings calendar under a pricing heading.

· /pricing only. · appears on 1 routes · implemented by `src/components/pricing/CalendarSection.jsx`

**`conversion.demo-calendar`** — Embedded HubSpot meetings calendar closing the SEO landing page.

· The 3 SEO landing pages. · appears on 3 routes · implemented by `src/components/landing/template/DemoSection.jsx`

**`conversion.automation-calendar`** — Dark calendar section with the HubSpot meetings embed.

· /linkedin-automation only. · appears on 1 routes · implemented by `src/components/landing/automation/CalendarSection.jsx`

**`conversion.offer-faq`** — Pricing offer panel (plan summary and sign-up) beside the FAQ accordion.

· Home and /product. · appears on 2 routes · implemented by `src/components/PricingFaq.jsx`

**`conversion.faq`** — The FAQ accordion on its own, without the offer panel.

· 9 routes: /pricing, every landing page, /blog and /casestudies. · appears on 9 routes · implemented by `src/components/PricingFaq.jsx (variant="faq-only")`

**`conversion.closing-cta`** — Closing work-email sign-up: rejects personal domains, then redirects to external sign-up.

· Home only. · appears on 1 routes · implemented by `src/components/ClosingCta.jsx`

**`conversion.waitlist-band`** — 'Join waitlist' band with a form and an animated inbox mockup.

· Every case study. · appears on 21 routes · implemented by `src/components/casestudies/WaitlistBand.jsx`

**`conversion.case-faq`** — Case-study FAQ accordion; items open independently with a short spring.

· Every case study. · appears on 21 routes · implemented by `src/components/casestudies/FaqAccordion.jsx`

**`conversion.playbook-cta`** — Call to action at the foot of the playbook library.

· /playbooks only. · appears on 1 routes · implemented by `src/components/playbooks/PlaybookLibrary.jsx (.vpl-bottom)`

### CONTENT

_Editorial and long-form material: listings, article bodies, legal text._

**`content.research-library`** — 'Outbound research library': five report cards.

· /blog only. · appears on 1 routes · implemented by `src/components/blog/ResearchLibrary.jsx`

**`content.blog-card-grid`** — 'All blogs' card grid with Load More (+24 desktop, +6 tablet, +4 phone).

· /blog only. · appears on 1 routes · implemented by `src/components/blog/BlogCardGrid.jsx`

**`content.case-study-strip`** — Two case-study cards linking into /casestudies.

· /blog only. · appears on 1 routes · implemented by `src/components/blog/CaseStudyStrip.jsx`

**`content.archive-list`** — Plain list of every post title linking to its article.

· /blog/archive only. · appears on 1 routes · implemented by `src/pages/blog/BlogArchive.jsx`

**`content.post-sidebar`** — Sticky sidebar: table of contents that highlights the section in view, and a 'Try Valley' form.

· Every blog post. · appears on 492 routes · implemented by `src/components/blog/TocCard.jsx + src/components/longform/TryValleyForm.jsx`

**`content.post-body`** — Author and dates, then three article sections with an inline CTA card after each. Body text is generated placeholder, not the live article.

· Every blog post. · appears on 492 routes · implemented by `src/components/blog/AuthorMeta.jsx + src/components/longform/RichText.jsx + src/components/longform/InlineCtaCard.jsx`

**`content.related-posts`** — Four related-post cards.

· Every blog post. · appears on 492 routes · implemented by `src/components/blog/RelatedPosts.jsx`

**`content.case-grid`** — Grid of every case-study card with headline stats.

· /casestudies only. · appears on 1 routes · implemented by `src/pages/casestudies/CaseStudiesIndex.jsx + src/components/casestudies/CaseStudyCard.jsx`

**`content.case-article`** — Challenges / Solutions / Results article with a pull quote and results stats, beside a sticky company card. Body text is placeholder.

· Every case study. · appears on 21 routes · implemented by `src/components/casestudies/CaseArticle.jsx + src/components/casestudies/CaseSidebar.jsx`

**`content.more-case-studies`** — Two further case-study cards.

· Every case study. · appears on 21 routes · implemented by `src/components/casestudies/MoreCaseStudies.jsx`

**`content.legal-document`** — Legal page title and body in a centred column. Body text is placeholder.

· /terms-of-service and /privacy-policy. · appears on 2 routes · implemented by `src/pages/Legal.jsx`

**`content.playbook-categories`** — Six playbook category image tiles that filter the library.

· /playbooks only. · appears on 1 routes · implemented by `src/components/playbooks/PlaybookLibrary.jsx (.vpl-categories)`

**`content.playbook-library`** — Searchable grid of playbook cards with an empty state.

· /playbooks only. · appears on 1 routes · implemented by `src/components/playbooks/PlaybookLibrary.jsx (.vpl-toolbar, .vpl-grid)`

**`content.playbook-drawer`** — Right-hand drawer with one playbook's detail, opened from a card or a ?play= link.

· /playbooks only. · appears on 1 routes · implemented by `src/components/playbooks/PlayDrawer.jsx`

### COMPANY

_Blocks about Valley as a company rather than the product._

**`company.mission`** — Mission letter beside an art card of hard-light shapes, with signature.

· /about only. · appears on 1 routes · implemented by `src/components/about/Mission.jsx`

**`company.team`** — Two-column grid of team signature cells with LinkedIn links.

· /about only. · appears on 1 routes · implemented by `src/components/about/Team.jsx`

**`company.backers`** — Backers logo strip.

· /about only. · appears on 1 routes · implemented by `src/components/about/Backers.jsx`

**`company.hiring`** — Hiring banner with 'Explore roles' and 'Contact us'.

· /about only. · appears on 1 routes · implemented by `src/components/about/Backers.jsx (export Hiring)`
