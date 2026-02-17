// ── Ring Settings Data ─────────────────────────────────────────────────────────

export interface SettingStyle {
  id: string
  name: string
  style: string
  tagline: string
  description: string
  story: string
  basePrice: number
  priceModifier: number
  image: string // placeholder path
  icon: string // emoji icon for now
  compatibleCuts: string[] // 'all' means all cuts work
  popular: boolean
}

export const RING_SETTINGS: SettingStyle[] = [
  {
    id: 'solitaire',
    name: 'Solitaire',
    style: 'Solitaire',
    tagline: 'Timeless elegance',
    description:
      "The most classic engagement ring setting. A single diamond takes center stage, held by four or six prongs, allowing maximum light to enter and showcase the stone's brilliance.",
    story:
      'When you want your diamond to be the undeniable star. Pure. Classic. Forever. The solitaire has endured for centuries because it speaks a simple truth: the diamond itself is the declaration.',
    basePrice: 495,
    priceModifier: 0,
    image: '/images/settings/solitaire.jpg',
    icon: '💍',
    compatibleCuts: ['all'],
    popular: true,
  },
  {
    id: 'halo',
    name: 'Halo',
    style: 'Halo',
    tagline: 'Extra sparkle, maximum presence',
    description:
      'A ring of smaller diamonds surrounds the center stone, creating a halo effect that amplifies the visual size of the diamond and adds exceptional brilliance and sparkle.',
    story:
      'For those who believe more is more. The halo setting makes your center diamond appear larger and more brilliant — a crown of light encircling the stone you chose.',
    basePrice: 795,
    priceModifier: 300,
    image: '/images/settings/halo.jpg',
    icon: '✨',
    compatibleCuts: ['Round Brilliant', 'Oval', 'Cushion', 'Princess', 'Pear', 'Heart'],
    popular: true,
  },
  {
    id: 'three-stone',
    name: 'Three-Stone',
    style: 'Three-Stone',
    tagline: 'Past, present, and future',
    description:
      'Three diamonds in a row represent your past, present, and future together. The center stone is flanked by two smaller side stones that complement and frame the main diamond.',
    story:
      "The most meaningful setting in fine jewelry. Three stones, three moments: where you've been, where you are, where you're going — together.",
    basePrice: 895,
    priceModifier: 400,
    image: '/images/settings/three-stone.jpg',
    icon: '🔮',
    compatibleCuts: ['Round Brilliant', 'Princess', 'Emerald', 'Cushion', 'Oval'],
    popular: false,
  },
  {
    id: 'pave',
    name: 'Pavé',
    style: 'Pavé',
    tagline: 'Delicate diamonds, maximum sparkle',
    description:
      'Tiny diamonds are set close together along the band, paved in precious metal to create a continuous glittering surface. The name comes from the French word for "paved."',
    story:
      'A river of light wrapping your finger. Pavé is the choice for those who want the entire ring to shine — not just the center stone.',
    basePrice: 695,
    priceModifier: 200,
    image: '/images/settings/pave.jpg',
    icon: '🌟',
    compatibleCuts: ['all'],
    popular: true,
  },
  {
    id: 'channel',
    name: 'Channel Set',
    style: 'Channel Set',
    tagline: 'Sleek, modern, protected',
    description:
      'Diamonds are set into a channel cut into the band itself, protected on both sides by metal walls. The result is a smooth, sleek profile with continuous sparkle.',
    story:
      'For the modern woman who values clean lines and practicality without sacrificing brilliance. Diamonds set to last a lifetime of wear.',
    basePrice: 745,
    priceModifier: 250,
    image: '/images/settings/channel.jpg',
    icon: '💫',
    compatibleCuts: ['Round Brilliant', 'Princess', 'Baguette', 'Emerald'],
    popular: false,
  },
  {
    id: 'vintage',
    name: 'Vintage',
    style: 'Vintage',
    tagline: 'Art Deco romance, reimagined',
    description:
      'Inspired by the glamour of the Art Deco era, vintage settings feature intricate filigree work, milgrain detailing, and ornate metalwork that gives the ring a romantic, antique character.',
    story:
      'Some love stories echo through generations. This setting carries the romance of another era — crafted with the same dedication to beauty that has defined fine jewelry for over a century.',
    basePrice: 995,
    priceModifier: 500,
    image: '/images/settings/vintage.jpg',
    icon: '🏛️',
    compatibleCuts: ['Round Brilliant', 'Oval', 'Cushion', 'Asscher', 'Emerald'],
    popular: false,
  },
  {
    id: 'cathedral',
    name: 'Cathedral',
    style: 'Cathedral',
    tagline: 'Regal elevation, architectural beauty',
    description:
      'The band arches up dramatically to support the center stone, mimicking the soaring arches of a cathedral. This elevated setting draws the eye upward and creates a regal, majestic profile.',
    story:
      'Built to last. Built to impress. The cathedral setting is for the diamond that deserves to be elevated — because some love is simply above the rest.',
    basePrice: 645,
    priceModifier: 150,
    image: '/images/settings/cathedral.jpg',
    icon: '⛪',
    compatibleCuts: ['Round Brilliant', 'Princess', 'Cushion', 'Radiant'],
    popular: false,
  },
  {
    id: 'bezel',
    name: 'Bezel',
    style: 'Bezel',
    tagline: 'Modern protection, clean lines',
    description:
      'The diamond is encircled by a custom-made metal rim that holds it securely. The bezel setting offers maximum protection for the stone and creates a sleek, contemporary look.',
    story:
      'Minimalism perfected. The bezel setting strips away all excess, leaving only what matters: the diamond and the metal, in perfect harmony.',
    basePrice: 545,
    priceModifier: 50,
    image: '/images/settings/bezel.jpg',
    icon: '⭕',
    compatibleCuts: ['all'],
    popular: false,
  },
  {
    id: 'split-shank',
    name: 'Split Shank',
    style: 'Split Shank',
    tagline: 'The band that turns heads',
    description:
      'The band splits into two strands as it approaches the center stone, creating a dramatic frame that draws the eye toward the diamond. Often adorned with pavé diamonds.',
    story:
      'One ring, two bands — the split shank creates visual drama that makes your diamond the star of every room you enter.',
    basePrice: 795,
    priceModifier: 300,
    image: '/images/settings/split-shank.jpg',
    icon: '✌️',
    compatibleCuts: ['Round Brilliant', 'Oval', 'Cushion', 'Princess', 'Pear'],
    popular: false,
  },
  {
    id: 'tension',
    name: 'Tension',
    style: 'Tension',
    tagline: 'Diamond suspended in space',
    description:
      'The diamond appears to float between the two ends of the band, held in place only by the tension of the metal. A contemporary engineering marvel that showcases the stone from every angle.',
    story:
      'For the visionary. The tension setting defies tradition — the diamond is held by nothing but force of will, suspended between two pieces of precious metal like the moment before forever.',
    basePrice: 1195,
    priceModifier: 700,
    image: '/images/settings/tension.jpg',
    icon: '⚡',
    compatibleCuts: ['Round Brilliant', 'Princess', 'Emerald', 'Radiant'],
    popular: false,
  },
]

