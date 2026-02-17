import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { CheckCircle, Phone, Mail, ArrowRight, Diamond, Sparkles } from 'lucide-react'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your ring design deposit has been received. We will be in touch shortly.',
  robots: { index: false, follow: false },
}

interface ConfirmationPageProps {
  searchParams: { session_id?: string }
}

async function ConfirmationContent({ sessionId }: { sessionId: string }) {
  let designDetails = null
  let customerEmail = ''
  let amountPaid = 0

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })

    customerEmail = session.customer_email ?? ''
    amountPaid = (session.amount_total ?? 0) / 100

    const designId = session.metadata?.designId
    if (designId) {
      designDetails = await db.design.findUnique({
        where: { id: designId },
        include: {
          diamond: {
            select: { carat: true, cut: true, color: true, clarity: true, certification: true },
          },
          setting: { select: { name: true, style: true } },
          metal: { select: { name: true, karat: true } },
        },
      })
    }
  } catch (err) {
    console.error('[confirmation] Error fetching session:', err)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success icon */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/30 mb-6">
          <CheckCircle className="w-10 h-10 text-gold" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-light text-white-off mb-4">
          Thank You!
        </h1>
        <p className="text-white-off/60 font-sans text-lg leading-relaxed">
          Your deposit has been received and your custom ring journey has begun.
        </p>
        {customerEmail && (
          <p className="text-white-off/40 font-sans text-sm mt-2">
            Confirmation sent to <span className="text-gold">{customerEmail}</span>
          </p>
        )}
      </div>

      {/* Order summary card */}
      <div className="border border-gold/20 bg-black-deep/50 p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="text-gold w-5 h-5" />
          <h2 className="font-display text-xl text-white-off">Your Ring Design</h2>
        </div>

        {designDetails ? (
          <div className="space-y-4">
            {designDetails.diamond && (
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <p className="text-white-off/50 text-xs font-sans uppercase tracking-wider mb-1">
                    Diamond
                  </p>
                  <p className="text-white-off font-sans">
                    {designDetails.diamond.carat}ct {designDetails.diamond.cut}
                  </p>
                  <p className="text-white-off/50 text-sm font-sans">
                    {designDetails.diamond.color} · {designDetails.diamond.clarity} ·{' '}
                    {designDetails.diamond.certification}
                  </p>
                </div>
                <Diamond className="text-gold/40 w-5 h-5 mt-1" />
              </div>
            )}

            {designDetails.setting && (
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <p className="text-white-off/50 text-xs font-sans uppercase tracking-wider mb-1">
                    Setting
                  </p>
                  <p className="text-white-off font-sans">{designDetails.setting.style}</p>
                  <p className="text-white-off/50 text-sm font-sans">
                    {designDetails.setting.name}
                  </p>
                </div>
              </div>
            )}

            {designDetails.metal && (
              <div className="flex justify-between items-start pb-4">
                <div>
                  <p className="text-white-off/50 text-xs font-sans uppercase tracking-wider mb-1">
                    Metal
                  </p>
                  <p className="text-white-off font-sans">
                    {designDetails.metal.name}
                    {designDetails.metal.karat ? ` ${designDetails.metal.karat}` : ''}
                  </p>
                </div>
              </div>
            )}

            {designDetails.ringSize && (
              <div className="flex justify-between items-start border-t border-white/5 pt-4">
                <div>
                  <p className="text-white-off/50 text-xs font-sans uppercase tracking-wider mb-1">
                    Ring Size
                  </p>
                  <p className="text-white-off font-sans">{designDetails.ringSize}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-white-off/50 font-sans text-sm">
            Your design details are being processed.
          </p>
        )}

        {amountPaid > 0 && (
          <div className="mt-6 pt-6 border-t border-gold/20 flex justify-between items-center">
            <span className="text-white-off/60 font-sans text-sm uppercase tracking-wider">
              Deposit Paid
            </span>
            <span className="text-gold font-display text-2xl">${amountPaid.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Next steps */}
      <div className="border border-gold/20 bg-black-deep/50 p-8 mb-8">
        <h2 className="font-display text-xl text-white-off mb-6">What Happens Next</h2>
        <ol className="space-y-4">
          {[
            {
              step: '1',
              title: 'We Review Your Design',
              desc: 'Our team reviews your specifications within 24 hours.',
            },
            {
              step: '2',
              title: 'We Contact You',
              desc: 'A True Smith jeweler calls or emails to confirm details and timeline.',
            },
            {
              step: '3',
              title: 'We Begin Crafting',
              desc: 'Your ring enters production — typical time is 2–3 weeks.',
            },
            {
              step: '4',
              title: 'Delivery',
              desc: 'Your ring ships insured, or pick up by appointment in Miami.',
            },
          ].map(({ step, title, desc }) => (
            <li key={step} className="flex gap-4">
              <div className="w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 text-gold text-xs font-sans">
                {step}
              </div>
              <div>
                <p className="text-white-off font-sans text-sm font-medium">{title}</p>
                <p className="text-white-off/50 font-sans text-sm mt-0.5">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Contact */}
      <div className="text-center space-y-4 mb-10">
        <p className="text-white-off/50 font-sans text-sm">Questions? We&apos;re here for you:</p>
        <div className="flex items-center justify-center gap-6">
          <a
            href="tel:2392446446"
            className="flex items-center gap-2 text-gold hover:text-gold-light font-sans text-sm transition-colors"
          >
            <Phone size={14} />
            239-244-6446
          </a>
          <a
            href="mailto:info@truesmithjewelers.com"
            className="flex items-center gap-2 text-gold hover:text-gold-light font-sans text-sm transition-colors"
          >
            <Mail size={14} />
            info@truesmithjewelers.com
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white-off/50 hover:text-gold font-sans text-sm transition-colors group"
        >
          Return to Home
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

function ConfirmationFallback() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="animate-pulse space-y-4">
        <div className="h-20 w-20 rounded-full bg-gold/10 mx-auto" />
        <div className="h-8 bg-white/5 rounded w-48 mx-auto" />
        <div className="h-4 bg-white/5 rounded w-64 mx-auto" />
      </div>
    </div>
  )
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const sessionId = searchParams.session_id

  return (
    <main className="min-h-screen bg-black flex items-center py-24 px-4">
      {sessionId ? (
        <Suspense fallback={<ConfirmationFallback />}>
          <ConfirmationContent sessionId={sessionId} />
        </Suspense>
      ) : (
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
          <h1 className="font-display text-4xl text-white-off mb-4">Order Confirmed</h1>
          <p className="text-white-off/60 font-sans mb-8">
            Your deposit has been received. We&apos;ll be in touch within 24 hours.
          </p>
          <Link
            href="/"
            className="text-gold hover:text-gold-light font-sans text-sm transition-colors"
          >
            Return to Home
          </Link>
        </div>
      )}
    </main>
  )
}
