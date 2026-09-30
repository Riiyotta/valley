import { Link } from 'react-router-dom'
import ReadPill from './ReadPill.jsx'
import Chip from './Chip.jsx'

// "More Blogs" / "Related Blogs" (blog-post.md section 5). The whole card is the link; the
// live href is "./" (homepage), the clone links to /blog/<slug>.
export function RelatedPostCard({ post }) {
  const img = post.cardUsesPattern ? null : post.cardImageLocal
  return (
    <Link className="bp-rel-card" to={`/blog/${post.slug}`}>
      <div className="bp-rel-media">
        {img ? (
          <img className="bp-rel-img" src={img} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="bp-rel-img bl-pattern" />
        )}
        <div className="bp-rel-overlay" />
        <div className="bp-rel-bottom">
          <Chip tone="light">{post.cardLabel || 'FEATURED READ'}</Chip>
          <span className="bp-rel-time">{post.readTime || '5 min'}</span>
        </div>
      </div>
      <div className="bp-rel-body">
        <h5>{post.title}</h5>
        <ReadPill />
      </div>
    </Link>
  )
}

export default function RelatedPosts({ posts }) {
  return (
    <section className="bp-related">
      <h3>Related Blogs</h3>
      <div className="bp-rel-grid">
        {posts.map((p) => (
          <RelatedPostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  )
}
