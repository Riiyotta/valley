import '../styles/showcase.css'
import { useEffect, useId, useRef, useState } from 'react'

// showcase (CLONE_SPEC.md section 14 + motion 20 #11/#12). Markup and behaviour follow the
// site's `.valley-showcase` code component. All copy is verbatim from the spec / states dump.
// The section id stays `showcase`: Nav.jsx has no link to `#explore-valley`.

const ART = '/assets/img/Qovuw4iQncZcQQ2Zp5FGwdvDJ5k.jpg'
const PLAYBOOK_ART = [
  ART,
  '/assets/img/5WP0tI1lICNwC23waJVfpSCTTpE.png',
  '/assets/img/zPOKyZnbl77fH6unSixkvRUOSOs.png',
  '/assets/img/DzF7ltBGreQELkgImDCaxxldqH0.jpg',
]
const TABS = [
  { id: 'dashboard', label: 'Dashboard', title: "Mission control for the world's best outbound.", description: 'See the work in motion, track pipeline generated, analyze results, and manage replies.' },
  { id: 'playbooks', label: 'Playbooks', title: 'Pick a play. Valley does the outbound.', description: 'Start with a signal, an audience, or your own list. Valley brings prospecting, research, messaging, and follow-up into one workflow. ' },
  { id: 'prospects', label: 'Prospects', title: 'Never a stale database. The best signals at your fingertips.', description: 'Your buyers are constantly changing and showing signal. Valley figures out who matters, why they matter & presents them to you.' },
  { id: 'studio', label: 'AI Studio', title: 'AI Messaging trained by you, that sounds like you...      no em dashes', description: 'Give Valley your product, your writing style and the rules every draft should follow to craft unique messages, at scale, indistinguishable from a handwritten message.' },
  { id: 'campaigns', label: 'Campaigns', title: 'One conversation. With warm prospects. Receiving incredible messaging. Across all channels.', description: 'Connect LinkedIn and email in a sequence that follows what happens next.' },
  { id: 'scout', label: 'Scout', title: 'Your new AI Head of Outbound who never sleeps, misses a follow up, or forgets a signal.', description: 'Scout is an AI Agent that can conduct any action in Valley or any AI Tool via our MCP connector. Ask Scout to launch the best plays for you & then go do something else.' },
]
// JS-set stage height per tab (spec 14), +40px below 1100px, only when wider than 900px
const STAGE_HEIGHTS = [640, 540, 560, 540, 620, 540]
const TAB_MS = 6000
const AVATARS = {
  MC: '/assets/img/KD64dhKrNdxKzSajCepglBBXSM.jpg',
  JL: '/assets/img/rEmg7ZgILI8aTHSynoFCdiON3g.jpg',
  AK: '/assets/img/OJmd0F7UnO0atTkkx8R4aDYiQ.jpg',
  SR: '/assets/img/W7yMgnBYe1ctoAQ3j7TjymvkuM.jpg',
  DP: '/assets/img/0j48LVfGtIEI1vkDwuoRchBOqI.jpg',
  TN: '/assets/img/g9K3aNEHM2ifM6oiRVOwsjYMss.jpg',
}
const PEOPLE = [
  ['MC', 'Maya Chen', 'VP Revenue', 'Fieldwork', 'Hiring AEs', 'High'],
  ['JL', 'Jordan Lee', 'Head of Sales', 'Northline', 'New sales team', 'High'],
  ['AK', 'Alex Kim', 'Sales Director', 'Forma', 'Hiring AEs', 'High'],
  ['SR', 'Sam Rivera', 'Founder', 'Relay', 'New market', 'Medium'],
  ['DP', 'Drew Patel', 'VP Sales', 'Plainview', 'Hiring SDRs', 'High'],
  ['TN', 'Taylor Nguyen', 'Revenue Lead', 'Gather', 'Team growth', 'Medium'],
]

function Mark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 45" fill="none" aria-hidden="true">
      <path d="M11.8368 4.67773L21.796 14.637L18.3674 18.2288L13.796 22.9635H4V18.2288H18.3674L8.24491 8.26958L11.8368 4.67773Z" fill="currentColor" />
      <path d="M36.1632 4.67773L26.204 14.637L29.6326 18.2288L34.204 22.9635H44V18.2288H29.6326L39.7551 8.26958L36.1632 4.67773Z" fill="currentColor" />
      <path d="M8.24512 32.5954L24.0819 16.9219L39.9187 32.5954L36.4901 36.024L26.5309 26.228V40.2689H21.4697V26.228L11.6737 36.024L8.24512 32.5954Z" fill="currentColor" />
    </svg>
  )
}

