import BlogHero from '../../components/blog/BlogHero.jsx'
import ResearchLibrary from '../../components/blog/ResearchLibrary.jsx'
import BlogCardGrid from '../../components/blog/BlogCardGrid.jsx'
import CaseStudyStrip from '../../components/blog/CaseStudyStrip.jsx'
import PricingFaq from '../../components/PricingFaq.jsx'
import '../../styles/pages/blog/blog-index.css'

// /blog, section order from spec/pages/blog-index.md section 1. Nav and footer come from
// routes/Layout.jsx. The FAQ is the homepage .vsq-faq half (PricingFaq variant="faq-only")
// inside the page's own 48px wrapper.
export default function BlogIndex() {
  return (
    <main className="bl-index">
      <BlogHero />
      <ResearchLibrary />
      <BlogCardGrid />
      <CaseStudyStrip />
      <PricingFaq variant="faq-only" frameClassName="bl-faq" />
    </main>
  )
}
