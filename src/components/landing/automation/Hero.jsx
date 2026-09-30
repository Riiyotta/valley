import { useState } from 'react'
import '../../../styles/pages/landing/automation/hero.css'
import CtaButton from '../both/CtaButton.jsx'
import { SIGNUP_URL, SURFACE_URL } from '../both/links.js'

// /linkedin-automation hero, layer "Variant 1" (desktop) / "Variant 3" (phone) (spec 6 la-hero,
// motion M13). The four "Fade Card Stack" quote bubbles exist only at desktop. Each bubble runs
// the same 16.48s loop, offset so one bubble is on screen at a time (order measured in
// motion/motion_linkedin-automation_1440.json: top-left, bottom-right, top-right, then the
// bottom-left one, whose slot is extrapolated because it fell outside the 7s sample).
// Stack entrance (live "Fade Card Stack" optimized-appear config, timed from page start):
// a/b/c rise 100/50/100px on the appear spring (210/70) after 2s; d rises 50px with a .4s
// cubic-bezier(.44,0,.56,1) tween and no delay.
const STACK = {
  a: { y: 100, spring: true },
  b: { y: 50, spring: true },
  c: { y: 100, spring: true },
  d: { y: 50, spring: false },
}
// Live starts these from its inline appear script, which runs ~.75s into the page load
// (measured: d at ~.75s, a/b/c at ~2.75s after navigation start).
const STACK_SCRIPT_START = 750
const STACK_SPRING_DELAY = 2000

// Word blur-in (live text effect: tokenization "word", startDelay .2s, .05s per token,
// .4s cubic-bezier(.44,0,.56,1), from opacity .001 / blur(5px) / translateY(10px)). The line
// break and the space runs are tokens too, which is why "LinkedIn" and "Automation" land
// .1s apart. On desktop the final "Calls." renders without the effect (it is swapped in at
// hydration), so it is visible from the start, as on live.
const WORD_DELAYS_DESKTOP = [0.2, 0.3, 0.4, 0.5, 0.55, 0.6, 0.65, 0.7, null]
const WORD_DELAYS_PHONE = [0.2, 0.3, 0.4, 0.5, 0.55, 0.6, 0.7, 0.75, 0.8]

function Word({ children, delay, className = '' }) {
  if (delay === null) return <span className={className || undefined}>{children}</span>
  return (
    <span className={`la-hero__word ${className}`.trim()} style={{ '--la-word-delay': `${delay}s` }}>
      {children}
    </span>
  )
}

const BUBBLES = [
  {
    key: 'a',
    pos: 'la-bubble--a',
    delay: -1736,
    quote: '"No other outbound tool can compete"',
    photo: '/assets/pages/landing/img/PEnd2BVpOQgqZSJpQ0LveYRg0.png',
    name: 'Greg',
    logo: '/assets/pages/landing/img/8aai3kbA67mLlwK6YCBMunST8.png',
    logoW: 30,
    logoH: 10,
  },
  {
    key: 'b',
    pos: 'la-bubble--b',
    delay: 6506,
    quote: '"No other outbound tool can compete"',
    photo: '/assets/pages/landing/img/PEnd2BVpOQgqZSJpQ0LveYRg0.png',
    name: 'Greg',
    logo: '/assets/pages/landing/img/8aai3kbA67mLlwK6YCBMunST8.png',
    logoW: 30,
    logoH: 10,
  },
  {
    key: 'c',
    pos: 'la-bubble--c',
    delay: 2234,
    quote: '"Valley is dominating all other channels"',
    photo: '/assets/pages/landing/img/Rn5R4PlzpIgnagliXVRg4NnLlvE.png',
    name: 'Jason',
    logo: '/assets/pages/casestudies/smONImap5ISmB6bwJgBIPPsAAKM.png',
    logoW: 46,
    logoH: 15,
  },
  {
    key: 'd',
    pos: 'la-bubble--d',
    delay: 10620,
    quote: '"No other outbound tool can compete"',
    photo: '/assets/pages/landing/img/PEnd2BVpOQgqZSJpQ0LveYRg0.png',
    name: 'Greg',
    logo: '/assets/pages/landing/img/8aai3kbA67mLlwK6YCBMunST8.png',
    logoW: 30,
    logoH: 10,
  },
]

