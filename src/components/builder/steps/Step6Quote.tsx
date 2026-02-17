'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Diamond, Settings2, Gem, Shield, Lock, CreditCard, Loader2, CheckCircle } from 'lucide-react'
import { useBuilderStore, DEPOSIT_AMOUNT, DEPOSIT_PERCENTAGE } from '@/store/builderStore'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ── Form Schema ────────────────────────────────────────────────────────────────
const quoteFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-\(\)\+]+$/, 'Please enter a valid phone number'),
})

type QuoteFormData = z.infer<typeof quoteFormSchema>

// ── Trust Badge ────────────────────────────────────────────────────────────────
interface TrustBadgeProps {
  icon: React.ReactNode
  text: string
}

function TrustBadge({ icon, text }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-white-off/50 text-xs">
      {icon}
      <span>{text}</span>
    </div>
  )
}

// ── Form Field ─────────────────────────────────────────────────────────────────
interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-white-off text-sm font-medium">{label}</label>
      {children}
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-400" />
          {error}
        </p>
      )}
    </div>
  )
}

// ── Main Step 6 Component ──────────────────────────────────────────────────────
export function Step6Quote() {
  const { getSummary } = useBuilderStore()
  const summary = getSummary()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const depositAmount = summary.total > 5000 
    ? Math.round(summary.total * DEPOSIT_PERCENTAGE)
    : DEPOSIT_AMOUNT

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // First, save the design
      const designResponse = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diamond: summary.diamond,
          setting: summary.setting,
          metal: summary.metal,
          engraving: summary.engraving,
          ringSize: summary.ringSize,
          notes: summary.notes,
          total: summary.total,
          customerName: data.name,
          customerEmail: data.email,
          customerPhone: data.phone,
        }),
      })

      if (!designResponse.ok) {
        throw new Error('Failed to save design')
      }

      const { designId } = await designResponse.json()

      // Then, create checkout session
      const checkoutResponse = await fetch('/api/deposits/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          designId,
          amount: depositAmount,
          customerEmail: data.email,
          customerName: data.name,
        }),
      })

      if (!checkoutResponse.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await checkoutResponse.json()

      // Redirect to Stripe
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-serif text-gold">Secure Your Ring</h2>
        <p className="text-white-off/60 text-sm">Reserve your custom creation with a refundable deposit</p>
      </div>

      {/* Compact Design Summary */}
      <div className="bg-black-soft border border-gold/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gold text-xs uppercase tracking-[0.2em] font-sans">Your Design</h3>
          <span className="text-gold font-serif text-lg">{formatPrice(summary.total)}</span>
        </div>
        
        <div className="flex flex-wrap gap-3 text-xs text-white-off/70">
          {summary.diamond && (
            <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-lg">
              <Diamond className="w-3.5 h-3.5 text-gold" />
              <span>{summary.diamond.carat}ct {summary.diamond.cut}</span>
            </div>
          )}
          {summary.setting && (
            <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-lg">
              <Settings2 className="w-3.5 h-3.5 text-gold" />
              <span>{summary.setting.name}</span>
            </div>
          )}
          {summary.metal && (
            <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-lg">
              <Gem className="w-3.5 h-3.5 text-gold" />
              <span>{summary.metal.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Quote Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField label="Full Name" error={errors.name?.message}>
            <input
              {...register('name')}
              type="text"
              placeholder="John Smith"
              className={cn(
                "w-full px-4 py-3 bg-black-soft border rounded-lg text-white-off placeholder:text-white-off/30 focus:outline-none transition-colors",
                errors.name ? "border-red-400/50 focus:border-red-400" : "border-gold/30 focus:border-gold"
              )}
              disabled={isSubmitting}
            />
          </FormField>

          <FormField label="Email Address" error={errors.email?.message}>
            <input
              {...register('email')}
              type="email"
              placeholder="john@example.com"
              className={cn(
                "w-full px-4 py-3 bg-black-soft border rounded-lg text-white-off placeholder:text-white-off/30 focus:outline-none transition-colors",
                errors.email ? "border-red-400/50 focus:border-red-400" : "border-gold/30 focus:border-gold"
              )}
              disabled={isSubmitting}
            />
          </FormField>

          <FormField label="Phone Number" error={errors.phone?.message}>
            <input
              {...register('phone')}
              type="tel"
              placeholder="(305) 555-1234"
              className={cn(
                "w-full px-4 py-3 bg-black-soft border rounded-lg text-white-off placeholder:text-white-off/30 focus:outline-none transition-colors",
                errors.phone ? "border-red-400/50 focus:border-red-400" : "border-gold/30 focus:border-gold"
              )}
              disabled={isSubmitting}
            />
          </FormField>
        </div>

        {/* Deposit Info */}
        <div className="p-5 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gold font-semibold">Refundable Deposit</h4>
              <p className="text-white-off/50 text-xs mt-0.5">
                {summary.total > 5000 ? '20% of total' : 'Standard reservation fee'}
              </p>
            </div>
            <span className="text-2xl font-serif text-gold">{formatPrice(depositAmount)}</span>
          </div>

          <div className="p-3 bg-black/30 rounded-lg">
            <p className="text-white-off/60 text-xs leading-relaxed">
              <CheckCircle className="w-3.5 h-3.5 inline-block mr-1.5 text-green-400" />
              Your deposit is fully refundable within 48 hours of your consultation if you decide not to proceed.
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 py-4">
          <TrustBadge icon={<Lock className="w-4 h-4" />} text="SSL Encrypted" />
          <TrustBadge icon={<Shield className="w-4 h-4" />} text="Secure Payment" />
          <TrustBadge icon={<CreditCard className="w-4 h-4" />} text="Powered by Stripe" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full py-4 bg-gold text-black font-semibold text-sm tracking-widest uppercase rounded-lg transition-all shadow-gold",
            isSubmitting 
              ? "opacity-70 cursor-not-allowed" 
              : "hover:bg-gold-light"
          )}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </span>
          ) : (
            `Pay ${formatPrice(depositAmount)} Deposit`
          )}
        </button>

        <p className="text-center text-white-off/40 text-xs">
          You'll be redirected to Stripe's secure checkout
        </p>
      </form>
    </div>
  )
}

export default Step6Quote
