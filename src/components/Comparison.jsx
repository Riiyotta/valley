// .vc "Valley vs. Competition": full on /compare, `compact` on /product (<Comparison compact />).
// Ported from spec/pages/compare/source/ValleyWorkflowComparison.wJFjzal1.mjs (component `y`);
// data from src/data/compareCompetitors.js; styles in src/styles/pages/compare/vc.css.
// Picker state is local: switching competitors never touches the URL.
import { useEffect, useState } from 'react'
import '../styles/pages/compare/vc.css'
import { CATEGORIES, COMPANIES, PRICING, RECORDS, STAGES } from '../data/compareCompetitors.js'
import TrackDiagram from './compare/TrackDiagram.jsx'
import { ChannelBadges, CompanyLabel, Status, ValleyMark, channelFacts, channelName } from './compare/parts.jsx'

const ALL = 'All competitors'
// Framer prop default (the component's `demoLink`); /compare passes the HubSpot link.
const DEFAULT_DEMO = 'https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b'
const EXT = { target: '_blank', rel: 'noopener noreferrer' }

export default function Comparison({ compact = false, demoLink = DEFAULT_DEMO, initialCompetitor = 'heyreach' }) {
  const [selected, setSelected] = useState(initialCompetitor)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL)
  const [showAll, setShowAll] = useState(false)
  useEffect(() => setSelected(initialCompetitor), [initialCompetitor])

  const company = COMPANIES.find((c) => c.id === selected) || COMPANIES[0]
  const record = RECORDS.find((r) => r.id === company.id)
  const pricing = PRICING.find((p) => p.id === company.id)
  const q = query.trim().toLowerCase()
  const visible = COMPANIES.filter(
    (c, i) =>
      (showAll || query || category !== ALL || i < 10 || c.id === selected) &&
      (category === ALL || c.group === category) &&
      `${c.name} ${c.focus}`.toLowerCase().includes(q),
  )
  const Title = compact ? 'h2' : 'h1'
  const Heading = compact ? 'h3' : 'h2'

  return (
    <section className={`vc ${compact ? 'vc-compact' : ''}`} style={{ position: 'relative' }} aria-label="Valley vs. Competition">
      <header className="vc-intro">
        <div>
          <div className="vc-eyebrow">Valley vs. Competition</div>
          <Title>
            The whole workflow.
            <br />
            A clearer choice.
          </Title>
        </div>
        <p>From the first buying signal to the next conversation. See what happens in Valley, and what each alternative brings.</p>
      </header>

      <div className="vc-picker">
        <div className="vc-picker-top">
          <span className="vc-picker-label">Compare Valley with</span>
          <div className="vc-picker-controls">
            <input
              aria-label="Search competitors"
              type="search"
              placeholder="Find a competitor"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select aria-label="Competitor category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="vc-companies">
          {visible.map((c) => (
            <button
              key={c.id}
              type="button"
              className="vc-company"
              aria-pressed={selected === c.id}
              onClick={() => setSelected(c.id)}
            >
              <CompanyLabel company={c} />
            </button>
          ))}
          {!query && category === ALL && (
            <button type="button" className="vc-more" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show featured' : 'All 19 competitors'}
            </button>
          )}
        </div>
        {!visible.length && (
          <p className="vc-empty" role="status">
            No match. Try another name or category.
          </p>
        )}
      </div>

      {/* Keyed per competitor: remounting restarts vc-light-pass and vc-trace-in (measured). */}
      <div className="vc-main" key={record.id}>
        <header className="vc-comparison-heading">
          <div>
            <Heading>
              Valley <span>vs.</span> {company.name}
            </Heading>
            <p>{company.focus}</p>
          </div>
          <a className="vc-article-link" href={company.article}>
            Read the full comparison ↗
          </a>
        </header>
        <p className="vc-reading-guide">
          <strong>Start with the signal. Follow it to the reply.</strong>
          <span>Read left to right. Valley is the upper track; {company.name} is below.</span>
        </p>

        <TrackDiagram company={company} record={record} />

        <div className="vc-timeline" aria-label="Seven-stage workflow overview">
          <div className="vc-timeline-head">
            <span>
              <ValleyMark />
              Valley
            </span>
            <span className="vc-mobile-competitor">
              <span>
                <CompanyLabel company={company} />
              </span>
              <ChannelBadges record={record} />
            </span>
          </div>
          <ol>
            {STAGES.map((stage, i) => (
              <li key={stage.id}>
                <h4>
                  <span>0{i + 1}</span>
                  {stage.label}
                </h4>
                <p className="vc-stage-criterion">
                  <strong>What counts</strong> {record.stages[i].criterion || stage.criterion}
                </p>
                <div>
                  <Status status="native" />
                  <p>{stage.summary}</p>
                </div>
                <div data-status={record.stages[i].status}>
                  <Status status={record.stages[i].status} />
                  <p>{record.stages[i].summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="vc-legend">
          <div className="vc-legend-items">
            <span>
              <b aria-hidden="true">✓</b> Built in
            </span>
            <span>
              <b aria-hidden="true">◐</b> Limited / external
            </span>
            <span>
              <b aria-hidden="true">—</b> No confirmed coverage
            </span>
          </div>
          <p>
            Email is included with Plus; optional on Starter. Open the stage guide for definitions; the detailed
            comparison retains each exact status and source.
          </p>
        </div>

        <details className="vc-criteria">
          <summary>
            What each stage means <span>7 steps in the workflow</span>
          </summary>
          <ol>
            {STAGES.map((stage, i) => (
              <li key={stage.id}>
                <h4>
                  <span>0{i + 1}</span>
                  {stage.label}
                </h4>
                <p>{record.stages[i].criterion || stage.criterion}</p>
              </li>
            ))}
          </ol>
        </details>

        {!compact && (
          <>
            <section className="vc-differences">
              <h3>{company.headline}</h3>
              <ol>
                {record.advantages.slice(0, 3).map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ol>
            </section>

            {pricing && (
              <section className="vc-pricing" aria-label="Pricing comparison">
                <h3>Compare the commitment, too.</h3>
                <div className="vc-pricing-grid">
                  <div>
                    <h4>Valley Starter</h4>
                    <p className="vc-price-amount">
                      $199<span> / month</span>
                    </p>
                    <p>Or $149/month billed quarterly ($447 per quarter). Email is an optional add-on; included with Plus.</p>
                    <a href="/pricing">Valley plans ↗</a>
                  </div>
                  <div>
                    <h4>{company.name}</h4>
                    <p>{pricing.summary}</p>
                    <a href={pricing.sourceUrl} {...EXT}>
                      Pricing source ↗
                    </a>
                  </div>
                </div>
              </section>
            )}

            <section className="vc-table-section">
              <h3>Every stage, side by side.</h3>
              <table className="vc-table">
                <caption>
                  Valley and {company.name}: public product documentation. “Not verified” does not mean unavailable.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">The work</th>
                    <th scope="col">Valley</th>
                    <th scope="col">{company.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {STAGES.map((stage, i) => {
                    const s = record.stages[i]
                    const facts = channelFacts(record)
                    return (
                      <tr key={stage.id}>
                        <th scope="row">{stage.label}</th>
                        <td>
                          <Status status="native" />
                          <p>{stage.summary}</p>
                          <a href={i === 4 ? '/pricing' : '/product'}>Product details ↗</a>
                        </td>
                        <td>
                          <Status status={s.status} />
                          <p>{s.summary}</p>
                          {stage.id === 'reach' && facts.length > 0 && (
                            <ul className="vc-channel-details">
                              {facts.map((f) => (
                                <li key={f.id}>
                                  <strong>{channelName(f.id)}</strong>
                                  <Status status={f.status} />
                                  <p>{f.summary}</p>
                                  <a href={f.sourceUrl} {...EXT}>
                                    {channelName(f.id)} source ↗
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                          {s.condition && !s.condition.startsWith('Product-level documentation') && (
                            <p className="vc-condition">{s.condition}</p>
                          )}
                          <a href={s.sourceUrl} {...EXT}>
                            View source ↗
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>
          </>
        )}
      </div>

      {!compact && (
        <aside className="vc-proof">
          <div>
            <div className="vc-eyebrow">Bolt.new, with Valley</div>
            <blockquote>“Valley is a cheat code.”</blockquote>
            <p>Stefano McCoy · Sales, Bolt.new. $1M+ pipeline in the first 60 days.</p>
          </div>
          <a href="/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days">
            Read the customer story ↗
          </a>
        </aside>
      )}

      <div className="vc-close">
        <div>
          <h3>{compact ? 'Compare the work. Then decide.' : 'Bring a prospect. Judge the work.'}</h3>
          <p>
            {compact
              ? 'Explore all seven stages and the details behind each comparison.'
              : 'Starter begins at $199/month, or $149/month billed quarterly. Choose Plus for included email, priority Slack support, and onboarding.'}
          </p>
        </div>
        <div className="vc-actions">
          <a href={compact ? '/compare' : '/pricing'}>{compact ? 'Valley vs. Competition ↗' : 'Compare plans ↗'}</a>
          <a className="vc-cta" href={demoLink}>
            See Valley in action <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {!compact && (
        <>
          <nav className="vc-directory" aria-label="Detailed competitor comparisons">
            <h3>Find your comparison</h3>
            <div className="vc-directory-links">
              {COMPANIES.map((c) => (
                <a key={c.id} href={c.article}>
                  Valley vs. {c.name} ↗
                </a>
              ))}
            </div>
          </nav>
          <section className="vc-method" key={record.id}>
            <h3>How we compare</h3>
            <div>
              <p>
                Published by Valley. Sources checked September 14, 2026. We compare public product documentation across
                seven stages, not hands-on benchmark results. Writing cells distinguish variables, instructed AI copy, and
                learned voice. Features and availability may vary by plan. “Not verified” means the available evidence
                does not establish the capability. Check each source and the package you would buy.
              </p>
              <div className="vc-source-links">
                {record.sources.map(({ label, url }, i) => (
                  <a key={i} href={url} {...EXT}>
                    {company.name}: {label} ↗
                  </a>
                ))}
                <a href="/product">Valley product ↗</a>
                <a href="mailto:hey@joinvalley.co">Suggest a correction ↗</a>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  )
}
