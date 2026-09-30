import { Link } from 'react-router-dom'
import ReadPill from './ReadPill.jsx'
import { CASE_STRIP } from '../../data/blog/indexContent.js'

// "Case Studies" strip (Framer "Blog List", blog-index.md section 5). The header pill has no
// href on the live site, so it stays a non-link. Cards link to /casestudies/<slug>.
// The live per-card "Load More" button is clipped and never visible, so it is not rendered.
export default function CaseStudyStrip() {
  return (
    <section className="bl-cases">
      <div className="bl-cases-inner">
        <div className="bl-cases-head">
          <h2>Case Studies</h2>
          <ReadPill tall />
        </div>
        <div className="bl-cases-grid">
          {CASE_STRIP.map((c) => (
            <div className="bl-case-cell" key={c.slug}>
              <Link className="bl-case" to={`/casestudies/${c.slug}`}>
                <div className="bl-case-card">
                  <div className="bl-case-main">
                    <img className="bl-case-logo" src={c.logo} alt={c.logoAlt} loading="lazy" decoding="async" />
                    <h2>{c.title}</h2>
                    <div className="bl-case-meta">
                      <div className="bl-case-person">
                        <img src={c.avatar} alt={c.avatarAlt} loading="lazy" decoding="async" />
                        <div>
                          <p className="bl-case-name">{c.person.name}</p>
                          <p className="bl-case-role">{c.person.role}</p>
                        </div>
                      </div>
                      <div className="bl-case-stats">
                        {c.stats.map((s) => (
                          <div key={s.label}>
                            <p className="bl-case-value">{s.value}</p>
                            <p className="bl-case-label">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ReadPill />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
