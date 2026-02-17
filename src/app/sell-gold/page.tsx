'use client'

import { useState, FormEvent, useRef } from 'react'
import { z } from 'zod'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  DollarSign,
  Camera,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  TrendingUp,
  Clock,
  Shield,
  ArrowRight,
} from 'lucide-react'

const goldSchema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z
    .string()
    .regex(/^[\d\s\-+().]*$/, 'Invalid phone')
    .min(7, 'Phone required'),
  email: z.string().email('Valid email required'),
  goldType: z.enum(['10k', '14k', '18k', '22k', '24k', 'silver', 'platinum', 'unknown'], {
    errorMap: () => ({ message: 'Please select a gold type' }),
  }),
  weightGrams: z
    .string()
    .refine((v) => !v || !isNaN(parseFloat(v)), 'Must be a number')
    .optional(),
  notes: z.string().max(500).optional(),
})

type FieldErrors = Partial<Record<keyof z.infer<typeof goldSchema> | 'root', string>>

type EstimateResult = {
  weightGrams: number
  goldType: string
  spotPriceUSD: number
  estimatedValueUSD: number
  note: string
}

const goldTypes = [
  { value: '10k', label: '10K Gold (41.7% pure)' },
  { value: '14k', label: '14K Gold (58.3% pure)' },
  { value: '18k', label: '18K Gold (75% pure)' },
  { value: '22k', label: '22K Gold (91.7% pure)' },
  { value: '24k', label: '24K Gold (99.9% pure)' },
  { value: 'silver', label: 'Sterling Silver (92.5%)' },
  { value: 'platinum', label: 'Platinum' },
  { value: 'unknown', label: 'Not Sure / Mixed' },
]

const steps = [
  {
    num: '01',
    title: 'Submit Your Quote',
    description:
      'Fill out our simple form with details about your gold. Add a photo for faster assessment.',
  },
  {
    num: '02',
    title: 'We Assess & Offer',
    description:
      'Our team reviews your submission and contacts you within 24 hours with a firm offer.',
  },
  {
    num: '03',
    title: 'Get Paid',
    description:
      'Accept our offer and get paid instantly — cash, check, or bank transfer your choice.',
  },
]

// Purity map for preview estimate
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
const SPOT_PRICE = 2050 // Placeholder

