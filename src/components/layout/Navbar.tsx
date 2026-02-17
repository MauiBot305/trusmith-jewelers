'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { SocialIconsCompact } from '@/components/ui/SocialIcons'

const navLinks = [
  { href: '/shop', label: 'Collection' },
  { href: '/diamonds', label: 'Diamonds' },
  { href: '/build', label: 'Build a Ring' },
  { href: '/education', label: 'Education' },
  { href: '/about', label: 'About' },
  { href: '/sell-gold', label: 'Sell Gold' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-gold/10 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-display text-xl font-light tracking-[0.15em] text-white-off group-hover:text-gold transition-colors duration-300">
              TRUE SMITH
            </span>
            <span className="text-gold text-[0.6rem] tracking-[0.4em] uppercase font-sans mt-0.5">
              Jewelers
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white-off/70 hover:text-gold text-sm tracking-wider font-sans uppercase transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <SocialIconsCompact />
            <div className="w-px h-4 bg-white/10" />
            <a
              href="tel:2392446446"
              className="flex items-center gap-2 text-gold text-sm font-sans tracking-wide hover:text-gold-light transition-colors"
            >
              <Phone size={14} />
              239-244-6446
            </a>
            <Link
              href="/build"
              className="px-5 py-2 bg-gold text-black text-sm font-sans font-medium tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
            >
              Quote Ring
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white-off hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black-deep border-t border-gold/10 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-white-off/80 hover:text-gold text-sm tracking-widest uppercase font-sans py-2 border-b border-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:2392446446"
            className="flex items-center gap-2 text-gold text-sm font-sans tracking-wide pt-2"
          >
            <Phone size={14} />
            239-244-6446
          </a>
          <Link
            href="/build"
            className="block w-full text-center px-5 py-3 bg-gold text-black text-sm font-sans font-medium tracking-widest uppercase mt-4"
            onClick={() => setMobileOpen(false)}
          >
            Quote My Ring
          </Link>
        </div>
      </div>
    </header>
  )
}
