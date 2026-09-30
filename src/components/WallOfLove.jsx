import '../styles/wall-of-love.css'

// CLONE_SPEC.md section 17 (wall-of-love). Markup mirrors the live `.vgs.vgs-section-love`
// component; copy is verbatim from the spec / spec/texts_1440.txt.

const BOLT = '/casestudies/how-bolt.new-generated-seven-figures-in-pipeline-with-valley-in-under-60-days'

const METRICS = [
  { value: '$1M+', label: 'Pipeline in the first 60 days', source: 'Bolt.new', href: BOLT },
  { value: '3 hrs', label: 'Saved per rep, per day', source: 'Bolt.new', href: BOLT },
  { value: '400', label: 'Meetings monthly across 50 seats', source: 'ThinkFish', href: '/casestudies' },
]

const QUOTES = [
  {
    quote:
      'A real response to a message Valley sent a prospect: “I was never considering anything until you reached out with a message that literally spoke to me.” The automation is great but the sauce within Valley is the messaging itself.',
    name: 'Conrad de Claro',
    role: 'Director of Growth Marketing, GoCanvas',
    img: '/assets/img/TVJrBRufv5aW8aCK1AjoE8KR01s.png',
  },
  {
    quote:
      'Email and LinkedIn definitely work but the personalization requirements to make them work have just gotten higher. The new bar is being set by Valley. Go see it for yourself.',
    name: 'Garrett Marker',
    role: 'CRO,  Brex',
    img: '/assets/img/MPNLm2C5tToiVIBuk5qDNA6OQ.png',
  },
  {
    quote:
      "If you don't have an active, engaged LinkedIn pipeline and you have a clearly defined ICP and persona, you need to add Valley to your tech stack immediately to supplement your sales.",
    name: 'Greg',
    role: 'Co-Founder, Kaster',
    img: '/assets/img/rwDafO1WYNHe1OHiQ1WlMneI4.jpeg',
  },
  {
    quote:
      "I'm able to come into those [pipeline review] meetings and be like, look at what I booked through Valley. You know, if my other kind of channels have slowed down, I'm like, but Valley, Valley's there.",
    name: 'Angelene Perez-Vento',
    role: 'AE, Growth Protocol',
    img: '/assets/img/y05cyu6N0bAtOqCKI9X3XsvDxE.png',
  },
  {
    quote:
      "I would say to book me 14 meetings with qualified prospects in that traditional method could take me three months, two to three months amongst all the other things that I'm balancing. So you're thinking of shrinking it down from 90 days down to 20, which is absolutely wild.",
    name: 'Brandon Kay',
    role: 'VP Sales, Gallea AI',
    // 4465x6694 original (2.7 MB) served resized
    img: '/assets/img/OYLLgql4PH7iAjFP1EIjtiqAe4-400w.jpg',
  },
  {
    quote:
      'The messages it writes are actually really high-taste. I was really surprised by the personalization. I don’t want to be a bottleneck for those connection requests going out - it’s that good.',
    name: 'Edmund Cuthbert',
    role: 'Founder at Superposition',
    img: '/assets/img/wAsP8kJymz9NP0e6K68bbPhJ0.png',
  },
]

export default function WallOfLove() {
  return (
    <section id="wall-of-love" className="vgs vgs-section-love" style={{ width: '100%', position: 'relative' }}>
      <div className="vgs-wrap">
        <header className="vgs-header">
          <span className="vgs-eyebrow">The wall of love</span>
          <h2>
            Good outreach gets a response.
            <br />
            That's Valley.
          </h2>
          <p>Real words from the people doing the work.</p>
        </header>
        <div className="vgs-metrics">
          {METRICS.map((m) => (
            <a key={m.value} href={m.href}>
              <b>{m.value}</b>
              <span>{m.label}</span>
              <small>{m.source} ↗</small>
            </a>
          ))}
        </div>
        <div className="vgs-quotes">
          {QUOTES.map((q) => (
            <figure key={q.name}>
              <blockquote>“{q.quote}”</blockquote>
              <figcaption>
                <img src={q.img} alt={q.name} loading="lazy" />
                <span>
                  <b>{q.name}</b>
                  <small>{q.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="vgs-love-bottom">
          <a className="vgs-textlink" href="/casestudies">
            Read the customer stories{' '}
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
