import Stripe from 'stripe'

// ── Lazy Stripe client (avoids build-time errors if env is missing) ────────────
export function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key, {
    apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
    typescript: true,
  })
}

// Convenience alias used in routes
export const stripe = {
  get checkout() {
    return getStripeClient().checkout
  },
  get webhooks() {
    return getStripeClient().webhooks
  },
}

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}
