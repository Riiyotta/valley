import { useLayoutEffect, useRef, useState } from 'react'
import { Reveal } from './shared.jsx'

// Case-study FAQ (spec/pages/casestudy.md 7). Not the homepage .vsq-faq. Template copy, identical on
// all 21 pages; answers are the component's product-FAQ copy. First item open; items toggle
// independently. Height animates with Framer's {type:"spring", bounce:.2, duration:.4}
// (zeta .8, k ~506, c ~36) sampled to linear(); answer text and icon switch on the first frame.
const ITEMS = [
  {
    q: 'Which channels does Valley support?',
    a: 'Valley supports LinkedIn outreach, including connection requests and InMails. Valley users safely send 1000-1200 messages per seat every month. ',
  },
  {
    q: 'How safe is it and does Valley risk my LinkedIn account?',
    a: "Valley is the safest LinkedIn automation tool on the market and operates within LinkedIn's guidelines to keep your account safe. We offer a 5× money-back guarantee if your account is ever compromised through Valley's usage, though this has never happened to any of our users.",
  },
  {
    q: 'Do I have to commit to an Annual Plan like other AI SDRs?',
    a: 'No. Valley offers flexible Quarterly plans without requiring a long-term commitment.',
  },
  {
    q: 'How does Valley personalize messages?',
    a: 'Valley uses research agents that scan the internet for relevant information about your prospect and their company. Valley researches things like company and prospect news, deep dives, competition, funding and hiring patterns, newsletter, blog and youtube videos your prospect has appeared on and uses that information to craft personalization that is actually relevant.',
  },
  { q: 'Is Valley available in my country?', a: 'Yep' },
]

function Item({ item, open, onToggle, idx }) {
  const ref = useRef(null)
  const from = useRef(null)
  const toggle = () => {
    from.current = ref.current.getBoundingClientRect().height
    onToggle()
  }
  useLayoutEffect(() => {
    const el = ref.current
    if (from.current == null || !el) return
    const start = from.current
    from.current = null
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Target height from the final layout: the text column (answer shown/hidden on the first frame)
    // or the 40px icon box, plus the open/closed vertical padding (20+20 / 12+12). The padding itself
    // springs with the same curve, so it can't be read from the DOM mid-transition.
    const textH = el.querySelector('.cs-faq-text').getBoundingClientRect().height
    const end = Math.max(textH, 40) + (open ? 40 : 24)
    el.style.transition = 'none'
    el.style.height = `${start}px`
    el.getBoundingClientRect()
    el.style.transition = ''
    el.style.height = `${end}px`
    const done = (e) => {
      if (e.target !== el || e.propertyName !== 'height') return
      el.style.height = ''
      el.removeEventListener('transitionend', done)
    }
    el.addEventListener('transitionend', done)
  }, [open])
  const id = `cs-faq-a-${idx}`
  return (
    <div ref={ref} className={`cs-faq-item${open ? ' is-open' : ''}`}>
      <button type="button" className="cs-faq-top" aria-expanded={open} aria-controls={id} onClick={toggle}>
        <span className="cs-faq-text">
          <span className="cs-faq-q">{item.q}</span>
          {open && (
            <span className="cs-faq-a" id={id}>
              {item.a}
            </span>
          )}
        </span>
        <span className="cs-faq-icon" aria-hidden="true">
          <span className="cs-faq-bar-h" />
          {!open && <span className="cs-faq-bar-v" />}
        </span>
      </button>
    </div>
  )
}

export default function FaqAccordion() {
  const [open, setOpen] = useState(() => ITEMS.map((_, i) => i === 0))
  return (
    <section className="cs-faq">
      <Reveal className="cs-faq-label" y={15}>
        <p>frequently Asked Questions</p>
      </Reveal>
      <Reveal className="cs-faq-heading" y={15}>
        <h3>FAQ</h3>
      </Reveal>
      <Reveal className="cs-faq-list" y={15}>
        {ITEMS.map((it, i) => (
          <Item key={it.q} idx={i} item={it} open={open[i]} onToggle={() => setOpen((o) => o.map((v, j) => (j === i ? !v : v)))} />
        ))}
      </Reveal>
    </section>
  )
}
