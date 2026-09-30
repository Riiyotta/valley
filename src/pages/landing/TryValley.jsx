import { useRef } from 'react'
import useLandingAppear from '../../components/landing/shared/useLandingAppear.js'
import '../../styles/pages/landing/both/base.css'
import ContactForm from '../../components/landing/tryvalley/ContactForm.jsx'
import LogoCases from '../../components/landing/both/LogoCases.jsx'
import ValleyMagic from '../../components/landing/both/ValleyMagic.jsx'
import WallTicker from '../../components/landing/both/WallTicker.jsx'
import PricingFaq from '../../components/PricingFaq.jsx'

// /tryvalley (spec/pages/landing.md section 5). Nav and footer come from Layout.
// Order: contact · logo-cases · spacer · valley-magic (desktop only) · spacer · wall-ticker ·
// spacer · faq. Spacers are 48px at desktop and 24px below; both spacers around valley-magic
// stay when it is hidden (768/390 section lists).
export default function TryValley() {
  const mainRef = useRef(null)
  useLandingAppear(mainRef)
  return (
    <main className="lx-page lx-page--tryvalley" ref={mainRef}>
      <ContactForm />
      <LogoCases variant="tryvalley" />
      <div className="lx-spacer" aria-hidden="true" />
      <ValleyMagic />
      <div className="lx-spacer" aria-hidden="true" />
      <WallTicker variant="tryvalley" />
      <div className="lx-spacer" aria-hidden="true" />
      <PricingFaq variant="faq-only" frameClassName="lx-faq" />
    </main>
  )
}
