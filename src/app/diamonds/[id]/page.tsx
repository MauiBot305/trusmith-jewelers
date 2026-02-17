'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import ImageGallery from '@/components/shared/ImageGallery'
import CertificateModal from '@/components/shared/CertificateModal'
import ContactModal from '@/components/shared/ContactModal'
import Diamond3DViewer from '@/components/shared/Diamond3DViewer'
import DiamondCard from '@/components/diamonds/DiamondCard'
import { Diamond } from '@/types/diamond'

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

interface SpecRowProps {
  label: string
  value: React.ReactNode
}
function SpecRow({ label, value }: SpecRowProps) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 py-4">
      <span className="text-white/50 text-sm uppercase tracking-wider">{label}</span>
      <span className="text-white font-medium text-sm">{value}</span>
    </div>
  )
}

export default function DiamondDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [diamond, setDiamond] = useState<Diamond | null>(null)
  const [related, setRelated] = useState<Diamond[]>([])
  const [loading, setLoading] = useState(true)
  const [certOpen, setCertOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'gallery' | '3d'>('gallery')

  useEffect(() => {
    if (!id) return
    fetch(`/api/diamonds/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          router.push('/diamonds')
          return
        }
        setDiamond(data.diamond)
        setRelated(data.related || [])
      })
      .catch(() => router.push('/diamonds'))
      .finally(() => setLoading(false))
  }, [id, router])

  const addToRingBuilder = () => {
    if (!diamond) return
    localStorage.setItem('ringBuilderDiamondId', diamond.id)
    router.push('/build')
  }

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

  if (!diamond) return null

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
            <Link href="/diamonds" className="hover:text-gold transition-colors">
              Diamonds
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/60">
              {diamond.carat}ct {diamond.cut}
            </span>
          </nav>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20">
            {/* Left: Media */}
            <div>
              {/* Tab switcher */}
              <div className="flex gap-0 mb-4 border-b border-white/10">
                {(['gallery', '3d'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-xs uppercase tracking-widest transition-colors ${
                      activeTab === tab
                        ? 'text-gold border-b-2 border-gold -mb-px'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {tab === 'gallery' ? 'Photos' : '3D View'}
                  </button>
                ))}
              </div>

              {activeTab === 'gallery' ? (
                <ImageGallery images={diamond.images ?? []} alt={`${diamond.carat}ct ${diamond.cut}`} />
              ) : (
                <Diamond3DViewer className="w-full" />
              )}

              {/* Video player */}
              {diamond.videoUrl && (
                <div className="mt-4">
                  <video
                    src={diamond.videoUrl}
                    controls
                    className="w-full rounded-sm bg-black-soft"
                    poster={diamond.images?.[0]}
                  />
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-gold-gradient text-black text-[10px] uppercase tracking-widest font-bold px-2.5 py-1">
                    {diamond.certification} Certified
                  </span>
                  <span className="text-white/40 text-xs">Lab-Grown</span>
                </div>
                <h1 className="font-serif text-3xl lg:text-4xl text-white mb-2">
                  {diamond.carat}ct {diamond.cut} Diamond
                </h1>
                <p className="text-gold font-medium text-3xl mt-4">{formatPrice(diamond.price)}</p>
              </div>

              {/* Specs */}
              <div className="mb-8">
                <SpecRow label="Cut" value={diamond.cut} />
                <SpecRow label="Carat" value={`${diamond.carat}ct`} />
                <SpecRow label="Color" value={diamond.color} />
                <SpecRow label="Clarity" value={diamond.clarity} />
                <SpecRow label="Certification" value={diamond.certification} />
                <SpecRow
                  label="Certificate No."
                  value={
                    <button
                      onClick={() => setCertOpen(true)}
                      className="text-gold hover:text-gold-light underline underline-offset-4 transition-colors font-mono text-xs"
                    >
                      {diamond.certificateNumber}
                    </button>
                  }
                />
                <SpecRow
                  label="SKU"
                  value={<span className="font-mono text-xs">{diamond.sku}</span>}
                />
                <SpecRow
                  label="Availability"
                  value={
                    <span className={diamond.inStock ? 'text-green-400' : 'text-red-400'}>
                      {diamond.inStock ? '● In Stock' : '● Out of Stock'}
                    </span>
                  }
                />
              </div>

              {/* Description */}
              {diamond.description && (
                <p className="text-white/60 text-sm leading-relaxed mb-8 border-t border-white/5 pt-6">
                  {diamond.description}
                </p>
              )}

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={addToRingBuilder}
                  className="w-full bg-gold-gradient text-black font-medium py-4 uppercase tracking-widest text-sm hover:shadow-gold transition-all"
                >
                  Add to Ring Builder
                </button>
                <button
                  onClick={() => setContactOpen(true)}
                  className="w-full border border-gold/40 text-gold hover:border-gold hover:bg-gold/10 py-4 uppercase tracking-widest text-sm transition-all"
                >
                  Contact About This Diamond
                </button>
              </div>
            </div>
          </div>

          {/* Related diamonds */}
          {related.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6 border-t border-white/10 pt-12">
                <h2 className="font-serif text-2xl text-white">Similar Diamonds</h2>
                <div className="flex-1 h-px bg-white/10" />
                <Link
                  href="/diamonds"
                  className="text-gold/70 hover:text-gold text-xs uppercase tracking-wider transition-colors"
                >
                  View All
                </Link>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-0 lg:px-0 lg:grid lg:grid-cols-4">
                {related.map((d) => (
                  <div key={d.id} className="flex-shrink-0 w-64 lg:w-auto">
                    <DiamondCard diamond={d} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <CertificateModal
        isOpen={certOpen}
        onClose={() => setCertOpen(false)}
        certNumber={diamond.certificateNumber ?? diamond.certNumber ?? ''}
        certLab={diamond.certification}
        certUrl={diamond.certificateUrl}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        subject={`${diamond.carat}ct ${diamond.cut} — ${diamond.sku}`}
        title="Contact About This Diamond"
      />
    </>
  )
}
