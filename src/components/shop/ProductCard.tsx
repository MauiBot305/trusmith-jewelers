import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

const CATEGORY_LABELS: Record<string, string> = {
  RING: 'Ring',
  BRACELET: 'Bracelet',
  CHAIN: 'Chain',
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const mainImage = product.images?.[0] || '/placeholder-product.jpg'
  const hoverImage = product.images?.[1] || mainImage

  return (
    <Link
      href={`/shop/${product.id}`}
      className={cn(
        'group block bg-black-soft border border-white/5 hover:border-gold/30 transition-all duration-300 hover:shadow-product',
        className
      )}
    >
      {/* Image — swap on hover */}
      <div className="relative aspect-square overflow-hidden bg-black">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <Image
          src={hoverImage}
          alt={`${product.name} - alternate view`}
          fill
          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-white/10 px-2 py-1">
          <span className="text-white/60 text-[10px] uppercase tracking-widest">
            {CATEGORY_LABELS[product.category] || product.category}
          </span>
        </div>

        {/* Featured */}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-gold-gradient px-2 py-1">
            <span className="text-black text-[10px] uppercase tracking-widest font-bold">
              Featured
            </span>
          </div>
        )}

        {/* Metal type */}
        {product.metalPurity && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm border border-gold/20 px-2 py-1">
            <span className="text-gold/80 text-[10px] uppercase tracking-widest">
              {product.metalPurity} {product.metalType}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="border border-gold text-gold px-6 py-2 text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-colors duration-200">
            View Details
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-serif text-white text-sm mb-1 group-hover:text-gold/90 transition-colors">
          {product.name}
        </h3>
        {product.diamondSpecs && product.diamondType && (
          <p className="text-white/40 text-xs mb-2">
            {product.diamondSpecs.carat}ct {product.diamondSpecs.cut} · {product.diamondType}
          </p>
        )}
        <p className="text-gold font-medium text-base">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