export default function SellGoldPage() {
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    goldType: '' as z.infer<typeof goldSchema>['goldType'] | '',
    weightGrams: '',
    notes: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [estimate, setEstimate] = useState<EstimateResult | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Live estimate preview
  const liveEstimate = (() => {
    const w = parseFloat(fields.weightGrams)
    const p = purityMap[fields.goldType]
    if (!fields.goldType || !w || !p) return null
    const raw = w * 0.0321507 * SPOT_PRICE * p
    return Math.round(raw * 0.9)
  })()

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const validate = () => {
    const result = goldSchema.safeParse(fields)
    if (result.success) {
      setErrors({})
      return true
    }
    const errs: FieldErrors = {}
    result.error.errors.forEach((e) => {
      const f = e.path[0] as keyof FieldErrors
      if (!errs[f]) errs[f] = e.message
    })
    setErrors(errs)
    return false
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')

    try {
      let body: FormData | string
      let headers: Record<string, string> = {}

      if (photoFile) {
        const fd = new FormData()
        Object.entries(fields).forEach(([k, v]) => fd.append(k, v as string))
        fd.append('photo', photoFile)
        body = fd
      } else {
        body = JSON.stringify(fields)
        headers['Content-Type'] = 'application/json'
      }

      const res = await fetch('/api/gold-sell', { method: 'POST', headers, body })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed')
      setEstimate(data.estimate)
      setStatus('success')
      setFields({ name: '', phone: '', email: '', goldType: '', weightGrams: '', notes: '' })
      setPhotoFile(null)
      setPhotoPreview(null)
    } catch {
      setStatus('error')
    }
  }

  const f = (id: string) => ({
    value: fields[id as keyof typeof fields],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((prev) => ({ ...prev, [id]: e.target.value })),
  })

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[65vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_60%_50%,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gold text-xs tracking-[0.4em] uppercase font-sans mb-5">
                  Sell Your Gold
                </p>
                <h1
                  className="font-display text-5xl sm:text-6xl lg:text-7xl text-white-off leading-[1.05] mb-6"
                  style={{ fontWeight: 300 }}
                >
                  Get <span className="text-gold-gradient">90%</span>
                  <br />
                  of Spot Price
                  <br />
                  for Your Gold
                </h1>
                <div className="divider-gold mb-6 mx-0" />
                <p className="font-sans text-white-off/60 text-base leading-relaxed mb-8 max-w-lg">
                  We offer the most competitive gold buying rates in Miami. No games, no lowball
                  offers — just honest, fair pricing based on real spot prices.
                </p>
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-gold" />
                    <span className="font-sans text-white-off/60 text-sm">90% of spot price</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gold" />
                    <span className="font-sans text-white-off/60 text-sm">24-hr response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-gold" />
                    <span className="font-sans text-white-off/60 text-sm">Trusted & secure</span>
                  </div>
                </div>
              </div>

              {/* Spot price display */}
              <div className="glass-card p-8 border-gold/20">
                <p className="text-white-off/40 text-xs font-sans uppercase tracking-widest mb-2">
                  Current Gold Spot Price
                </p>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-display text-5xl text-gold" style={{ fontWeight: 300 }}>
                    ${SPOT_PRICE.toLocaleString()}
                  </span>
                  <span className="text-white-off/40 font-sans text-sm">/ troy oz</span>
                </div>
                <div className="h-px bg-gold/10 mb-6" />
                <div className="grid grid-cols-2 gap-3">
                  {['10K', '14K', '18K', '24K'].map((k) => {
                    const p = purityMap[k.toLowerCase()]
                    const gPerOz = 31.1035
                    const perGram = (SPOT_PRICE * p * 0.9) / gPerOz
                    return (
                      <div key={k} className="bg-black/40 p-3">
                        <p className="text-gold text-xs font-sans uppercase tracking-wider mb-1">
                          {k} Gold
                        </p>
                        <p className="text-white-off font-serif text-base">
                          ~${perGram.toFixed(2)}
                          <span className="text-white-off/30 text-xs">/g</span>
                        </p>
                      </div>
                    )
                  })}
                </div>
                <p className="text-white-off/20 text-xs font-sans mt-4">
                  * Rates shown at 90% of spot. Prices update with market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-black-deep border-y border-gold/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
              The Process
            </p>
            <h2 className="font-serif text-display-sm text-white-off mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={step.num} className="relative flex flex-col items-center text-center">
                  <div className="w-14 h-14 border border-gold/30 flex items-center justify-center mb-5 relative">
                    <span className="font-display text-gold text-lg" style={{ fontWeight: 300 }}>
                      {step.num}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-full w-full h-px bg-gradient-to-r from-gold/20 to-transparent -translate-x-7" />
                  )}
                  <h3 className="font-serif text-white-off text-lg mb-3">{step.title}</h3>
                  <p className="font-sans text-white-off/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote form */}
        <section className="section-padding bg-black">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
                Get a Quote
              </p>
              <h2 className="font-serif text-display-sm text-white-off mb-4">
                Tell Us About Your Gold
              </h2>
              <div className="divider-gold" />
            </div>

            <div className="glass-card p-8 sm:p-10">
              {status === 'success' ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle size={56} className="text-gold mx-auto" />
                  <h3 className="font-serif text-white-off text-2xl">Quote Request Received!</h3>
                  <p className="font-sans text-white-off/50 text-base">
                    We&rsquo;ll contact you within 24 hours with an offer.
                  </p>
                  {estimate && (
                    <div className="mt-6 p-6 border border-gold/20 bg-gold/5">
                      <p className="text-gold text-xs font-sans uppercase tracking-widest mb-3">
                        Preliminary Estimate
                      </p>
                      <p
                        className="font-display text-4xl text-white-off mb-1"
                        style={{ fontWeight: 300 }}
                      >
                        ~${estimate.estimatedValueUSD.toLocaleString()}
                      </p>
                      <p className="text-white-off/40 text-xs font-sans">{estimate.note}</p>
                    </div>
                  )}
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 flex items-center gap-2 text-gold text-sm font-sans uppercase tracking-wider hover:text-gold-light transition-colors mx-auto"
                  >
                    Submit Another <ArrowRight size={12} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white-off/60 text-xs uppercase tracking-widest font-sans mb-2">
                        Full Name <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        {...f('name')}
                        className="w-full bg-black/50 border border-white/10 focus:border-gold text-white-off placeholder-white/20 px-4 py-3 text-sm font-sans outline-none transition-colors"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-red-400 text-xs font-sans flex items-center gap-1">
                          <AlertCircle size={10} />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white-off/60 text-xs uppercase tracking-widest font-sans mb-2">
                        Phone <span className="text-gold">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="(305) 000-0000"
                        {...f('phone')}
                        className="w-full bg-black/50 border border-white/10 focus:border-gold text-white-off placeholder-white/20 px-4 py-3 text-sm font-sans outline-none transition-colors"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-red-400 text-xs font-sans flex items-center gap-1">
                          <AlertCircle size={10} />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white-off/60 text-xs uppercase tracking-widest font-sans mb-2">
                      Email <span className="text-gold">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      {...f('email')}
                      className="w-full bg-black/50 border border-white/10 focus:border-gold text-white-off placeholder-white/20 px-4 py-3 text-sm font-sans outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-red-400 text-xs font-sans flex items-center gap-1">
                        <AlertCircle size={10} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Gold type + Weight */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white-off/60 text-xs uppercase tracking-widest font-sans mb-2">
                        Gold Type <span className="text-gold">*</span>
                      </label>
                      <select
                        {...f('goldType')}
                        className="w-full bg-black/50 border border-white/10 focus:border-gold text-white-off px-4 py-3 text-sm font-sans outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Select type…
                        </option>
                        {goldTypes.map((g) => (
                          <option key={g.value} value={g.value}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                      {errors.goldType && (
                        <p className="mt-1.5 text-red-400 text-xs font-sans flex items-center gap-1">
                          <AlertCircle size={10} />
                          {errors.goldType}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white-off/60 text-xs uppercase tracking-widest font-sans mb-2">
                        Weight (grams){' '}
                        <span className="text-white-off/30 normal-case tracking-normal">
                          optional
                        </span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        placeholder="e.g. 15.5"
                        {...f('weightGrams')}
                        className="w-full bg-black/50 border border-white/10 focus:border-gold text-white-off placeholder-white/20 px-4 py-3 text-sm font-sans outline-none transition-colors"
                      />
                      {errors.weightGrams && (
                        <p className="mt-1.5 text-red-400 text-xs font-sans flex items-center gap-1">
                          <AlertCircle size={10} />
                          {errors.weightGrams}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Live estimate preview */}
                  {liveEstimate !== null && (
                    <div className="p-4 border border-gold/20 bg-gold/5 flex items-center gap-4">
                      <DollarSign size={20} className="text-gold flex-shrink-0" />
                      <div>
                        <p className="text-white-off/50 text-xs font-sans uppercase tracking-wider">
                          Estimated Value
                        </p>
                        <p className="text-gold font-serif text-xl">
                          ~${liveEstimate.toLocaleString()}
                        </p>
                        <p className="text-white-off/30 text-xs font-sans">
                          At 90% of spot. Final offer after inspection.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="block text-white-off/60 text-xs uppercase tracking-widest font-sans mb-2">
                      Additional Notes{' '}
                      <span className="text-white-off/30 normal-case tracking-normal">
                        optional
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your pieces — condition, any markings, quantity…"
                      {...f('notes')}
                      className="w-full bg-black/50 border border-white/10 focus:border-gold text-white-off placeholder-white/20 px-4 py-3 text-sm font-sans outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Photo upload */}
                  <div>
                    <label className="block text-white-off/60 text-xs uppercase tracking-widest font-sans mb-2">
                      Photo Upload{' '}
                      <span className="text-white-off/30 normal-case tracking-normal">
                        optional
                      </span>
                    </label>

                    {photoPreview ? (
                      <div className="relative inline-block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoPreview}
                          alt="Gold preview"
                          className="w-40 h-40 object-cover border border-gold/20"
                        />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-black border border-gold/30 text-white-off/60 hover:text-gold flex items-center justify-center transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="flex flex-col items-center justify-center w-full py-8 border border-dashed border-white/15 hover:border-gold/40 transition-colors group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Camera
                            size={18}
                            className="text-gold/40 group-hover:text-gold transition-colors"
                          />
                          <Upload
                            size={18}
                            className="text-gold/40 group-hover:text-gold transition-colors"
                          />
                        </div>
                        <p className="text-white-off/40 text-sm font-sans group-hover:text-white-off/60 transition-colors">
                          Click to upload a photo
                        </p>
                        <p className="text-white-off/20 text-xs font-sans mt-1">
                          JPG, PNG, HEIC up to 10MB
                        </p>
                      </button>
                    )}

                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm font-sans flex items-center gap-2">
                      <AlertCircle size={14} />
                      Something went wrong. Please try again or call 239-244-6446.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gold text-black font-sans font-semibold text-sm tracking-widest uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Submitting...' : 'Get My Quote'}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Trust messaging */}
        <section className="py-16 bg-black-deep border-t border-gold/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: TrendingUp,
                  title: 'Market-Rate Pricing',
                  text: 'We pay 90% of the live spot price — one of the highest rates in South Florida.',
                },
                {
                  icon: Shield,
                  title: 'Safe & Secure',
                  text: 'All transactions are documented and protected. We have a zero-pressure policy.',
                },
                {
                  icon: CheckCircle,
                  title: 'No Hidden Fees',
                  text: 'The offer we make is the amount you receive. No commissions, no processing fees.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex flex-col items-center">
                  <div className="w-12 h-12 border border-gold/20 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-white-off text-base font-medium mb-2">{title}</h3>
                  <p className="font-sans text-white-off/40 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
