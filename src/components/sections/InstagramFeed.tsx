import Link from 'next/link'
import { Instagram, ExternalLink } from 'lucide-react'

// Placeholder grid data — replace image paths with real Cloudinary/CDN URLs
// or integrate the Instagram Basic Display API when account is approved.
const PLACEHOLDER_POSTS = [
  {
    id: '1',
    alt: 'Round brilliant diamond engagement ring in platinum setting',
    gradient: 'from-amber-900/30 to-yellow-900/20',
    label: 'Solitaire Perfection',
  },
  {
    id: '2',
    alt: 'Oval cut diamond with halo setting in rose gold',
    gradient: 'from-rose-900/30 to-pink-900/20',
    label: 'Halo Elegance',
  },
  {
    id: '3',
    alt: 'Tennis bracelet with lab-grown diamonds',
    gradient: 'from-stone-800/40 to-zinc-900/30',
    label: 'Tennis Bracelet',
  },
  {
    id: '4',
    alt: 'Emerald cut diamond in vintage-inspired setting',
    gradient: 'from-green-900/20 to-emerald-900/15',
    label: 'Vintage Romance',
  },
  {
    id: '5',
    alt: 'Princess cut diamond ring detail shot',
    gradient: 'from-blue-900/20 to-indigo-900/15',
    label: 'Princess Cut',
  },
  {
    id: '6',
    alt: 'Custom pear-shaped diamond ring on hand',
    gradient: 'from-amber-900/25 to-orange-900/20',
    label: 'Pear Shape Brilliance',
  },
]

export function InstagramFeed() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Instagram className="w-5 h-5 text-gold" />
            <span className="text-gold text-xs font-sans tracking-[0.3em] uppercase">
              @TrueSmithJeweler
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-light text-white-off">
            Follow Our Journey
          </h2>
          <p className="text-white-off/50 font-sans text-sm mt-3 max-w-md mx-auto leading-relaxed">
            Behind-the-scenes craftsmanship, new arrivals, and love stories told through diamonds.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
          {PLACEHOLDER_POSTS.map((post) => (
            <Link
              key={post.id}
              href="https://instagram.com/TrueSmithJeweler"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-black-deep border border-white/5 hover:border-gold/30 transition-all duration-300"
              aria-label={`View ${post.label} on Instagram`}
            >
              {/* Gradient placeholder — swap for next/image when real photos available */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${post.gradient} transition-opacity duration-300`}
              />

              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Diamond accent */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border border-gold/20 rotate-45 opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 p-2">
                <Instagram className="w-5 h-5 text-white-off" />
                <span className="text-white-off text-[10px] font-sans text-center leading-tight">
                  {post.label}
                </span>
              </div>

              {/* Screen reader label */}
              <span className="sr-only">{post.alt}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="https://instagram.com/TrueSmithJeweler"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold hover:text-black px-8 py-3 font-sans text-sm tracking-widest uppercase transition-all duration-300 group"
          >
            <Instagram className="w-4 h-4" />
            @TrueSmithJeweler
            <ExternalLink className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          </Link>
        </div>
      </div>
    </section>
  )
}
