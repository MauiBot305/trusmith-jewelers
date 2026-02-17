import Link from 'next/link'
import { Phone, MapPin } from 'lucide-react'
import { SocialIcons } from '@/components/ui/SocialIcons'

const footerLinks = {
  'Build & Buy': [
    { label: 'Build Your Ring', href: '/build' },
    { label: 'Browse Diamonds', href: '/diamonds' },
    { label: 'Shop Jewelry', href: '/shop' },
    { label: 'Sell Your Gold', href: '/sell-gold' },
  ],
  Learn: [
    { label: 'Lab-Grown Diamonds', href: '/education/lab-grown' },
    { label: 'Diamond Cuts', href: '/education/cuts' },
    { label: 'The 4Cs', href: '/education/4cs' },
    { label: 'IGI vs GIA', href: '/education/certifications' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-black-deep border-t border-white/5">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="font-display text-2xl text-white-off tracking-wider">TRUE SMITH</p>
              <p className="font-sans text-xs text-gold/70 tracking-[0.4em] uppercase">Jewelers</p>
            </div>
            <p className="font-sans text-sm text-white-off/50 leading-relaxed max-w-xs">
              Luxury lab-grown diamond jewelry crafted with precision and priced with integrity.
              Every ring tells a story worth keeping.
            </p>
            {/* Social */}
            <SocialIcons size="md" />
            {/* Contact */}
            <div className="space-y-2">
              <a
                href="tel:2392446446"
                className="flex items-center gap-2 text-sm font-sans text-white-off/50 hover:text-gold transition-colors"
              >
                <Phone size={13} />
                239-244-6446
              </a>
              <div className="flex items-start gap-2 text-sm font-sans text-white-off/50">
                <MapPin size={13} className="mt-0.5 shrink-0" />
                <span>Miami, FL · By Appointment</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-sans text-xs text-gold/60 tracking-[0.3em] uppercase font-semibold">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white-off/50 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-sans text-white-off/30">
            © {new Date().getFullYear()} True Smith Jewelers. All rights reserved.
          </p>
          <p className="text-xs font-sans text-white-off/20">
            Lab-grown diamonds certified by IGI & GIA
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
