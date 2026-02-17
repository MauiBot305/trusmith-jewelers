import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ── Diamond image URLs (Unsplash placeholders) ────────────────────────────────
const DIAMOND_IMAGES = {
  round: [
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    'https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=800&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
  ],
  oval: [
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
  ],
  princess: [
    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80',
    'https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=800&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    'https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=800&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
  ],
}

const PRODUCT_IMAGES = {
  ring: [
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    'https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=800&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
  ],
  bracelet: [
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=800&q=80',
    'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=800&q=80',
  ],
  chain: [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    'https://images.unsplash.com/photo-1576022162028-ffac5e1a70dd?w=800&q=80',
    'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80',
  ],
}

async function main() {
  console.log('🌱 Seeding True Smith Jewelers database...')

  // Clear existing phase 3 data
  await prisma.inventoryProduct.deleteMany()
  await prisma.diamond.deleteMany()

  // ── 20 Sample Diamonds ──────────────────────────────────────────────────────
  const diamonds = await Promise.all([
    prisma.diamond.create({
      data: {
        sku: 'DIA-RND-001',
        cut: 'Round Brilliant',
        carat: 1.01,
        color: 'D',
        clarity: 'VVS1',
        certification: 'IGI',
        certNumber: 'IGI-2024-001234',
        price: 8500,
        images: DIAMOND_IMAGES.round,
        featured: true,
        description: 'Exceptional round brilliant with ideal cut proportions. Near flawless with D color. Certified by IGI.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-RND-002',
        cut: 'Round Brilliant',
        carat: 0.75,
        color: 'E',
        clarity: 'VS1',
        certification: 'GIA',
        certNumber: 'GIA-2024-223344',
        price: 4200,
        images: DIAMOND_IMAGES.round,
        description: 'Beautiful 3/4 carat round brilliant. E color near-colorless, VS1 clarity eye-clean.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-RND-003',
        cut: 'Round Brilliant',
        carat: 2.05,
        color: 'F',
        clarity: 'VS2',
        certification: 'IGI',
        certNumber: 'IGI-2024-009876',
        price: 22000,
        images: DIAMOND_IMAGES.round,
        featured: true,
        description: 'Stunning 2-carat round brilliant. F colorless, VS2 clarity. Exceptional brilliance and fire.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-RND-004',
        cut: 'Round Brilliant',
        carat: 1.5,
        color: 'G',
        clarity: 'SI1',
        certification: 'GIA',
        certNumber: 'GIA-2024-445566',
        price: 11200,
        images: DIAMOND_IMAGES.round,
        description: '1.5 carat round brilliant, G color near-colorless, SI1 eye-clean. Excellent value.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-OVL-001',
        cut: 'Oval',
        carat: 1.2,
        color: 'D',
        clarity: 'IF',
        certification: 'IGI',
        certNumber: 'IGI-2024-112233',
        price: 12800,
        images: DIAMOND_IMAGES.oval,
        featured: true,
        description: 'Internally flawless oval cut. D colorless — the pinnacle of diamond grading.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-OVL-002',
        cut: 'Oval',
        carat: 0.9,
        color: 'F',
        clarity: 'VS2',
        certification: 'GIA',
        certNumber: 'GIA-2024-334455',
        price: 5600,
        images: DIAMOND_IMAGES.oval,
        description: '0.9ct oval cut with excellent brilliance. F colorless, VS2 eye-clean.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-OVL-003',
        cut: 'Oval',
        carat: 1.85,
        color: 'G',
        clarity: 'VVS2',
        certification: 'IGI',
        certNumber: 'IGI-2024-556677',
        price: 18500,
        images: DIAMOND_IMAGES.oval,
        description: 'Near-2ct oval with VVS2 clarity. G color appears white in most settings.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-PRC-001',
        cut: 'Princess',
        carat: 1.0,
        color: 'E',
        clarity: 'VVS2',
        certification: 'GIA',
        certNumber: 'GIA-2024-667788',
        price: 7200,
        images: DIAMOND_IMAGES.princess,
        description: 'Perfect 1.00ct princess cut. E colorless, VVS2 near-flawless. Modern geometric elegance.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-PRC-002',
        cut: 'Princess',
        carat: 0.5,
        color: 'H',
        clarity: 'SI2',
        certification: 'IGI',
        certNumber: 'IGI-2024-778899',
        price: 1800,
        images: DIAMOND_IMAGES.princess,
        description: 'Classic half-carat princess cut. H near-colorless, SI2 — excellent value choice.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-CSH-001',
        cut: 'Cushion',
        carat: 1.35,
        color: 'D',
        clarity: 'VS1',
        certification: 'IGI',
        certNumber: 'IGI-2024-889900',
        price: 10900,
        images: DIAMOND_IMAGES.default,
        description: 'Romantic cushion cut with pillow-soft edges. D colorless, VS1 clarity.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-CSH-002',
        cut: 'Cushion',
        carat: 2.4,
        color: 'F',
        clarity: 'VS2',
        certification: 'GIA',
        certNumber: 'GIA-2024-990011',
        price: 28000,
        images: DIAMOND_IMAGES.default,
        featured: true,
        description: 'Exceptional 2.4ct cushion cut. F colorless, VS2. Extraordinary size and brilliance.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-EMR-001',
        cut: 'Emerald',
        carat: 1.1,
        color: 'D',
        clarity: 'FL',
        certification: 'GIA',
        certNumber: 'GIA-2024-101112',
        price: 15500,
        images: DIAMOND_IMAGES.default,
        featured: true,
        description: 'Flawless emerald cut — the rarest clarity grade. D colorless. Hall-of-mirrors effect.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-EMR-002',
        cut: 'Emerald',
        carat: 0.8,
        color: 'G',
        clarity: 'VS2',
        certification: 'IGI',
        certNumber: 'IGI-2024-121314',
        price: 4100,
        images: DIAMOND_IMAGES.default,
        description: 'Elegant emerald cut. G near-colorless, VS2 eye-clean. Step-cut faceting.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-MRQ-001',
        cut: 'Marquise',
        carat: 1.15,
        color: 'E',
        clarity: 'VVS1',
        certification: 'IGI',
        certNumber: 'IGI-2024-131415',
        price: 9800,
        images: DIAMOND_IMAGES.default,
        description: 'Dramatic marquise cut. E colorless, VVS1 near-flawless. Elongating on the finger.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-PER-001',
        cut: 'Pear',
        carat: 1.0,
        color: 'F',
        clarity: 'VS1',
        certification: 'GIA',
        certNumber: 'GIA-2024-141516',
        price: 7800,
        images: DIAMOND_IMAGES.default,
        description: 'Teardrop-shaped pear cut. F colorless, VS1 clarity. Vintage-modern hybrid.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-RAD-001',
        cut: 'Radiant',
        carat: 1.6,
        color: 'G',
        clarity: 'VS1',
        certification: 'IGI',
        certNumber: 'IGI-2024-151617',
        price: 13200,
        images: DIAMOND_IMAGES.default,
        description: '1.6ct radiant cut. G color, VS1 clarity. Maximum brilliance with geometric outline.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-ASS-001',
        cut: 'Asscher',
        carat: 1.25,
        color: 'E',
        clarity: 'IF',
        certification: 'GIA',
        certNumber: 'GIA-2024-161718',
        price: 14200,
        images: DIAMOND_IMAGES.default,
        description: 'Art Deco-inspired Asscher cut. E colorless, IF internally flawless. Octagonal step-cut.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-HRT-001',
        cut: 'Heart',
        carat: 0.85,
        color: 'D',
        clarity: 'VS2',
        certification: 'IGI',
        certNumber: 'IGI-2024-171819',
        price: 6200,
        images: DIAMOND_IMAGES.default,
        description: 'Romantic heart-shaped diamond. D colorless, VS2 eye-clean. Ultimate symbol of love.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-RND-005',
        cut: 'Round Brilliant',
        carat: 3.0,
        color: 'D',
        clarity: 'FL',
        certification: 'GIA',
        certNumber: 'GIA-2024-181920',
        price: 48000,
        images: DIAMOND_IMAGES.round,
        featured: true,
        description: 'Extraordinary 3.00ct flawless round brilliant. D-FL — the absolute pinnacle. Extremely rare.',
      },
    }),
    prisma.diamond.create({
      data: {
        sku: 'DIA-CSH-003',
        cut: 'Cushion',
        carat: 0.7,
        color: 'H',
        clarity: 'SI1',
        certification: 'IGI',
        certNumber: 'IGI-2024-191920',
        price: 2400,
        images: DIAMOND_IMAGES.default,
        description: '0.7ct cushion cut. H near-colorless, SI1 eye-clean. Exceptional value.',
      },
    }),
  ])

  console.log(`✅ Created ${diamonds.length} diamonds`)

  // ── 15 Sample Products (Rings, Bracelets, Chains) ─────────────────────────
  const products = await Promise.all([
    // Rings
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-RNG-001',
        name: 'Eternal Solitaire Ring',
        category: 'ring',
        metalType: 'White Gold',
        metalPurity: '18k',
        price: 4800,
        description: 'The quintessential solitaire engagement ring. Six-prong 18k white gold setting showcases a 0.75ct round brilliant lab-grown diamond. Timeless elegance, built to last generations.',
        images: PRODUCT_IMAGES.ring,
        featured: true,
        diamondType: 'lab',
        diamondSpecs: JSON.stringify({ carat: 0.75, cut: 'Round Brilliant', color: 'F', clarity: 'VS1' }),
        weight: '3.2g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-RNG-002',
        name: 'Pavé Halo Engagement Ring',
        category: 'ring',
        metalType: 'Yellow Gold',
        metalPurity: '14k',
        price: 6200,
        description: 'Brilliant halo design with micro-pavé diamonds encircling a 1.0ct oval center stone. Yellow gold band adds warmth. A modern classic for the modern romantic.',
        images: PRODUCT_IMAGES.ring,
        featured: true,
        diamondType: 'lab',
        diamondSpecs: JSON.stringify({ carat: 1.0, cut: 'Oval', color: 'G', clarity: 'VS2' }),
        weight: '4.1g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-RNG-003',
        name: 'Three-Stone Anniversary Ring',
        category: 'ring',
        metalType: 'Rose Gold',
        metalPurity: '14k',
        price: 7500,
        description: 'Three stones representing your past, present, and future. Princess-cut center flanked by trillion side stones. Rose gold band for a distinctly romantic look.',
        images: PRODUCT_IMAGES.ring,
        diamondType: 'lab',
        diamondSpecs: JSON.stringify({ carat: 1.5, cut: 'Princess', color: 'F', clarity: 'VVS2' }),
        weight: '4.8g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-RNG-004',
        name: 'Emerald Cut East-West Ring',
        category: 'ring',
        metalType: 'Platinum',
        metalPurity: 'Platinum 950',
        price: 9800,
        description: 'Contemporary east-west emerald cut in pure platinum. The sideways orientation is a bold modern statement. Bezel-set for security and a sleek profile.',
        images: PRODUCT_IMAGES.ring,
        featured: true,
        diamondType: 'lab',
        diamondSpecs: JSON.stringify({ carat: 1.1, cut: 'Emerald', color: 'E', clarity: 'VVS1' }),
        weight: '6.0g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-RNG-005',
        name: 'Cushion Cut Solitaire Ring',
        category: 'ring',
        metalType: 'White Gold',
        metalPurity: '14k',
        price: 5400,
        description: 'Romantic cushion cut in a classic four-prong solitaire. 14k white gold with milgrain edge detail. Vintage-inspired with modern craftsmanship.',
        images: PRODUCT_IMAGES.ring,
        diamondType: 'lab',
        diamondSpecs: JSON.stringify({ carat: 0.9, cut: 'Cushion', color: 'G', clarity: 'VS1' }),
        weight: '3.8g',
      },
    }),
    // Tennis Bracelets
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-BRC-001',
        name: 'Classic Tennis Bracelet',
        category: 'bracelet',
        metalType: 'White Gold',
        metalPurity: '14k',
        price: 3200,
        description: 'The iconic tennis bracelet. 7 inches of continuous round brilliant lab-grown diamonds in a four-prong setting. 3.50 total carat weight. The ultimate everyday luxury.',
        images: PRODUCT_IMAGES.bracelet,
        featured: true,
        diamondType: 'lab',
        diamondSpecs: JSON.stringify({ carat: 3.5, cut: 'Round Brilliant', color: 'F', clarity: 'VS1' }),
        dimensions: '7 inches',
        weight: '8.4g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-BRC-002',
        name: 'Gold Tennis Bracelet',
        category: 'bracelet',
        metalType: 'Yellow Gold',
        metalPurity: '18k',
        price: 4100,
        description: 'Warm yellow gold tennis bracelet with princess-cut diamonds. 4.0 total carats of F-color lab diamonds. 18k gold for a rich, premium finish.',
        images: PRODUCT_IMAGES.bracelet,
        featured: true,
        diamondType: 'lab',
        diamondSpecs: JSON.stringify({ carat: 4.0, cut: 'Princess', color: 'F', clarity: 'VS2' }),
        dimensions: '7 inches',
        weight: '9.2g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-BRC-003',
        name: 'Rose Gold Diamond Bracelet',
        category: 'bracelet',
        metalType: 'Rose Gold',
        metalPurity: '14k',
        price: 2800,
        description: 'Feminine rose gold tennis bracelet with oval-cut diamonds. 2.5 total carat weight. The pink-gold warmth makes diamonds appear more vivid.',
        images: PRODUCT_IMAGES.bracelet,
        diamondType: 'lab',
        diamondSpecs: JSON.stringify({ carat: 2.5, cut: 'Oval', color: 'G', clarity: 'VS2' }),
        dimensions: '7 inches',
        weight: '7.8g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-BRC-004',
        name: 'Platinum Emerald Bracelet',
        category: 'bracelet',
        metalType: 'Platinum',
        metalPurity: 'Platinum 950',
        price: 6500,
        description: 'Emerald-cut diamonds set in pure platinum. 5.0 total carats in a bezel-set tennis bracelet. For the true connoisseur.',
        images: PRODUCT_IMAGES.bracelet,
        diamondType: 'lab',
        diamondSpecs: JSON.stringify({ carat: 5.0, cut: 'Emerald', color: 'E', clarity: 'VVS2' }),
        dimensions: '7.5 inches',
        weight: '12.5g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-BRC-005',
        name: 'Stackable Diamond Bracelet',
        category: 'bracelet',
        metalType: 'White Gold',
        metalPurity: '14k',
        price: 1800,
        description: 'Slim, stackable tennis bracelet with pavé diamonds. 1.5 total carats. Designed to wear alone or stacked.',
        images: PRODUCT_IMAGES.bracelet,
        diamondType: 'lab',
        diamondSpecs: JSON.stringify({ carat: 1.5, cut: 'Round Brilliant', color: 'G', clarity: 'VS2' }),
        dimensions: '6.5 inches',
        weight: '5.2g',
      },
    }),
    // Chains
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-CHN-001',
        name: '14k Gold Cuban Link Chain',
        category: 'chain',
        metalType: 'Yellow Gold',
        metalPurity: '14k',
        price: 2400,
        description: 'Classic Cuban link chain in 14k yellow gold. 6mm width, 20-inch length. Heavy, solid links with a lobster clasp. The cornerstone of fine jewelry.',
        images: PRODUCT_IMAGES.chain,
        featured: true,
        dimensions: '20 inches, 6mm',
        weight: '28g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-CHN-002',
        name: 'Rope Chain Necklace',
        category: 'chain',
        metalType: 'Yellow Gold',
        metalPurity: '18k',
        price: 3100,
        description: '18k yellow gold rope chain. 3mm twisted rope design, 22 inches. Light-catching spiral pattern creates constant sparkle.',
        images: PRODUCT_IMAGES.chain,
        dimensions: '22 inches, 3mm',
        weight: '18g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-CHN-003',
        name: 'White Gold Box Chain',
        category: 'chain',
        metalType: 'White Gold',
        metalPurity: '14k',
        price: 1600,
        description: 'Sleek 14k white gold box chain. 1.5mm width, 18 inches. Perfect for wearing alone or suspending a pendant.',
        images: PRODUCT_IMAGES.chain,
        dimensions: '18 inches, 1.5mm',
        weight: '8g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-CHN-004',
        name: 'Diamond Pendant Chain Set',
        category: 'chain',
        metalType: 'White Gold',
        metalPurity: '18k',
        price: 4200,
        description: '18k white gold figaro chain with matching 0.5ct round brilliant diamond pendant. Comes as a set. 18-inch chain, diamond set in a bezel.',
        images: PRODUCT_IMAGES.chain,
        featured: true,
        diamondType: 'lab',
        diamondSpecs: JSON.stringify({ carat: 0.5, cut: 'Round Brilliant', color: 'F', clarity: 'VS1' }),
        dimensions: '18 inches',
        weight: '12g',
      },
    }),
    prisma.inventoryProduct.create({
      data: {
        sku: 'PRD-CHN-005',
        name: 'Rose Gold Figaro Chain',
        category: 'chain',
        metalType: 'Rose Gold',
        metalPurity: '14k',
        price: 1900,
        description: '14k rose gold figaro chain. Classic Italian pattern: alternating short and long links. 2mm width, 20 inches.',
        images: PRODUCT_IMAGES.chain,
        dimensions: '20 inches, 2mm',
        weight: '11g',
      },
    }),
  ])

  console.log(`✅ Created ${products.length} products`)
  console.log('🎉 Seeding complete!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
