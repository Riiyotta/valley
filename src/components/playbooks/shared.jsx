// Helpers shared by the playbook library and drawer (source functions `N`, `M`, `j`).
import { BASICS } from '../../data/playbooks.js'

export const SIGNUP = 'https://beta.joinvalley.co/signup'

// 20px arrow used on cards and "Start for free" CTAs.
export function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  )
}

// Sending channel label derived from the play's "send" flow steps.
export function channelLabel(play) {
  const sends = play.flow.filter(([kind]) => kind === 'send').map(([, label]) => label.toLowerCase())
  const linkedin = sends.some((s) => s.includes('linkedin'))
  const email = sends.some((s) => s.includes('email'))
  return linkedin && email ? 'LinkedIn + email' : linkedin ? 'LinkedIn only' : email ? 'Email only' : 'Audience discovery'
}

// Category membership.
export function inCategory(play, key) {
  return (
    key === 'all' ||
    (key === 'basic' && BASICS.includes(play.title)) ||
    (key === 'social' && play.section.startsWith('social')) ||
    (key === 'signal' && play.section.startsWith('signal')) ||
    play.section === key
  )
}