function Icon({ name, size = 18 }) {
  let body
  if (name === 'check') body = <path d="m5 12 4 4L19 6" />
  else if (name === 'mail') body = (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>)
  else if (name === 'arrow') body = <path d="M5 12h14m-5-5 5 5-5 5" />
  else if (name === 'search') body = (<><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></>)
  else if (name === 'branch') body = (<><path d="M12 4v7m-6 8v-8h12v8" /><circle cx="12" cy="4" r="2" /><circle cx="6" cy="20" r="2" /><circle cx="18" cy="20" r="2" /></>)
  else if (name === 'link') body = <path d="m10 14 4-4m-5 7-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m0 8a4 4 0 0 0 6 0l4-4a4 4 0 0 0-6-6l-1 1" />
  else if (name === 'list') body = <path d="M8 5h12M8 12h12M8 19h12M3 5h.01M3 12h.01M3 19h.01" />
  else if (name === 'clock') body = (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)
  else body = (<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {body}
    </svg>
  )
}

function Check({ children }) {
  return (
    <span className="vs-check">
      <Icon name="check" size={14} />
      {children}
    </span>
  )
}

function Avatar({ initials = 'MC', small = false }) {
  return (
    <span className={'vs-avatar' + (small ? ' vs-avatar-small' : '')}>
      <img src={AVATARS[initials] || AVATARS.MC} alt="" width="42" height="42" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
    </span>
  )
}

function Shell({ title, children, className = '', description }) {
  return (
    <div className={`vs-shell ${className}`} role="img" aria-label={description || `Illustrative Valley ${title} workflow using an example campaign.`}>
      <div className="vs-appbar">
        <span className="vs-app-identity">
          <Mark />
          <span>Valley</span>
          <span className="vs-app-divider">/</span>
          <span>{title}</span>
        </span>
      </div>
      {children}
    </div>
  )
}

function Channel({ email = false }) {
  return <span className={'vs-channel ' + (email ? 'vs-email' : '')}>{email ? <Icon name="mail" size={16} /> : 'in'}</span>
}

