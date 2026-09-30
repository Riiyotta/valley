import '../styles/integrations.css'
import { useState } from 'react'

// integrations (CLONE_SPEC.md section 15). Markup follows the site's `.vgs` integrations
// variant. Tabs are click/keyboard only: no autoplay, no transition (spec 15 / 19).
const SIGNUP = 'https://beta.joinvalley.co/signup'

const CLIENTS = {
  Claude: {
    prompt: 'Find companies hiring for roles that signal a need for our product. Build a play and show me the plan before launch.',
    response: 'Research the signal, find the buyers, and prepare the play for your review.',
    note: 'Connect Valley to Claude with your workspace’s MCP address.',
  },
  ChatGPT: {
    prompt: 'Show me the replies that need attention and draft a relevant follow-up for each.',
    response: 'Read the conversations, bring in their context, and prepare the next replies.',
    note: 'Connect Valley through ChatGPT’s custom MCP connector setup.',
  },
  API: {
    prompt: 'Your CRM → Valley API → researched prospects → your workflow',
    response: 'Connect prospect data, campaign actions and results to the tools your team already runs.',
    note: 'Use a workspace API key to connect your own tools and automations.',
  },
}
const KEYS = Object.keys(CLIENTS)

function Mark() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 45" aria-hidden="true" fill="currentColor">
      <path d="M11.8368 4.67773L21.796 14.637L18.3674 18.2288L13.796 22.9635H4V18.2288H18.3674L8.24491 8.26958L11.8368 4.67773Z M36.1632 4.67773L26.204 14.637L29.6326 18.2288L34.204 22.9635H44V18.2288H29.6326L39.7551 8.26958L36.1632 4.67773Z M8.24512 32.5954L24.0819 16.9219L39.9187 32.5954L36.4901 36.024L26.5309 26.228V40.2689H21.4697V26.228L11.6737 36.024L8.24512 32.5954Z" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  )
}

export default function Integrations() {
  const [active, setActive] = useState('Claude')
  const c = CLIENTS[active]

  const onKeyDown = (e, key) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const i = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (KEYS.indexOf(key) + (e.key === 'ArrowRight' ? 1 : 2)) % 3
    setActive(KEYS[i])
    document.getElementById('vgs-tab-' + KEYS[i])?.focus()
  }

  return (
    <section id="integrations">
      <section className="vgs vgs-section-integrations" style={{ width: '100%', position: 'relative' }}>
        <div className="vgs-wrap">
          <header className="vgs-header">
            <span className="vgs-eyebrow">Connected to the way you work</span>
            <h2>Your tools. Valley’s entire workflow.</h2>
            <p>
              Use Valley from Claude or ChatGPT through MCP. Connect your CRM, build with the API, and keep your outbound in the
              tools your team already uses.
            </p>
          </header>
          <div className="vgs-integration">
            <div className="vgs-hub">
              <div className="vgs-hub-center">
                <Mark />
                <b>Valley</b>
                <span>Research · Outreach · Replies</span>
              </div>
              <svg className="vgs-lines" viewBox="0 0 500 200" preserveAspectRatio="none" aria-hidden="true">
                <path d="M250 0C250 100 70 70 70 200M250 0V200M250 0C250 100 430 70 430 200" />
              </svg>
              <div className="vgs-toolrow">
                <span>
                  Claude<small>MCP</small>
                </span>
                <span>
                  ChatGPT<small>MCP</small>
                </span>
                <span>
                  HubSpot<small>CRM</small>
                </span>
              </div>
              <div className="vgs-toolrow vgs-toolrow-two">
                <span>
                  Your tools<small>API + webhooks</small>
                </span>
                <span>
                  LinkedIn + email<small>Connected accounts</small>
                </span>
              </div>
            </div>
            <div className="vgs-client">
              <div role="tablist" aria-label="Connection examples" className="vgs-tabs">
                {KEYS.map((key) => (
                  <button
                    key={key}
                    id={'vgs-tab-' + key}
                    role="tab"
                    aria-selected={active === key}
                    aria-controls="vgs-client-panel"
                    tabIndex={active === key ? 0 : -1}
                    onClick={() => setActive(key)}
                    onKeyDown={(e) => onKeyDown(e, key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div role="tabpanel" id="vgs-client-panel" aria-labelledby={'vgs-tab-' + active}>
                <span className="vgs-micro">ASK IN {active.toUpperCase()}</span>
                <p className="vgs-prompt">{c.prompt}</p>
                <div className="vgs-agent">
                  <Mark />
                  <p>{c.response}</p>
                </div>
                <p className="vgs-connection-note">{c.note} You choose which actions connected tools can take.</p>
                <a className="vgs-cta" href={SIGNUP}>
                  Start with Valley <Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
