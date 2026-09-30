import { useEffect } from 'react'
import CASES from '../../data/casestudies/cases.js'
import CaseStudyCard from '../../components/casestudies/CaseStudyCard.jsx'
import VideoTestimonials from '../../components/casestudies/VideoTestimonials.jsx'
import CustomerLogoBand from '../../components/casestudies/CustomerLogoBand.jsx'
import PricingFaq from '../../components/PricingFaq.jsx'
import { goToSurface } from '../../components/casestudies/shared.jsx'
import '../../styles/pages/casestudies/shared.css'
import '../../styles/pages/casestudies/index.css'

// /casestudies (spec/pages/casestudies-index.md). All 21 cards render at once: no filters,
// no pagination, no Load More.
export default function CaseStudiesIndex() {
  useEffect(() => {
    document.title = 'Valley AI Customers - Real Replies, Real Pipeline'
  }, [])
  return (
    <main className="csi-page">
      <section className="csi-hero">
        <div className="csi-hero-inner">
          <div className="csi-hero-text">
            <h1 className="csi-hero-title">Real teams. Real outbound results.</h1>
            <h2 className="csi-hero-sub">
              See how founders, sales teams, and agencies use Valley to turn relevant outreach into meetings and pipeline.
            </h2>
          </div>
          <form className="csi-hero-form" onSubmit={goToSurface} noValidate>
            <label className="csi-hero-input">
              <input type="email" name="email" required placeholder="Your Work Email" aria-label="Your Work Email" autoComplete="email" />
            </label>
            <button type="submit" className="csi-hero-btn">
              Book a call
            </button>
          </form>
        </div>
      </section>

      <section className="csi-list-wrap">
        <div className="csi-list">
          <div className="csi-list-inner">
            <h2 className="csi-list-title">Case Studies</h2>
            <div className="csi-grid">
              {CASES.map((c) => (
                <CaseStudyCard c={c} key={c.slug} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonials />
      <CustomerLogoBand />
      <PricingFaq variant="faq-only" frameClassName="csi-faq" />
    </main>
  )
}
