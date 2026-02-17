import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const quoteSchema = z.object({
  cut: z.string().min(1, 'Diamond cut is required'),
  setting: z.string().min(1, 'Setting is required'),
  metal: z.string().min(1, 'Metal is required'),
  ringSize: z.string().optional(),
  engraving: z.string().max(20).optional(),
  milgrain: z.boolean().optional(),
  hiddenHalo: z.boolean().optional(),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().max(1000).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = quoteSchema.parse(body)

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, log and return success
    console.log('[Quote Request]', {
      customer: data.name,
      email: data.email,
      design: {
        cut: data.cut,
        setting: data.setting,
        metal: data.metal,
        ringSize: data.ringSize,
        engraving: data.engraving,
        addOns: {
          milgrain: data.milgrain,
          hiddenHalo: data.hiddenHalo,
        },
      },
      message: data.message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Send email notification to trusmithjewelers.com / 239-244-6446
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@trusmithjewelers.com',
    //   to: 'info@trusmithjewelers.com',
    //   subject: `New Ring Quote - ${data.name}`,
    //   html: buildQuoteEmailHtml(data),
    // });

    return NextResponse.json({ success: true, message: 'Quote request received' }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    console.error('[POST /api/quote]', error)
    return NextResponse.json({ error: 'Failed to submit quote request' }, { status: 500 })
  }
}
