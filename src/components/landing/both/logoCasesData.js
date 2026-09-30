// "Logos + Case Study Popup" content (spec/pages/landing.md 5.2 and section 6 "logo-cases").
// Image paths, alts, links and boxes are from tryvalley.json / linkedin-automation.json and the
// 1440/768/390 dumps. `gap` is the Framer stack gap between logo and "CASE STUDY" label in each
// case-study variant ('sb' = space-between with 6px bottom padding); `slotH` is that variant's
// height where it isn't 90.

const IMG = '/assets/pages/landing/img/'
const UNUSED = '/assets/img/_unused/'

// Popup cards, in the order of logoCaseStudyPopups in tryvalley.json (identical on
// /linkedin-automation per states/probe3.json). Popup logos are the _unused files that
// ASSETS.md maps to the popup image URLs.
const POPUPS = {
  tacnode: { logo: UNUSED + '21ARQ0zNQJwMBIayeEce33q0SA.png', title: 'How Tacnode booked 25+ meetings per month with Valley', icp: 'ICP: CTOs, DEVOPS, ENG' },
  tenx: { logo: UNUSED + 'oHzyQ3zMZ9eWYrQeluruiBr72o.png', title: 'How 10x Management generated $84K+ ARR with Valley', icp: 'ICP: CTOs, DEVOPS, ENG' },
  growth: { logo: UNUSED + 'cEU3K0kHt8OwuJppD6dSiP8CU.png', title: 'How Growth Protocol generated $150k pipeline in 4 months with Valley', icp: 'ICP: HEADS OF SALES & MARKETING TEAMS' },
  gocanvas: { logo: UNUSED + '3kp7sgisLKYY4YnymGAMtFzc.png', title: 'How GoCanvas 30x’d outbound pipeline with Valley', icp: 'ICP: OPS, FINANCE & \n\nHR LEADERS' },
  franq: { logo: UNUSED + '2u105qmW9Mo9rPq1Pqa4a2TGU.png', title: 'How Franq generated $64k in pipeline with Valley in one month', icp: 'ICP: FINANCE & BANKING  DECISION MAKERS' },
  darwinian: { logo: UNUSED + 'mTfqvalVWVCZWgPNloJ6jtLj4.png', title: 'How Darwinian Ventures turns leads into revenue with Valley', icp: 'ICP: SALES & GTM LEADERS' },
  kaster: { logo: UNUSED + 'a0X4JO90c87LN6LiUS3wjVVfbEM.png', title: 'How Kaster generated $400k in pipeline in 2 months using Valley', icp: 'ICP: OPS, FINANCE & \n\nHR LEADERS' },
  ggwp: { logo: UNUSED + '0fxf55YOeJxgnUJVGPgN4kUW2I.png', title: 'How GGWP generated $4M in pipeline with Valley', icp: 'ICP: GAME DEVELOPERS & ENGINEERS' },
}

// Case-study logos (same files, sizes and label offsets on both pages).
const CASE = {
  tacnode: { type: 'case', href: 'https://tacnode.io/', src: IMG + 'exjlJuQDsYyeztQTb0LsCqAZ8.png', alt: 'Tacnode logo', w: 142, h: 47, gap: 1, popup: POPUPS.tacnode },
  tenx: { type: 'case', href: 'https://10xmanagement.com/', src: IMG + 'JuRdyYQcFBSuDij8ZL37n65zg.png', alt: '', w: 120, h: 40, fit: 'contain', gap: 'sb', popup: POPUPS.tenx },
  growth: { type: 'case', href: 'https://www.growthprotocol.ai/', src: IMG + 'BfAzR1hw8fexsRS6vpNJ0AfH8.png', alt: '', w: 121, h: 40, gap: 4, smallLabel: true, popup: POPUPS.growth },
  gocanvas: { type: 'case', href: 'https://www.gocanvas.com/', src: IMG + 'NNRya8wNzQbwSmEGV2bOBinXE.png', alt: '', w: 120, h: 40, gap: 3, popup: POPUPS.gocanvas },
  franq: { type: 'case', href: 'https://franq.com.br/', src: IMG + 'QMLPZOfhOV2eI7Cra36pzTCabLs.png', alt: '', w: 138, h: 46, gap: 2, popup: POPUPS.franq },
  darwinian: { type: 'case', href: 'https://www.darwinian.com/', src: IMG + 'WjgwsB4gYPINGk0swCPJGw2KtVE.png', alt: '', w: 120, h: 40, gap: 13, popup: POPUPS.darwinian },
  kaster: { type: 'case', href: 'https://www.kaster.app/', src: IMG + '8OUD83TeyILiI9IDCw0yl6ocQxU.png', alt: '', w: 115, h: 38, gap: 'sb', popup: POPUPS.kaster },
  ggwp: { type: 'case', href: 'https://www.ggwp.com/', src: IMG + 'Zj3dcUQEL8lIDnaOv8ZTEbZbPm0.png', alt: '', w: 120, h: 39, gap: 6, popup: POPUPS.ggwp },
}

const plain = (src, w, h, alt, href) => ({ type: 'plain', src, w, h, alt, href })

