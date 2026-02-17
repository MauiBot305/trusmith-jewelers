'use client'

import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useRef } from 'react'

const products = [
  {
    id: 1,
    name: 'Oval Solitaire Engagement Ring',
    category: 'Engagement Ring',
    price: '$2,850',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    href: '/shop/oval-solitaire',
  },
  {
    id: 2,
    name: 'Classic Tennis Bracelet',
    category: 'Tennis Bracelet',
    price: '$3,200',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    href: '/shop/tennis-bracelet',
  },
  {
    id: 3,
    name: 'Cushion Halo Ring',
    category: 'Engagement Ring',
    price: '$3,650',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    href: '/shop/cushion-halo',
  },
  {
    id: 4,
    name: '14K Gold Curb Chain',
    category: 'Chain',
    price: '$1,100',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    href: '/shop/curb-chain',
  },
  {
    id: 5,
    name: 'Round Brilliant Pavé Band',
    category: 'Engagement Ring',
    price: '$2,200',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
    href: '/shop/pave-band',
  },
  {
    id: 6,
    name: 'Diamond Tennis Necklace',
    category: 'Necklace',
    price: '$4,800',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80',
    href: '/shop/tennis-necklace',
  },
  {
    id: 7,
    name: 'Princess Cut Stud Earrings',
    category: 'Earrings',
    price: '$890',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    href: '/shop/princess-studs',
  },
  {
    id: 8,
    name: 'Emerald Three-Stone Ring',
    category: 'Engagement Ring',
    price: '$4,100',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    href: '/shop/emerald-three-stone',
  },
]

export default function FeaturedCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({
      left: dir === 'right' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="section-padding bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-3">Featured</p>
            <h2 className="font-serif text-display-sm sm:text-display-md text-white-off">
              Our Collection
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 border border-gold/30 flex items-center justify-center text-white-off/60 hover:text-gold hover:border-gold transition-all duration-200"
              aria-label="Scroll left"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 border border-gold/30 flex items-center justify-center text-white-off/60 hover:text-gold hover:border-gold transition-all duration-200"
              aria-label="Scroll right"
            >
              <ArrowRight size={16} />
            </button>
            <Link
              href="/shop"
              className="ml-2 text-gold text-sm font-sans tracking-wider uppercase hover:text-gold-light transition-colors flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group flex-none w-64 sm:w-72 snap-start"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-black-soft mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 border border-gold text-gold text-xs tracking-widest uppercase font-sans">
                    View
                  </span>
                </div>
              </div>

              {/* Info */}
              <div>
                <p className="text-gold/60 text-[10px] tracking-[0.25em] uppercase font-sans mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-white-off text-base group-hover:text-gold transition-colors duration-200 leading-tight mb-1">
                  {product.name}
                </h3>
                <p className="font-sans text-white-off/60 text-sm">From {product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
