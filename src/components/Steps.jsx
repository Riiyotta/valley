import { useEffect, useRef, useState } from 'react'
import '../styles/steps.css'

// CLONE_SPEC.md section 12 (steps) + section 19 (step nav / vgs states) + section 20 row 9.
// Markup mirrors the live `section.vgs.vgs-section-walkthrough` from the saved page.

const SIGNUP = 'https://beta.joinvalley.co/signup'

// Live SVGs (assets/svg/10-vgs-a.svg and 11-valley-asterisk-mark.svg), inlined for currentColor.
function Arrow() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  )
}

function Mark() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 45" aria-hidden="true" fill="currentColor">
      <path d="M11.8368 4.67773L21.796 14.637L18.3674 18.2288L13.796 22.9635H4V18.2288H18.3674L8.24491 8.26958L11.8368 4.67773Z M36.1632 4.67773L26.204 14.637L29.6326 18.2288L34.204 22.9635H44V18.2288H29.6326L39.7551 8.26958L36.1632 4.67773Z M8.24512 32.5954L24.0819 16.9219L39.9187 32.5954L36.4901 36.024L26.5309 26.228V40.2689H21.4697V26.228L11.6737 36.024L8.24512 32.5954Z" />
    </svg>
  )
}

function WindowHead({ title }) {
  return (
    <div className="vgs-window-head">
      <Mark />
      <strong>{title}</strong>
      <span>Valley</span>
    </div>
  )
}

function Check({ title, text }) {
  return (
    <div className="vgs-check">
      <span>✓</span>
      <div>
        <b>{title}</b>
        <p>{text}</p>
      </div>
    </div>
  )
}

const STEPS = ['Connect', 'Choose a play', 'Launch']

const SCENES = [
  '/assets/img/PFm0moxeBn8eOm66rVN2ssTio.png',
  '/assets/img/5WP0tI1lICNwC23waJVfpSCTTpE.png',
  '/assets/img/V5YzrhTWz6oX6qYDyJJzGKbRnIU.png',
]

function Scene({ index, children }) {
  return (
    <div className="vgs-scene" style={{ backgroundImage: `url(${SCENES[index]})` }}>
      <span className="vgs-scene-caption">A look inside the workflow</span>
      <div className="vgs-window">{children}</div>
    </div>
  )
}

export default function Steps() {
  const [active, setActive] = useState(0)
  const bodyRef = useRef(null)

  // Active step = the last article[data-step] whose top < 0.45 * innerHeight (instant switch).
  useEffect(() => {
    const update = () => {
      const articles = bodyRef.current?.querySelectorAll('article[data-step]')
      if (!articles) return
      let next = 0
      articles.forEach((a, i) => {
        if (a.getBoundingClientRect().top < 0.45 * window.innerHeight) next = i
      })
      setActive(next)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const goTo = (e, i) => {
    const target = document.getElementById(`valley-step-${i}`)
    if (!target) return
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section id="steps" className="vgs vgs-section-walkthrough" style={{ width: '100%', position: 'relative' }}>
      <div className="vgs-wrap">
        <header className="vgs-header">
          <span className="vgs-eyebrow">From your website to your next conversation</span>
          <h2>
            A few clicks to start.
            <br />A whole new way to reach out.
          </h2>
          <p>Bring your business. Valley brings the research, the relevance and the follow-through.</p>
        </header>
        <div className="vgs-walk">
          <nav className="vgs-stepnav" aria-label="How Valley works">
            {STEPS.map((label, i) => (
              <a
                key={label}
                href={`#valley-step-${i}`}
                aria-current={active === i ? 'step' : undefined}
                onClick={(e) => goTo(e, i)}
              >
                <span>0{i + 1}</span>
                {label}
                <Arrow />
              </a>
            ))}
          </nav>
          <div className="vgs-stepbody" ref={bodyRef}>
            <article id="valley-step-0" data-step="0">
              <div className="vgs-stepcopy">
                <span className="vgs-eyebrow">01 / Connect</span>
                <h3>Paste in your website.</h3>
                <p>
                  <strong>Valley Scout</strong>, your AI outbound assistant, learns what you sell, who you help and what
                  makes you different. Connect LinkedIn and email so the outreach comes from you.
                </p>
                <small>Your business. Your accounts. Your voice.</small>
              </div>
              <Scene index={0}>
                <WindowHead title="Your business" />
                <div className="vgs-url">
                  ↗ yourwebsite.com <span>Website added</span>
                </div>
                <div className="vgs-scene-title">
                  A starting point,
                  <br />
                  built around you.
                </div>
                <Check title="What you sell" text="Your product and the problem it solves" />
                <Check title="Who you help" text="The roles and companies that fit" />
                <div className="vgs-connections">
                  <span>{'in   LinkedIn'}</span>
                  <span>{'✉   Email'}</span>
                </div>
              </Scene>
            </article>

            <article id="valley-step-1" data-step="1">
              <div className="vgs-stepcopy">
                <span className="vgs-eyebrow">02 / Choose a play</span>
                <h3>Pick the signal. Review the plan.</h3>
                <p>
                  Choose from the playbook library: people engaging with your content, companies hiring, a competitor’s
                  audience, or your own list. Valley finds the buyers, checks fit and researches the reason to reach out.
                </p>
                <small>Choose a play → Review your audience → Make it yours.</small>
                <a className="vgs-textlink" href="/playbooks">
                  Explore all playbooks <Arrow />
                </a>
              </div>
              <Scene index={1}>
                <WindowHead title="Your next play" />
                <span className="vgs-micro">BUYING SIGNALS</span>
                <div className="vgs-scene-title">
                  Hiring for roles that
                  <br />
                  signal your problem
                </div>
                {[
                  'Find companies hiring',
                  'Identify the decision makers',
                  'Qualify fit and research',
                  'Draft a relevant first message',
                ].map((t, i) => (
                  <div className="vgs-plan-step" key={t}>
                    <span>{i + 1}</span>
                    {t}
                  </div>
                ))}
                <div className="vgs-ready">
                  Your audience and message, ready to review <Arrow />
                </div>
              </Scene>
            </article>

            <article id="valley-step-2" data-step="2">
              <div className="vgs-stepcopy">
                <span className="vgs-eyebrow">03 / Launch</span>
                <h3>Relevant outreach. Real conversations.</h3>
                <p>
                  Review the message and launch your play. Valley runs the sequence across your connected channels and
                  brings replies into one inbox, so you can focus on the conversations that matter.
                </p>
                <small>Keep control of approvals, timing and follow-ups.</small>
                <a className="vgs-cta" href={SIGNUP}>
                  Start for free
                  <Arrow />
                </a>
              </div>
              <Scene index={2}>
                <WindowHead title="Unified inbox" />
                <div className="vgs-message">
                  <span className="vgs-micro">LINKEDIN · INTERESTED REPLY</span>
                  <p>
                    “This is good timing.
                    <br />
                    Can you tell me more?”
                  </p>
                </div>
                <Check title="Conversation in one place" text="See the research and message history" />
                <Check title="Your next reply, ready to review" text="Keep the conversation in your voice" />
                <div className="vgs-ready">
                  You take the conversation from here <Arrow />
                </div>
              </Scene>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
