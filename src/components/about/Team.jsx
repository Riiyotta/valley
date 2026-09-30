// /about "Our team" ruled grid ("Frame 2147223576"), spec/pages/about.md section 2 team.
// Signature art sits at opacity .5; each has its own measured size/offset (about.css,
// .ab-sig-N). The live alt texts are SEO strings that do not match the people, so the alts
// here are neutral. LinkedIn button hover: icon 22 -> 24px, #39779a -> rgba(0,0,0,.8), instant.
const TEAM = [
  { role: 'CEO & Founder', href: 'https://www.linkedin.com/in/zayd-syed-ali-4201101a9/', src: '/assets/pages/about/svg/08-team-157x73.svg', fit: 'fill' },
  { role: 'Head of Frontend', href: 'https://www.linkedin.com/in/alex-builds-stuff/', src: '/assets/pages/about/ceFmbLE7EVlcXOeZtbdGkcX7Slk.png' },
  { role: 'Head of Backend', href: 'https://www.linkedin.com/in/arimgibson/', src: '/assets/pages/about/5REZncOoHM98LbuEfgHkkupYdfQ.png' },
  { role: 'Head of CX', href: 'https://www.linkedin.com/in/catherinemccollian/', src: '/assets/pages/about/o3pqKKuHfNrbxiocH0w5CTo0k3c.png' },
  { role: 'Software Engineer', href: 'https://www.linkedin.com/in/olamidesamuel/', src: '/assets/pages/about/5aK4s89tXffGFWh3J7I07ycfUw.png' },
  { role: 'Design Lead', href: 'https://www.linkedin.com/in/skeshav628/', src: '/assets/pages/about/svg/10-team-296x48.svg', fit: 'fill' },
  { role: 'Software Engineer', href: 'https://www.linkedin.com/in/mrgawde/', src: '/assets/pages/about/e1V36ySVpiyAy3VNTYYO8lN4vvY.png', closed: true },
  { role: 'Founding Customer Experience', href: 'https://www.linkedin.com/in/zubeir-said/', src: '/assets/pages/about/SWCBrx1BJR6plVkyXmGdN9UUxs.png', closed: true },
  { role: 'Customer Support', href: 'https://www.linkedin.com/in/bmpcompas/', src: '/assets/pages/about/w8MdWyDEexwl6WS9l6tnUOXq5JU.png' },
  { role: 'Customer Support', href: 'https://www.linkedin.com/in/chad-hizon/', src: '/assets/pages/about/x578HY2mjrMOfIUEXJ6TRvFGqHE.png', fit: 'contain' },
  { role: 'Executive Assistant', href: 'https://www.linkedin.com/in/%F0%9F%97%BB-anna-vecera-%F0%9F%97%BB-887021206/', src: '/assets/pages/about/mc7b6xZvyoZb6XQvbilO0Hzhc.png', fit: 'contain', closed: true },
  { role: 'Head of Growth', href: 'https://www.linkedin.com/in/shubhagrawal/', src: '/assets/pages/about/hFVHZnBo5uhvNaSGn3QsqUBquY.png', closed: true },
]

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  )
}

export default function Team() {
  return (
    <div className="ab-team" data-framer-name="Frame 2147223576">
      <div className="ab-team-head">
        <h1 className="ab-h">Our team</h1>
      </div>
      <div className="ab-team-grid">
        {TEAM.map((m, i) => (
          <div className={m.closed ? 'ab-cell ab-cell--closed' : 'ab-cell'} key={m.href}>
            <div className={`ab-sig-box ab-sig-box-${i + 1}`}>
              <div className={`ab-sig ab-sig-${i + 1}`}>
                <img src={m.src} alt={`${m.role} signature`} style={{ objectFit: m.fit || 'cover' }} decoding="async" />
              </div>
            </div>
            <div className="ab-cell-row">
              <p className="ab-role">{m.role}</p>
              <a className="ab-linkedin" href={m.href} target="_blank" rel="noopener" aria-label={`${m.role} on LinkedIn`}>
                <span className="ab-linkedin-icon">
                  <PersonIcon />
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
