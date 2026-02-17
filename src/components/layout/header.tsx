'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Build Your Ring', href: '/build' },
  {
    label: 'Diamonds',
    href: '/diamonds',
    children: [
      { label: 'Browse Diamonds', href: '/diamonds' },
      { label: 'Round Cut', href: '/education/cuts/round' },
      { label: 'Oval Cut', href: '/education/cuts/oval' },
      { label: 'All Cuts', href: '/education/cuts' },
    ],
  },
  { label: 'Shop', href: '/shop' },
  {
    label: 'Education',
    href: '/education',
    children: [
      { label: 'Lab-Grown Diamonds', href: '/education/lab-grown' },
      { label: 'The 4Cs', href: '/education/4cs' },
      { label: 'Diamond Cuts', href: '/education/cuts' },
      { label: 'IGI vs GIA', href: '/education/certifications' },
    ],
  },
  { label: 'Sell Your Gold', href: '/sell-gold' },
  { label: 'About', href: '/about' },
]

interface HeaderProps {
  transparent?: boolean
}

export function Header({ transparent = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerBg = transparent && !isScrolled ? 'bg-transparent' : 'bg-black/95 backdrop-blur-md'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        headerBg,
        isScrolled && 'border-b border-white/5 shadow-luxury'
      )}
    >
      {/* Top bar — phone + promo */}
      <div className="border-b border-white/5 bg-black py-1.5 px-4 text-center">
        <p className="text-xs font-sans text-white-off/50 tracking-wider">
          <span className="text-gold/70">✦</span> Free consultation & complimentary engraving on all
          custom orders <span className="text-gold/70">✦</span>
        </p>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-display text-xl md:text-2xl text-white-off tracking-wider group-hover:text-gold transition-colors duration-300">
              TRUE SMITH
            </span>
            <span className="font-sans text-[10px] text-gold/70 tracking-[0.4em] uppercase">
              Jewelers
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'font-sans text-sm tracking-wider text-white-off/70 hover:text-gold transition-colors duration-200',
                    link.label === 'Build Your Ring' && 'text-gold hover:text-gold-light'
                  )}
                >
                  {link.label}
                </Link>
                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-black-deep border border-white/10 shadow-luxury py-2 rounded-sm">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm font-sans text-white-off/70 hover:text-gold hover:bg-gold/5 transition-colors duration-150"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+13055550000"
              className="flex items-center gap-1.5 text-white-off/50 hover:text-gold text-sm font-sans transition-colors duration-200"
            >
              <Phone size={14} />
              <span className="tracking-wide">(305) 555-0000</span>
            </a>
            <Button variant="primary" size="sm" asChild>
              <Link href="/build">Build Your Ring</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white-off/70 hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black-deep border-t border-white/5">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-3 py-3 font-sans text-sm text-white-off/70 hover:text-gold hover:bg-gold/5 transition-colors rounded-sm',
                  link.label === 'Build Your Ring' && 'text-gold bg-gold/5'
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/5">
              <Button variant="primary" size="md" className="w-full" asChild>
                <Link href="/build">Build Your Ring</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
