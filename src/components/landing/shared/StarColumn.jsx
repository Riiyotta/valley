// "Star Col": five Valley asterisk tiles, the 4th is the iridescent highlight (spec 3.3 / 3.7).
const DARK = '/assets/pages/landing/img/dc5azD2YYmyls1TdpsaWego0N4.png'
const HIGHLIGHT = '/assets/pages/landing/img/ysxcQkBhX6DvdxX0UA6jJSJnSk.png'
const TILES = [DARK, DARK, DARK, HIGHLIGHT, DARK]

export default function StarColumn({ className = '' }) {
  return (
    <div className={`lp-stars ${className}`} data-framer-name="Star Col" aria-hidden="true">
      {TILES.map((src, i) => (
        <div key={i} className="lp-stars__tile">
          <img src={src} alt="" />
        </div>
      ))}
    </div>
  )
}
