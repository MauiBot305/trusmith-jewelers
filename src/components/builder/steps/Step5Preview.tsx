'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Diamond, Settings2, Gem, PenLine, Ruler, ChevronRight, Edit3 } from 'lucide-react'
import { useBuilderStore } from '@/store/builderStore'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

// Lazy load AR component
const ARTryOn = dynamic(() => import('@/components/builder/ARTryOn'), {
  ssr: false,
  loading: () => (
    <div className="aspect-[4/3] bg-black-soft rounded-xl border border-gold/10 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-white-off/50 text-xs tracking-wider uppercase">Loading AR Preview</span>
      </div>
    </div>
  ),
})

// ── Angle View Placeholder ─────────────────────────────────────────────────────
interface AngleViewProps {
  label: string
  gradient: string
}

function AngleViewPlaceholder({ label, gradient }: AngleViewProps) {
  return (
    <div className={cn(
      "aspect-square rounded-xl border border-gold/20 flex items-center justify-center relative overflow-hidden",
      "bg-gradient-to-br",
      gradient
    )}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Gem className="w-12 h-12 text-gold/30" />
      </div>
      <span className="absolute bottom-2 left-2 text-xs text-white-off/50 font-sans tracking-wider uppercase bg-black/40 px-2 py-1 rounded">
        {label}
      </span>
    </div>
  )
}

// ── Summary Line Item ──────────────────────────────────────────────────────────
interface SummaryLineProps {
  icon: React.ReactNode
  label: string
  value: string
  price?: string
  className?: string
}

function SummaryLine({ icon, label, value, price, className }: SummaryLineProps) {
  return (
    <div className={cn("flex items-start gap-3 py-3 border-b border-white/5 last:border-0", className)}>
      <div className="text-gold mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-white-off/50 text-xs uppercase tracking-wider">{label}</div>
        <div className="text-white-off text-sm font-medium truncate">{value}</div>
      </div>
      {price && (
        <div className="text-gold font-semibold text-sm whitespace-nowrap">{price}</div>
      )}
    </div>
  )
}

// ── Main Step 5 Component ──────────────────────────────────────────────────────
export function Step5Preview() {
  const { diamond, setting, metal, engraving, ringSize, getTotal, setStep } = useBuilderStore()
  
  const total = getTotal()

  const handleEditDesign = () => {
    setStep(1)
  }

  const handleGetQuote = () => {
    setStep(6)
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-serif text-gold">Your Custom Creation</h2>
        <p className="text-white-off/60 text-sm">Review your design before securing your reservation</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Design Summary */}
        <div className="space-y-6">
          {/* Design Summary Card */}
          <div className="bg-black-soft border border-gold/20 rounded-2xl p-6 space-y-1">
            <h3 className="text-gold text-xs uppercase tracking-[0.25em] font-sans mb-4">Design Summary</h3>
            
            {/* Diamond */}
            {diamond && (
              <SummaryLine
                icon={<Diamond className="w-4 h-4" />}
                label="Diamond"
                value={`${diamond.carat}ct ${diamond.cut} Cut • ${diamond.color}/${diamond.clarity}`}
                price={formatPrice(diamond.price)}
              />
            )}

            {/* Setting */}
            {setting && (
              <SummaryLine
                icon={<Settings2 className="w-4 h-4" />}
                label="Setting"
                value={setting.name}
                price={formatPrice(setting.basePrice)}
              />
            )}

            {/* Metal */}
            {metal && (
              <SummaryLine
                icon={<Gem className="w-4 h-4" />}
                label="Metal"
                value={`${metal.name} ${metal.karat}`}
                price={metal.priceModifier > 0 ? `+${formatPrice(metal.priceModifier)}` : 'Included'}
              />
            )}

            {/* Engraving (if set) */}
            {engraving && (
              <SummaryLine
                icon={<PenLine className="w-4 h-4" />}
                label="Engraving"
                value={`"${engraving}"`}
              />
            )}

            {/* Ring Size (if set) */}
            {ringSize && (
              <SummaryLine
                icon={<Ruler className="w-4 h-4" />}
                label="Ring Size"
                value={`Size ${ringSize}`}
              />
            )}

            {/* Total */}
            <div className="pt-4 mt-4 border-t border-gold/30">
              <div className="flex items-center justify-between">
                <span className="text-white-off font-semibold">Estimated Total</span>
                <span className="text-3xl font-serif text-gold">{formatPrice(total)}</span>
              </div>
              <p className="text-white-off/40 text-xs mt-1">Final price confirmed at consultation</p>
            </div>
          </div>

          {/* Multiple Angle Views */}
          <div className="space-y-3">
            <h3 className="text-gold text-xs uppercase tracking-[0.25em] font-sans">Ring Views</h3>
            <div className="grid grid-cols-2 gap-3">
              <AngleViewPlaceholder label="Front View" gradient="from-gray-900 to-gray-800" />
              <AngleViewPlaceholder label="Side View" gradient="from-gray-800 to-gray-900" />
              <AngleViewPlaceholder label="Top View" gradient="from-gray-900 via-gray-800 to-gray-900" />
              <AngleViewPlaceholder label="3/4 View" gradient="from-gray-800 via-gray-900 to-gray-800" />
            </div>
          </div>
        </div>

        {/* Right Column: 3D/AR Preview */}
        <div className="space-y-6">
          {/* 3D Viewer */}
          <div className="space-y-3">
            <h3 className="text-gold text-xs uppercase tracking-[0.25em] font-sans">3D Preview</h3>
            <div className="bg-black-soft border border-gold/20 rounded-2xl p-4 overflow-hidden">
              <Suspense fallback={
                <div className="aspect-[4/3] flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <ARTryOn />
              </Suspense>
            </div>
          </div>

          {/* See It On Your Hand */}
          <div className="p-6 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-xl">✋</span>
              </div>
              <div>
                <h4 className="text-gold font-semibold">See It On Your Hand</h4>
                <p className="text-white-off/50 text-xs">Try the AR preview above to visualize your ring</p>
              </div>
            </div>
            <p className="text-white-off/60 text-sm leading-relaxed">
              Use the 3D viewer above to rotate, zoom, and try different skin tone presets 
              to see exactly how your custom creation will look.
            </p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
        <button
          onClick={handleEditDesign}
          className="flex-1 flex items-center justify-center gap-2 py-4 border border-gold/40 text-gold font-medium text-sm tracking-wider uppercase rounded-lg hover:bg-gold/10 hover:border-gold transition-all"
        >
          <Edit3 className="w-4 h-4" />
          Edit Design
        </button>
        <button
          onClick={handleGetQuote}
          className="flex-[2] flex items-center justify-center gap-2 py-4 bg-gold text-black font-semibold text-sm tracking-widest uppercase rounded-lg hover:bg-gold-light transition-colors shadow-gold"
        >
          Get Quote & Reserve
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Step5Preview
