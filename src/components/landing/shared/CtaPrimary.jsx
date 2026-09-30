import '../../../styles/pages/landing/shared.css'

// `cta__primary` 3D button (spec/pages/landing.md 3.13, M9), black variant. Shared with
// /tryvalley and /linkedin-automation; pass className for placement.
export default function CtaPrimary({ href, label, className = '' }) {
  return (
    <a
      className={`lp-ctap ${className}`}
      href={href}
      data-framer-name="cta__primary"
    >
      <span className="lp-ctap__content">
        <span className="lp-ctap__text">{label}</span>
      </span>
    </a>
  )
}
