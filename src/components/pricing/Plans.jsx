import { useState } from 'react'
import '../../styles/pages/pricing/plans.css'

// .vp-plans ("pricing-three-plans"), spec/pages/pricing.md section 3. Markup, data and copy
// mirror the live component source (spec/pages/pricing/source, function Yn / data Xn).
// Billing toggle swaps prices instantly (no transition), default Monthly.

const SIGNUP = 'https://beta.joinvalley.co/signup'
const DEMO = 'https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b'

const PLANS = [
  {
    name: 'Starter',
    monthly: 199,
    quarterly: 149,
    description: 'LinkedIn only. The full outbound platform, run your way.',
    features: [
      'Prospecting, qualification, and research',
      'Messages written in your voice',
      'LinkedIn campaigns and follow-ups',
      'Campaign analytics and reply management',
      'Unified inbox',
      'ICP Scoring',
      'Valley AI Copilot (Scout)',
      'CRM, API and MCP integrations (HubSpot, Claude, etc.)',
      'Live chat support',
    ],
    extra: 'Optional add-ons: email sending, priority Slack support, and an onboarding call.',
    cta: 'Start for free',
  },
  {
    name: 'Plus',
    monthly: 299,
    quarterly: 249,
    description: 'LinkedIn + email. Multichannel outreach with a team in your corner.',
    features: [
      'Everything in Starter',
      '1,000 email messages per month',
      'Slack group for priority support',
      'An onboarding call',
      'Dedicated customer success manager',
      'Email waterfall enrichment (15+ data providers)',
      'Admin access & view',
    ],
    extra: 'Additional credits available separately.',
    cta: 'Book a demo',
  },
  {
    name: 'Growth',
    monthly: 499,
    quarterly: 419,
    description: 'LinkedIn + email. More credits to find your next buyers.',
    features: [
      'Everything in Plus',
      '1,000 email messages per month',
      'Priority Slack support and onboarding',
      '$300 in additional credits every month',
    ],
    extra: 'For teams that need more discovery and enrichment.',
    cta: 'Book a demo',
  },
]

export default function Plans() {
  const [quarterly, setQuarterly] = useState(false)
  return (
    <div className="pr-plans-frame" data-framer-name="pricing-three-plans">
      <div className="pr-plans-container">
        <section className="vp-plans" aria-label="Valley plans">
          <div className="vp-toggle" aria-label="Billing period">
            <button type="button" aria-pressed={!quarterly} onClick={() => setQuarterly(false)}>
              Monthly
            </button>
            <button type="button" aria-pressed={quarterly} onClick={() => setQuarterly(true)}>
              Quarterly · save
            </button>
          </div>
          <div className="vp-grid">
            {PLANS.map((p, i) => (
              <article className="vp-card" key={p.name}>
                <h3>{p.name}</h3>
                <p className="vp-desc">{p.description}</p>
                <div className="vp-price">
                  <strong>
                    {'$'}
                    {quarterly ? p.quarterly : p.monthly}
                  </strong>
                  <span>/ seat / month</span>
                </div>
                <p className="vp-bill">
                  {quarterly ? `$${p.quarterly * 3} billed every three months.` : 'Billed monthly.'}
                  <br />
                  {i === 0 ? '7-day trial. Payment method required.' : 'Includes email, priority support, and onboarding.'}
                </p>
                <a className="vp-button" href={i === 0 ? SIGNUP : DEMO}>
                  {p.cta} <span aria-hidden="true">{' →'}</span>
                </a>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <p className="vp-extra">{p.extra}</p>
              </article>
            ))}
          </div>
          <div className="vp-scale">
            <div>
              <strong>Need a larger team setup?</strong>
              <p>Valley Scale offers custom pricing for teams of five seats or more.</p>
            </div>
            <a href={DEMO}>Talk to sales →</a>
          </div>
        </section>
      </div>
    </div>
  )
}
