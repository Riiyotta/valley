import { useEffect, useRef, useState } from 'react'
import '../../styles/pages/pricing/reveal.css'

// Framer "appear in view" (animate once). Starts at {opacity: 0, y} and settles with the
// live spring (stiffness 210, damping 70, mass 1) once `threshold` of the element is visible,
// after `delay` seconds. Spring is a CSS linear() curve in reveal.css (no framer-motion).
// Values per element: spec/pages/pricing.md section 8.2. Reduced motion: shown at rest.
export default function Reveal({ as: Tag = 'div', y = 15, delay = 0, threshold = 0.5, className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return (
    <Tag
      ref={ref}
      className={className ? `pr-reveal ${className}` : 'pr-reveal'}
      data-shown={String(shown)}
      style={{ '--reveal-y': `${y}px`, '--reveal-delay': `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
