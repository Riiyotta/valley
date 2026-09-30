import { ArrowUpWhite } from './shared.jsx'

// Dark hero with the title and 3 stats (spec/pages/casestudy.md 2). Data: cases.json heroStats.
export default function CaseHero({ c }) {
  return (
    <section className="cs-hero">
      <div className="cs-hero-pad">
        <div className="cs-hero-frame">
          <div className="cs-hero-title-row">
            <h1 className="cs-hero-title">{c.title}</h1>
          </div>
          <div className="cs-hero-stats">
            {c.heroStats.map((s, i) => (
              <div className="cs-hero-stat" key={i}>
                <p className="cs-hero-stat-label">{s.label}</p>
                <div className="cs-hero-stat-group">
                  <p className="cs-hero-stat-value">{s.value}</p>
                  <div className={`cs-chip cs-chip--light${i === 1 ? ' cs-chip--auto' : ''}`}>
                    <span className="cs-chip-icon">
                      <ArrowUpWhite />
                    </span>
                    <span className="cs-chip-text">{s.chip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
