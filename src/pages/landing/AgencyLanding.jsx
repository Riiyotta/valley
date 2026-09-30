import { useRef } from 'react'
import useLandingAppear from '../../components/landing/shared/useLandingAppear.js'
import agency from '../../data/landing/agency.json'
import AgencyHero from '../../components/landing/agency/AgencyHero.jsx'
import AgencyMargin from '../../components/landing/agency/AgencyMargin.jsx'
import AgencyWorkflow from '../../components/landing/agency/AgencyWorkflow.jsx'
import AgencyPaths from '../../components/landing/agency/AgencyPaths.jsx'
import LogosMigrated from '../../components/landing/shared/LogosMigrated.jsx'
import VideoWall from '../../components/landing/shared/VideoWall.jsx'
import CaseBanner from '../../components/landing/shared/CaseBanner.jsx'
import Comparison from '../../components/Comparison.jsx'
import PricingFaq from '../../components/PricingFaq.jsx'
import '../../styles/pages/landing/shared.css'
import '../../styles/pages/landing/agency.css'

// /linkedin-outreach-for-agencies (spec/pages/landing.md section 4): the template's shell and
// five shared blocks (logos, video wall, case banner, proof ticker, FAQ) plus its own hero,
// margin, workflow and paths sections and the compact .vc compare widget. No sticky bar,
// feature tiles or demo iframe. Copy: src/data/landing/agency.json (from the spec JSON).
export default function AgencyLanding() {
  const mainRef = useRef(null)
  useLandingAppear(mainRef)
  return (
    <main className="lpx-page lp-agency" ref={mainRef}>
      <AgencyHero data={agency.hero} />
      <LogosMigrated />
      <AgencyMargin data={agency.margin} />
      <AgencyWorkflow data={agency.workflow} />
      <VideoWall data={agency.videoWall} variant="agency" />
      <CaseBanner variant="agency" avatarAlt="Samiyan Momin" />
      <AgencyPaths data={agency.paths} />
      <div id="agency-compare" className="lp-acompare" data-framer-name="agencyCompare">
        {/* Same widget as /product: the compact .vc variant (spec/pages/product.md 4). */}
        <Comparison compact />
      </div>
      <PricingFaq variant="faq-only" frameClassName="lp-faq" />
    </main>
  )
}
