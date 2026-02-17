'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Heart } from 'lucide-react'
import ImageGallery from '@/components/shared/ImageGallery'
import ContactModal from '@/components/shared/ContactModal'
import TrustBadges from '@/components/shared/TrustBadges'
import ProductCard from '@/components/shop/ProductCard'
import { Product } from '@/types/product'

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function SpecRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 py-4">
      <span className="text-white/50 text-sm uppercase tracking-wider">{label}</span>
      <span className="text-white font-medium text-sm">{value}</span>
    </div>
  )
}

const CATEGORY_NAMES: Record<string, string> = {
  RING: 'Rings',
  BRACELET: 'Bracelets',
  CHAIN: 'Chains',
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [contactOpen, setContactOpen] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          router.push('/shop')
          return
        }
        setProduct(data.product)
        setRelated(data.related || [])
      })
      .catch(() => router.push('/shop'))
      .finally(() => setLoading(false))
  }, [id, router])

  if (loading) {
    return (
      <main className="min-h-screen bg-black pt-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="aspect-square bg-black-soft animate-pulse rounded-sm" />
            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 bg-black-soft animate-pulse rounded-sm" />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!product) return null

  return (
    <>
      <main className="min-h-screen bg-black pt-24 pb-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/30 text-xs mb-10">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-gold transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-gold transition-colors"
            >
              {CATEGORY_NAMES[product.category] || product.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/60">{product.name}</span>
          </nav>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20">
            {/* Left: Image gallery */}
            <ImageGallery images={product.images} alt={product.name} showZoom />

            {/* Right: Product info */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="border border-gold/30 text-gold/70 text-[10px] uppercase tracking-widest px-2.5 py-1">
                    {CATEGORY_NAMES[product.category] || product.category}
                  </span>
                  {product.featured && (
                    <span className="bg-gold-gradient text-black text-[10px] uppercase tracking-widest font-bold px-2.5 py-1">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h1 className="font-serif text-3xl lg:text-4xl text-white leading-tight">
                    {product.name}
                  </h1>
                  <button
                    onClick={() => setWishlisted((w) => !w)}
                    title="Add to Wishlist"
                    className="flex-shrink-0 mt-1"
                  >
                    <Heart
                      className={`w-6 h-6 transition-colors ${
                        wishlisted
                          ? 'text-red-400 fill-red-400'
                          : 'text-white/30 hover:text-white/60'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-gold font-medium text-3xl mt-4">{formatPrice(product.price)}</p>
              </div>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-8 border-t border-white/5 pt-6">
                {product.description}
              </p>

              {/* Specs */}
              <div className="mb-8">
                <SpecRow label="Metal" value={product.metalType} />
                {product.metalPurity && <SpecRow label="Purity" value={product.metalPurity} />}
                {product.diamondType && (
                  <SpecRow label="Diamond Type" value={product.diamondType} />
                )}
                {product.diamondSpecs?.carat && (
                  <SpecRow label="Diamond Weight" value={`${product.diamondSpecs.carat}ct Total`} />
                )}
                {product.diamondSpecs?.cut && (
                  <SpecRow label="Diamond Cut" value={product.diamondSpecs.cut} />
                )}
                {product.diamondSpecs?.color && product.diamondSpecs?.clarity && (
                  <SpecRow
                    label="Diamond Grade"
                    value={`${product.diamondSpecs.color} Color / ${product.diamondSpecs.clarity} Clarity`}
                  />
                )}
                {product.dimensions && <SpecRow label="Dimensions" value={product.dimensions} />}
                {product.weight && <SpecRow label="Metal Weight" value={product.weight} />}
                <SpecRow
                  label="SKU"
                  value={<span className="font-mono text-xs">{product.sku}</span>}
                />
                <SpecRow
                  label="Availability"
                  value={
                    <span className={product.inStock ? 'text-green-400' : 'text-red-400'}>
                      {product.inStock ? '● In Stock' : '● Out of Stock'}
                    </span>
                  }
                />
              </div>

              {/* Trust badges */}
              <div className="border-t border-b border-white/5 py-6 mb-8">
                <TrustBadges variant="column" />
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setContactOpen(true)}
                  className="w-full bg-gold-gradient text-black font-medium py-4 uppercase tracking-widest text-sm hover:shadow-gold transition-all"
                >
                  Inquire About This Piece
                </button>
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className="w-full border border-white/10 text-white/60 hover:border-gold/40 hover:text-gold py-4 uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-red-400' : ''}`} />
                  {wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6 border-t border-white/10 pt-12">
                <h2 className="font-serif text-2xl text-white">You May Also Like</h2>
                <div className="flex-1 h-px bg-white/10" />
                <Link
                  href="/shop"
                  className="text-gold/70 hover:text-gold text-xs uppercase tracking-wider transition-colors"
                >
                  View All
                </Link>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-0 lg:px-0 lg:grid lg:grid-cols-4">
                {related.map((p) => (
                  <div key={p.id} className="flex-shrink-0 w-64 lg:w-auto">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        subject={product.name}
        title="Inquire About This Piece"
      />
    </>
  )
}
