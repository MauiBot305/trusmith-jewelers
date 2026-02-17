// ── Brand Constants ────────────────────────────────────────────────────────────

export const BRAND = {
  name: 'True Smith Jewelers',
  tagline: 'Lab-grown diamonds, crafted with purpose',
  phone: '(305) 555-0000',
  email: 'hello@truesmithjewelers.com',
  address: 'Miami, FL',
  instagram: 'https://instagram.com/truesmithjewelers',
  facebook: 'https://facebook.com/truesmithjewelers',
}

// ── Diamond Constants ─────────────────────────────────────────────────────────

export const DIAMOND_CUTS = [
  'Round',
  'Oval',
  'Princess',
  'Cushion',
  'Emerald',
  'Marquise',
  'Pear',
  'Radiant',
  'Asscher',
  'Heart',
] as const

export const DIAMOND_COLORS = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'] as const

export const DIAMOND_CLARITIES = [
  'FL',
  'IF',
  'VVS1',
  'VVS2',
  'VS1',
  'VS2',
  'SI1',
  'SI2',
  'I1',
] as const

export const DIAMOND_CERTIFICATIONS = ['IGI', 'GIA'] as const

// ── Ring Settings ─────────────────────────────────────────────────────────────

export const RING_SETTINGS = [
  { name: 'Solitaire', story: 'Classic, timeless. Lets the diamond speak for itself.' },
  { name: 'Halo', story: 'Surrounded by light. Maximizes brilliance and presence.' },
  { name: 'Pavé', story: 'A path of diamonds. Romance in every detail.' },
  { name: 'Three-Stone', story: 'Past, present, future. Your journey in one ring.' },
  { name: 'Cathedral', story: 'Elevated, architectural. A ring that commands attention.' },
  { name: 'Bezel', story: 'Modern, protective. Sleek lines for the contemporary soul.' },
  { name: 'Tension', story: 'The diamond floats. Suspended between two worlds.' },
  { name: 'Vintage', story: 'Inspired by eras past. Crafted with timeless detail.' },
  { name: 'East-West', story: 'Horizontal elegance. A new perspective on a classic stone.' },
  { name: 'Bypass', story: 'Two paths that meet. A ring as unique as your love.' },
] as const

// ── Metals ────────────────────────────────────────────────────────────────────

export const METALS = [
  {
    name: 'Yellow Gold',
    karats: ['14K', '18K'],
    description: 'The classic choice. Warm, traditional, eternally beautiful.',
  },
  {
    name: 'White Gold',
    karats: ['14K', '18K'],
    description: "Cool and contemporary. Enhances a diamond's brilliance.",
  },
  {
    name: 'Rose Gold',
    karats: ['14K', '18K'],
    description: 'Romantic and distinctive. A modern heirloom.',
  },
  {
    name: 'Platinum',
    karats: ['950'],
    description: 'The pinnacle of luxury. Pure, rare, and built to last forever.',
  },
] as const

// ── Ring Sizes ────────────────────────────────────────────────────────────────

export const RING_SIZES = [
  '4',
  '4.5',
  '5',
  '5.5',
  '6',
  '6.5',
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10',
  '10.5',
  '11',
] as const

// ── Builder Steps ─────────────────────────────────────────────────────────────

export const BUILDER_STEPS = [
  { step: 1, label: 'Diamond', description: 'Choose your stone' },
  { step: 2, label: 'Setting', description: 'Choose your style' },
  { step: 3, label: 'Metal', description: 'Choose your metal' },
  { step: 4, label: 'Details', description: 'Personalize it' },
  { step: 5, label: 'Preview', description: 'See your ring' },
  { step: 6, label: 'Quote', description: 'Get your price' },
] as const

// ── Deposit Amount ────────────────────────────────────────────────────────────

export const DEPOSIT_PERCENTAGE = 0.2 // 20% deposit
export const DEPOSIT_MINIMUM = 500 // $500 minimum

// ── Gold Types for Sell Form ──────────────────────────────────────────────────

export const GOLD_TYPES = [
  '10K Yellow Gold',
  '14K Yellow Gold',
  '18K Yellow Gold',
  '24K Gold (Pure)',
  '14K White Gold',
  '18K White Gold',
  '14K Rose Gold',
  '18K Rose Gold',
  'Gold Coins',
  'Gold Bars',
  'Mixed/Other',
] as const
