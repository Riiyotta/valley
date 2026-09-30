// Eyebrow tag chip: 4x4 dot + Geist Mono 14/14 label on #e7eff0 (spec 3.2, 3.5, 3.6, 3.8, 3.9).
// tone "amber" = #b77541 dot/text; cream = #fff8df bg (demo); hover = scale 1.05 (M7, hero only).
export default function LandingTag({ as: Text = 'p', tone = 'blue', cream = false, hover = false, className = '', children }) {
  const cls = ['lp-tag', tone === 'amber' && 'lp-tag--amber', cream && 'lp-tag--cream', hover && 'lp-tag-hover', className]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={cls} data-framer-name="Tag">
      <div className="lp-tag__dot" />
      <Text className="lp-tag__text">{children}</Text>
    </div>
  )
}
