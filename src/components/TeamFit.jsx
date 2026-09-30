import '../styles/team-fit.css'
import { Fragment, useId, useRef, useState } from 'react'

// team-fit (CLONE_SPEC.md section 16). Markup follows the site's `.valley-team-fit` code
// component; tab copy is verbatim from the spec table / component data.
const AUDIENCES = [
  {
    art: '/assets/img/5WP0tI1lICNwC23waJVfpSCTTpE.png',
    tab: 'Founders',
    title: 'Keep outbound moving.\nKeep building your company.',
    description:
      'Give Valley your offer, your ideal customer and your voice. Review the outreach it prepares, then spend your time on the conversations it starts.',
    detail: 'A repeatable starting point for founder-led sales.',
    company: 'Linarca',
    result: '14 meetings',
    qualifier: 'In the first month, from a single seat.',
    person: 'Roberto Arrieta',
    role: 'Founder',
    url: '/casestudies/how-linarca-booked-14-qualified-meetings-in-their-first-month-with-valley',
    link: 'See Linarca’s story',
  },
  {
    art: '/assets/img/zPOKyZnbl77fH6unSixkvRUOSOs.png',
    tab: 'Sales teams',
    title: 'Give every rep\na researched starting point.',
    description:
      'Bring your team’s targeting and writing standards into the campaign. See why a prospect fits, review the message and keep the reply connected to its context.',
    detail: 'Consistent preparation. More room for the human conversation.',
    company: 'GGWP',
    result: '$4M in pipeline',
    qualifier: 'Generated within a quarter.',
    person: 'Tim O’Neil',
    role: 'Sales Leader',
    url: '/casestudies/how-ggwp-generated-4m-in-pipeline-with-valley',
    link: 'See GGWP’s story',
  },
  {
    art: '/assets/img/DzF7ltBGreQELkgImDCaxxldqH0.jpg',
    tab: 'Agencies',
    title: 'A clear outbound process.\nFor each client you serve.',
    description:
      'Build each client’s offer, audience and writing style into their campaigns. Connect the research and sending, and keep your team focused on relevant conversations.',
    detail: 'A repeatable service, with each client’s context intact.',
    company: 'ThinkFish',
    result: '400 meetings per month',
    qualifier: 'Booked for their clients.',
    person: 'Freizle Abarrientos',
    role: 'Chief Operating Officer',
    url: '/casestudies/how-thinkfish-books-380-400-meetings-monthly-with-valley',
    link: 'See ThinkFish’s story',
  },
]

function ArrowIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

// frameClassName (default none = homepage) is appended to the outer Framer layer so a page
// can restyle its wrapper padding (/product: 48px, spec/pages/product.md 1).
export default function TeamFit({ frameClassName = '' }) {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const id = 'vtf-' + useId().replace(/:/g, '')
  const a = AUDIENCES[active]

  const select = (i, focus = false) => {
    setActive(i)
    if (focus) tabs.current[i]?.focus()
  }
  const onKeyDown = (e, i) => {
    const n =
      e.key === 'ArrowRight' ? (i + 1) % 3 : e.key === 'ArrowLeft' ? (i + 2) % 3 : e.key === 'Home' ? 0 : e.key === 'End' ? 2 : null
    if (n !== null) {
      e.preventDefault()
      select(n, true)
    }
  }

  return (
    <section id="team-fit" className={frameClassName || undefined}>
      <div className="team-fit-container">
        <section
          className="valley-team-fit"
          aria-label="Who Valley is built for"
          data-audience={a.tab}
          data-static="false"
          style={{
            fontFamily: '"Valley Team Montreal", sans-serif',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 400,
            letterSpacing: '0em',
            lineHeight: 'normal',
            maxWidth: '100%',
            width: '100%',
            position: 'relative',
            height: 'auto',
            minWidth: 0,
          }}
        >
          <div className="vtf-shell">
            <header className="vtf-header">
              <div>
                <span className="vtf-eyebrow">FOR YOUR TEAM</span>
                <h2>Built around the way you sell.</h2>
              </div>
              <div className="vtf-tabs" role="tablist" aria-label="Choose your team">
                {AUDIENCES.map((t, i) => (
                  <button
                    key={t.tab}
                    type="button"
                    role="tab"
                    ref={(el) => (tabs.current[i] = el)}
                    id={`${id}-tab-${i}`}
                    aria-controls={`${id}-panel-${i}`}
                    aria-selected={active === i}
                    tabIndex={active === i ? 0 : -1}
                    onClick={() => select(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    {t.tab}
                  </button>
                ))}
              </div>
            </header>
            {/* keyed so the verbatim `vtf-arrive .24s` panel animation replays per tab */}
            <div
              key={active}
              className="vtf-panel"
              role="tabpanel"
              tabIndex={0}
              id={`${id}-panel-${active}`}
              aria-labelledby={`${id}-tab-${active}`}
            >
              <div className="vtf-job">
                <h3>
                  {a.title.split('\n').map((line, i) => (
                    <Fragment key={line}>
                      {i > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </h3>
                <p>{a.description}</p>
                <span className="vtf-detail">{a.detail}</span>
              </div>
              <aside className="vtf-case" aria-label={`${a.company} customer example`} style={{ '--vtf-art': `url("${a.art}")` }}>
                <span className="vtf-case-company">
                  {a.company}, with Valley
                </span>
                <strong className="vtf-result">{a.result}</strong>
                <p className="vtf-qualifier">{a.qualifier}</p>
                <span className="vtf-person">
                  {a.person}
                  <span>
                    {a.role}, {a.company}
                  </span>
                </span>
                <a href={a.url}>
                  {a.link}
                  <ArrowIcon />
                </a>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
