import { Link } from 'react-router-dom'
import { RESEARCH_REPORTS } from '../../data/blog/indexContent.js'

// "2026 outbound research library" panel (blog-index.md section 3).
export default function ResearchLibrary() {
  return (
    <section className="bl-research">
      <div className="bl-research-panel">
        <h2>The 2026 outbound research library</h2>
        <p className="bl-research-intro">
          Five reports. Nineteen direct comparisons. A clearer view of the complete outbound workflow.
        </p>
        <div className="bl-research-grid">
          {RESEARCH_REPORTS.map((r) => (
            <Link key={r.slug} className="bl-report" to={`/blog/${r.slug}`}>
              <img src={r.image} alt={r.alt} loading="lazy" decoding="async" />
              <h3>{r.title}</h3>
              <p>{r.summary}</p>
            </Link>
          ))}
        </div>
        <Link className="bl-research-btn" to="/compare">
          Explore all 19 comparisons ↗
        </Link>
      </div>
    </section>
  )
}
