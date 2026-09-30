// "Blog Title" post header (blog-post.md section 2): light-teal band with h1, subtitle
// (the post's meta description = posts.json excerpt) and the landscape cover (card image,
// or the stripe pattern when the post has none).
export default function PostHeader({ post }) {
  const cover = post.cardUsesPattern ? null : post.cardImageLocal
  return (
    <header className="bp-head">
      <div className="bp-head-inner">
        <h1>{post.title}</h1>
        {post.excerpt ? <p className="bp-head-sub">{post.excerpt}</p> : null}
        <div className="bp-cover">
          {cover ? <img src={cover} alt="" decoding="async" /> : <div className="bp-cover-fill bl-pattern" />}
        </div>
        {/* "Article metadata": 0-height code component on the live page (JSON-LD only) */}
        <div className="bp-head-meta" aria-hidden="true" />
      </div>
    </header>
  )
}
