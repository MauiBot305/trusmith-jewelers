import { Instagram, ExternalLink } from 'lucide-react'

// Placeholder grid using Unsplash jewelry images
const posts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80',
    alt: 'Engagement ring on hand',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80',
    alt: 'Tennis bracelet close-up',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80',
    alt: 'Diamond ring detail',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
    alt: 'Gold chain jewelry',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&q=80',
    alt: 'Diamond necklace',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80',
    alt: 'Ring close-up',
  },
]

export default function InstagramPreview() {
  return (
    <section className="section-padding bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram size={20} className="text-gold" />
            <p className="font-sans text-gold text-sm tracking-[0.2em] uppercase">
              @TrueSmithJeweler
            </p>
          </div>
          <h2 className="font-serif text-display-sm text-white-off mb-3">Follow Our Journey</h2>
          <p className="font-sans text-white-off/40 text-sm">
            Behind the scenes, new arrivals, and love stories
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2 mb-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden bg-black-soft"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ExternalLink size={18} className="text-gold" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://instagram.com/TrueSmithJeweler"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-3 border border-gold/30 text-white-off/70 font-sans text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300"
          >
            <Instagram size={14} />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
