'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Diamond, Settings2, Gem, PenLine, Ruler, ChevronRight, Edit3 } from 'lucide-react'
import { useBuilderStore } from '@/store/builderStore'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { RingConfig } from '@/components/builder/ProceduralRing'

const Scene3D = dynamic(() => import('@/components/builder/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black rounded-xl">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-gold/40 text-xs tracking-widest uppercase">Loading 3D Preview</span>
      </div>
    </div>
  ),
})

const ARTryOn = dynamic(() => import('@/components/builder/ARTryOn'), {
  ssr: false,
  loading: () => (
    <div className="aspect-[4/3] bg-black rounded-xl border border-gold/10 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

function getMetalConfig(hex: string): { color: string; roughness: number } {
  const map: Record<string, { color: string; roughness: number }> = {
    '#D4AF37': { color: '#FFD700', roughness: 0.2 },
    '#FFD700': { color: '#FFCC00', roughness: 0.15 },
    '#E8E8E8': { color: '#E8E8E8', roughness: 0.2 },
    '#F0F0F0': { color: '#F0F0F0', roughness: 0.15 },
    '#B76E79': { color: '#E8A090', roughness: 0.2 },
    '#E8A090': { color: '#E89888', roughness: 0.15 },
    '#D0D0D8': { color: '#D0D0D8', roughness: 0.1 },
    '#C0C0C0': { color: '#C0C0C0', roughness: 0.25 },
  }
  return map[hex] ?? { color: hex, roughness: 0.2 }
}

interface SummaryLineProps {
  icon: React.ReactNode
  label: string
  value: string
  price?: string
}

function SummaryLine({ icon, label, value, price }: SummaryLineProps) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
      <div className="text-gold mt-0.5 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-white-off/40 text-xs uppercase tracking-wider">{label}</div>
        <div className="text-white-off text-sm font-medium truncate">{value}</div>
      </div>
      {price && <div className="text-gold font-semibold text-sm whitespace-nowrap">{price}</div>}
    </div>
  )
}

export function Step5Preview() {
  const { diamond, setting, metal, engraving, ringSize, getTotal, setStep } = useBuilderStore()

  const total = getTotal()
  const metalHex = metal?.hex ?? '#D4AF37'
  const caratSize = diamond?.carat ?? 1.0
  const metalConfig = getMetalConfig(metalHex)

  const ringConfig: RingConfig = {
    metalColor: metalConfig.color,
    metalRoughness: metalConfig.roughness,
    stoneColor: '#E8E8E8',
    stoneTransmission: true,
    caratSize,
    sideStones: 'none',
    bandScale: 1.0,
    autoRotate: true,
    rotationSpeed: 0.4,
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl md:text-3xl font-serif text-gold">Your Custom Creation</h2>
        <p className="text-white-off/50 text-sm">Review your design before securing your reservation</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: 3D Ring Preview */}
        <div className="space-y-4">
          <h3 className="text-gold text-xs uppercase tracking-[0.25em] font-sans">3D Preview</h3>
          <div className="bg-black rounded-2xl border border-gold/20 overflow-hidden" style={{ height: 380 }}>
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <Scene3D ringConfig={ringConfig} className="w-full h-full" />
            </Suspense>
          </div>

          {/* Design Summary */}
          <div className="bg-black-soft border border-gold/20 rounded-2xl p-5">
            <h3 className="text-gold text-xs uppercase tracking-[0.25em] font-sans mb-3">Design Summary</h3>

            {diamond && (
              <SummaryLine
                icon={<Diamond className="w-4 h-4" />}
                label="Diamond"
                value={`${diamond.carat}ct ${diamond.cut} · ${diamond.color}/${diamond.clarity}`}
                price={formatPrice(diamond.price)}
              />
            )}
            {setting && (
              <SummaryLine
                icon={<Settings2 className="w-4 h-4" />}
                label="Setting"
                value={setting.name}
                price={formatPrice(setting.basePrice)}
              />
            )}
            {metal && (
              <SummaryLine
                icon={<Gem className="w-4 h-4" />}
                label="Metal"
                value={`${metal.name} ${metal.karat}`}
                price={metal.priceModifier > 0 ? `+${formatPrice(metal.priceModifier)}` : 'Included'}
              />
            )}
            {engraving && (
              <SummaryLine
                icon={<PenLine className="w-4 h-4" />}
                label="Engraving"
                value={`"${engraving}"`}
              />
            )}
            {ringSize && (
              <SummaryLine
                icon={<Ruler className="w-4 h-4" />}
                label="Ring Size"
                value={`Size ${ringSize}`}
              />
            )}

            <div className="pt-3 mt-3 border-t border-gold/30 flex items-center justify-between">
              <span className="text-white-off font-semibold text-sm">Estimated Total</span>
              <span className="text-2xl font-serif text-gold">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Right: AR Try-On + Actions */}
        <div className="space-y-4">
          <h3 className="text-gold text-xs uppercase tracking-[0.25em] font-sans">AR Try-On</h3>

          <Suspense fallback={
            <div className="aspect-[4/3] bg-black rounded-xl border border-gold/10 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <ARTryOn metalColor={metalHex} caratSize={caratSize} />
          </Suspense>

          <div className="p-4 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">✋</span>
              <h4 className="text-gold font-semibold text-sm">See It On Your Hand</h4>
            </div>
            <p className="text-white-off/50 text-xs leading-relaxed">
              Enable camera above, then point your ring finger at the lens. AI hand tracking places your ring automatically.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => setStep(1)}
              className="flex items-center justify-center gap-2 py-3.5 border border-gold/40 text-gold font-medium text-sm tracking-wider uppercase rounded-lg hover:bg-gold/10 transition-all"
            >
              <Edit3 className="w-4 h-4" />
              Edit Design
            </button>
            <button
              onClick={() => setStep(6)}
              className="flex items-center justify-center gap-2 py-3.5 bg-gold text-black font-semibold text-sm tracking-widest uppercase rounded-lg hover:bg-gold-light transition-colors shadow-gold"
            >
              Get Quote &amp; Reserve
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step5Preview
