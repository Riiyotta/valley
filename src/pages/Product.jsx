import Hero from '../components/Hero.jsx'
import Logos from '../components/Logos.jsx'
import Showcase from '../components/Showcase.jsx'
import Stories from '../components/Stories.jsx'
import TeamFit from '../components/TeamFit.jsx'
import Comparison from '../components/Comparison.jsx'
import PricingFaq from '../components/PricingFaq.jsx'
import Workflow from '../components/product/Workflow.jsx'
import '../styles/pages/product/product.css'

// /product, section order from spec/pages/product.md section 1. Nav (with its load appear)
// and footer come from routes/Layout.jsx. No closing CTA, no stories header.
export default function Product() {
  return (
    <main className="product-page">
      <Hero variant="product" />
      <Logos />
      <Showcase frameClassName="pd-showcase" />
      <Workflow />
      <Stories showHeader={false} frameClassName="pd-frame" />
      <TeamFit frameClassName="pd-frame" />
      <div className="pd-comparison" data-framer-name="product-comparison-current">
        <div className="pd-comparison-container">
          <Comparison compact />
        </div>
      </div>
      <PricingFaq frameClassName="pd-frame" />
    </main>
  )
}
