import '../../../styles/pages/landing/both/base.css'

// cta__primary / cta__secondary 3D button (spec 3.13 and M9). `tone` is the content colour
// ("dark" = black box + white label, "light" = white box + black label). `kind="secondary"`
// is the hero's "Try Valley Now" variant, whose outer wrapper does not scale on hover.
export default function CtaButton({ href, label, tone = 'dark', kind = 'primary', className = '' }) {
  const external = /^https?:/.test(href)
  return (
    <div className={`lx-cta ${className}`} data-tone={tone} data-kind={kind}>
      <a
        className="lx-cta__hole"
        href={href}
        {...(external ? { rel: 'noopener noreferrer' } : {})}
      >
        <span className="lx-cta__content">
          <span className="lx-cta__label">{label}</span>
        </span>
      </a>
    </div>
  )
}
