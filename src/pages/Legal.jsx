import { Fragment, useEffect, useMemo } from 'react'
import { termsBody, privacyRuns } from '../components/legal/legalPlaceholder.js'
import '../styles/pages/legal/legal.css'

// /terms-of-service and /privacy-policy (spec/pages/legal.md). Centred 760px text column, real h1,
// placeholder body in the live structure. No motion; body link hover only.
const TITLES = {
  terms: { h1: 'Valley Terms of Service', doc: 'Valley Terms of Service' },
  privacy: { h1: 'Privacy Policy: Valley LinkedIn Outreach Platform', doc: 'Privacy Policy: Valley LinkedIn Outreach Platform' },
}

function Terms() {
  const paras = useMemo(termsBody, [])
  return (
    <div className="lg-body">
      {paras.map((p, i) =>
        p === null ? (
          <p key={i}>
            <br />
          </p>
        ) : (
          <p key={i}>
            {p.lead && <strong>{p.lead}</strong>}
            {p.lead && ' '}
            {p.link ? (
              <>
                {p.text.slice(0, 60)}{' '}
                <a className="lg-link" href="https://joinvalley.co/" target="_blank" rel="noopener noreferrer">
                  Valley
                </a>{' '}
                {p.text.slice(60)}
              </>
            ) : (
              p.text
            )}
          </p>
        ),
      )}
    </div>
  )
}

function Privacy() {
  const runs = useMemo(privacyRuns, [])
  return (
    <div className="lg-body">
      <p>
        {runs.map((r, i) => {
          if (r.t === 'br') return <br key={i} />
          if (r.t === 'strong') return <strong key={i}>{r.v}</strong>
          if (r.t === 'emstrong')
            return (
              <em key={i}>
                <strong>{r.v}</strong>
              </em>
            )
          if (r.t === 'link')
            return (
              <a key={i} className={r.primary ? 'lg-link' : 'lg-link lg-link--plain'} href={r.href} target="_blank" rel="noopener noreferrer">
                {r.strong ? <strong>{r.label}</strong> : r.label}
              </a>
            )
          return <Fragment key={i}>{r.v}</Fragment>
        })}
      </p>
    </div>
  )
}

export default function Legal({ kind = 'terms' }) {
  const t = TITLES[kind] || TITLES.terms
  useEffect(() => {
    document.title = t.doc
  }, [t.doc])
  return (
    <main className="lg-page">
      <div className="lg-col">
        <div className="lg-title">
          <h1>{t.h1}</h1>
          {kind === 'terms' && <p className="lg-subtitle">Placeholder terms: study-only clone</p>}
        </div>
        {kind === 'privacy' ? <Privacy /> : <Terms />}
      </div>
    </main>
  )
}
