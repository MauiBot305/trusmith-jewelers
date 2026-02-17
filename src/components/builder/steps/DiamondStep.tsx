'use client'

import { useState } from 'react'
import { Search, Info, CheckCircle2, ChevronRight } from 'lucide-react'
import { useBuilderStore } from '@/store/builderStore'
import { DIAMOND_CUTS } from '@/types/diamond'
import type { Diamond } from '@/types/diamond'
import { cn } from '@/lib/utils'

// ── Mock diamonds for demonstration ───────────────────────────────────────────
function generateMockDiamonds(cut: string, count = 6): Diamond[] {
  const clarities = ['VS1', 'VS2', 'VVS1', 'VVS2', 'SI1', 'FL']
  const colors = ['D', 'E', 'F', 'G', 'H']
  const certs = ['IGI', 'GIA']
  return Array.from({ length: count }, (_, i) => ({
    id: `${cut.toLowerCase().replace(' ', '-')}-${i + 1}`,
    sku: `DIA-${cut.substring(0, 3).toUpperCase()}-${1000 + i}`,
    cut,
    carat: parseFloat((0.7 + i * 0.15).toFixed(2)),
    color: colors[i % colors.length],
    clarity: clarities[i % clarities.length],
    certification: certs[i % 2],
    certificateNumber: `IGI-${100000 + i}`,
    price: Math.round((1500 + i * 800 + (cut === 'Round Brilliant' ? 500 : 0)) / 50) * 50,
    images: ['/images/diamonds/placeholder.jpg'],
    videoUrl: null,
    inStock: true,
    featured: i < 2,
    description: `${cut} cut diamond, ${colors[i % colors.length]} color, ${clarities[i % clarities.length]} clarity`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

// ── Cut icon map ───────────────────────────────────────────────────────────────
const CUT_ICONS: Record<string, string> = {
  'Round Brilliant': '⬤',
  Oval: '⬭',
  Princess: '⬛',
  Cushion: '⬜',
  Emerald: '▬',
  Marquise: '◇',
  Pear: '🍐',
  Radiant: '◆',
  Asscher: '⎕',
  Heart: '♥',
}

// ── 4Cs tooltip data ───────────────────────────────────────────────────────────
const TOOLTIP_4CS = {
  cut: 'Cut determines how well the diamond reflects light. Excellent cut = maximum brilliance.',
  color: 'D is colorless (best). Scale goes D → K. D-F = colorless, G-J = near colorless.',
  clarity:
    'FL = Flawless. VS1/VS2 = Very Slightly Included (no visible inclusions). SI = Slightly Included.',
  carat: 'Carat measures weight, not size. 1 carat = 0.2 grams.',
}

export function DiamondStep() {
  const { diamond: selectedDiamond, setDiamond, setStep } = useBuilderStore()
  const [selectedCut, setSelectedCut] = useState<string | null>(selectedDiamond?.cut || null)
  const [hoveredTip, setHoveredTip] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'cut-select' | 'browse'>('cut-select')

  const diamonds = selectedCut ? generateMockDiamonds(selectedCut, 6) : []

  const handleSelectDiamond = (d: Diamond) => {
    setDiamond(d)
  }

  const handleContinue = () => {
    if (selectedDiamond) setStep(2)
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif text-white mb-2">
          Choose Your <span className="text-gold-gradient">Diamond</span>
        </h1>
        <p className="text-white/60 text-sm">
          Select by cut to find your perfect stone, or browse the full catalog
        </p>

        {/* 4Cs tooltip row */}
        <div className="flex items-center justify-center gap-4 mt-4">
          {Object.entries(TOOLTIP_4CS).map(([key, tip]) => (
            <div key={key} className="relative">
              <button
                onMouseEnter={() => setHoveredTip(key)}
                onMouseLeave={() => setHoveredTip(null)}
                className="flex items-center gap-1 text-xs text-white/40 hover:text-gold transition-colors"
              >
                <Info className="w-3 h-3" />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
              {hoveredTip === key && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-black-deep border border-gold/30 rounded-lg p-3 z-10 shadow-luxury">
                  <p className="text-xs text-white/80">{tip}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setViewMode('cut-select')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            viewMode === 'cut-select'
              ? 'bg-gold text-black'
              : 'border border-white/20 text-white/60 hover:border-gold/50'
          )}
        >
          Quick Select by Cut
        </button>
        <button
          onClick={() => setViewMode('browse')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            viewMode === 'browse'
              ? 'bg-gold text-black'
              : 'border border-white/20 text-white/60 hover:border-gold/50'
          )}
        >
          <Search className="w-3.5 h-3.5 inline mr-1.5" />
          Browse Full Catalog
        </button>
      </div>

      {viewMode === 'cut-select' ? (
        <>
          {/* Cut grid */}
          <div className="grid grid-cols-5 gap-3 mb-8">
            {DIAMOND_CUTS.map((cut) => (
              <button
                key={cut}
                onClick={() => setSelectedCut(selectedCut === cut ? null : cut)}
                className={cn(
                  'group flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200',
                  selectedCut === cut
                    ? 'border-gold bg-gold/10 shadow-gold'
                    : 'border-white/10 bg-black-deep hover:border-gold/50 hover:bg-gold/5'
                )}
              >
                <span
                  className={cn(
                    'text-2xl transition-transform duration-200 group-hover:scale-110',
                    selectedCut === cut && 'scale-110'
                  )}
                >
                  {CUT_ICONS[cut] || '💎'}
                </span>
                <span
                  className={cn(
                    'text-xs font-medium text-center leading-tight',
                    selectedCut === cut ? 'text-gold' : 'text-white/70'
                  )}
                >
                  {cut}
                </span>
              </button>
            ))}
          </div>

          {/* Filtered diamonds */}
          {selectedCut && (
            <div className="animate-fade-in-up">
              <h2 className="text-lg font-serif text-white mb-4">
                {selectedCut} Diamonds
                <span className="text-sm text-white/40 font-sans ml-2">
                  ({diamonds.length} available)
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {diamonds.map((d) => {
                  const isSelected = selectedDiamond?.id === d.id
                  return (
                    <button
                      key={d.id}
                      onClick={() => handleSelectDiamond(d)}
                      className={cn(
                        'text-left p-4 rounded-xl border transition-all duration-300 glass-card',
                        isSelected
                          ? 'border-gold shadow-gold'
                          : 'border-white/10 hover:border-gold/40'
                      )}
                    >
                      {/* Diamond image placeholder */}
                      <div className="w-full aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                        <span className="text-5xl opacity-60">{CUT_ICONS[d.cut]}</span>
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle2 className="w-5 h-5 text-gold fill-gold" />
                          </div>
                        )}
                        {d.featured && (
                          <div className="absolute top-2 left-2">
                            <span className="text-xs bg-gold text-black px-2 py-0.5 rounded-full font-semibold">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Diamond details */}
                      <div>
                        <p className="text-sm font-semibold text-white mb-1">
                          {d.carat}ct {d.cut}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/70">
                            {d.color}
                          </span>
                          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/70">
                            {d.clarity}
                          </span>
                          <span className="text-xs bg-gold/10 px-2 py-0.5 rounded text-gold border border-gold/20">
                            {d.certification}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-gold">{formatPrice(d.price)}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* No cut selected state */}
          {!selectedCut && (
            <div className="text-center py-12 text-white/30">
              <span className="text-5xl mb-4 block">💎</span>
              <p className="text-sm">Select a diamond cut to see available stones</p>
            </div>
          )}
        </>
      ) : (
        /* Browse mode */
        <div className="text-center py-16">
          <div className="glass-card rounded-2xl p-8 max-w-md mx-auto border border-white/10">
            <Search className="w-12 h-12 text-gold mx-auto mb-4 opacity-60" />
            <h3 className="text-lg font-serif text-white mb-2">Browse Full Diamond Catalog</h3>
            <p className="text-sm text-white/50 mb-6">
              Filter by 4Cs, price range, certification and more. Add any diamond to your builder.
            </p>
            <a
              href="/diamonds?mode=builder"
              className="inline-block px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors"
            >
              Open Diamond Catalog
            </a>
          </div>
        </div>
      )}

      {/* Selected diamond summary + continue */}
      {selectedDiamond && (
        <div className="mt-8 p-4 rounded-xl border border-gold/30 bg-gold/5 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">
                  {selectedDiamond.carat}ct {selectedDiamond.cut} Selected
                </p>
                <p className="text-xs text-white/50">
                  {selectedDiamond.color} color · {selectedDiamond.clarity} clarity ·{' '}
                  {selectedDiamond.certification}
                </p>
              </div>
            </div>
            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-5 py-2.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-200 hover:shadow-gold"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
