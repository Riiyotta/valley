import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CASES from '../../data/casestudies/cases.js'
import NotFound from '../NotFound.jsx'
import CaseHero from '../../components/casestudies/CaseHero.jsx'
import CaseTestimonial from '../../components/casestudies/CaseTestimonial.jsx'
import CaseSidebar from '../../components/casestudies/CaseSidebar.jsx'
import CaseArticle from '../../components/casestudies/CaseArticle.jsx'
import MoreCaseStudies from '../../components/casestudies/MoreCaseStudies.jsx'
import WaitlistBand from '../../components/casestudies/WaitlistBand.jsx'
import FaqAccordion from '../../components/casestudies/FaqAccordion.jsx'
import '../../styles/pages/casestudies/shared.css'
import '../../styles/pages/casestudies/casestudy.css'

// Slugs can arrive percent-encoded (the homepage links to .../how-gocanvas-30x’d-... with a curly
// apostrophe). Compare fully decoded, NFC-normalised strings.
function normalise(s) {
  let out = s || ''
  for (let i = 0; i < 3 && /%[0-9a-f]{2}/i.test(out); i++) {
    try {
      out = decodeURIComponent(out)
    } catch {
      break
    }
  }
  return out.normalize('NFC').replace(/\/+$/, '').toLowerCase()
}

function findCase(slug) {
  const key = normalise(slug)
  return CASES.find((c) => normalise(c.slug) === key) || null
}

// /casestudies/:slug (spec/pages/casestudy.md).
export default function CaseStudy() {
  const { slug } = useParams()
  const c = findCase(slug)
  useEffect(() => {
    if (c) document.title = `${c.seoTitle}`
  }, [c])
  if (!c) return <NotFound />
  return (
    <main className="cs-page" key={c.slug}>
      <CaseHero c={c} />
      <CaseTestimonial c={c} />
      <section className="cs-body">
        <div className="cs-body-container">
          <CaseArticle c={c} />
          <CaseSidebar c={c} />
        </div>
      </section>
      <MoreCaseStudies />
      <WaitlistBand />
      <FaqAccordion />
    </main>
  )
}
