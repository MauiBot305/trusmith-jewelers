import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const goldSellSchema = z.object({
  name: z.string().min(2),
  phone: z
    .string()
    .regex(/^[\d\s\-+().]+$/)
    .optional()
    .or(z.literal('')),
  email: z.string().email(),
  goldType: z.enum(['10k', '14k', '18k', '22k', '24k', 'silver', 'platinum', 'unknown']),
  weightGrams: z
    .string()
    .optional()
    .refine((v) => !v || !isNaN(parseFloat(v)), 'Weight must be a number'),
  notes: z.string().max(500).optional(),
  hasPhoto: z.boolean().optional(),
})

export async function POST(req: NextRequest) {
  try {
    // Handle multipart (photo upload) or JSON
    const contentType = req.headers.get('content-type') ?? ''

    let body: Record<string, unknown>

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      body = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        goldType: formData.get('goldType'),
        weightGrams: formData.get('weightGrams'),
        notes: formData.get('notes'),
        hasPhoto: !!formData.get('photo'),
      }
      // TODO: upload photo to S3/Cloudflare R2
      // const photo = formData.get('photo') as File | null
      // if (photo) { ... }
    } else {
      body = await req.json()
    }

    const parsed = goldSellSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data

    // TODO: Send notification email / store lead in DB
    console.log('[Gold Sell Lead]', { ...data, ts: new Date().toISOString() })

    // Example response with a placeholder estimate
    const spotPriceUSD = 2050 // TODO: fetch real spot price via metals API
    const karat = data.goldType
    const purityMap: Record<string, number> = {
      '10k': 0.417,
      '14k': 0.583,
      '18k': 0.75,
      '22k': 0.917,
      '24k': 1.0,
      silver: 0.925,
      platinum: 0.95,
      unknown: 0.5,
    }
    const purity = purityMap[karat] ?? 0.5
    const weightGrams = parseFloat(data.weightGrams ?? '0') || 0
    const troyOzPerGram = 0.0321507

    let estimatedValue: number | null = null
    if (weightGrams > 0) {
      const rawValue = weightGrams * troyOzPerGram * spotPriceUSD * purity
      estimatedValue = Math.round(rawValue * 0.9) // 90% of spot
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Quote request received. We will contact you within 24 hours.',
        estimate: estimatedValue
          ? {
              weightGrams,
              goldType: karat,
              spotPriceUSD,
              estimatedValueUSD: estimatedValue,
              note: 'Estimate based on current spot price at 90%. Final offer after inspection.',
            }
          : null,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('[Gold Sell API Error]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