// /tryvalley: two centred flex-wrap rows of 150px slots, gap 24 (Gather Voices wraps onto a
// second line of row 1 at 1440). Darwinian's variant is 108 tall here.
export const TRYVALLEY_ROWS = [
  [
    CASE.tacnode,
    plain(UNUSED + '3uRg4W7Du09SgZ8iq14CDmYcYR8.png', 120, 40, 'Brex logo'),
    CASE.tenx,
    plain(UNUSED + 'mFkYfCO2VSJh19ANxRWgNRdfm8.png', 138, 46, 'Valley AI branding featuring interconnected circles on a modern black background.'),
    CASE.growth,
    plain(UNUSED + '5tcZiervDAFIoj05Ml6FPEDSwA.png', 138, 46, 'LinkedIn automation logo featuring interconnected circles on a black background.'),
    CASE.gocanvas,
    { ...plain(UNUSED + 'uMJVarJL6H5sGSGGAsEVkkV7IU.png', 100, 33, 'Valley AI logo featuring stylized letter G in a clean black design background.'), slotH: 45 },
  ],
  [
    plain(UNUSED + '6IeF3jQs8bnbpIHCOHjuvPtIfUw.png', 138, 46, 'CREDAL logo with geometric elements, enhancing LinkedIn automation and AI SDR effectiveness.'),
    CASE.franq,
    { ...CASE.darwinian, slotH: 108 },
    CASE.kaster,
    plain(UNUSED + '6zgSf0wp0U8Bt2HUornH0fUrGkk.png', 120, 40, 'Antler logo png'),
    plain(UNUSED + 'mX7p7YZ6obsVSXSkOgczWo4vEjM.png', 91, 30, 'Hire tofu logo'),
    CASE.ggwp,
  ],
]

const GATHER_HREF =
  'https://www.gathervoices.co/?utm_source=google_adwords&utm_medium=ppc&utm_campaign=branded_search&utm_term=gather%20voices&utm_campaign=Gather+Voices+Brand+Name&utm_source=adwords&utm_medium=ppc&hsa_acc=7322913244&hsa_cam=22132602204&hsa_grp=172058424685&hsa_ad=729534476104&hsa_src=g&hsa_tgt=kwd-1392025050166&hsa_kw=gather%20voices&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=22132602204&gbraid=0AAAAACmqbdpVyuu5IJMXjfonwv-8sEpCA&gclid=Cj0KCQjw8p7GBhCjARIsAEhghZ1-9blVIYIqPhpx6qTZR_iRvPRzBIRzy34uub94QJpDU8_SyTUCOpcaAvI4EALw_wcB'

// /linkedin-automation desktop (>= 1200): 8-column then 7-column grid rows in a 1110 frame.
export const AUTOMATION_DESKTOP_ROWS = [
  [
    CASE.tacnode,
    plain(IMG + 'MP04NtLiOAgx6Flcj0bLyLuJhf4.png', 134, 45, 'Brevity logo', 'https://www.brevitypitch.com/'),
    CASE.tenx,
    plain(IMG + '7zYsuXzHf0XumN9loYVwvdjakg.png', 147, 49, 'Aminochain logo', 'https://aminochain.io/'),
    CASE.growth,
    plain(IMG + '13VWnJxbNcWJ4RQrywuWhxmAqk.png', 138, 46, 'Wayside logo', 'https://www.wayside.io/'),
    CASE.gocanvas,
    plain(IMG + 'SKLVId5vPIbOlS1MzMdYuKEcul0.png', 120, 39, 'Gather Voices logo', GATHER_HREF),
  ],
  [
    plain(IMG + 'pjDoCjQc6XQezYrJDxYMWLOzcEI.png', 138, 46, 'Credal logo', 'https://www.credal.ai/'),
    CASE.franq,
    { ...CASE.darwinian, slotH: 82 },
    CASE.kaster,
    plain(IMG + 'ky7AyFh3vwBaJOjgEbBX3IaSFI4.png', 138, 46, 'Antler logo', 'https://www.antler.co/'),
    { type: 'boxed', src: '/assets/pages/casestudies/ao6dOk2BlJI7MvuVQqyCNjT9Is.png', w: 89, h: 29, alt: '', href: 'https://bolt.new/' },
    CASE.ggwp,
  ],
]

// /linkedin-automation below 1200 ("Content" variant): a 2-column grid, then Tofu centred.
// The plain logos here are not links (their links are listed only at 1280/1440).
export const AUTOMATION_PHONE_GRID = [
  CASE.tacnode,
  plain(IMG + 'MP04NtLiOAgx6Flcj0bLyLuJhf4.png', 120, 40, 'Brevity logo'),
  CASE.tenx,
  plain(IMG + '7zYsuXzHf0XumN9loYVwvdjakg.png', 138, 46, 'Aminochain logo'),
  CASE.growth,
  plain(IMG + '13VWnJxbNcWJ4RQrywuWhxmAqk.png', 138, 46, 'Wayside logo'),
  CASE.gocanvas,
  plain(IMG + 'SKLVId5vPIbOlS1MzMdYuKEcul0.png', 120, 39, 'Gather Voices logo'),
  CASE.darwinian,
  CASE.franq,
  CASE.kaster,
  CASE.ggwp,
  plain(IMG + 'pjDoCjQc6XQezYrJDxYMWLOzcEI.png', 138, 46, 'Credal logo'),
  plain(IMG + 'ky7AyFh3vwBaJOjgEbBX3IaSFI4.png', 138, 46, 'Antler logo'),
]
export const AUTOMATION_PHONE_TAIL = plain(UNUSED + 'mX7p7YZ6obsVSXSkOgczWo4vEjM.png', 119, 39, 'Hire tofu logo')
