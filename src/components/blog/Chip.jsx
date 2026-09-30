// "FEATURED READ" chip (Frame 2147223413): Geist Mono 12/14.4, padding 6px 12px, 1px border
// via ::after, backdrop blur 2px. tone="dark" is the hero card (black text, #000 border);
// tone="light" is every image chip (white text, #d9d9d9 border).
export default function Chip({ tone = 'light', children = 'FEATURED READ' }) {
  return <span className={`bl-chip bl-chip--${tone}`}>{children}</span>
}
