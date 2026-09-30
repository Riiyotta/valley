import { Link } from 'react-router-dom'
import CASES from '../../data/casestudies/cases.js'
import { ReadPill } from './shared.jsx'

// "More Case Studies" (spec/pages/casestudy.md 5). The live block always shows the first two case
// studies (Gallea AI and SaanSerif) with these fixed compact-card stat labels. Live bug fixed: the
// cards link to their case study instead of "./".
const MORE = [
  { slug: CASES[0].slug, stats: [{ value: '$600K+', label: 'Pipeline Expanded' }, { value: '14', label: 'More Meetings' }] },
  { slug: CASES[1].slug, stats: [{ value: '$480K+', label: 'Pipeline Expanded' }, { value: '16', label: 'More Meetings' }] },
]

function CompactCard({ c, stats }) {
  return (
    <div className="cs-more-cell">
      <Link className="cs-more-link" to={`/casestudies/${c.slug}`}>
        <div className="cs-more-card">
          <div className="cs-more-top">
            <div className="cs-more-logo-row">
              <div className="cs-more-logo">{c.logo && <img src={c.logo} alt={c.logoAlt} loading="lazy" decoding="async" />}</div>
              <p className="cs-more-kind">Case Study</p>
            </div>
            <h2 className="cs-more-title">{c.title}</h2>
            <div className="cs-more-meta">
              <div className="cs-more-person">
                {c.avatar && <img src={c.avatar} alt={c.person.name} loading="lazy" decoding="async" />}
                <div className="cs-more-who">
                  <p className="cs-more-name">{c.person.name}</p>
                  <p className="cs-more-sub">{c.person.role}</p>
                </div>
              </div>
              <div className="cs-more-stats">
                {stats.map((s, i) => (
                  <div className="cs-more-stat" key={i}>
                    <p className="cs-more-name">{s.value}</p>
                    <p className="cs-more-sub">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ReadPill size="compact" />
        </div>
      </Link>
    </div>
  )
}

export default function MoreCaseStudies() {
  return (
    <section className="cs-more">
      <div className="cs-more-inner">
        <h2 className="cs-more-heading">More Case Studies</h2>
        <div className="cs-more-grid">
          {MORE.map((m) => {
            const c = CASES.find((x) => x.slug === m.slug)
            return <CompactCard c={c} stats={m.stats} key={m.slug} />
          })}
        </div>
      </div>
    </section>
  )
}
