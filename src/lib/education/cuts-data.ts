export interface DiamondCut {
  id: string
  name: string
  teaser: string
  description: string
  characteristics: string[]
  bestFor: string[]
  styleKeywords: string[]
}

export const diamondCuts: DiamondCut[] = [
  {
    id: 'round',
    name: 'Round Brilliant',
    teaser: 'The ultimate sparkle and timeless choice.',
    description:
      'The round brilliant cut is the most popular diamond shape in the world and is specifically engineered to maximize brilliance and fire. Its precise facet pattern reflects light exceptionally well, creating unmatched sparkle. Round diamonds are timeless, versatile, and pair beautifully with any engagement ring or fine jewelry setting.',
    characteristics: [
      '58 precisely angled facets',
      'Maximum light return',
      'Unmatched brilliance and fire',
    ],
    bestFor: ['Classic engagement rings', 'Solitaire settings', 'Halo designs'],
    styleKeywords: ['Timeless', 'Classic', 'Brilliant'],
  },
  {
    id: 'oval',
    name: 'Oval',
    teaser: 'Elegant sparkle with a flattering, elongated shape.',
    description:
      'The oval cut delivers brilliance similar to a round diamond while offering a more distinctive, elongated silhouette. Its shape creates the illusion of longer, slimmer fingers and appears larger than many other cuts of the same carat weight. Oval diamonds feel modern, refined, and effortlessly elegant.',
    characteristics: ['Elongated silhouette', 'Appears larger per carat', 'Brilliant-cut faceting'],
    bestFor: ['Modern engagement rings', 'Finger-lengthening effect', 'East-west settings'],
    styleKeywords: ['Modern', 'Elegant', 'Distinctive'],
  },
  {
    id: 'princess',
    name: 'Princess',
    teaser: 'A bold square shape with brilliant sparkle.',
    description:
      "The princess cut is a modern square diamond known for its sharp corners and exceptional light performance. It combines contemporary style with strong brilliance, making it one of the most popular engagement ring choices after round diamonds. It's ideal for clients who love clean lines and a modern look.",
    characteristics: ['Sharp pointed corners', 'Square silhouette', 'Strong brilliance'],
    bestFor: ['Contemporary solitaires', 'Modern channel settings', 'Bezel settings'],
    styleKeywords: ['Modern', 'Bold', 'Geometric'],
  },
  {
    id: 'cushion',
    name: 'Cushion',
    teaser: 'Soft, romantic curves with vintage character.',
    description:
      'The cushion cut features a square or rectangular shape with rounded corners, creating a soft, pillow-like appearance. It blends classic charm with modern sparkle and is often chosen for its romantic, vintage-inspired feel. Cushion diamonds look beautiful in both traditional and modern designs.',
    characteristics: ['Rounded corners', 'Pillow-like silhouette', 'Vintage-inspired sparkle'],
    bestFor: ['Vintage-style rings', 'Halo settings', 'Three-stone designs'],
    styleKeywords: ['Romantic', 'Vintage', 'Soft'],
  },
  {
    id: 'emerald',
    name: 'Emerald',
    teaser: 'Sophisticated lines and elegant flashes of light.',
    description:
      'The emerald cut is a rectangular step-cut diamond defined by long, clean facets and an open table. Rather than intense sparkle, it highlights clarity and symmetry through its signature "hall-of-mirrors" effect. This cut offers a refined, timeless look favored for its understated luxury.',
    characteristics: ['Step-cut facets', 'Hall-of-mirrors effect', 'Open table emphasizes clarity'],
    bestFor: ['Minimalist solitaires', 'Art Deco settings', 'Three-stone designs'],
    styleKeywords: ['Sophisticated', 'Minimalist', 'Luxurious'],
  },
  {
    id: 'marquise',
    name: 'Marquise',
    teaser: 'Dramatic shape that maximizes visual size.',
    description:
      'The marquise cut is an elongated diamond with pointed ends that creates a striking and elegant silhouette. Its shape makes the diamond appear larger than many other cuts of the same carat weight and naturally lengthens the appearance of the finger. It is bold, distinctive, and highly flattering.',
    characteristics: [
      'Pointed ends',
      'Largest surface area per carat',
      'Finger-lengthening effect',
    ],
    bestFor: ['Dramatic statement rings', 'Vintage-inspired designs', 'Cocktail rings'],
    styleKeywords: ['Dramatic', 'Bold', 'Flattering'],
  },
  {
    id: 'pear',
    name: 'Pear',
    teaser: 'Graceful teardrop shape with brilliant sparkle.',
    description:
      'The pear cut combines the brilliance of a round diamond with the elegance of a marquise shape. Rounded on one end and pointed on the other, it offers a soft, feminine look that is both classic and unique. Pear-shaped diamonds are popular for their graceful appearance and versatile styling.',
    characteristics: ['Teardrop silhouette', 'Hybrid brilliant cut', 'Versatile orientation'],
    bestFor: ['Drop earrings', 'Pendant necklaces', 'East-west engagement rings'],
    styleKeywords: ['Graceful', 'Feminine', 'Unique'],
  },
  {
    id: 'radiant',
    name: 'Radiant',
    teaser: 'High sparkle with a modern, bold silhouette.',
    description:
      'The radiant cut features a square or rectangular shape with trimmed corners and brilliant-style facets. It delivers exceptional brightness while maintaining a strong geometric outline. This cut blends the elegance of step cuts with the sparkle of brilliant cuts, making it perfect for clients who want maximum brilliance in a modern design.',
    characteristics: ['Trimmed corners', 'Brilliant-style facets', 'Exceptional brightness'],
    bestFor: ['Modern solitaires', 'Three-stone rings', 'Mixed metal settings'],
    styleKeywords: ['Vibrant', 'Modern', 'Versatile'],
  },
  {
    id: 'asscher',
    name: 'Asscher',
    teaser: 'Vintage glamour with striking symmetry.',
    description:
      'The Asscher cut is a square step-cut diamond with deeply cropped corners and a distinctive, layered appearance. Known for its Art Deco heritage, it showcases clarity and symmetry through bold, dramatic light reflections. This cut is ideal for lovers of vintage elegance and architectural design.',
    characteristics: ['Deeply cropped corners', 'Octagonal silhouette', 'Art Deco step-cut facets'],
    bestFor: ['Art Deco settings', 'Vintage-style rings', 'Architectural designs'],
    styleKeywords: ['Vintage', 'Architectural', 'Glamorous'],
  },
  {
    id: 'heart',
    name: 'Heart',
    teaser: 'A romantic symbol of love and individuality.',
    description:
      'The heart cut is a distinctive and meaningful diamond shape representing love and commitment. Achieving perfect symmetry and sparkle requires expert craftsmanship. This cut is best suited for clients seeking a sentimental, eye-catching design that stands out while remaining elegant.',
    characteristics: [
      'Symbolic heart silhouette',
      'Modified brilliant cut',
      'Requires precise craftsmanship',
    ],
    bestFor: ['Romantic gifts', 'Pendants', 'Statement engagement rings'],
    styleKeywords: ['Romantic', 'Symbolic', 'Sentimental'],
  },
]

export function getCutById(id: string): DiamondCut | undefined {
  return diamondCuts.find((cut) => cut.id === id)
}

export function isValidCutId(id: string): boolean {
  return diamondCuts.some((cut) => cut.id === id)
}
