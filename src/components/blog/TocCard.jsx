// "Table of contents" card (blog-post.md section 3). Items are the article's section titles.
// The live links point at "../" (broken); here each item scrolls to its section id.
// activeIndex comes from the page's scroll-spy (-1 = none active).
export default function TocCard({ items, activeIndex }) {
  const go = (e, id) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ block: 'start' })
  }
  return (
    <nav className="bp-toc" aria-label="Table of contents">
      <div className="bp-toc-inner">
        <h5>Table of contents</h5>
        {items.map((it, i) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={i === activeIndex ? 'bp-toc-link is-active' : 'bp-toc-link'}
            aria-current={i === activeIndex ? 'true' : undefined}
            onClick={(e) => go(e, it.id)}
          >
            <p>{it.title}</p>
          </a>
        ))}
      </div>
    </nav>
  )
}