function PipelineChart() {
  const values = [45, 100, 180, 280, 360, 450]
  const gid = useId().replace(/:/g, '')
  const ref = useRef(null)
  const [box, setBox] = useState({ width: 640, height: 180 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setBox((b) => (b.width === width && b.height === height ? b : { width, height }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const right = box.width - 12
  const bottom = box.height - 32
  const x = (i) => 48 + ((right - 48) * i) / (values.length - 1)
  const y = (v) => bottom - ((bottom - 14) * v) / 450
  const line = values.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ')
  const days = [{ index: 0, day: 1 }, { index: 2, day: 12 }, { index: 4, day: 24 }, { index: 5, day: 30 }].filter((d) => box.width >= 400 || d.day !== 24)
  return (
    <div className="vs-pipeline-chart">
      <div className="vs-home-section-heading">
        <h4>Pipeline growth</h4>
        <span>Demo data · Last 30 days</span>
      </div>
      <svg ref={ref} viewBox={`0 0 ${box.width} ${box.height}`} role="img" aria-label="Example cumulative pipeline rises from $45,000 to $450,000 over 30 days" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#579ac4" stopOpacity=".38" />
            <stop offset="100%" stopColor="#579ac4" stopOpacity=".03" />
          </linearGradient>
        </defs>
        {[450, 225, 0].map((v) => (
          <g key={v}>
            <line x1={48} y1={y(v)} x2={right} y2={y(v)} stroke="#d5e1dc" strokeDasharray="3 5" />
            <text x="0" y={y(v)} dominantBaseline="middle" fill="#60766d" fontSize="12">{v ? `$${v}k` : '$0'}</text>
          </g>
        ))}
        <path d={`${line} L${right} ${bottom} L48 ${bottom}Z`} fill={`url(#${gid})`} />
        <path d={line} fill="none" stroke="#407fab" strokeWidth="3" strokeLinejoin="round" />
        {values.map((v, i) => (
          <circle key={v} cx={x(i)} cy={y(v)} r="3.5" fill={i === 5 ? '#bc7858' : '#407fab'} stroke="#f4f8f4" strokeWidth="2" />
        ))}
        {days.map(({ index, day }) => (
          <text key={day} x={x(index)} y={box.height - 7} textAnchor={index === 0 ? 'start' : index === 5 ? 'end' : 'middle'} fill="#60766d" fontSize="12">Day {day}</text>
        ))}
      </svg>
    </div>
  )
}

function Dashboard() {
  return (
    <Shell title="Dashboard" className="vs-home" description="Illustrative Valley demo workspace. Today's plan, recent activity, and new leads. Demo results for the last 30 days: $450,000 potential pipeline, 128 interested replies, and 12 active campaigns.">
      <div className="vs-home-sidebar">
        <span className="vs-home-current">Home</span>
        <span>Conversations</span>
        <span>Campaigns</span>
        <span>Prospects</span>
        <span>Playbooks</span>
        <span>AI Studio</span>
        <span className="vs-home-scout"><Mark size={15} /> Scout</span>
        <small>Alex’s workspace</small>
      </div>
      <div className="vs-home-main vs-enter">
        <div className="vs-home-greeting">
          <h3>Good morning, Alex.</h3>
          <span className="vs-home-demo">Demo workspace</span>
        </div>
        <div className="vs-home-plan">
          <div className="vs-home-section-heading">
            <h4>Today’s Plan</h4>
            <span>Scout is on it</span>
          </div>
          <p>Find revenue leaders at companies hiring AEs.</p>
          <div className="vs-home-plan-footer">
            <span>Research in progress</span>
            <span>Review Maya’s draft <Icon name="arrow" size={13} /></span>
          </div>
        </div>
        <div className="vs-home-results">
          <div className="vs-home-section-heading">
            <h4>Your results</h4>
            <span>Last 30 days</span>
          </div>
          <div className="vs-home-metrics">
            <div><strong>$450,000</strong><span>Potential pipeline</span></div>
            <div><strong>128</strong><span>Interested replies</span></div>
            <div><strong>12</strong><span>Active campaigns</span></div>
          </div>
        </div>
        <PipelineChart />
        <div className="vs-home-bottom">
          <div className="vs-home-activity">
            <div className="vs-home-section-heading">
              <h4>Recent activity</h4>
              <span>Today</span>
            </div>
            <div className="vs-home-activity-row">
              <span><strong>Maya replied on LinkedIn</strong><small>Revenue leaders hiring AEs</small></span>
              <span>9:42</span>
            </div>
            <div className="vs-home-activity-row">
              <span><strong>Jordan’s email is ready</strong><small>Written in your voice</small></span>
              <span>9:38</span>
            </div>
          </div>
          <div className="vs-home-leads">
            <div className="vs-home-section-heading">
              <h4>New leads</h4>
              <span>High fit</span>
            </div>
            {PEOPLE.slice(0, 2).map(([initials, name, role, company]) => (
              <div className="vs-home-lead" key={name}>
                <Avatar initials={initials} small />
                <span><strong>{name}</strong><small>{role} · {company}</small></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}

const PLAYBOOK_CARDS = [
  ['From your network', 'Message your profile viewers', 'Qualify the people already looking at you, then reach out with context.', 'Runs daily'],
  ['Buying signals', 'Find companies that are hiring', 'Spot a growing team, find the right person, and write a relevant opener.', 'Refills daily'],
  ['Engage with content', 'Reach your competitors’ engagers', 'Find people joining the conversation around the problem you solve.', 'Runs daily'],
  ['Bring a list', 'Turn your list into conversations', 'Upload your audience. Valley qualifies, researches, and writes for each person.', 'Your audience'],
]

function Playbooks() {
  return (
    <Shell title="Playbooks" className="vs-playbooks">
      <div className="vs-playbook-library vs-enter">
        <div className="vs-playbook-heading">
          <h3>Playbook library</h3>
          <p>Pick a play. Valley finds the audience, checks fit, writes the messages, and runs the sequence.</p>
        </div>
        <div className="vs-playbook-categories">
          {['All plays', 'From your network', 'Buying signals', 'Bring a list'].map((label, i) => (
            // gradient = spec token `showcase-thumb` (#172c37c9 -> #172c3720), inline as on the site
            <div key={label} style={{ backgroundImage: `linear-gradient(0deg,#172c37c9,#172c3720),url("${PLAYBOOK_ART[i]}")` }}>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="vs-playbook-cards">
          {PLAYBOOK_CARDS.map(([meta, title, text, cadence], i) => (
            <div className="vs-playbook-item" key={title}>
              <div className="vs-playbook-meta">
                <span>{meta}</span>
                <Icon name={i === 1 ? 'search' : 'document'} size={17} />
              </div>
              <h4>{title}</h4>
              <p>{text}</p>
              <div className="vs-playbook-bottom">
                <span><i />{cadence}</span>
                <span className="vs-playbook-launch">Launch <Icon name="arrow" size={14} /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  )
}

function Prospects() {
  return (
    <Shell title="Prospects" className="vs-prospects">
      <div className="vs-prospect-base vs-enter">
        <div className="vs-view-heading">
          <div>
            <span className="vs-small-label">YOUR AUDIENCE</span>
            <h3>Revenue leaders hiring AEs</h3>
          </div>
          <span className="vs-filter"><Icon name="list" size={15} />All prospects</span>
        </div>
        <div className="vs-data-table">
          <div className="vs-table-row vs-table-head">
            <span>Name</span><span>Company</span><span>Signal</span><span>ICP-Fit</span>
          </div>
          {PEOPLE.map(([initials, name, role, company, signal, fit], i) => (
            <div key={name} className={`vs-table-row ${i === 0 ? 'vs-row-selected' : ''} vs-enter`} style={{ '--delay': `${i * 65}ms` }}>
              <span className="vs-person">
                <Avatar initials={initials} small />
                <span><strong>{name}</strong><small>{role}</small></span>
              </span>
              <span>{company}</span>
              <span>{signal}</span>
              <span><span className={'vs-fit ' + (fit === 'Medium' ? 'vs-fit-medium' : '')}>{fit}</span></span>
            </div>
          ))}
        </div>
      </div>
      <div className="vs-research vs-elevated vs-enter" style={{ '--delay': '350ms' }}>
        <div className="vs-person-heading">
          <Avatar />
          <div>
            <h4>Maya Chen</h4>
            <p>VP Revenue · Fieldwork</p>
          </div>
          <span className="vs-fit">High ICP-Fit</span>
        </div>
        <div className="vs-research-heading">
          <span>Research Findings</span>
          <Check>Ready</Check>
        </div>
        <div className="vs-evidence">
          <span className="vs-source-icon"><Icon name="link" /></span>
          <div>
            <small>COMPANY CAREERS PAGE</small>
            <strong>Fieldwork is hiring account executives</strong>
            <p>The team is adding new roles in sales.</p>
            <span className="vs-source">Company careers page <span>↗</span></span>
          </div>
        </div>
        <div className="vs-evidence">
          <span className="vs-source-icon" style={{ color: '#39779a', background: '#dceef8', borderColor: '#c3dce9' }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <g stroke="#39779a">
                <path d="M4 3.5h12a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H8L3 18V5a1.5 1.5 0 0 1 1-1.5Z" />
                <path d="M6.5 7h7M6.5 10h4.5" />
              </g>
            </svg>
          </span>
          <div>
            <small>LINKEDIN · MAYA CHEN</small>
            <strong>“We’re building our sales team.”</strong>
            <p>A reason to make the outreach timely.</p>
          </div>
        </div>
        <div className="vs-fit-reason">
          <span className="vs-small-label">WHY SHE FITS</span>
          <div>
            <Check>Revenue leader</Check>
            <Check>B2B software</Check>
            <Check>Hiring sales roles</Check>
          </div>
        </div>
      </div>
    </Shell>
  )
}

function Draft({ compact = false }) {
  return (
    <div className={'vs-draft ' + (compact ? 'vs-draft-compact' : '')}>
      <div className="vs-draft-recipient">
        <span>To</span>
        <Avatar small />
        <strong>Maya Chen</strong>
        <span className="vs-draft-channel"><Channel email /></span>
      </div>
      <div className="vs-draft-subject">Fieldwork’s growing sales team</div>
      <div className="vs-draft-body">
        <p>Hi Maya,</p>
        <p>Saw Fieldwork is hiring AEs. That usually means new lists to build and first touches to write.</p>
        <p>Valley finds the prospects and drafts outreach from real research. Want to see a few examples for Fieldwork?</p>
        <p>Alex</p>
      </div>
    </div>
  )
}

function Studio() {
  return (
    <Shell title="AI Studio" className="vs-studio">
      <div className="vs-studio-sidebar vs-enter">
        <div className="vs-studio-tabs">
          <span>Products</span>
          <span className="vs-current">Writing Styles</span>
        </div>
        <div className="vs-writing-style">
          <span className="vs-small-label">YOUR WRITING STYLE</span>
          <h3>Sound like yourself.</h3>
          <div className="vs-style-switch">
            <span className="vs-current">Rules</span>
            <span>Playground</span>
            <span>Activity</span>
          </div>
          <div className="vs-rule-list">
            {['Lead with a real reason to reach out.', 'Use short, direct sentences.', 'Skip the flattering opener.', 'Ask one easy question.'].map((rule) => (
              <div key={rule}><Icon name="check" /><span>{rule}</span></div>
            ))}
          </div>
          <div className="vs-rule-channels">
            <Channel />LinkedIn<Channel email />Email
          </div>
        </div>
        <div className="vs-source-context">
          <span className="vs-small-label">CONTEXT FOR THIS DRAFT</span>
          <strong>Fieldwork is hiring AEs.</strong>
          <p>Maya leads the revenue team.</p>
          <span><Icon name="link" size={14} />Research Findings</span>
        </div>
      </div>
      <div className="vs-playground vs-elevated vs-enter" style={{ '--delay': '280ms' }}>
        <div className="vs-panel-heading">
          <span><Mark size={19} />Playground</span>
          <span className="vs-soft-tag">Email draft</span>
        </div>
        <div className="vs-draft-intro">
          <span className="vs-small-label">YOUR VOICE. HER CONTEXT.</span>
          <h4>A message with <br />something to say.</h4>
        </div>
        <Draft />
        <div className="vs-draft-footer">
          <Check>Ready for your review</Check>
          <span>Review &amp; edit <Icon name="arrow" size={15} /></span>
        </div>
      </div>
    </Shell>
  )
}

function Campaigns() {
  return (
    <Shell title="Campaigns" className="vs-campaigns">
      <div className="vs-sequence-heading vs-enter">
        <div>
          <span className="vs-small-label">HIRING SIGNALS</span>
          <h3>Revenue leaders hiring AEs</h3>
        </div>
        <span className="vs-soft-tag">Sequence</span>
      </div>
      <div className="vs-sequence">
        <svg className="vs-connectors" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
          <path className="vs-line" d="M500 79V205M500 205H235V258M500 205H765V258M235 358V426H500M765 358V426H500M500 426V459" />
        </svg>
        <div className="vs-sequence-node vs-node-start vs-enter">
          <Channel />
          <div>
            <small>LINKEDIN</small>
            <strong>Connection request</strong>
            <p>Start the conversation.</p>
          </div>
          <span className="vs-node-check"><Icon name="check" size={15} /></span>
        </div>
        <div className="vs-sequence-wait vs-enter" style={{ '--delay': '180ms' }}>
          <Icon name="clock" size={15} />
          <span>Wait for a connection</span>
        </div>
        <span className="vs-branch-label vs-branch-yes">Accepted</span>
        <span className="vs-branch-label vs-branch-no">Not accepted</span>
        <div className="vs-sequence-node vs-node-linkedin vs-enter" style={{ '--delay': '360ms' }}>
          <Channel />
          <div>
            <small>LINKEDIN</small>
            <strong>Send a message</strong>
            <p>Use the research<br />behind the introduction.</p>
          </div>
        </div>
        <div className="vs-sequence-node vs-node-email vs-enter" style={{ '--delay': '480ms' }}>
          <Channel email />
          <div>
            <small>EMAIL</small>
            <strong>Follow up by email</strong>
            <p>The same context.<br />A different channel.</p>
          </div>
        </div>
        <div className="vs-reply-exit vs-enter" style={{ '--delay': '600ms' }}>
          <span className="vs-reply-dot" />
          <strong>A reply comes in.</strong>
          <span>The sequence stops. Your conversation continues.</span>
          <Icon name="arrow" size={17} />
          <span className="vs-inbox-label">Inbox</span>
        </div>
      </div>
    </Shell>
  )
}

function Scout() {
  return (
    <Shell title="Scout" className="vs-scout">
      <div className="vs-chat vs-enter">
        <div className="vs-scout-identity">
          <Mark size={32} />
          <div>
            <h3>Scout</h3>
            <p>Your next move, together.</p>
          </div>
        </div>
        <div className="vs-user-message">Find revenue leaders at software companies hiring account executives.</div>
        <div className="vs-scout-message vs-enter" style={{ '--delay': '160ms' }}>
          <Mark size={22} />
          <div>
            <p>I’ll start with hiring signals, check the fit, and prepare outreach for your review.</p>
            <div className="vs-scout-actions">
              <Check>Audience defined</Check>
              <Check>Research criteria ready</Check>
            </div>
          </div>
        </div>
        <div className="vs-user-message vs-chat-second vs-enter" style={{ '--delay': '340ms' }}>Use my writing style. LinkedIn and email.</div>
        <div className="vs-scout-message vs-chat-last vs-enter" style={{ '--delay': '520ms' }}>
          <Mark size={22} />
          <div>
            <p>Here’s the campaign to review.</p>
            <span className="vs-scout-open">Open campaign <Icon name="arrow" size={16} /></span>
          </div>
        </div>
        <div className="vs-chat-input">
          <span>Ask Scout anything</span>
          <span>↑</span>
        </div>
      </div>
      <div className="vs-scout-output vs-elevated vs-enter" style={{ '--delay': '600ms' }}>
        <div className="vs-panel-heading">
          <span><Icon name="branch" />Campaign draft</span>
          <span className="vs-soft-tag">Review</span>
        </div>
        <div className="vs-scout-output-art">
          <span>Hiring signals</span>
          <h4>Revenue leaders<br />hiring AEs</h4>
        </div>
        <div className="vs-scout-person">
          <Avatar small />
          <div>
            <strong>Maya Chen</strong>
            <span>VP Revenue · Fieldwork</span>
          </div>
          <span className="vs-fit">High fit</span>
        </div>
        <div className="vs-scout-draft">
          <span className="vs-small-label">FIRST MESSAGE</span>
          <p>Maya, adding AEs means lists to build and first touches to write. Valley finds the prospects and drafts outreach from real research. Want to see a few examples for Fieldwork?</p>
        </div>
        <div className="vs-output-checks">
          <Check>Your writing style</Check>
          <span><Channel /><Channel email />Both channels</span>
        </div>
      </div>
    </Shell>
  )
}

const VIEWS = [Dashboard, Playbooks, Prospects, Studio, Campaigns, Scout]

// frameClassName (default none = homepage) is appended to the outer Framer layer so a page
// can restyle its wrapper (/product: padding 56px 48px, no clip; spec/pages/product.md 1).
export default function Showcase({ frameClassName = '' }) {
  const uid = useId().replace(/:/g, '')
  const rootRef = useRef(null)
  const tabRefs = useRef([])
  const progressRef = useRef(null)
  const animRef = useRef(null)
  const [stageHeight, setStageHeight] = useState(640)
  const [step, setStep] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [reduced, setReduced] = useState(true)
  const [forceMotion, setForceMotion] = useState(false)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  // playing = autoplay on, motion allowed, >= 12% visible and the document visible (spec 20 #11)
  const playing = autoplay && (!reduced || forceMotion) && inView && pageVisible
  const playingRef = useRef(playing)
  playingRef.current = playing
  const tab = TABS[step]
  const View = VIEWS[step]

  // --vs-stage-height, set from the component's own width
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    let gone = false
    const measure = () => {
      if (gone) return
      const w = el.getBoundingClientRect().width
      if (w > 900) setStageHeight(STAGE_HEIGHTS[step] + (w < 1100 ? 40 : 0))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const intro = el.querySelector('.vs-intro')
    if (intro) ro.observe(intro)
    window.addEventListener('resize', measure)
    window.visualViewport?.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => {
      gone = true
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.visualViewport?.removeEventListener('resize', measure)
    }
  }, [step])

  // reduced motion, page visibility, >= 12% intersection
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const onMq = () => {
      setReduced(mq.matches)
      if (mq.matches) {
        setAutoplay(false)
        setForceMotion(false)
      }
    }
    const onVis = () => setPageVisible(!document.hidden)
    onMq()
    onVis()
    mq.addEventListener('change', onMq)
    document.addEventListener('visibilitychange', onVis)
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting && e.intersectionRatio >= 0.12), { threshold: [0, 0.12] })
    if (rootRef.current) io.observe(rootRef.current)
    return () => {
      mq.removeEventListener('change', onMq)
      document.removeEventListener('visibilitychange', onVis)
      io.disconnect()
    }
  }, [])

  // WAAPI progress fill, 6000ms linear; on finish advance to the next tab
  useEffect(() => {
    if (!progressRef.current) return
    const anim = progressRef.current.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
      duration: TAB_MS,
      easing: 'linear',
      fill: 'forwards',
    })
    anim.pause()
    animRef.current = anim
    anim.onfinish = () => {
      if (playingRef.current) setStep((s) => (s + 1) % TABS.length)
    }
    return () => {
      anim.cancel()
      if (animRef.current === anim) animRef.current = null
    }
  }, [step])

  useEffect(() => {
    if (!animRef.current) return
    if (playing) animRef.current.play()
    else animRef.current.pause()
  }, [playing, step])

  // keep the active tab in view when the tab row scrolls (phone widths)
  useEffect(() => {
    const btn = tabRefs.current[step]
    if (!btn || !btn.parentElement) return
    const row = btn.parentElement
    const left = btn.offsetLeft - row.offsetLeft
    if (left < row.scrollLeft || left + btn.offsetWidth > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: Math.max(0, left - 20), behavior: reduced ? 'auto' : 'smooth' })
    }
  }, [step, reduced])

  // clicking a tab stops autoplay
  const selectTab = (i, focus = false) => {
    setAutoplay(false)
    setStep(i)
    if (focus) tabRefs.current[i]?.focus()
  }
  const onTabKey = (e, i) => {
    const n = e.key === 'ArrowRight' ? (i + 1) % 6 : e.key === 'ArrowLeft' ? (i + 5) % 6 : e.key === 'Home' ? 0 : e.key === 'End' ? 5 : -1
    if (n >= 0) {
      e.preventDefault()
      selectTab(n, true)
    }
  }
  const toggleTour = () => {
    if (autoplay && (!reduced || forceMotion)) setAutoplay(false)
    else {
      setForceMotion(true)
      setAutoplay(true)
    }
  }

  return (
    <section id="showcase" className={frameClassName || undefined}>
      <div className="showcase-container">
        <div
          ref={rootRef}
          className="valley-showcase"
          data-active={tab.id}
          data-scene={tab.id}
          data-playing={playing}
          data-static="false"
          data-reduced={reduced && !forceMotion}
          // component state flag used by the verbatim CSS (pauses .vs-enter until visible),
          // not the Animation hand-off marker
          data-motion={inView && pageVisible && (!reduced || forceMotion)}
          style={{
            fontFamily: '"Valley Showcase Montreal", sans-serif',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 400,
            letterSpacing: '0em',
            lineHeight: 'normal',
            maxWidth: '100%',
            width: '100%',
            '--vs-scale': 1,
            '--vs-stage-height': `${stageHeight}px`,
            '--vs-accent': 'rgb(55, 111, 156)',
            '--vs-art': `url("${ART}")`,
          }}
        >
          <div className="vs-toolbar">
            <div className="vs-tabs" role="tablist" aria-label="Explore Valley">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`${uid}-${t.id}-tab`}
                  aria-selected={step === i}
                  aria-controls={`${uid}-panel`}
                  tabIndex={step === i ? 0 : -1}
                  onClick={() => selectTab(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  {t.label}
                  <span className="vs-tab-track">{step === i && <span key={t.id} ref={progressRef} className="vs-tab-progress" />}</span>
                </button>
              ))}
            </div>
            <button className="vs-tour-control" type="button" onClick={toggleTour} aria-label={playing ? 'Pause product tour' : 'Play product tour'}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                {playing ? <path d="M4 3h3v10H4zM9 3h3v10H9z" /> : <path d="M4 2.5 13 8 4 13.5z" />}
              </svg>
              <span>{playing ? 'Pause product tour' : 'Play product tour'}</span>
            </button>
          </div>
          <div className="vs-intro" aria-live="polite">
            <h3>{tab.title}</h3>
            <p>{tab.description}</p>
          </div>
          <div className={`vs-stage vs-stage-${tab.id}`} role="tabpanel" tabIndex={0} id={`${uid}-panel`} aria-labelledby={`${uid}-${tab.id}-tab`}>
            {/* keyed per tab so the verbatim .vs-enter / .vs-line keyframes replay */}
            <div className="vs-composition" key={tab.id}>
              <View />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
