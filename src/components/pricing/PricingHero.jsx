import Reveal from './Reveal.jsx'

// /pricing "Hero Section" (Framer layer), spec/pages/pricing.md section 2.
// Only the label animates in (appear-in-view, y 15, threshold .5); h1 and sub are static.
export default function PricingHero() {
  return (
    <section className="pr-hero" data-framer-name="Hero Section">
      <div className="pr-hero-content">
        <div className="pr-hero-head">
          <Reveal className="pr-hero-label" y={15} threshold={0.5}>
            <p>PLANS THAT GROW WITH YOU</p>
          </Reveal>
          <h1 className="pr-hero-title">Your outbound platform. Your level of support.</h1>
          <p className="pr-hero-sub">
            Every plan includes prospecting, qualification, research, and personalized LinkedIn outreach. Add email and
            hands-on support, or choose a plan that includes them.
          </p>
        </div>
      </div>
    </section>
  )
}
