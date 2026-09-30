import { useEffect, useState } from 'react'
import BlogCard from './BlogCard.jsx'
import { POSTS } from '../../data/blog/posts.js'

// "All Blogs" CMS list with Framer "Load More" (blog-index.md section 4).
// Page size is 24 at >= 1200, 6 at 810-1199 (live "Featured - Tablet") and 4 below 810;
// each click appends one page instantly. The button is removed once every post is shown.
const PHONE_QUERY = '(max-width: 809.98px)'
const TABLET_QUERY = '(min-width: 810px) and (max-width: 1199.98px)'

function pageSize() {
  if (typeof window === 'undefined') return 24
  if (window.matchMedia(PHONE_QUERY).matches) return 4
  if (window.matchMedia(TABLET_QUERY).matches) return 6
  return 24
}

export default function BlogCardGrid() {
  const [count, setCount] = useState(pageSize)
  const [step, setStep] = useState(pageSize)

  useEffect(() => {
    const mqs = [window.matchMedia(PHONE_QUERY), window.matchMedia(TABLET_QUERY)]
    const onChange = () => setStep(pageSize())
    mqs.forEach((mq) => mq.addEventListener('change', onChange))
    return () => mqs.forEach((mq) => mq.removeEventListener('change', onChange))
  }, [])

  const shown = POSTS.slice(0, count)
  return (
    <section className="bl-list">
      <div className="bl-grid">
        {shown.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
        {count < POSTS.length && (
          <button type="button" className="bl-more" onClick={() => setCount((c) => Math.min(c + step, POSTS.length))}>
            Load More
          </button>
        )}
      </div>
    </section>
  )
}
