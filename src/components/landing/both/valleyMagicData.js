// Calendar content for the "Valley magic" July 2025 grid, parsed from
// spec/pages/landing/dumps/dump_tryvalley_1440.txt (section [4]). Each label is
// [text, bg color, watercolor overlay key, reveal stop]. The reveal stop comes from
// motion/motion_tryvalley_1440.json: the label's hider fades out when the slider reaches
// that stop (0 = revealed at rest, null = its hider never moves, so it stays covered).
// The third label on days 7 and 26 is removed by a Framer variant swap at stop 3
// (its hider vanishes with it), so it is marked null. Cumulative revealed counts per
// stop: 2 / 17 / 41 / 67 (spec M5).
export const OVERLAYS = {
  A: '/assets/pages/landing/img/Dm2wyGw2FNtyCmJ52IxV7mLplo.png',
  B: '/assets/pages/landing/img/rkdfi8FlTUYhYphEH5CjUmF4I.png',
  C: '/assets/pages/landing/img/44mBuaKUzJt59tKLF2RwhwGsYsg.png',
}

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const CELLS = [
  { day: "29", muted: true, labels: [["Danny/Followup", "#bde9ff", "A", 3], ["Demo Call", "#fccece", "B", 3]] },
  { day: "30", muted: true, labels: [["Kastor CEO", "#bde9ff", "B", 1]] },
  { day: "1", muted: false, labels: [["Discovery Call", "#bde9ff", "C", 2], ["Acme<>John", "#fccece", "B", 2]] },
  { day: "2", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 1], ["Demo Call", "#fccece", "B", 1], ["Valley/Demo", "#ffe8a4", "C", 1]] },
  { day: "3", muted: false, labels: [["Demo Call", "#bde9ff", "A", 2]] },
  { day: "4", muted: false, labels: [["Liam/Followup", "#bde9ff", "C", 2], ["Demo Call", "#fccece", "B", 2], ["Valley/Demo", "#bde9ff", "C", 2]] },
  { day: "5", muted: false, labels: [["Intro/OpenAI", "#bde9ff", "A", 1], ["Demo Call", "#fccece", "B", 1]] },
  { day: "6", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 2], ["Demo Call", "#fccece", "B", 2], ["Valley/Demo", "#bde9ff", "C", 2]] },
  { day: "7", muted: false, labels: [["Discovery Call", "#bde9ff", "A", 3], ["Quick Deo", "#fccece", "B", 3], ["Acme<>Sophie", "#ffe495", "C", null]] },
  { day: "8", muted: false, labels: [["Demo Call", "#bde9ff", "A", 1], ["Close/Outline", "#fccece", "B", 1]] },
  { day: "9", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", null], ["Demo Call", "#fccece", "B", null], ["Valley/Demo", "#bde9ff", "C", null]] },
  { day: "10", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 3], ["Demo Call", "#fccece", "B", 3], ["Valley/Demo", "#bde9ff", "C", 3]] },
  { day: "11", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 2], ["Demo Call", "#fccece", "B", 2], ["Valley/Demo", "#bde9ff", "C", 2]] },
  { day: "12", muted: false, labels: [["Asheley's Demo", "#bde9ff", "A", null], ["Growth Team", "#fccece", "B", null]] },
  { day: "13", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 3], ["Jake/Intro", "#fccece", "B", 3], ["Valley/Demo", "#bde9ff", "C", 3]] },
  { day: "14", muted: false, labels: [["Rahee Demo", "#bde9ff", "A", 2], ["Discovery Call", "#fccece", "B", 2]] },
  { day: "15", muted: false, labels: [["Valley Demo", "#bde9ff", "B", 0]] },
  { day: "16", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 3], ["Demo Call", "#fccece", "B", 3], ["Valley/Demo", "#ffe8a4", "C", 3]] },
  { day: "17", muted: false, labels: [["Close/Outline", "#bde9ff", "A", 2], ["Demo Call", "#fccece", "B", 2]] },
  { day: "18", muted: false, labels: [["Clay/AE Demo", "#bde9ff", "A", 3]] },
  { day: "19", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 1], ["Demo Call", "#fccece", "B", 1], ["Valley/Demo", "#bde9ff", "C", 1]] },
  { day: "20", muted: false, labels: [["Jessica/Intro", "#bde9ff", "A", 1]] },
  { day: "21", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", null], ["Demo Call", "#fccece", "B", null], ["Valley/Demo", "#bde9ff", "C", null]] },
  { day: "22", muted: false, labels: [["Demo Call", "#bde9ff", "A", 2], ["Folk Demo", "#fccece", "B", 2]] },
  { day: "23", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 3], ["Demo Call", "#fccece", "B", 3], ["Valley/Demo", "#bde9ff", "C", 3]] },
  { day: "24", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 2], ["Demo Call", "#fccece", "B", 2], ["Valley/Demo", "#bde9ff", "C", 2]] },
  { day: "25", muted: false, labels: [["Rahee Demo", "#bde9ff", "A", 1]] },
  { day: "26", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 3], ["Demo Call", "#fccece", "B", 3], ["Valley/Demo", "#ffe8a4", "C", null]] },
  { day: "27", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 2], ["Demo Call", "#fccece", "B", 2], ["Valley/Demo", "#bde9ff", "C", 2]] },
  { day: "28", muted: false, labels: [["Demo", "#bde9ff", "A", 3]] },
  { day: "29", muted: false, labels: [["Growth Team", "#bde9ff", "A", 1], ["Zayd/Demo", "#fccece", "B", 1]] },
  { day: "30", muted: false, labels: [["Liam/Followup", "#bde9ff", "A", 3], ["Demo Call", "#ffe8a4", "B", 3], ["Valley/Demo", "#bde9ff", "C", 3]] },
  { day: "31", muted: false, labels: [["Monthly Review", "#bde9ff", "A", 0]] },
  { day: "01", muted: true, labels: [["Liam/Followup", "#bde9ff", "A", null], ["Demo Call", "#fccece", "B", null], ["Valley/Demo", "#bde9ff", "C", null]] },
  { day: "02", muted: true, labels: [["Liam/Followup", "#bde9ff", "A", 3], ["Demo Call", "#fccece", "B", 3], ["Valley/Demo", "#ffe8a4", "C", 3]] },
]