export const METALS = [
  {
    id: '14k-yellow',
    name: '14K Yellow Gold',
    karat: '14K',
    color: 'Yellow',
    hex: '#D4AF37',
    description:
      'Classic warmth and enduring beauty. The most popular choice for engagement rings worldwide.',
    benefits: [
      'Most popular choice',
      'Durable for daily wear',
      'Classic warm tone',
      'Hypoallergenic options available',
    ],
    priceModifier: 0,
    popular: true,
  },
  {
    id: '18k-yellow',
    name: '18K Yellow Gold',
    karat: '18K',
    color: 'Yellow',
    hex: '#C9A227',
    description:
      'Richer, deeper gold color with a higher purity. A premium choice with a more vivid warmth.',
    benefits: [
      'Richer color saturation',
      'Higher gold content (75%)',
      'Prestigious choice',
      'Beautiful patina over time',
    ],
    priceModifier: 250,
    popular: false,
  },
  {
    id: '14k-white',
    name: '14K White Gold',
    karat: '14K',
    color: 'White',
    hex: '#E8E8E8',
    description:
      'Modern elegance that complements any diamond cut. The most versatile choice for engagement rings.',
    benefits: [
      'Modern aesthetic',
      'Pairs with any diamond',
      'Durable composition',
      'Rhodium plated for extra shine',
    ],
    priceModifier: 0,
    popular: true,
  },
  {
    id: '18k-white',
    name: '18K White Gold',
    karat: '18K',
    color: 'White',
    hex: '#F0F0F0',
    description:
      'Premium white gold with a brighter, more brilliant finish. The finest white gold option.',
    benefits: [
      'Brightest white finish',
      'Premium feel and look',
      'Higher gold purity',
      'Less rhodium needed',
    ],
    priceModifier: 300,
    popular: false,
  },
  {
    id: 'platinum',
    name: 'Platinum',
    karat: 'PLAT',
    color: 'Platinum',
    hex: '#E5E4E2',
    description:
      'The most durable and prestigious metal. Naturally white, hypoallergenic, and built to last generations.',
    benefits: [
      'Most durable metal',
      'Naturally white (no rhodium)',
      'Hypoallergenic',
      'Develops a beautiful patina',
    ],
    priceModifier: 600,
    popular: false,
  },
]

export const RING_SIZES = [
  '3',
  '3.5',
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
  '11.5',
  '12',
  '12.5',
  '13',
  '13.5',
  '14',
  '14.5',
  '15',
]

export const ENGRAVING_SUGGESTIONS = [
  'Always & Forever',
  'You Are My Forever',
  '∞ Always ∞',
  'Together Always',
  'My Heart Is Yours',
  'Love Is Infinite',
]
