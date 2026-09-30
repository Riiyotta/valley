import '../styles/pricing-faq.css'

// CLONE_SPEC.md section 18 (pricing-faq). Markup mirrors the live `.valley-start-questions`
// component. FAQ uses native <details>; the spec declares no transition, so it snaps open/closed.
// Q&A copy verbatim from spec/states/faq.json.

const SIGNUP = 'https://beta.joinvalley.co/signup'

const INCLUDED = [
  'Find prospects through plays or your own lists.',
  'Qualify and research the people worth reaching.',
  'Write in your voice. Review before sending.',
  'Follow up on LinkedIn. Add email when you need it.',
]

const FAQ = [
  {
    q: 'What do I need to get started?',
    a: 'Tell Valley what you sell, who you sell to and how you write. Choose a play or bring your own list, connect your sending accounts, then review the outreach before launch.',
  },
  {
    q: 'Can I review and edit the messages?',
    a: 'Yes. Review, edit and approve drafts before they go out. You choose the sending schedule and follow-up steps for your campaign.',
  },
  {
    q: 'Does Valley send email as well as LinkedIn messages?',
    a: 'Yes. Combine email and LinkedIn in the same sequence. Email sending is an optional add-on on the base plan; the middle and upper plans include 1,000 email messages per month. Connect your Gmail or Microsoft inbox to send.',
  },
  {
    q: 'Which plan includes email and priority support?',
    a: 'Starter is $199/month or $149/month billed quarterly. Email sending, priority Slack support, and an onboarding call are optional add-ons. Plus, at $299/month or $249/month billed quarterly, includes 1,000 email messages per month, a priority support Slack group, and an onboarding call. Growth includes these benefits plus $300 in monthly credits.',
  },
  {
    q: 'What uses credits?',
    a: 'Finding new prospects, finding and verifying email addresses, and upgraded message generation use credits. Research, base message writing, imports and LinkedIn sending are included in the subscription.',
  },
  {
    q: 'How does the free trial work?',
    a: 'Eligible new subscribers get a 7-day trial. A payment method is required. Cancel before the trial ends to avoid starting the paid subscription.',
  },
]

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="m4 10 4 4 8-9" />
    </svg>
  )
}

// Variant props (defaults = homepage): variant="faq-only" drops the .vsq-offer block
// (/pricing, spec/pages/pricing.md 1); frameClassName is appended to the outer Framer layer
// so a page can restyle its wrapper padding.
export default function PricingFaq({ variant = 'full', frameClassName = '' }) {
  return (
    <section id="pricing-faq" className={frameClassName ? `pf-frame ${frameClassName}` : 'pf-frame'}>
      <div className="pf-container">
        <div className="valley-start-questions" role="region" aria-label="Plans and frequently asked questions">
          {variant !== 'faq-only' && (
            <div className="vsq-offer">
              <div>
                <div className="vsq-eyebrow">Make your next conversation count</div>
                <h2>
                  Start with one seat.
                  <br />
                  Put Valley to work.
                </h2>
                <div className="vsq-price">
                  <strong>$199</strong>
                  <span>/ seat / month</span>
                </div>
                <p className="vsq-billing">
                  Or $149/month, billed quarterly.
                  <br />
                  $447 every three months.
                </p>
                <div className="vsq-links">
                  <a className="vsq-primary" href={SIGNUP}>
                    Start for free
                  </a>
                  <a className="vsq-secondary" href="/pricing">
                    See plans <span aria-hidden="true">→</span>
                  </a>
                </div>
                <p className="vsq-trial">
                  7-day trial for eligible new subscribers.
                  <br />
                  Payment method required.
                </p>
              </div>
              <div className="vsq-included">
                <h3>Included in every plan.</h3>
                <ul className="vsq-list">
                  {INCLUDED.map((t) => (
                    <li key={t}>
                      <Check />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="vsq-seat">
                  One seat connects one LinkedIn account.
                  <br />
                  Email sending, priority Slack support, and an onboarding call are optional add-ons on this plan. Discovery and
                  enrichment use credits.
                </p>
              </div>
            </div>
          )}
          <div className="vsq-faq">
            <div>
              <h2>
                Questions,
                <br />
                answered.
              </h2>
              <p className="vsq-faq-intro">The practical details before your first campaign.</p>
            </div>
            <div className="vsq-questions">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>
                    {f.q}
                    <span className="vsq-plus" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
