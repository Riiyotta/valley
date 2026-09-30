import { useRef } from 'react'
import useLandingAppear from '../../components/landing/shared/useLandingAppear.js'
import { LANDING_TEMPLATES } from '../../data/landing/templates.js'
import StickyBar from '../../components/landing/template/StickyBar.jsx'
import TemplateHero from '../../components/landing/template/TemplateHero.jsx'
import FeatureTiles from '../../components/landing/template/FeatureTiles.jsx'
import Problem from '../../components/landing/template/Problem.jsx'
import PathsComparison from '../../components/landing/template/PathsComparison.jsx'
import DemoSection from '../../components/landing/template/DemoSection.jsx'
import LogosMigrated from '../../components/landing/shared/LogosMigrated.jsx'
import VideoWall from '../../components/landing/shared/VideoWall.jsx'
import CaseBanner from '../../components/landing/shared/CaseBanner.jsx'
import PricingFaq from '../../components/PricingFaq.jsx'
import '../../styles/pages/landing/shared.css'
import '../../styles/pages/landing/template.css'

// "SEO landing" template (spec/pages/landing.md section 3), rendered from each page's
// `template` object: /linkedin-lead-generation-for-b2b-saas, /lead-generation-for-software-companies,
// /lead-generation-for-content-agencies. Nav and footer come from routes/Layout.jsx.
export default function LandingTemplate({ slug }) {
  const mainRef = useRef(null)
  useLandingAppear(mainRef, slug)
  const t = LANDING_TEMPLATES[slug]
  if (!t) return null
  return (
    <main className="lpx-page lp-template" data-slug={slug} ref={mainRef}>
      <StickyBar data={t.stickyBar} />
      <TemplateHero data={t.hero} />
      <FeatureTiles tiles={t.featureTiles} />
      <LogosMigrated data={t.logos} />
      <Problem data={t.problem} />
      <VideoWall data={t.videoWall} />
      <CaseBanner data={t.caseBanner} />
      <PathsComparison data={t.comparison} />
      <DemoSection data={t.demo} />
      <PricingFaq variant="faq-only" frameClassName="lp-faq" />
    </main>
  )
}
