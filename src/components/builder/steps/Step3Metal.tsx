'use client'

import { useBuilderStore, BuilderMetal } from '@/store/builderStore'
import { cn, formatPrice } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface MetalData {
  id: string
  name: string
  hex: string
  modifier: number
  description: string
  benefits: string[]
  disabled?: boolean
}

const BASE_GOLD_PRICE = 2000 // Reference price when original modifiers were set

const initialMetalsData: MetalData[] = [
  {
    id: '14k-yellow',
    name: '14K Yellow Gold',
    hex: '#D4AF37',
    modifier: 0,
    description: 'Classic warmth that never goes out of style. Our most popular choice.',
    benefits: [
      'Most durable gold alloy for everyday wear',
      'Rich, warm traditional gold color',
      'Excellent value for quality',
      'Easy to resize and repair',
    ],
  },
  {
    id: '18k-yellow',
    name: '18K Yellow Gold',
    hex: '#CFB53B',
    modifier: 200,
    description: 'Richer, deeper gold color. A touch more luxurious.',
    benefits: [
      '75% pure gold content',
      'Deeper, more saturated color',
      'Ideal for sensitive skin',
      'Prestigious choice for special occasions',
    ],
  },
  {
    id: '14k-white',
    name: '14K White Gold',
    hex: '#E8E8E8',
    modifier: 0,
    description: 'Modern and versatile. Complements every diamond.',
    benefits: [
      'Contemporary, sophisticated look',
      'Makes diamonds appear whiter',
      'Rhodium-plated for extra shine',
      'Perfect for modern engagement rings',
    ],
  },
  {
    id: '18k-white',
    name: '18K White Gold',
    hex: '#F0F0F0',
    modifier: 200,
    description: 'Brighter white with a premium feel.',
    benefits: [
      'Higher gold content, premium quality',
      'Naturally whiter than 14K',
      'Luxurious weight and feel',
      'Less rhodium plating needed',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    hex: '#E5E4E2',
    modifier: 400,
    description: 'The ultimate in luxury and durability.',
    benefits: [
      'Naturally white, never needs plating',
      'Hypoallergenic—perfect for sensitive skin',
      'Most durable precious metal',
      'Develops beautiful patina over time',
    ],
    disabled: true,
  },
]

export default function Step3Metal() {
  const { metal, setMetal, completeStep } = useBuilderStore()
  const [metals, setMetals] = useState<MetalData[]>(initialMetalsData)
  const [currentGoldPrice, setCurrentGoldPrice] = useState<number | null>(null)

  useEffect(() => {
    async function fetchGoldPrice() {
      try {
        const res = await fetch('/api/gold-price')
        if (!res.ok) return
        const data = await res.json()
        if (data.price) {
          setCurrentGoldPrice(data.price)
          updatePrices(data.price)
        }
      } catch (error) {
        console.error('Failed to fetch gold price', error)
      }
    }

    fetchGoldPrice()
  }, [])

  const updatePrices = (price: number) => {
    const factor = price / BASE_GOLD_PRICE
    
    setMetals(prev => prev.map(m => {
      if (m.modifier === 0) return m
      
      // Calculate new modifier based on gold price factor
      // Round to nearest 5 for cleaner pricing
      const newModifier = Math.round((m.modifier * factor) / 5) * 5
      return { ...m, modifier: newModifier }
    }))
  }

  const handleSelectMetal = (m: MetalData) => {
    if (m.disabled) return

    const builderMetal: BuilderMetal = {
      id: m.id,
      name: m.name,
      karat: m.name.includes('14K') ? '14K' : m.name.includes('18K') ? '18K' : '',
      color: m.name.includes('Yellow') ? 'yellow' : m.name.includes('White') ? 'white' : 'silver',
      hex: m.hex,
      priceModifier: m.modifier,
      description: m.description,
    }
    setMetal(builderMetal)
    completeStep(3)
  }

  const isSelected = (id: string) => metal?.id === id

  return (
    <div className="bg-black-soft p-6 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-serif text-gold">Step 3: Select Your Metal</h2>
        {currentGoldPrice && (
          <span className="text-xs text-white-off/30 font-mono">
            Live Gold: ${currentGoldPrice.toLocaleString()}
          </span>
        )}
      </div>
      <p className="text-white-off/70 mb-6">
        The metal frames your diamond and defines the ring's character. Each has its own beauty.
      </p>

      {/* Selected Metal Display */}
      {metal && (
        <div className="mb-8 p-4 bg-black-deep rounded-lg border-2 border-gold">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full border-2 border-gold"
                style={{ backgroundColor: metals.find((m) => m.id === metal.id)?.hex }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-gold font-semibold text-lg">Selected ✓</span>
                </div>
                <p className="text-white-off text-xl">{metal.name}</p>
                {metal.priceModifier > 0 && (
                  <p className="text-gold text-sm">+{formatPrice(metal.priceModifier)}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setMetal(null)}
              className="px-4 py-2 border border-gold/50 text-gold hover:bg-gold/10 rounded-lg transition-colors"
            >
              Change Metal
            </button>
          </div>
        </div>
      )}

      {/* Metals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metals.map((m) => (
          <button
            key={m.id}
            onClick={() => handleSelectMetal(m)}
            disabled={m.disabled}
            className={cn(
              'relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 text-left',
              'border-2',
              m.disabled
                ? 'opacity-60 cursor-not-allowed border-white-off/20'
                : 'hover:scale-[1.02] hover:border-gold',
              isSelected(m.id) ? 'border-gold' : 'border-transparent'
            )}
          >
            {/* Color Swatch */}
            <div className="h-32 relative" style={{ backgroundColor: m.hex }}>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20" />

              {/* Coming Soon Badge */}
              {m.disabled && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="bg-white-off/20 text-white-off px-4 py-2 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
              )}

              {/* Selected checkmark */}
              {isSelected(m.id) && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-gold rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-black text-lg">✓</span>
                </div>
              )}

              {/* Price modifier badge */}
              {m.modifier > 0 && !m.disabled && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-gold px-3 py-1 rounded-full text-sm font-semibold">
                  +{formatPrice(m.modifier)}
                </div>
              )}
              {m.modifier === 0 && !m.disabled && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white-off px-3 py-1 rounded-full text-sm">
                  Base Price
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 bg-black-deep flex-1">
              <h3 className="text-lg font-medium text-white-off mb-2">{m.name}</h3>
              <p className="text-white-off/60 text-sm mb-4">{m.description}</p>

              {/* Benefits */}
              <ul className="space-y-1">
                {m.benefits.map((benefit, i) => (
                  <li key={i} className="text-white-off/50 text-xs flex items-start gap-2">
                    <span className="text-gold mt-0.5">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>

      {/* Info Note */}
      <div className="mt-6 p-4 bg-black-deep rounded-lg border border-gold/20">
        <p className="text-white-off/60 text-sm">
          <span className="text-gold font-medium">Note:</span> All our metals are ethically sourced
          and come with a lifetime warranty. White gold rings receive complimentary rhodium
          replating for life.
        </p>
      </div>
    </div>
  )
}
