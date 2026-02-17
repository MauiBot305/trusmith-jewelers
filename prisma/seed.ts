import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const DIAMOND_IMAGES = [
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
  'https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=800&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
]

const RING_IMAGES = [
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
  'https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=800&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
]

const BRACELET_IMAGES = [
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
  'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=800&q=80',
  'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=800&q=80',
]

const CHAIN_IMAGES = [
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
  'https://images.unsplash.com/photo-1576022162028-ffac5e1a70dd?w=800&q=80',
  'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80',
]

async function main() {
  console.log('🌱 Seeding True Smith Jewelers database...')

  // Clear existing data
  await prisma.goldSellRequest.deleteMany()
  await prisma.contactMessage.deleteMany()
  await prisma.deposit.deleteMany()
  await prisma.design.deleteMany()
  await prisma.inventoryProduct.deleteMany()
  await prisma.diamond.deleteMany()
  await prisma.setting.deleteMany()
  await prisma.metal.deleteMany()
  await prisma.lead.deleteMany()

  console.log('🗑  Cleared existing data')

  // ── Metals ──────────────────────────────────────────────────────────────────
  const metals = await Promise.all([
    prisma.metal.create({
      data: { name: 'Yellow Gold', type: 'gold', karat: '14K', priceModifier: 1.0 },
    }),
    prisma.metal.create({
      data: { name: 'Yellow Gold', type: 'gold', karat: '18K', priceModifier: 1.2 },
    }),
    prisma.metal.create({
      data: { name: 'White Gold', type: 'gold', karat: '14K', priceModifier: 1.05 },
    }),
    prisma.metal.create({
      data: { name: 'White Gold', type: 'gold', karat: '18K', priceModifier: 1.25 },
    }),
    prisma.metal.create({
      data: { name: 'Platinum', type: 'platinum', karat: '950', priceModifier: 1.5 },
    }),
  ])
  console.log(`✅ Created ${metals.length} metals`)

  // ── Settings ─────────────────────────────────────────────────────────────────
  const settings = await Promise.all([
    prisma.setting.create({
      data: {
        name: 'Classic Solitaire',
        style: 'Solitaire',
        description: 'A timeless single-stone setting that lets the diamond take center stage.',
        story: 'The solitaire is an enduring symbol of love — simple, pure, and eternal. Nothing distracts from the diamond\'s brilliance.',
        images: RING_IMAGES,
        basePrice: 1200,
      },
    }),
    prisma.setting.create({
      data: {
        name: 'French Pavé Halo',
        style: 'Halo',
        description: 'A halo of micro-pavé diamonds surrounds the center stone, maximizing brilliance.',
        story: 'The halo setting creates an illusion of a larger center stone while adding extraordinary sparkle. Every angle catches the light.',
        images: RING_IMAGES,
        basePrice: 1800,
      },
    }),
    prisma.setting.create({
      data: {
        name: 'Three-Stone Past Present Future',
        style: 'Three-Stone',
        description: 'Three diamonds representing your past, present, and future together.',
        story: 'Every love story has three chapters. This setting celebrates where you\'ve been, where you are, and where you\'re going.',
        images: RING_IMAGES,
        basePrice: 2400,
      },
    }),
    prisma.setting.create({
      data: {
        name: 'Cathedral Solitaire',
        style: 'Cathedral',
        description: 'Elevated arches support the diamond, creating a dramatic, architectural silhouette.',
        story: 'Inspired by gothic cathedrals, this setting lifts the diamond skyward — a monument to your love.',
        images: RING_IMAGES,
        basePrice: 1400,
      },
    }),
    prisma.setting.create({
      data: {
        name: 'Modern Bezel',
        style: 'Bezel',
        description: 'A sleek metal rim encircles the diamond, offering a contemporary look with maximum protection.',
        story: 'For the modern romantic. Clean lines, secure hold, and effortlessly elegant for everyday wear.',
        images: RING_IMAGES,
        basePrice: 1100,
      },
    }),
  ])
  console.log(`✅ Created ${settings.length} settings`)

  // ── Diamonds ─────────────────────────────────────────────────────────────────
  const diamonds = await prisma.diamond.createMany({
    data: [
      { cut: 'Round', carat: 1.01, color: 'E', clarity: 'VS1', price: 4200, certification: 'IGI', certNumber: 'IGI-001-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Round', carat: 1.50, color: 'F', clarity: 'VS2', price: 7800, certification: 'IGI', certNumber: 'IGI-002-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Round', carat: 2.01, color: 'G', clarity: 'SI1', price: 11200, certification: 'IGI', certNumber: 'IGI-003-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Oval', carat: 1.20, color: 'E', clarity: 'VVS2', price: 5600, certification: 'IGI', certNumber: 'IGI-004-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Oval', carat: 1.75, color: 'F', clarity: 'VS1', price: 8900, certification: 'IGI', certNumber: 'IGI-005-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Princess', carat: 1.00, color: 'G', clarity: 'VS2', price: 3800, certification: 'IGI', certNumber: 'IGI-006-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Cushion', carat: 1.30, color: 'H', clarity: 'SI1', price: 4900, certification: 'IGI', certNumber: 'IGI-007-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Emerald', carat: 1.51, color: 'E', clarity: 'VS1', price: 6800, certification: 'GIA', certNumber: 'GIA-001-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Pear', carat: 1.10, color: 'F', clarity: 'VS2', price: 4600, certification: 'IGI', certNumber: 'IGI-008-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Radiant', carat: 1.25, color: 'G', clarity: 'VS1', price: 5200, certification: 'IGI', certNumber: 'IGI-009-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Asscher', carat: 1.00, color: 'F', clarity: 'VVS1', price: 4900, certification: 'IGI', certNumber: 'IGI-010-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Marquise', carat: 1.40, color: 'E', clarity: 'VS2', price: 6100, certification: 'IGI', certNumber: 'IGI-011-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Heart', carat: 1.05, color: 'G', clarity: 'SI1', price: 4100, certification: 'IGI', certNumber: 'IGI-012-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Round', carat: 0.75, color: 'D', clarity: 'FL', price: 5500, certification: 'GIA', certNumber: 'GIA-002-2024', images: DIAMOND_IMAGES, available: true },
      { cut: 'Oval', carat: 2.50, color: 'D', clarity: 'IF', price: 22000, certification: 'GIA', certNumber: 'GIA-003-2024', images: DIAMOND_IMAGES, available: true },
    ],
  })
  console.log(`✅ Created ${diamonds.count} diamonds`)

  // ── Inventory Products ────────────────────────────────────────────────────────
  const products = await prisma.inventoryProduct.createMany({
    data: [
      // Rings
      { name: 'Eternal Solitaire Ring', category: 'ring', description: 'Classic 1ct round lab diamond in 14K yellow gold solitaire setting.', price: 5400, metalType: '14K Yellow Gold', diamondType: 'lab', images: RING_IMAGES, available: true, featured: true },
      { name: 'Luxe Halo Ring', category: 'ring', description: 'Breathtaking 1.5ct oval center with French pavé halo in 18K white gold.', price: 9800, metalType: '18K White Gold', diamondType: 'lab', images: RING_IMAGES, available: true, featured: true },
      { name: 'Three-Stone Legacy Ring', category: 'ring', description: '2.10ctw three-stone design. 1ct center, 0.55ct side stones in 14K white gold.', price: 8200, metalType: '14K White Gold', diamondType: 'lab', images: RING_IMAGES, available: true, featured: false },
      { name: 'Cathedral Solitaire', category: 'ring', description: 'Elevated 1.25ct round brilliant in dramatic cathedral setting, 18K yellow gold.', price: 6900, metalType: '18K Yellow Gold', diamondType: 'lab', images: RING_IMAGES, available: true, featured: false },
      // Tennis Bracelets
      { name: '4ctw Tennis Bracelet', category: 'bracelet', description: '4-prong set round brilliant diamonds totaling 4ctw in 14K white gold. 7" length.', price: 6800, metalType: '14K White Gold', diamondType: 'lab', images: BRACELET_IMAGES, available: true, featured: true },
      { name: '7ctw Luxury Tennis Bracelet', category: 'bracelet', description: 'Museum-quality 7ctw tennis bracelet in 18K white gold. The statement piece.', price: 12400, metalType: '18K White Gold', diamondType: 'lab', images: BRACELET_IMAGES, available: true, featured: true },
      { name: '4ctw Yellow Gold Tennis Bracelet', category: 'bracelet', description: 'Classic 4ctw round brilliants set in warm 14K yellow gold. Timeless elegance.', price: 7200, metalType: '14K Yellow Gold', diamondType: 'lab', images: BRACELET_IMAGES, available: true, featured: false },
      // Chains
      { name: '10mm Cuban Link Chain', category: 'chain', description: '10mm Cuban link chain in 14K yellow gold. 20" length. Built to last generations.', price: 3800, metalType: '14K Yellow Gold', images: CHAIN_IMAGES, available: true, featured: false },
      { name: '14mm Miami Cuban Chain', category: 'chain', description: 'Heavy 14mm Miami Cuban in 14K yellow gold. The ultimate flex. 22" length.', price: 7400, metalType: '14K Yellow Gold', images: CHAIN_IMAGES, available: true, featured: true },
      { name: '3mm Diamond Tennis Chain', category: 'chain', description: '3mm diamond-cut tennis chain set with 2ctw in 14K white gold. 18" length.', price: 4200, metalType: '14K White Gold', diamondType: 'lab', images: CHAIN_IMAGES, available: true, featured: false },
    ],
  })
  console.log(`✅ Created ${products.count} inventory products`)

  console.log('🎉 Seeding complete!')
  console.log(`   ${metals.length} metals`)
  console.log(`   ${settings.length} settings`)
  console.log(`   ${diamonds.count} diamonds`)
  console.log(`   ${products.count} inventory products`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
