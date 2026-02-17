import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import Stripe from 'stripe'

// Disable body parsing — Stripe needs raw body for signature verification
export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[stripe-webhook] Signature verification failed: ${message}`)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const { designId } = session.metadata ?? {}

        if (!designId) {
          console.error('[stripe-webhook] No designId in session metadata')
          break
        }

        const paidAt = new Date()

        // Update deposit status
        await db.deposit.update({
          where: { designId },
          data: {
            status: 'paid',
            stripeId: session.payment_intent as string,
            sessionId: session.id,
            paidAt,
          },
        })

        // Update design status
        await db.design.update({
          where: { id: designId },
          data: { status: 'deposit_paid' },
        })

        console.log(`[stripe-webhook] Deposit paid for design ${designId}`)

        // TODO: Send confirmation email via Resend/SendGrid
        // TODO: Notify team via Slack/SMS
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        const { designId } = session.metadata ?? {}

        if (designId) {
          await db.deposit.updateMany({
            where: { designId, status: 'pending' },
            data: { status: 'failed' },
          })
          console.log(`[stripe-webhook] Checkout expired for design ${designId}`)
        }
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const paymentIntentId = charge.payment_intent as string

        if (paymentIntentId) {
          await db.deposit.updateMany({
            where: { stripeId: paymentIntentId },
            data: { status: 'refunded' },
          })
          console.log(`[stripe-webhook] Refund processed for payment intent ${paymentIntentId}`)
        }
        break
      }

      default:
        // Unhandled event type — log and ignore
        console.log(`[stripe-webhook] Unhandled event type: ${event.type}`)
    }
  } catch (err) {
    console.error('[stripe-webhook] Handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
