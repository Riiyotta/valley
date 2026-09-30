import { useId, useState } from 'react'
import '../styles/closing-cta.css'

// CLONE_SPEC.md section 18 (closing-cta). Markup mirrors the live `.vcc` component.
// Form: the spec says the clone can just validate and redirect (no Surface POST).

const SIGNUP = 'https://beta.joinvalley.co/signup'

// Only the domains the spec names; the live component's full list was not captured.
const PERSONAL_DOMAINS = new Set(['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'proton.me'])

const PERSONAL_ERROR =
  'Please use your company email address, rather than a personal inbox such as Gmail.'

export default function ClosingCta() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    const domain = email.trim().split('@')[1]?.toLowerCase() ?? ''
    if (PERSONAL_DOMAINS.has(domain)) {
      setError(PERSONAL_ERROR)
      return
    }
    setError('')
    setBusy(true)
    window.location.assign(SIGNUP)
  }

  return (
    <section id="closing-cta" className="vcc" style={{ width: '100%', position: 'relative' }}>
      <div className="vcc-scene">
        <div className="vcc-content">
          <span className="vcc-eyebrow">A new way to reach your next customer</span>
          <h2>
            Your people are out there.
            <br />
            <span>Let Valley find them.</span>
          </h2>
          <p>Start with your work email. Turn the right signals into relevant conversations, in your voice.</p>
          <form className="vcc-form" aria-label="Get started with Valley" aria-busy={busy} onSubmit={onSubmit}>
            <div className="vcc-fields">
              <label htmlFor={`${id}-email`}>
                Work email
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={error ? 'true' : 'false'}
                  required
                  maxLength={254}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                />
              </label>
              <button type="submit" disabled={busy}>
                Start for free<span aria-hidden="true">→</span>
              </button>
            </div>
            {error && (
              <div className="vcc-error" role="alert">
                <p>{error}</p>
              </div>
            )}
            <p className="vcc-next">
              Next, create your free account. <a href="/privacy-policy">Privacy policy</a>
            </p>
          </form>
          <div className="vcc-bottom">
            <span>Find your people.</span>
            <span>Give them a reason to reply.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
