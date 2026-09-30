// Shared "Read" pill (Framer "Variant 1"), blog-index.md section 6. Used on every blog card,
// the hero featured card, related-post cards and the case strip. Not a link on its own: it
// sits inside the card's link (or, in the case-strip header, stands alone as on the live site).
// Props: tall (48px instead of 40px: hero featured card and case-strip header), className.
// Hover (CSS, blog-shared.css): bg #000 -> transparent, 1px black outline, labels swap with the
// spring {stiffness 500, damping 60, mass 1} sampled to linear().
export default function ReadPill({ tall = false, className = '' }) {
  const cls = ['bl-pill', tall ? 'bl-pill--tall' : '', className].filter(Boolean).join(' ')
  return (
    <span className={cls}>
      <span className="bl-pill-labels" aria-hidden="true">
        <span className="bl-pill-label bl-pill-label--out">Read</span>
        <span className="bl-pill-label bl-pill-label--in">Read</span>
      </span>
      <span className="bl-sr">Read</span>
      <svg className="bl-pill-glyph" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3.2 3.5h1.7L9 8l-4.1 4.5H3.2L7.3 8 3.2 3.5Zm4.6 0h1.7L13.6 8l-4.1 4.5H7.8L11.9 8 7.8 3.5Z" fill="currentColor" />
      </svg>
    </span>
  )
}
