import Image from 'next/image'
import Link from 'next/link'
import { Diamond } from '@/types/diamond'
import { cn } from '@/lib/utils'

interface DiamondCardProps {
  diamond: Diamond
  className?: string
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function DiamondCard({ diamond, className }: DiamondCardProps) {
  const mainImage = diamond.images?.[0] || '/placeholder-diamond.jpg'

  return (
    <Link
      href={`/diamonds/${diamond.id}`}
      className={cn(
        'group block bg-black-soft border border-white/5 hover:border-gold/30 transition-all duration-300 hover:shadow-product',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-black">
        <Image
          src={mainImage}
          alt={`${diamond.carat}ct ${diamond.cut} diamond`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Certification badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-gold/30 px-2 py-1">
          <span className="text-gold text-[10px] uppercase tracking-widest font-medium">
            {diamond.certification}
          </span>
        </div>

        {/* Featured badge */}
        {diamond.featured && (
          <div className="absolute top-3 right-3 bg-gold-gradient px-2 py-1">
            <span className="text-black text-[10px] uppercase tracking-widest font-bold">
              Featured
            </span>
          </div>
        )}

        {/* Hover overlay with View button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="border border-gold text-gold px-6 py-2 text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-colors duration-200">
            View Diamond
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-serif text-white text-sm mb-1">
          {diamond.carat}ct {diamond.cut}
        </h3>
        <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
          <span>{diamond.color} Color</span>
          <span className="w-0.5 h-0.5 bg-white/30 rounded-full" />
          <span>{diamond.clarity} Clarity</span>
        </div>
        <p className="text-gold font-medium text-base">{formatPrice(diamond.price)}</p>
      </div>
    </Link>
  )
}
