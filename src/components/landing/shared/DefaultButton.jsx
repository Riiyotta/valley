import { useLayoutEffect, useRef } from 'react'

// "Default" expanding button (spec/pages/landing.md 3.13, M8). The rest width is the button's
// natural width, measured once fonts are ready and written to --lp-btn-w so the CSS width
// transition (rest -> 240px on hover) has two numeric end points. The label is rendered twice:
// the second copy sits 42px lower and is hidden by overflow, as on the live page.
export default function DefaultButton({ href, label, className = '', black = false }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    let alive = true
    const measure = () => {
      if (!alive) return
      el.style.removeProperty('--lp-btn-w')
      el.style.width = 'max-content'
      const w = el.getBoundingClientRect().width
      el.style.width = ''
      // display:none (e.g. the sticky bar below 1200px) measures 0: keep width auto until shown.
      if (w > 0) el.style.setProperty('--lp-btn-w', `${w}px`)
    }
    const onResize = () => {
      if (!el.style.getPropertyValue('--lp-btn-w')) measure()
    }
    measure()
    document.fonts?.ready?.then(measure)
    window.addEventListener('resize', onResize)
    return () => {
      alive = false
      window.removeEventListener('resize', onResize)
    }
  }, [label])
  return (
    <a
      ref={ref}
      className={`lp-btn${black ? ' lp-btn--black' : ''} ${className}`}
      href={href}
      data-framer-name="Default"
    >
      <span className="lp-btn__label">{label}</span>
      <span className="lp-btn__label lp-btn__label--next" aria-hidden="true">
        {label}
      </span>
    </a>
  )
}
