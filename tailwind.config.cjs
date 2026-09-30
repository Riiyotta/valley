/** @type {import('tailwindcss').Config} */
// Design tokens for the Valley clone. Every value comes from CLONE_SPEC.md
// (sections 2, 4, 5, 6, 19). SHARED FILE: section builders read it, they don't edit it.
// CommonJS on purpose: with Node >= 20.19 Tailwind require()s an ESM config into Node's ESM cache,
// which never reloads in a running dev server. .cjs keeps config edits hot-reloadable.
// In section CSS files (src/styles/<id>.css) use theme('colors.ink.DEFAULT'),
// @media screen(phone) { ... } and @apply; Vite runs every CSS file through Tailwind.
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Framer breakpoints (spec section 2). 768 is Phone; 1280 and 1440 are Desktop.
    screens: {
      phone: { max: '809.98px' },
      tablet: { min: '810px', max: '1199.98px' },
      desktop: { min: '1200px' },
      // tablet + phone together (nav hamburger, stacked hero, logos tablet/phone layout)
      'below-desktop': { max: '1199.98px' },
      // tablet + desktop together
      'above-phone': { min: '810px' },
    },
    extend: {
      fontFamily: {
        // Rendered faces, spec section 4 "Which family renders where"
        'ppnm-medium': ['"PP Neue Montreal Medium"', '"PP Neue Montreal Medium Placeholder"', 'sans-serif'],
        'ppnm-variable': ['"PP Neue Montreal Variable"', '"PP Neue Montreal Variable Placeholder"', 'sans-serif'],
        // "PP Neue Montreal" is aliased to Inter 400/700 (vgs, vcc, vpm quirk, spec 4)
        ppnm: ['"PP Neue Montreal"', 'Inter', 'Arial', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        // Component aliases, all -> PP NM Variable file (weight 100-900)
        proof: ['"Valley Proof Montreal"', 'Arial', 'sans-serif'],
        hero: ['"Valley Hero Montreal"', 'sans-serif'],
        results: ['"Valley Results Montreal"', 'sans-serif'],
        body: ['"Valley Body Montreal"', 'sans-serif'],
        showcase: ['"Valley Showcase Montreal"', 'sans-serif'],
        team: ['"Valley Team Montreal"', 'sans-serif'],
        stack: ['ValleyStack', 'sans-serif'],
        footer: ['ValleyFooter', 'sans-serif'],
      },
      colors: {
        // Framer tokens on body
        framer: {
          white: '#ffffff',
          'white-80': '#ffffff80',
          'white-40': '#ffffff40',
          'white-0d': '#ffffff0d',
          'white-b3': '#ffffffb3',
          black: '#000000',
          'black-80': '#00000080',
          'black-40': '#00000040',
          'black-0d': '#0000000d',
          f8: '#f8f8f8',
          d9: '#d9d9d9',
          linkedin: '#0077b5',
        },
        // Page and surface backgrounds
        surface: {
          DEFAULT: '#f8f9f7', // Framer sections, nav, logo cells, stories card
          vgs: '#f7f9f7', // vgs sections, vcc section
          card: '#ffffff', // cards, wall figures, FAQ panel, integration panel
          offer: '#e8eff0', // pricing offer panel
          team: '#e8efef', // team-fit panel
          hub: '#eaf0ec', // integration hub
          window: '#fcfdf7', // steps "window" card
          shell: '#f8faf9', // showcase app shell
        },
        // Dark surfaces
        dark: {
          endorsement: '#17272b',
          jobs: '#142b32',
          footer: '#1c3036',
          button: '#19282e', // hero primary button, nav CTA
          vgs: '#19292e', // vgs CTA
          vcc: '#1c292e',
          vsq: '#1c292d',
          stories: '#111111', // stories "Start for free"
          brief: '#193d3d', // hero research brief card
          tabbar: 'rgba(21,45,48,0.95)', // hero tab bar
          'vgs-tag': '#1d3138', // vgs "A look inside the workflow" tag
        },
        // Headings
        ink: {
          DEFAULT: '#19282e', // h1, logos h2, stories, team-fit
          vgs: '#1c292e', // vgs, stories h2, vcc
          vsq: '#1c292d',
          showcase: '#203342',
          calc: '#1d343b', // jobs calculator
          'on-dark': '#f6f8f4',
          'on-dark-2': '#f8f9f7',
        },
        // Body greys
        grey: {
          'hero-sub': '#40525c',
          'hero-eyebrow': '#4a5e68',
          body: '#52636c', // vgs paragraphs, stories sub
          '4f5e63': '#4f5e63',
          '536e75': '#536e75',
          'step-inactive': '#64767e',
          '61717c': '#61717c',
          'showcase-meta': '#677783',
          'tab-inactive': '#5e7077',
          'on-dark-b8': '#b8cbce',
          'on-dark-c2': '#c2d0d2',
          'on-dark-bb': '#bbcdce',
          'on-dark-b4': '#b4c7c9',
        },
        // Accent blues
        accent: {
          DEFAULT: '#376f9c', // stories accent, showcase --vs-accent, links
          'vgs-link': '#32658b',
          team: '#315e8d',
          pricing: '#3275b5',
          'pricing-eyebrow': '#3375b4',
          'vgs-eyebrow': '#42687c',
          'vgs-tab': '#426f94',
          step: '#356c93',
          hero: '#416f91',
          login: '#002669', // nav "Log in"
          blink: '#0077b5', // dot blink
          'jobs-top': '#83b6e8',
          'jobs-filled': '#a9d0ec',
          'jobs-progress': '#96c8ea',
        },
        // Greens
        leaf: {
          check: '#4a755c',
          'pricing-check': '#507466',
          'closing-line2': '#476b60',
          'plan-bg': '#e4eddf',
          'plan-border': '#c5d8c0',
        },
        // Borders / hairlines
        line: {
          DEFAULT: '#d6dfdd', // logo grid, stories card
          vgs: '#d4dedb', // vgs cards and stepnav
          ccd8d3: '#ccd8d3',
          faq: '#cfd8d8',
          offer: '#d2dfe1',
          'faq-panel': '#d6dede',
          arrow: '#ced9d8',
          'team-tabs': '#cad6d7',
          'team-panel': '#ccd8d8',
          tool: '#cddad3',
          'jobs-tile': '#476069',
          calc: '#cfddda',
          footer: 'rgba(255,255,255,0.19)',
          'footer-ghost': '#718589',
          closing: 'rgba(172,191,184,0.4)',
          proof: '#d7dfdc', // hero proof story top border
        },
      },
      borderRadius: {
        // The design is square (radius 0); exceptions from spec section 5
        chip: '3px', // hero-visual chips, stories avatar, wall-of-love avatars
        card: '4px', // hero cards, hero proof avatar, logo tooltip, showcase sidebar items
        arrow: '2px', // stories arrows, endorsement avatar, hamburger button
        shell: '5px', // showcase shell
        'showcase-card': '6px',
        menu: '12px', // mobile menu panel
      },
      boxShadow: {
        dropdown: '0 12px 30px rgba(25,41,46,.082)',
        'vgs-window': '0 10px 25px rgba(21,43,52,.125)',
        'showcase-shell': '0 10px 35px -20px rgba(21,45,78,.5)',
        'hero-chip': '0 12px 24px -15px rgba(20,47,71,.5)',
        'hero-card': '0 22px 45px -18px rgba(21,57,81,.5), 0 2px 5px rgba(41,72,87,.125)',
        tooltip: '0 10px 20px rgba(0,0,0,.05)',
      },
      backgroundImage: {
        'endorsement-shade':
          'linear-gradient(110deg, rgba(15,35,38,.80), rgba(15,35,38,.57) 58%, rgba(15,35,38,.42))',
        'jobs-stage':
          'linear-gradient(100deg, #142b32 0%, rgba(20,43,50,.95) 45%, rgba(20,43,50,.4))',
        'closing-scene':
          'linear-gradient(90deg, rgba(245,246,235,.92) 0%, rgba(246,247,239,.96) 25%, rgba(245,246,236,.96) 75%, rgba(237,240,229,.85) 100%)',
        'showcase-thumb': 'linear-gradient(0deg, rgba(23,44,55,.79), rgba(23,44,55,.125))',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(.22,1,.36,1)', // hero / showcase enter curve
        blink: 'cubic-bezier(.5,0,.88,.77)', // dot blink half-period tween
      },
      animation: {
        'dot-blink': 'dot-blink 2s infinite', // keyframes live in src/index.css
      },
    },
  },
  plugins: [],
}
