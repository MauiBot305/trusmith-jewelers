'use client'

import { useState } from 'react'
import { X, CheckCircle } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  subject?: string
  title?: string
}

export default function ContactModal({
  isOpen,
  onClose,
  subject = '',
  title = 'Contact Us',
}: ContactModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative z-10 bg-black-soft border border-white/10 rounded-sm max-w-md w-full p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-white mb-2">Message Sent</h3>
            <p className="text-white/60">Our team will be in touch within 24 hours.</p>
            <button
              onClick={onClose}
              className="mt-6 text-gold/80 hover:text-gold text-sm uppercase tracking-wider transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gold/80 text-xs uppercase tracking-[0.2em] mb-1">
                True Smith Jewelers
              </p>
              <h2 className="font-serif text-2xl text-white">{title}</h2>
              {subject && <p className="text-white/50 text-sm mt-1">Re: {subject}</p>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-black border border-white/10 focus:border-gold/60 rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-black border border-white/10 focus:border-gold/60 rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-black border border-white/10 focus:border-gold/60 rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                  placeholder="+1 (305) 555-0100"
                />
              </div>

              <div>
                <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">
                  Message *
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={4}
                  className="w-full bg-black border border-white/10 focus:border-gold/60 rounded-sm px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20 resize-none"
                  placeholder="Tell us what you're looking for..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-gradient text-black font-medium py-4 text-sm uppercase tracking-wider hover:shadow-gold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
