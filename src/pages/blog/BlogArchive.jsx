import { Link } from 'react-router-dom'
import { POSTS } from '../../data/blog/posts.js'
import '../../styles/pages/blog/blog-archive.css'

// /blog/archive (blog-index.md section 9): standalone flat list, no nav or footer (routed
// outside Layout in App.jsx). The live link colour is rgba(255,255,255,.25) on white, so the
// titles are nearly invisible; reproduced as-is for visual fidelity.
export default function BlogArchive() {
  return (
    <main className="ba-page">
      <div className="ba-content">
        <h1>Blog archive</h1>
        <div className="ba-list" aria-label="Published Articles">
          {POSTS.map((p) => (
            <Link key={p.slug} className="ba-link" to={`/blog/${p.slug}`}>
              {p.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
