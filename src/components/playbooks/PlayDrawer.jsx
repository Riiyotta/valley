// Right-hand play drawer: native modal <dialog>, portalled to <body> (source function `he`).
// No open/close animation (measured). Esc / × / backdrop click call `close`.
import { Fragment, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowIcon, SIGNUP, channelLabel } from './shared.jsx'

function setupText(play) {
  const m = play.meta
  if (m?.listSource === 'csv') return 'Upload a CSV with LinkedIn profile URLs for the people you want to reach.'
  if (m?.listSource === 'salesnav') return 'Bring your Sales Navigator search URL.'
  if (m?.bring === 'paste') return 'Bring the relevant profile, post or source link.'
  if (m?.bring === 'both') return 'Bring your source links, or ask Scout to find a starting audience.'
  if (m?.bring === 'find') return 'Describe your target market so Scout can find the right starting point.'
  return 'Set your ideal customer criteria and connect the accounts you want to use.'
}

export default function PlayDrawer({ play, close }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const previous = document.activeElement
    dialog.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])

  return createPortal(
    <dialog
      className="vpl-dialog"
      ref={ref}
      aria-labelledby="vpl-detail-title"
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className="vpl-drawer">
        <button autoFocus className="vpl-close" aria-label="Close play details" onClick={close}>
          ×
        </button>
        <div className="vpl-detail-body">
          <span className="vpl-eyebrow">{play.soon ? 'Coming soon' : 'Valley playbook'}</span>
          <h2 id="vpl-detail-title">{play.title}</h2>
          <p className="vpl-description">{play.d}</p>
          <p className="vpl-channel">
            <strong>Outreach channel:</strong> {channelLabel(play)}
          </p>
          <div className="vpl-flow" aria-label="Workflow">
            {play.flow.map(([kind, label], i) => (
              <Fragment key={i}>
                <span data-kind={kind}>{kind === 'send' && /linkedin/i.test(label) ? 'LinkedIn only' : label}</span>
                {i < play.flow.length - 1 && <b aria-hidden="true">›</b>}
              </Fragment>
            ))}
          </div>
          <ol className="vpl-steps">
            {play.steps.map((step, i) => (
              <li key={i}>
                <span className="vpl-number">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.heading}</h3>
                  <p>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="vpl-setup">
            <h3>Before you launch</h3>
            <p>{setupText(play)}</p>
            {play.requiresLinkedInPremium && (
              <p>
                <strong>LinkedIn Premium is required to access profile viewers.</strong>
              </p>
            )}
            <dl>
              {play.conf.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          {play.q && (
            <div className="vpl-setup">
              <h3>Example search</h3>
              <p>{play.q}</p>
            </div>
          )}
          <p className="vpl-note">
            Review the audience, message and sending settings before starting. The channel shown is the sending channel
            for this play, not the source of its prospects.
          </p>
        </div>
        <div className="vpl-detail-footer">
          {play.soon ? (
            <p>
              This play is coming soon.{' '}
              <a
                href="/playbooks"
                onClick={(e) => {
                  e.preventDefault()
                  close()
                }}
              >
                Explore the available plays
              </a>
            </p>
          ) : (
            <a className="vpl-cta" href={SIGNUP}>
              Start for free <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </dialog>,
    document.body,
  )
}
