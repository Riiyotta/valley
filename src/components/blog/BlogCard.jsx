import { Link } from 'react-router-dom'
import ReadPill from './ReadPill.jsx'
import Chip from './Chip.jsx'

// "All Blogs" list card (blog-index.md section 4). One markup, two variants switched in CSS:
// desktop (>= 810) "Featured Blog" card and the phone (< 810) overlay card.
// Only the body is a link (./blog/<slug>), as on the live site.
export default function BlogCard({ post }) {
  const img = post.cardUsesPattern ? null : post.cardImageLocal
  return (
    <div className="bl-card">
      <div className="bl-card-media">
        {img ? (
          <img className="bl-card-img" src={img} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="bl-card-img bl-pattern" />
        )}
        <div className="bl-card-overlay" />
        <div className="bl-card-time-top">
          <span className="bl-card-time bl-card-time--phone">{post.readTime || '5 min'}</span>
        </div>
        <div className="bl-card-bottom">
          <Chip tone="light">{post.cardLabel || 'FEATURED READ'}</Chip>
          <span className="bl-card-time bl-card-time--desk">{post.readTime || '5 min'}</span>
        </div>
      </div>
      <Link className="bl-card-body" to={`/blog/${post.slug}`}>
        <h5 className="bl-card-title">{post.title}</h5>
        <ReadPill />
      </Link>
    </div>
  )
}
