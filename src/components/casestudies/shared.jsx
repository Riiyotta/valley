import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { submitToBookACall } from '../longform/formSubmit.js'

// Forms validate (native constraint validation), then go to the same external demo URL the live
// forms use (shared with the blog templates). Nothing is collected or appended.
export const goToSurface = submitToBookACall

// Framer whileInView (IntersectionObserver, any intersection, plays once).
// Returns [ref, inView]. Reduced motion: visible immediately (CSS also disables the transition).
export function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

// Wrapper element that fades in and rises on first intersection.
// y = initial translateY in px; delay in seconds. Curve: spring 210/70/1 (see shared.css).
export function Reveal({ as: Tag = 'div', y = 15, delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`csx-reveal${inView ? ' is-in' : ''}${className ? ' ' + className : ''}`}
      style={{ '--rv-y': `${y}px`, '--rv-delay': `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Two chevrons ("»"), the live SVG symbols svg776981148_355 (white) and svg1839435250_244 (black).
function ChevronsWhite() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        d="M13.2654 8.00012L9.12736 3.86206L8.18456 4.80487L11.3798 8.00012L8.18456 11.1954L9.12736 12.1382L13.2654 8.00012ZM9.49883 8.00012L5.36078 3.86206L4.41797 4.80487L7.61323 8.00012L4.41797 11.1954L5.36078 12.1382L9.49883 8.00012Z"
        fill="#fff"
      />
    </svg>
  )
}
function ChevronsBlack() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        d="m15.776 8-4.138-4.138-.943.943L13.891 8l-3.196 3.195.943.943L15.776 8ZM12.01 8 7.872 3.862l-.943.943L10.124 8l-3.195 3.195.943.943L12.01 8Z"
        fill="#000"
      />
    </svg>
  )
}

// Shared "Read" pill (spec/pages/blog-index.md 6). As an <a> on /casestudies (132x46),
// as a 109x40 box inside the compact "More Case Studies" card (the card itself is the link there).
export function ReadPill({ href, size = 'card', label = 'Read' }) {
  const inner = (
    <span className="csx-pill-inner">
      <span className="csx-pill-label csx-pill-label--in" aria-hidden="true">
        {label}
      </span>
      <span className="csx-pill-label csx-pill-label--out">{label}</span>
      <span className="csx-pill-arrow csx-pill-arrow--out">
        <ChevronsWhite />
      </span>
      <span className="csx-pill-arrow csx-pill-arrow--in">
        <ChevronsBlack />
      </span>
    </span>
  )
  const cls = `csx-pill csx-pill--${size}`
  return href ? (
    <Link className={cls} to={href}>
      {inner}
    </Link>
  ) : (
    <span className={cls}>{inner}</span>
  )
}

// White 10x10 up arrow used in hero stat chips (data-URI on the live site).
export function ArrowUpWhite() {
  return (
    <svg className="csx-arrow" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
      <path d="M 5.267 2.497 L 5.267 9.8 L 4.067 9.8 L 4.067 2.497 L 0.848 5.715 L 0 4.867 L 4.667 0.2 L 9.334 4.867 L 8.485 5.715 Z" fill="#fff" />
    </svg>
  )
}

// Green-gradient up arrow used in the body result-stat chips (live symbol svg-626028400_490).
export function ArrowUpGreen({ id }) {
  return (
    <svg className="csx-arrow" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
      <path d="M5.2668 2.497V9.8002H4.0668V2.497L0.8484 5.7154L0 4.867L4.6668 0.200195L9.3336 4.867L8.4852 5.7154L5.2668 2.497Z" fill={`url(#${id})`} />
      <defs>
        <linearGradient id={id} x1="4.6668" y1="0.200195" x2="4.6668" y2="9.8002" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C21F" />
          <stop offset="1" stopColor="#008E39" />
        </linearGradient>
      </defs>
    </svg>
  )
}
