'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useBuilderStore } from '@/store/builderStore'
import { Diamond } from '@/types/diamond'
import { cn, formatPrice } from '@/lib/utils'

// ── Diamond Model Mappings (GLB files in /public/models/) ──────────────────────
export const DIAMOND_MODELS: Record<string, string> = {
  'Round Brilliant': '/models/SM_Round_Brilliant.glb',
  'Oval': '/models/SM_Oval_Brilliant.glb',
  'Princess': '/models/SM_Princess.glb',
  'Cushion': '/models/SM_Cushion_Four-Main.glb',
  'Emerald': '/models/Emerald.glb',
  'Marquise': '/models/SM_Marquise_Brilliant.glb',
  'Pear': '/models/SM_PearShaped.glb',
  'Radiant': '/models/SM_Radiant.glb',
  'Asscher': '/models/SM_Asscher.glb',
  'Heart': '/models/Heart.glb',
}

// Helper to get diamond model URL for a cut name
export function getDiamondModelUrl(cut: string | undefined): string | undefined {
  if (!cut) return undefined
  return DIAMOND_MODELS[cut]
}

// Cut icons as simple SVG components
const CutIcons: Record<string, JSX.Element> = {
  'Round Brilliant': (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="currentColor">
      <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="8" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  Oval: (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="currentColor">
      <ellipse cx="20" cy="20" rx="10" ry="16" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Princess: (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="currentColor">
      <rect x="8" y="8" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Cushion: (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="currentColor">
      <rect
        x="8"
        y="8"
        width="24"
        height="24"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  Emerald: (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="currentColor">
      <polygon
        points="12,6 28,6 34,12 34,28 28,34 12,34 6,28 6,12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  Marquise: (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="currentColor">
      <ellipse cx="20" cy="20" rx="8" ry="18" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Pear: (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="currentColor">
      <path
        d="M20 4 C10 14 8 24 20 36 C32 24 30 14 20 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  Radiant: (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="currentColor">
      <polygon
        points="12,4 28,4 36,12 36,28 28,36 12,36 4,28 4,12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  Asscher: (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="currentColor">
      <rect x="8" y="8" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect
        x="14"
        y="14"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  ),
  Heart: (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="currentColor">
      <path
        d="M20 35 C10 25 4 18 4 12 C4 6 10 4 15 4 C18 4 20 6 20 8 C20 6 22 4 25 4 C30 4 36 6 36 12 C36 18 30 25 20 35"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
}

const cuts = [
  'Round Brilliant',
  'Oval',
  'Princess',
  'Cushion',
  'Emerald',
  'Marquise',
  'Pear',
  'Radiant',
  'Asscher',
  'Heart',
]

// Sample diamond data
const makeDiamond = (d: {
  id: string
  cut: string
  carat: number
  color: string
  clarity: string
  certification: string
  price: number
}): Diamond => ({
  ...d,
  sku: d.id,
  certificateNumber: '',
  certificateUrl: null,
  images: [],
  videoUrl: null,
  inStock: true,
  featured: false,
  description: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

const sampleDiamondsRaw = [
  // Round Brilliant
  {
    id: 'rb-1',
    cut: 'Round Brilliant',
    carat: 1.01,
    color: 'D',
    clarity: 'VS1',
    certification: 'GIA',
    price: 5200,
  },
  {
    id: 'rb-2',
    cut: 'Round Brilliant',
    carat: 0.75,
    color: 'E',
    clarity: 'VVS2',
    certification: 'GIA',
    price: 3800,
  },
  {
    id: 'rb-3',
    cut: 'Round Brilliant',
    carat: 1.5,
    color: 'F',
    clarity: 'VS2',
    certification: 'IGI',
    price: 7200,
  },
  {
    id: 'rb-4',
    cut: 'Round Brilliant',
    carat: 0.52,
    color: 'G',
    clarity: 'SI1',
    certification: 'GIA',
    price: 1650,
  },
  // Oval
  {
    id: 'ov-1',
    cut: 'Oval',
    carat: 1.2,
    color: 'D',
    clarity: 'VVS1',
    certification: 'GIA',
    price: 6100,
  },
  {
    id: 'ov-2',
    cut: 'Oval',
    carat: 0.9,
    color: 'E',
    clarity: 'VS1',
    certification: 'GIA',
    price: 4200,
  },
  {
    id: 'ov-3',
    cut: 'Oval',
    carat: 1.75,
    color: 'G',
    clarity: 'VS2',
    certification: 'IGI',
    price: 7800,
  },
  // Princess
  {
    id: 'pr-1',
    cut: 'Princess',
    carat: 1.0,
    color: 'E',
    clarity: 'VS2',
    certification: 'GIA',
    price: 4500,
  },
  {
    id: 'pr-2',
    cut: 'Princess',
    carat: 0.8,
    color: 'F',
    clarity: 'VVS2',
    certification: 'GIA',
    price: 3600,
  },
  {
    id: 'pr-3',
    cut: 'Princess',
    carat: 1.3,
    color: 'G',
    clarity: 'SI1',
    certification: 'IGI',
    price: 5100,
  },
  // Cushion
  {
    id: 'cu-1',
    cut: 'Cushion',
    carat: 1.15,
    color: 'D',
    clarity: 'VS1',
    certification: 'GIA',
    price: 5400,
  },
  {
    id: 'cu-2',
    cut: 'Cushion',
    carat: 0.85,
    color: 'E',
    clarity: 'VS2',
    certification: 'GIA',
    price: 3900,
  },
  {
    id: 'cu-3',
    cut: 'Cushion',
    carat: 2.0,
    color: 'H',
    clarity: 'SI1',
    certification: 'IGI',
    price: 7500,
  },
  // Emerald
  {
    id: 'em-1',
    cut: 'Emerald',
    carat: 1.25,
    color: 'E',
    clarity: 'VVS2',
    certification: 'GIA',
    price: 5800,
  },
  {
    id: 'em-2',
    cut: 'Emerald',
    carat: 1.0,
    color: 'F',
    clarity: 'VS1',
    certification: 'GIA',
    price: 4700,
  },
  {
    id: 'em-3',
    cut: 'Emerald',
    carat: 1.8,
    color: 'G',
    clarity: 'VS2',
    certification: 'IGI',
    price: 7100,
  },
  // Marquise
  {
    id: 'mq-1',
    cut: 'Marquise',
    carat: 1.1,
    color: 'D',
    clarity: 'VS2',
    certification: 'GIA',
    price: 5100,
  },
  {
    id: 'mq-2',
    cut: 'Marquise',
    carat: 0.7,
    color: 'E',
    clarity: 'VVS1',
    certification: 'GIA',
    price: 3400,
  },
  {
    id: 'mq-3',
    cut: 'Marquise',
    carat: 1.45,
    color: 'F',
    clarity: 'SI1',
    certification: 'IGI',
    price: 5900,
  },
  // Pear
  {
    id: 'pe-1',
    cut: 'Pear',
    carat: 1.05,
    color: 'E',
    clarity: 'VS1',
    certification: 'GIA',
    price: 4900,
  },
  {
    id: 'pe-2',
    cut: 'Pear',
    carat: 0.8,
    color: 'F',
    clarity: 'VVS2',
    certification: 'GIA',
    price: 3700,
  },
  {
    id: 'pe-3',
    cut: 'Pear',
    carat: 1.6,
    color: 'G',
    clarity: 'VS2',
    certification: 'IGI',
    price: 6800,
  },
  // Radiant
  {
    id: 'ra-1',
    cut: 'Radiant',
    carat: 1.2,
    color: 'D',
    clarity: 'VVS2',
    certification: 'GIA',
    price: 5600,
  },
  {
    id: 'ra-2',
    cut: 'Radiant',
    carat: 0.95,
    color: 'E',
    clarity: 'VS1',
    certification: 'GIA',
    price: 4400,
  },
  {
    id: 'ra-3',
    cut: 'Radiant',
    carat: 1.7,
    color: 'F',
    clarity: 'SI1',
    certification: 'IGI',
    price: 6500,
  },
  // Asscher
  {
    id: 'as-1',
    cut: 'Asscher',
    carat: 1.0,
    color: 'D',
    clarity: 'VVS1',
    certification: 'GIA',
    price: 5300,
  },
  {
    id: 'as-2',
    cut: 'Asscher',
    carat: 0.85,
    color: 'E',
    clarity: 'VS2',
    certification: 'GIA',
    price: 4100,
  },
  {
    id: 'as-3',
    cut: 'Asscher',
    carat: 1.4,
    color: 'G',
    clarity: 'VS1',
    certification: 'IGI',
    price: 6200,
  },
  // Heart
  {
    id: 'he-1',
    cut: 'Heart',
    carat: 1.0,
    color: 'D',
    clarity: 'VS1',
    certification: 'GIA',
    price: 5000,
  },
  {
    id: 'he-2',
    cut: 'Heart',
    carat: 0.75,
    color: 'E',
    clarity: 'VVS2',
    certification: 'GIA',
    price: 3500,
  },
  {
    id: 'he-3',
    cut: 'Heart',
    carat: 1.5,
    color: 'F',
    clarity: 'VS2',
    certification: 'IGI',
    price: 6700,
  },
]

const sampleDiamonds: Diamond[] = sampleDiamondsRaw.map(makeDiamond)

// 4Cs educational tooltips
const tooltips = {
  cut: 'Cut determines how well light reflects through the diamond. Excellent cuts maximize brilliance.',
  carat:
    'Carat measures weight, not size. 1 carat = 0.2 grams. Larger carats are exponentially rarer.',
  color:
    'Color grades D-Z measure colorlessness. D is perfectly colorless; G-H are excellent values.',
  clarity:
    'Clarity measures inclusions. VVS = very very slight, VS = very slight, SI = slight inclusions.',
}

interface TooltipProps {
  label: string
  content: string
}

function Tooltip({ label, content }: TooltipProps) {
  return (
    <div className="group relative inline-flex items-center">
      <span className="text-gold cursor-help border-b border-dotted border-gold">{label}</span>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black-deep text-white-off text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg border border-gold/20">
        {content}
      </div>
    </div>
  )
}

export default function Step1Diamond() {
  const { diamond, setDiamond, completeStep } = useBuilderStore()
  const [selectedCut, setSelectedCut] = useState<string | null>(null)

  const filteredDiamonds: Diamond[] = selectedCut
    ? sampleDiamonds.filter((d) => d.cut === selectedCut)
    : []

  const handleSelectDiamond = (d: Diamond) => {
    setDiamond(d)
    completeStep(1)
  }

  const handleChangeDiamond = () => {
    setDiamond(null)
    setSelectedCut(null)
  }

  return (
    <div className="bg-black-soft p-6 rounded-xl">
      <h2 className="text-2xl font-serif text-gold mb-2">Step 1: Select Your Diamond</h2>
      <p className="text-white-off/70 mb-6">
        Choose a shape that speaks to you, then find your perfect stone.
      </p>

      {/* Educational hints */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm text-white-off/60">
        <span>Learn about the 4Cs:</span>
        <Tooltip label="Cut" content={tooltips.cut} />
        <Tooltip label="Carat" content={tooltips.carat} />
        <Tooltip label="Color" content={tooltips.color} />
        <Tooltip label="Clarity" content={tooltips.clarity} />
      </div>

      {/* Selected Diamond Display */}
      {diamond && (
        <div className="mb-8 p-4 bg-black-deep rounded-lg border-2 border-gold">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-gold">{CutIcons[diamond.cut]}</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-gold font-semibold text-lg">Selected ✓</span>
                </div>
                <p className="text-white-off">
                  {diamond.carat}ct {diamond.cut} · {diamond.color} Color · {diamond.clarity} ·{' '}
                  {diamond.certification}
                </p>
                <p className="text-gold text-xl font-semibold mt-1">{formatPrice(diamond.price)}</p>
              </div>
            </div>
            <button
              onClick={handleChangeDiamond}
              className="px-4 py-2 border border-gold/50 text-gold hover:bg-gold/10 rounded-lg transition-colors"
            >
              Change Diamond
            </button>
          </div>
        </div>
      )}

      {/* Cut Selection Grid */}
      {!diamond && (
        <>
          <h3 className="text-lg font-medium text-white-off mb-4">Quick Select by Shape</h3>
          <div className="grid grid-cols-5 gap-3 mb-8">
            {cuts.map((cut) => (
              <button
                key={cut}
                onClick={() => setSelectedCut(cut)}
                className={cn(
                  'flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200',
                  'bg-black-deep hover:border-gold hover:scale-105',
                  'border-2',
                  selectedCut === cut
                    ? 'border-gold text-gold'
                    : 'border-transparent text-white-off/70 hover:text-gold'
                )}
              >
                {CutIcons[cut]}
                <span className="text-xs mt-2 text-center leading-tight">{cut}</span>
              </button>
            ))}
          </div>

          {/* Filtered Diamonds */}
          {selectedCut && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white-off mb-4">
                {selectedCut} Diamonds ({filteredDiamonds.length} available)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDiamonds.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelectDiamond(d)}
                    className={cn(
                      'p-4 rounded-lg text-left transition-all duration-200',
                      'bg-black-deep hover:border-gold border-2',
                      (diamond as import('@/types/diamond').Diamond | null)?.id === d.id
                        ? 'border-gold'
                        : 'border-transparent'
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-gold">{CutIcons[d.cut]}</div>
                      <span className="text-xs text-white-off/50 bg-black px-2 py-1 rounded">
                        {d.certification}
                      </span>
                    </div>
                    <p className="text-white-off font-medium">{d.carat} Carat</p>
                    <p className="text-white-off/70 text-sm">
                      {d.color} Color · {d.clarity} Clarity
                    </p>
                    <p className="text-gold text-lg font-semibold mt-2">{formatPrice(d.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!selectedCut && (
            <p className="text-white-off/50 text-center py-8">
              Select a diamond shape above to see available stones
            </p>
          )}
        </>
      )}

      {/* Browse All Link */}
      <div className="mt-6 pt-6 border-t border-white-off/10 text-center">
        <Link
          href="/diamonds"
          className="text-gold hover:text-gold/80 underline underline-offset-4 transition-colors"
        >
          Browse All Diamonds →
        </Link>
      </div>
    </div>
  )
}
