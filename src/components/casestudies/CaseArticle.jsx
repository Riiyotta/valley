import RichText from '../longform/RichText.jsx'
import InlineCtaCard, { CTA_IMAGES } from '../longform/InlineCtaCard.jsx'
import { caseBody } from '../../data/casestudies/placeholder.js'
import { ArrowUpGreen } from './shared.jsx'

// Article column (spec/pages/casestudy.md 4): CHALLENGES, pull-quote, CTA 1, SOLUTIONS, CTA 1,
// RESULTS, result stats, CTA 2. On phone only the middle CTA's form keeps the 16px padding (live
// Framer rule targets one of the three forms), so the other two get cs-cta-flat. Body copy is placeholder (placeholder.js); stats are the real heroStats.
const PULL_QUOTE_BG = '/assets/pages/templates/1yAumaR84b2Z0lmNLKMqNrgY.jpeg'

function toBlocks(blocks) {
  return blocks.map((b) => {
    if (b.type === 'ul') return { type: 'ul', items: b.items.map((it) => [{ t: 'strong', c: it.lead }, ' ', it.text]) }
    return { type: 'p', content: b.lead ? [{ t: 'strong', c: b.lead }, b.text ? ' ' + b.text : ''] : [b.text] }
  })
}

function Group({ s }) {
  return (
    <div className="cs-group">
      <div className="cs-chip cs-chip--dark">
        <span className="cs-chip-text">{s.chip}</span>
      </div>
      <div className="cs-group-body">
        <h2 className="cs-group-title">{s.title}</h2>
        <RichText blocks={toBlocks(s.blocks)} className="cs-rich" />
      </div>
    </div>
  )
}

export default function CaseArticle({ c }) {
  const body = caseBody(c.slug)
  const [challenges, solutions, results] = body.sections
  return (
    <div className="cs-article">
      <div className="cs-article-content">
        <Group s={challenges} />
        <div className="cs-pullquote">
          <img className="cs-pullquote-bg" src={PULL_QUOTE_BG} alt="" loading="lazy" decoding="async" />
          <div className="cs-pullquote-panel">
            <p className="cs-pullquote-mark">“</p>
            <h2 className="cs-pullquote-text">{body.pullQuote}</h2>
          </div>
        </div>
        <InlineCtaCard image={CTA_IMAGES[0]} className="cs-cta-flat" />
        <Group s={solutions} />
        <InlineCtaCard image={CTA_IMAGES[2]} />
        <Group s={results} />
        <div className="cs-results">
          {c.heroStats.map((s, i) => (
            <div className="cs-result" key={i}>
              <p className={`cs-result-label cs-result-label--${i}`}>{s.label}</p>
              <div className="cs-result-group">
                <h1 className="cs-result-value">{s.value}</h1>
                <div className={`cs-chip cs-chip--dark${i === 1 ? ' cs-chip--auto' : ''}`}>
                  <span className="cs-chip-icon cs-chip-icon--body">
                    <ArrowUpGreen id={`cs-arrow-grad-${i}`} />
                  </span>
                  <span className="cs-chip-text">{s.chip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <InlineCtaCard image={CTA_IMAGES[1]} className="cs-cta-flat" />
      </div>
    </div>
  )
}
