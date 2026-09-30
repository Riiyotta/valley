import PricingHero from '../components/pricing/PricingHero.jsx'
import Plans from '../components/pricing/Plans.jsx'
import Studios from '../components/pricing/Studios.jsx'
import CalendarSection from '../components/pricing/CalendarSection.jsx'
import Stories from '../components/Stories.jsx'
import PricingFaq from '../components/PricingFaq.jsx'
import '../styles/pages/pricing/pricing.css'

// /pricing, section order from spec/pages/pricing.md section 1. Nav (with its load appear)
// and footer come from routes/Layout.jsx. No closing CTA on this page.
export default function Pricing() {
  return (
    <main className="pricing-page">
      <PricingHero />
      <Plans />
      <section className="pr-spacer" aria-hidden="true" data-framer-name="Spacer" />
      <Studios />
      <Stories showHeader={false} frameClassName="pr-proof" />
      <CalendarSection />
      <PricingFaq variant="faq-only" frameClassName="pr-faq" />
    </main>
  )
}
