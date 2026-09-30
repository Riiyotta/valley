import { useEffect, useRef, useState } from 'react'

// Live-component motion gate (spec/pages/product.md 6.5): true while at least `threshold` of
// the element is visible, reduced motion is off and the tab is visible. Replays on re-entry.
export default function useLiveInView(threshold = 0.15) {
  const ref = useRef(null)
  const [live, setLive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let intersecting = false
    const update = () => setLive(intersecting && !mq.matches && !document.hidden)
    const io =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            (entries) => {
              intersecting = !!entries[0]?.isIntersecting
              update()
            },
            { threshold },
          )
    if (io) io.observe(el)
    mq.addEventListener?.('change', update)
    document.addEventListener('visibilitychange', update)
    return () => {
      io?.disconnect()
      mq.removeEventListener?.('change', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [threshold])
  return [ref, live]
}