function Bubble({ b, stackStart }) {
  const st = STACK[b.key]
  return (
    <div
      className={`la-bubble ${b.pos}`}
      data-la-stack={st.spring ? 'spring' : 'tween'}
      style={{
        '--la-bubble-delay': `${b.delay}ms`,
        '--la-stack-y': `${st.y}px`,
        '--la-stack-delay': `${stackStart + (st.spring ? STACK_SPRING_DELAY : 0)}ms`,
      }}
    >
      <svg className="la-bubble__outline" viewBox="0 0 200 116" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 0 0 L 200 0 L 200 116 L 0 116 Z" pathLength="1" />
      </svg>
      <div className="la-bubble__card">
        <div className="la-bubble__quote">
          <p>{b.quote}</p>
        </div>
        <div className="la-bubble__client">
          <img className="la-bubble__photo" src={b.photo} alt="" />
          <div className="la-bubble__who">
            <p>{b.name}</p>
            <img src={b.logo} alt="" style={{ width: b.logoW, height: b.logoH }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  // Live times the stack entrance from page start; on a client-side route change it is timed
  // from mount instead.
  const [stackStart] = useState(() => {
    const now = typeof performance !== 'undefined' ? performance.now() : 0
    return now < 5000 ? Math.max(0, Math.round(STACK_SCRIPT_START - now)) : 0
  })
  return (
    <section id="la-hero" className="la-hero">
      <img
        className="la-hero__bg"
        src="/assets/pages/landing/img/y9E8JCzvNWid9P6Sv5ODRz6mcHo.png"
        alt=""
        aria-hidden="true"
      />
      <div className="la-hero__stack">
        <p className="la-hero__label" data-lp-appear="15" data-lp-appear-bp="all">
          The quality-first alternative to Heyreach, expandi &amp; linkedhelper
        </p>
        <h1 className="la-hero__h1 la-hero__h1--desktop">
          <Word delay={WORD_DELAYS_DESKTOP[0]}>AI</Word>{' '}
          <Word delay={WORD_DELAYS_DESKTOP[1]} className="la-hero__blue">LinkedIn</Word>{' '}
          <Word delay={WORD_DELAYS_DESKTOP[2]}>Automation</Word>
          <br />
          <Word delay={WORD_DELAYS_DESKTOP[3]}>that</Word> <Word delay={WORD_DELAYS_DESKTOP[4]}>Books</Word>{' '}
          <Word delay={WORD_DELAYS_DESKTOP[5]}>You</Word> <Word delay={WORD_DELAYS_DESKTOP[6]}>More</Word>{' '}
          <Word delay={WORD_DELAYS_DESKTOP[7]}>Sales</Word> <Word delay={WORD_DELAYS_DESKTOP[8]}>Calls.</Word>
        </h1>
        <h1 className="la-hero__h1 la-hero__h1--phone">
          <Word delay={WORD_DELAYS_PHONE[0]}>AI</Word>{' '}
          <Word delay={WORD_DELAYS_PHONE[1]} className="la-hero__blue">LinkedIn</Word>{' '}
          <Word delay={WORD_DELAYS_PHONE[2]}>Automation</Word>
          <br />
          <Word delay={WORD_DELAYS_PHONE[3]}>that</Word> <Word delay={WORD_DELAYS_PHONE[4]}>Books</Word>{' '}
          <Word delay={WORD_DELAYS_PHONE[5]}>You</Word>
          <br />
          <Word delay={WORD_DELAYS_PHONE[6]}>More</Word> <Word delay={WORD_DELAYS_PHONE[7]}>Sales</Word>{' '}
          <Word delay={WORD_DELAYS_PHONE[8]}>Calls</Word>
        </h1>
        <p className="la-hero__sub la-hero__sub--desktop" data-lp-appear="15" data-lp-appear-delay="1" data-lp-appear-bp="all">
          Valley AI automatically qualifies every lead for ICP fit, conducts deep research, crafts
          hyper-personalized messages that sound just like you, and automates it on LinkedIn while
          keeping your account safe.
        </p>
        <p className="la-hero__sub la-hero__sub--phone" data-lp-appear="15" data-lp-appear-delay="1" data-lp-appear-bp="all">
          Qualify every lead for ICP fit, conduct deep research, and craft hyper-personalized
          messages that sound just like you on LinkedIn while keeping your account safe.
        </p>
        <div className="la-hero__ctas" data-lp-appear="15" data-lp-appear-delay="1.6" data-lp-appear-bp="all">
          <CtaButton href={SURFACE_URL} label="Book Demo →" />
          <CtaButton href={SIGNUP_URL} label="Try Valley Now" tone="light" kind="secondary" />
        </div>
      </div>
      <div className="la-bubbles" aria-hidden="true">
        {BUBBLES.map((b) => (
          <Bubble b={b} key={b.key} stackStart={stackStart} />
        ))}
      </div>
    </section>
  )
}
