import { NextResponse } from 'next/server'
import { stripe, getBaseUrl } from '@/lib/stripe'
import { db } from '@/lib/db'
import { z } from 'zod'

const CreateCheckoutSchema = z.object({
  designId: z.string(),
  amount: z.number().positive(),
  customerEmail: z.string().email().optional(),
  customerName: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { designId, amount, customerEmail, customerName } = CreateCheckoutSchema.parse(body)

    const baseUrl = getBaseUrl()

    // Verify design exists
    const design = await db.design.findUnique({
      where: { id: designId },
      include: {
        diamond: { select: { carat: true, cut: true, color: true, clarity: true } },
        setting: { select: { name: true, style: true } },
        metal: { select: { name: true, karat: true } },
      },
    })

    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 })
    }

    // Build description from design details
    const description = [
      design.diamond
        ? `${design.diamond.carat}ct ${design.diamond.cut} Diamond (${design.diamond.color}/${design.diamond.clarity})`
        : null,
      design.setting ? `${design.setting.style} Setting` : null,
      design.metal
        ? `${design.metal.name}${design.metal.karat ? ` ${design.metal.karat}` : ''}`
        : null,
    ]
      .filter(Boolean)
      .join(' · ')

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Ring Design Deposit',
              description: description || 'Deposit for custom ring design',
            },
            unit_amount: Math.round(amount * 100), // convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/build/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/build?step=6`,
      customer_email: customerEmail,
      metadata: {
        designId,
        customerName: customerName ?? '',
      },
    })

    // Create or update the deposit record
    await db.deposit.upsert({
      where: { designId },
      create: {
        designId,
        amount,
        status: 'pending',
        sessionId: session.id,
      },
      update: {
        amount,
        status: 'pending',
        sessionId: session.id,
      },
    })

    // Update design with customer info & pending status
    await db.design.update({
      where: { id: designId },
      data: {
        status: 'pending_deposit',
        ...(customerEmail && {
          customer: {
            connectOrCreate: {
              where: { email: customerEmail },
              create: { email: customerEmail, name: customerName },
            },
          },
        }),
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('[create-checkout] Error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
