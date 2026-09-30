import { useEffect, useState } from 'react'
import DefaultButton from '../shared/DefaultButton.jsx'

// "Bottom Sticky bar 3" (spec 3.1, M1). Desktop only (display:none below 1200 in CSS).
// Visible at load; any downward scroll hides it (translateY 79px, opacity 0); upward scrolling
// shows it again after ~100ms. The 500ms cubic-bezier(.55,0,.14,1) transition is in CSS.
// The "Open" panel and footer strip are dead design layers on the live page (spec 12.7): not built.
const SHOW_DELAY = 100

export default function StickyBar({ data }) {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let last = window.scrollY
    let timer = null
    const onScroll = () => {
      const y = window.scrollY
      if (y > last) {
        clearTimeout(timer)
        timer = null
        setHidden(true)
      } else if (y < last && timer === null) {
        timer = setTimeout(() => {
          timer = null
          setHidden(false)
        }, SHOW_DELAY)
      }
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])
  return (
    <section id="sticky-bar" className="lp-sticky" data-hidden={hidden ? 'true' : 'false'} data-framer-name="Bottom Sticky bar 3">
      <div className="lp-sticky__row">
        <div className="lp-sticky__copy">
          <h1 className="lp-sticky__title">{data.title}</h1>
          <h2 className="lp-sticky__sub">{data.subtitle}</h2>
        </div>
        <DefaultButton href={data.cta.href} label={data.cta.label} />
      </div>
    </section>
  )
}
