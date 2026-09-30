// "Wall of loooooveee" cards (spec 5.4). Verbatim from sections[] "Testimonial Section" in
// tryvalley.json and linkedin-automation.json; each page repeats its set three times in the
// DOM, which WallTicker reproduces. Jason Hardman's photo uses object-position 52.1% 43.8%
// (dump); every other photo is centred.

const IMG = '/assets/pages/landing/img/'

const KASTER = {
  logo: IMG + 'KrX5x7Ck65tnR95uH6lwq7cyhc.jpeg',
  quote:
    '"If you don\'t have an active, engaged LinkedIn pipeline and you have a clearly defined ICP and persona, you need to add Valley to your tech stack immediately to supplement your sales.”',
  photo: IMG + 'xpYEgDiwByLk8eJwucCaEvb7tMU.jpeg',
  name: 'Greg Kantziper',
  role: 'Co-Founder at Kaster',
}
const TACNODE = {
  logo: IMG + '7Rj9hCxcOkh3hnDV5SLMepxp0A.svg',
  quote:
    '“A real response to a message Valley sent a prospect: “I was never considering anything until you reached out with a message that literally spoke to me.” The automation is great but the sauce within Valley is the messaging itself.”',
  photo: '/assets/img/ZLYSGUvKkVzLXYs0HskrNMPEys4.jpeg',
  photoPos: '52.1% 43.8%',
  name: 'Jason Hardman',
  role: 'Founding Enterprise AE @ Tacnode',
}
const TENX = {
  logo: IMG + 'xeGwnd3aYXqpW5qby827e0t9CB4.png',
  quote:
    '"The website intent data has been really useful too. It was literally like 8 to 10x the number of hits that we were getting on Valley versus the other product that we were using at the time."',
  photo: IMG + 'R5AeuyDxdoeADin1x32gC6L5St0.png',
  name: 'Sam Z',
  role: 'Growth 10x Management',
}
const GGWP = {
  logo: IMG + 'qMlFY64Vqx8JelzVT6YLOjTuEKc.png',
  quote:
    '"I found myself looking at some of the messages that it\'s created and thinking like, wow, where did it find this? This went really deep to find information that you could never do in just a cursory search."',
  photo: IMG + 'WtSAHrTok8mtlR2CI7nq7oEQ6Y.jpeg',
  name: "Tim O'Neil",
  role: 'VP Sales & BizDev',
}
const brex = (logo) => ({
  logo: IMG + logo,
  quote: '“If you\'re not using tools like Valley, you will be left behind. This is the future. ”',
  photo: IMG + 'US3dcHl6lQODo0h1pv6U4JkIH7o.jpeg',
  name: 'Garrett Marker',
  role: 'CRO @ Brex',
})
const GROWTH = {
  logo: IMG + 'p1o11T9Jt3naTduCjFwxKLZqc.jpg',
  quote:
    '"I\'m able to come into those [pipeline review] meetings and be like, look at what I booked through Valley. You know, if my other kind of channels have slowed down, I\'m like, but Valley, Valley\'s there."',
  photo: IMG + '2cLT52mkcmCsZRQcm5LtdZPflg.png',
  name: 'Angelene Perez-Vento',
  role: 'AE at Growth Protocol',
}
const SUPERPOSITION = {
  logo: IMG + 'AzaTFg5utqMkNxsdehiBzaluLaI.png',
  logoAlt: 'superposition logo',
  quote:
    '"The messages it writes are actually really high-taste. I was really surprised by the personalization. I don’t want to be a bottleneck for those connection requests going out - it’s that good."',
  photo: IMG + 'homcQSgPT5DxHpbumCgZ7mevjTc.jpeg',
  photoAlt: 'edmund cuthbert',
  name: 'Edmund Cuthbert',
  role: 'Founder at Superposition',
}

export const TRYVALLEY_CARDS = [KASTER, TACNODE, TENX, GGWP, brex('hygAdqGZw7KbG7Kq0snYsPJs0.png'), GROWTH]
export const AUTOMATION_CARDS = [TENX, GGWP, brex('mRuougUbRy1GQgps9Eeug1DG18.png'), GROWTH, TACNODE, KASTER, SUPERPOSITION]
