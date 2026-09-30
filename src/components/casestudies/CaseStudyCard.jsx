import { ReadPill } from './shared.jsx'

// /casestudies grid card (spec/pages/casestudies-index.md 3). The card is not a link; only the Read pill is.
// Cards without a logo or avatar (the "Sales Director 6x'd" story) drop those slots, as measured live.
export default function CaseStudyCard({ c }) {
  return (
    <article className="csi-card">
      <div className="csi-card-cover">
        <img src={c.cover} alt={c.coverAlt} loading="lazy" decoding="async" />
      </div>
      <div className="csi-card-body">
        {c.logo && (
          <div className="csi-card-logo">
            <img src={c.logo} alt={c.logoAlt} loading="lazy" decoding="async" />
          </div>
        )}
        <h2 className="csi-card-title">{c.title}</h2>
        <div className="csi-card-meta">
          <div className="csi-card-person">
            {c.avatar && <img className="csi-card-avatar" src={c.avatar} alt={c.person.name} loading="lazy" decoding="async" />}
            <div className="csi-card-who">
              <p className="csi-card-name">{c.person.name}</p>
              <p className="csi-card-role">{c.person.role}</p>
            </div>
          </div>
          <div className="csi-card-stats">
            {c.cardStats.map((s, i) => (
              <div className="csi-card-stat" key={i}>
                <p className="csi-card-stat-value">{s.value}</p>
                <p className="csi-card-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <ReadPill href={`/casestudies/${c.slug}`} size="card" />
      </div>
    </article>
  )
}
