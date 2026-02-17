'use client'

import { useState, FormEvent } from 'react'
import { z } from 'zod'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^[\d\s\-+().]*$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Please enter a valid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
})

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>

export default function ContactPage() {
  const [fields, setFields] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const validate = () => {
    const result = contactSchema.safeParse(fields)
    if (result.success) {
      setErrors({})
      return true
    }
    const errs: FieldErrors = {}
    result.error.errors.forEach((e) => {
      const field = e.path[0] as keyof FieldErrors
      if (!errs[field]) errs[field] = e.message
    })
    setErrors(errs)
    return false
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setFields({ name: '', phone: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const field = (id: keyof typeof fields) => ({
    value: fields[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [id]: e.target.value })),
  })

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-sans mb-5">
              Get in Touch
            </p>
            <h1
              className="font-display text-5xl sm:text-6xl text-white-off leading-[1.05] mb-6"
              style={{ fontWeight: 300 }}
            >
              We&rsquo;d Love to <span className="text-gold-gradient italic">Hear From You</span>
            </h1>
            <div className="divider-gold mb-6" />
            <p className="font-sans text-white-off/50 text-base leading-relaxed">
              Whether you have a question about a piece, need help building your dream ring, or just
              want to say hello — reach out. We respond within 24 hours.
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="section-padding bg-black-deep">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-serif text-xl text-white-off mb-6">Contact Information</h2>
                  <div className="space-y-5">
                    <a href="tel:2392446446" className="flex items-start gap-4 group">
                      <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:border-gold/50 transition-colors">
                        <Phone size={16} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-white-off/40 text-xs font-sans uppercase tracking-wider mb-1">
                          Phone
                        </p>
                        <p className="text-white-off font-sans group-hover:text-gold transition-colors">
                          239-244-6446
                        </p>
                      </div>
                    </a>

                    <a
                      href="mailto:info@truesmithjewelers.com"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:border-gold/50 transition-colors">
                        <Mail size={16} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-white-off/40 text-xs font-sans uppercase tracking-wider mb-1">
                          Email
                        </p>
                        <p className="text-white-off font-sans group-hover:text-gold transition-colors text-sm break-all">
                          info@truesmithjewelers.com
                        </p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                        <MapPin size={16} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-white-off/40 text-xs font-sans uppercase tracking-wider mb-1">
                          Location
                        </p>
                        <p className="text-white-off/70 font-sans text-sm leading-relaxed">
                          Miami, Florida
                          <br />
                          <span className="text-white-off/40 text-xs">By Appointment Only</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h3 className="font-serif text-white-off text-base mb-4">Follow Us</h3>
                  <div className="flex gap-3 flex-wrap">
                    <a
                      href="https://instagram.com/TrueSmithJeweler"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 border border-gold/20 text-white-off/60 hover:text-gold hover:border-gold/50 text-sm font-sans transition-all"
                    >
                      <Instagram size={14} />
                      Instagram
                    </a>
                    <a
                      href="https://youtube.com/@TrueSmithJeweler"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 border border-gold/20 text-white-off/60 hover:text-gold hover:border-gold/50 text-sm font-sans transition-all"
                    >
                      <Youtube size={14} />
                      YouTube
                    </a>
                  </div>
                </div>

                {/* Map placeholder */}
                <div>
                  <h3 className="font-serif text-white-off text-base mb-4">Location</h3>
                  <div className="aspect-[4/3] bg-black-soft border border-gold/10 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={32} className="text-gold/20 mx-auto mb-2" />
                      <p className="text-white-off/30 text-xs font-sans">Miami, Florida</p>
                      <p className="text-white-off/20 text-xs font-sans mt-1">Map coming soon</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-3">
                <div className="glass-card p-8 sm:p-10">
                  <h2 className="font-serif text-xl text-white-off mb-2">Send Us a Message</h2>
                  <p className="font-sans text-white-off/40 text-sm mb-8">
                    We&rsquo;ll get back to you within 24 hours.
                  </p>

                  {status === 'success' ? (
                    <div className="flex flex-col items-center text-center py-12 space-y-4">
                      <CheckCircle size={48} className="text-gold" />
                      <h3 className="font-serif text-white-off text-xl">Message Sent!</h3>
                      <p className="font-sans text-white-off/50 text-sm">
                        We&rsquo;ll be in touch within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="mt-4 text-gold text-sm font-sans uppercase tracking-wider hover:text-gold-light transition-colors"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                      {/* Name */}
                      <div>
                        <label className="block text-white-off/60 text-xs uppercase tracking-widest font-sans mb-2">
                          Full Name <span className="text-gold">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Your name"
                          {...field('name')}
                          className="w-full bg-black/50 border border-white/10 focus:border-gold text-white-off placeholder-white/20 px-4 py-3 text-sm font-sans outline-none transition-colors"
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-red-400 text-xs font-sans flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white-off/60 text-xs uppercase tracking-widest font-sans mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            placeholder="(305) 000-0000"
                            {...field('phone')}
                            className="w-full bg-black/50 border border-white/10 focus:border-gold text-white-off placeholder-white/20 px-4 py-3 text-sm font-sans outline-none transition-colors"
                          />
                          {errors.phone && (
                            <p className="mt-1.5 text-red-400 text-xs font-sans flex items-center gap-1">
                              <AlertCircle size={10} /> {errors.phone}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-white-off/60 text-xs uppercase tracking-widest font-sans mb-2">
                            Email <span className="text-gold">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="you@example.com"
                            {...field('email')}
                            className="w-full bg-black/50 border border-white/10 focus:border-gold text-white-off placeholder-white/20 px-4 py-3 text-sm font-sans outline-none transition-colors"
                          />
                          {errors.email && (
                            <p className="mt-1.5 text-red-400 text-xs font-sans flex items-center gap-1">
                              <AlertCircle size={10} /> {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-white-off/60 text-xs uppercase tracking-widest font-sans mb-2">
                          Message <span className="text-gold">*</span>
                        </label>
                        <textarea
                          rows={5}
                          placeholder="Tell us what you're looking for..."
                          {...field('message')}
                          className="w-full bg-black/50 border border-white/10 focus:border-gold text-white-off placeholder-white/20 px-4 py-3 text-sm font-sans outline-none transition-colors resize-none"
                        />
                        {errors.message && (
                          <p className="mt-1.5 text-red-400 text-xs font-sans flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.message}
                          </p>
                        )}
                      </div>

                      {status === 'error' && (
                        <p className="text-red-400 text-sm font-sans flex items-center gap-2">
                          <AlertCircle size={14} />
                          Something went wrong. Please try again or call us directly.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="group flex items-center gap-3 px-8 py-4 bg-gold text-black font-sans font-semibold text-sm tracking-widest uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                        <Send
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
