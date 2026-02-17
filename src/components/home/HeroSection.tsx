'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-black" />

      {/* Radial gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,175,55,0.06)_0%,transparent_70%)]" />

      {/* Diagonal light beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-gold/0 via-gold/10 to-gold/0" />

      {/* Decorative corner ornaments */}
      <div className="absolute top-24 left-8 lg:left-16 w-16 h-16 border-t border-l border-gold/20" />
      <div className="absolute top-24 right-8 lg:right-16 w-16 h-16 border-t border-r border-gold/20" />
      <div className="absolute bottom-24 left-8 lg:left-16 w-16 h-16 border-b border-l border-gold/20" />
      <div className="absolute bottom-24 right-8 lg:right-16 w-16 h-16 border-b border-r border-gold/20" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div
          className={`mb-8 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="inline-block text-gold text-xs tracking-[0.4em] uppercase font-sans">
            ◈ &nbsp; Lab-Grown Diamonds &nbsp; ◈
          </span>
        </div>

        {/* Main headline */}
        <h1
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white-off leading-[1.05] mb-6 transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ fontWeight: 300, letterSpacing: '-0.01em' }}
        >
          Affordable luxury <em className="text-gold-gradient not-italic">lab-grown</em> diamonds
          for life&rsquo;s most <em className="italic text-white-off/90 not-italic">important</em>{' '}
          moments
        </h1>

        {/* Divider */}
        <div
          className={`divider-gold mb-6 transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />

        {/* Subheadline */}
        <p
          className={`font-sans text-white-off/60 text-lg sm:text-xl tracking-wide mb-12 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Ethical &bull; Certified &bull; Exceptional Value
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Primary CTA */}
          <Link
            href="/build"
            className="group flex items-center gap-3 px-8 py-4 bg-gold text-black font-sans font-semibold text-sm tracking-widest uppercase hover:bg-gold-light transition-all duration-300 shadow-gold hover:shadow-gold-lg"
          >
            Quote My Dream Ring
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>

          {/* Secondary CTAs */}
          <Link
            href="/diamonds"
            className="px-6 py-4 border border-gold/40 text-gold font-sans text-sm tracking-widest uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300 font-medium"
          >
            Find Your Diamond
          </Link>
          <Link
            href="/shop"
            className="px-6 py-4 border border-white/10 text-white-off/70 font-sans text-sm tracking-widest uppercase hover:border-white/30 hover:text-white-off transition-all duration-300 font-medium"
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white-off/30 animate-bounce">
        <span className="text-[10px] tracking-[0.3em] uppercase font-sans">Scroll</span>
        <ChevronDown size={16} />
      </div>
    </section>
  )
}
