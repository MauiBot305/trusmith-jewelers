import Link from 'next/link'
import { Settings, Diamond, Package, ArrowRight } from 'lucide-react'

const tiles = [
  {
    icon: Settings,
    title: 'Build Your Ring',
    description:
      'Design a completely custom engagement ring. Choose your diamond, select your setting, and create something uniquely yours.',
    href: '/build',
    cta: 'Start Building',
  },
  {
    icon: Diamond,
    title: 'Find Your Diamond',
    description:
      'Browse our certified lab-grown diamond inventory. Filter by cut, carat, color, and clarity to find your perfect stone.',
    href: '/diamonds',
    cta: 'Search Diamonds',
  },
  {
    icon: Package,
    title: 'Ready-to-Ship',
    description:
      'Stunning pieces crafted and ready for immediate delivery. Rings, bracelets, chains — luxury with no wait.',
    href: '/shop',
    cta: 'Shop Now',
  },
]

export default function FeatureTiles() {
  return (
    <section className="section-padding bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">How to Shop</p>
          <h2 className="font-serif text-display-sm sm:text-display-md text-white-off mb-4">
            The True Smith Experience
          </h2>
          <div className="divider-gold" />
        </div>

        {/* Tiles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">
          {tiles.map(({ icon: Icon, title, description, href, cta }) => (
            <Link
              key={href}
              href={href}
              className="group relative bg-black-deep p-10 lg:p-12 flex flex-col hover:bg-black-soft transition-all duration-500"
            >
              {/* Gold accent line on hover */}
              <div className="absolute top-0 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icon */}
              <div className="w-14 h-14 border border-gold/20 flex items-center justify-center mb-8 group-hover:border-gold/60 group-hover:bg-gold/5 transition-all duration-300">
                <Icon size={24} className="text-gold" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl text-white-off mb-4 group-hover:text-gold transition-colors duration-300">
                {title}
              </h3>
              <p className="font-sans text-white-off/50 text-sm leading-relaxed flex-1 mb-8">
                {description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-gold text-sm font-sans tracking-wider uppercase">
                {cta}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
