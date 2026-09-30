import { useLayoutEffect } from 'react'
import '../../../styles/pages/landing/motion.css'

// Appear-on-scroll for the landing pages (spec M3; measured on the live pages).
//
// Markup: data-lp-appear="<offset px>" plus optional
//   data-lp-appear-delay="<s>"       Framer transition delay (0, .2, .5, .6 ... 1.4)
//   data-lp-appear-amount="0|0.5"    0 = any intersection, .5 = half the translated box visible
//   data-lp-appear-bp="desktop|all"  live only runs most effects at >= 1200 (breakpoint variant)
//
// Call once from the page component: it runs after every child has mounted, hides the
// eligible elements before the first paint and reveals each one once (animateOnce: true).
// Live keeps these under prefers-reduced-motion, so there is no reduced-motion branch.
const QUERIES = { desktop: '(min-width: 1200px)', below: '(max-width: 1199.98px)' }

export default function useLandingAppear(rootRef, pageKey) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return undefined
    const els = [...root.querySelectorAll('[data-lp-appear]')].filter((el) => {
      const bp = el.dataset.lpAppearBp || 'desktop'
      return bp === 'all' || window.matchMedia(QUERIES[bp]).matches
    })
    els.forEach((el) => {
      el.style.setProperty('--lp-appear-y', `${el.dataset.lpAppear || 15}px`)
      el.style.setProperty('--lp-appear-delay', `${Number(el.dataset.lpAppearDelay) || 0}s`)
      el.dataset.lpAppearState = 'hidden'
    })

    const observers = [0, 0.5].map((amount) => {
      const group = els.filter((el) => (Number(el.dataset.lpAppearAmount) || 0) === amount)
      if (!group.length) return null
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            const ok = amount === 0 ? en.isIntersecting : en.intersectionRatio >= amount
            if (!ok) return
            io.unobserve(en.target)
            en.target.dataset.lpAppearState = 'shown'
          })
        },
        { threshold: amount === 0 ? 0 : [amount] },
      )
      group.forEach((el) => io.observe(el))
      return io
    })

    return () => {
      observers.forEach((io) => io && io.disconnect())
      els.forEach((el) => {
        delete el.dataset.lpAppearState
        el.style.removeProperty('--lp-appear-y')
        el.style.removeProperty('--lp-appear-delay')
      })
    }
  }, [rootRef, pageKey])
}
