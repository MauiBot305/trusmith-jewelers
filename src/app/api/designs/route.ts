import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const CreateDesignSchema = z.object({
  diamondId: z.string(),
  settingId: z.string(),
  metalId: z.string(),
  engraving: z.string().max(25).optional().default(''),
  ringSize: z.string().optional().default(''),
  notes: z.string().optional().default(''),
  customerName: z.string().optional(),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = CreateDesignSchema.parse(body)

    // Verify diamond exists
    const diamond = await db.diamond.findUnique({ where: { id: data.diamondId } })
    if (!diamond) {
      return NextResponse.json({ error: 'Diamond not found' }, { status: 404 })
    }

    // Verify setting exists
    const setting = await db.setting.findUnique({ where: { id: data.settingId } })
    if (!setting) {
      return NextResponse.json({ error: 'Setting not found' }, { status: 404 })
    }

    // Verify metal exists
    const metal = await db.metal.findUnique({ where: { id: data.metalId } })
    if (!metal) {
      return NextResponse.json({ error: 'Metal not found' }, { status: 404 })
    }

    // Calculate total
    const total = diamond.price + setting.basePrice + metal.priceModifier

    // Handle customer creation/connection
    let customerId: string | undefined
    if (data.customerEmail) {
      const customer = await db.customer.upsert({
        where: { email: data.customerEmail },
        create: {
          email: data.customerEmail,
          name: data.customerName,
          phone: data.customerPhone,
        },
        update: {
          ...(data.customerName && { name: data.customerName }),
          ...(data.customerPhone && { phone: data.customerPhone }),
        },
      })
      customerId = customer.id
    }

    // Create design
    const design = await db.design.create({
      data: {
        diamondId: data.diamondId,
        settingId: data.settingId,
        metalId: data.metalId,
        engraving: data.engraving,
        ringSize: data.ringSize,
        notes: data.notes,
        total,
        status: 'draft',
        ...(customerId && { customerId }),
      },
      include: {
        diamond: { select: { carat: true, cut: true, color: true, clarity: true, price: true } },
        setting: { select: { name: true, style: true, basePrice: true } },
        metal: { select: { name: true, karat: true, priceModifier: true } },
      },
    })

    return NextResponse.json({ design }, { status: 201 })
  } catch (error) {
    console.error('[designs] Error creating design:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Failed to create design' }, { status: 500 })
  }
}
