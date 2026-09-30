import { useRef } from 'react'
import useLandingAppear from '../../components/landing/shared/useLandingAppear.js'
import '../../styles/pages/landing/both/base.css'
import Hero from '../../components/landing/automation/Hero.jsx'
import Features from '../../components/landing/automation/Features.jsx'
import Steps from '../../components/landing/automation/Steps.jsx'
import CaseStudies from '../../components/landing/automation/CaseStudies.jsx'
import QuoteReveal from '../../components/landing/automation/QuoteReveal.jsx'
import ProductTabs from '../../components/landing/automation/ProductTabs.jsx'
import CalendarSection from '../../components/landing/automation/CalendarSection.jsx'
import LogoCases from '../../components/landing/both/LogoCases.jsx'
import ValleyMagic from '../../components/landing/both/ValleyMagic.jsx'
import WallTicker from '../../components/landing/both/WallTicker.jsx'
import PricingFaq from '../../components/PricingFaq.jsx'

// /linkedin-automation (spec/pages/landing.md section 6). Nav and footer come from Layout.
// Desktop order: hero · logo-cases · features · steps · case studies · quote reveal · product
// tabs · spacer · valley-magic · spacer · calendar · spacer · wall-ticker · spacer · faq.
// Below 1200 valley-magic is hidden (its spacers stay) and the last spacer is dropped
// (768/390 section lists).
export default function LinkedinAutomation() {
  const mainRef = useRef(null)
  useLandingAppear(mainRef)
  return (
    <main className="lx-page lx-page--automation" ref={mainRef}>
      <Hero />
      <LogoCases variant="automation" />
      <Features />
      <Steps />
      <CaseStudies />
      <QuoteReveal />
      <ProductTabs />
      <div className="lx-spacer" aria-hidden="true" />
      <ValleyMagic />
      <div className="lx-spacer" aria-hidden="true" />
      <CalendarSection />
      <div className="lx-spacer" aria-hidden="true" />
      <WallTicker variant="automation" />
      <div className="lx-spacer" data-desktop-only="" aria-hidden="true" />
      <PricingFaq variant="faq-only" frameClassName="lx-faq" />
    </main>
  )
}
