import { Reveal } from './shared.jsx'

// Logo band (spec/pages/casestudies-index.md 5; Framer component O7DDc in components.css).
// Each cell is a 150px-wide column pinned to its grid track start; "case" cells carry the CASE STUDY badge.
// Per-cell image sizes, fit and inner gaps are the measured live values (dump_1440.txt section 4).
const IMG = '/assets/pages/landing/img/'
const ROW1 = [
  { href: 'https://tacnode.io/', src: IMG + 'exjlJuQDsYyeztQTb0LsCqAZ8.png', alt: 'Tacnode logo', w: 142, h: 47, badge: { gap: 1 } },
  { href: 'https://www.brevitypitch.com/', src: IMG + 'MP04NtLiOAgx6Flcj0bLyLuJhf4.png', alt: 'Brevity logo', w: 134, h: 45 },
  { href: 'https://10xmanagement.com/', src: IMG + 'JuRdyYQcFBSuDij8ZL37n65zg.png', alt: '10x Management logo', w: 120, h: 40, fit: 'contain', badge: { spread: true } },
  { href: 'https://aminochain.io/', src: IMG + '7zYsuXzHf0XumN9loYVwvdjakg.png', alt: 'Aminochain logo', w: 147, h: 49 },
  { href: 'https://www.growthprotocol.ai/', src: IMG + 'BfAzR1hw8fexsRS6vpNJ0AfH8.png', alt: 'Growth Protocol logo', w: 121, h: 40, badge: { gap: 4, small: true } },
  { href: 'https://www.wayside.io/', src: IMG + '13VWnJxbNcWJ4RQrywuWhxmAqk.png', alt: 'Wayside logo', w: 138, h: 46 },
  { href: 'https://www.gocanvas.com/', src: IMG + 'NNRya8wNzQbwSmEGV2bOBinXE.png', alt: 'GoCanvas logo', w: 120, h: 40, badge: { gap: 3 } },
  {
    href: 'https://www.gathervoices.co/?utm_source=google_adwords&utm_medium=ppc&utm_campaign=branded_search&utm_term=gather%20voices&utm_campaign=Gather+Voices+Brand+Name&utm_source=adwords&utm_medium=ppc&hsa_acc=7322913244&hsa_cam=22132602204&hsa_grp=172058424685&hsa_ad=729534476104&hsa_src=g&hsa_tgt=kwd-1392025050166&hsa_kw=gather%20voices&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=22132602204&gbraid=0AAAAACmqbdpVyuu5IJMXjfonwv-8sEpCA&gclid=Cj0KCQjw8p7GBhCjARIsAEhghZ1-9blVIYIqPhpx6qTZR_iRvPRzBIRzy34uub94QJpDU8_SyTUCOpcaAvI4EALw_wcB',
    src: IMG + 'SKLVId5vPIbOlS1MzMdYuKEcul0.png',
    alt: 'Gather Voices logo',
    w: 120,
    h: 39,
  },
]
const ROW2 = [
  { href: 'https://www.credal.ai/', src: IMG + 'pjDoCjQc6XQezYrJDxYMWLOzcEI.png', alt: 'Credal logo', w: 138, h: 46 },
  { href: 'https://franq.com.br/', src: IMG + 'QMLPZOfhOV2eI7Cra36pzTCabLs.png', alt: 'Franq logo', w: 138, h: 46, badge: { gap: 2 } },
  { href: 'https://www.darwinian.com/', src: IMG + 'WjgwsB4gYPINGk0swCPJGw2KtVE.png', alt: 'Darwinian logo', w: 120, h: 40, badge: { gap: 13, h: 82 } },
  { href: 'https://www.kaster.app/', src: IMG + '8OUD83TeyILiI9IDCw0yl6ocQxU.png', alt: 'Kaster logo', w: 115, h: 38, badge: { spread: true } },
  { href: 'https://www.antler.co/', src: IMG + 'ky7AyFh3vwBaJOjgEbBX3IaSFI4.png', alt: 'Antler logo', w: 138, h: 46 },
  { href: 'https://bolt.new/', src: '/assets/pages/casestudies/ao6dOk2BlJI7MvuVQqyCNjT9Is.png', alt: 'Bolt.new logo', w: 89, h: 29, white: true },
  { href: 'https://www.ggwp.com/', src: IMG + 'Zj3dcUQEL8lIDnaOv8ZTEbZbPm0.png', alt: 'GGWP logo', w: 120, h: 39, badge: { gap: 6, tall: true } },
]

function Cell({ l }) {
  const b = l.badge
  const cls = ['csi-logo', b ? 'csi-logo--case' : '', b?.spread ? 'csi-logo--spread' : '', l.white ? 'csi-logo--white' : '']
    .filter(Boolean)
    .join(' ')
  const style = b ? { gap: b.spread ? undefined : `${b.gap}px`, height: b.h ? `${b.h}px` : undefined } : undefined
  return (
    <a className={cls} href={l.href} target="_blank" rel="noopener noreferrer" style={style}>
      <img src={l.src} alt={l.alt} style={{ width: l.w, height: l.h, objectFit: l.fit || 'cover' }} loading="lazy" decoding="async" />
      {b && <span className={`csi-logo-badge${b.small ? ' csi-logo-badge--sm' : ''}${b.tall ? ' csi-logo-badge--tall' : ''}`}>Case Study</span>}
    </a>
  )
}

export default function CustomerLogoBand() {
  return (
    <section className="csi-logos">
      <img className="csi-logos-bg" src="/assets/pages/landing/img/GYo82zsW5GvTwz5BUTfdARIZrY.jpg" alt="" aria-hidden="true" />
      <div className="csi-logos-content">
        <Reveal as="p" className="csi-logos-text" y={15} delay={0.5}>
          300+ teams trust Valley’s LinkedIn automation because we keep their calendars full of high quality prospects
        </Reveal>
        <Reveal className="csi-logos-rows" y={15} delay={0.5}>
          <div className="csi-logos-row csi-logos-row--1">
            {ROW1.map((l) => (
              <Cell l={l} key={l.src} />
            ))}
          </div>
          <div className="csi-logos-row csi-logos-row--2">
            {ROW2.map((l) => (
              <Cell l={l} key={l.src} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
