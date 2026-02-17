'use client'

import { useState } from 'react'
import { useBuilderStore, BuilderSetting } from '@/store/builderStore'
import { cn, formatPrice } from '@/lib/utils'

interface SettingData {
  id: string
  name: string
  price: number
  teaser: string
  story: string
  image: string
}

const settingsData: SettingData[] = [
  {
    id: 'solitaire',
    name: 'Solitaire',
    price: 400,
    teaser: 'Timeless elegance',
    image: '/images/rings/solitaire-1.jpg',
    story:
      'Timeless elegance where your diamond takes center stage. The purest expression of love. A solitaire setting strips away all distraction, letting the beauty of your chosen diamond speak for itself. This classic design has endured for generations because it celebrates what matters most—the brilliant symbol of your commitment.',
  },
  {
    id: 'halo',
    name: 'Halo',
    price: 600,
    teaser: 'Amplified brilliance',
    image: '/images/rings/halo-1.jpg',
    story:
      'A circle of smaller diamonds amplifies your center stone, making it appear larger and more brilliant. The halo setting creates a dazzling frame that catches light from every angle. Perfect for those who want maximum sparkle and presence. Your diamond will appear up to half a carat larger while adding incredible fire.',
  },
  {
    id: 'three-stone',
    name: 'Three-Stone',
    price: 700,
    teaser: 'Past, present, future',
    image: '/images/rings/three-stone-1.jpg',
    story:
      "Representing past, present, and future. A meaningful choice for your journey together. The three stones tell your love story—where you've been, where you are, and the beautiful future ahead. Each side stone complements the center diamond while adding depth and symbolism to this romantic design.",
  },
  {
    id: 'pave',
    name: 'Pavé',
    price: 550,
    teaser: 'River of sparkle',
    image: '/images/rings/pave-1.jpg',
    story:
      'Delicate diamonds set along the band create a river of sparkle. Maximum brilliance. The French word "pavé" means paved, and that\'s exactly what this setting delivers—a continuous path of light that leads to your center stone. Tiny diamonds are set so closely together that the metal virtually disappears.',
  },
  {
    id: 'channel-set',
    name: 'Channel Set',
    price: 500,
    teaser: 'Sleek and protected',
    image: '/images/settings/setting-1.jpg',
    story:
      "Diamonds nestled securely within the band. Sleek, modern, protected. The channel setting suspends diamonds between two walls of precious metal, creating a smooth surface that's both elegant and practical. Perfect for active lifestyles—your diamonds are shielded while still radiating beauty.",
  },
  {
    id: 'vintage',
    name: 'Vintage',
    price: 650,
    teaser: 'Art Deco romance',
    image: '/images/rings/vintage-1.jpg',
    story:
      'Art Deco-inspired details for the romantic soul. Timeless beauty with character. Milgrain edges, intricate filigree, and delicate scrollwork transport you to an era of elegance. This setting whispers of gatsby parties and timeless romance, perfect for those who appreciate the artistry of the past.',
  },
  {
    id: 'cathedral',
    name: 'Cathedral',
    price: 450,
    teaser: 'Regal and commanding',
    image: '/images/settings/setting-2.jpg',
    story:
      "Arched sides elevate your diamond like a work of art. Regal and commanding. Inspired by the sweeping arches of grand cathedrals, this setting lifts your diamond high, creating a dramatic profile. The graceful curves add sophistication while protecting the stone's edges.",
  },
  {
    id: 'bezel',
    name: 'Bezel',
    price: 500,
    teaser: 'Contemporary and distinctive',
    image: '/images/settings/setting-3.jpg',
    story:
      'A modern metal rim encircles your diamond. Contemporary, protective, distinctive. The bezel setting wraps your diamond in a sleek metal embrace, offering maximum protection while creating a bold, modern look. Perfect for those who appreciate clean lines and contemporary design.',
  },
  {
    id: 'split-shank',
    name: 'Split Shank',
    price: 550,
    teaser: 'Eye-catching elegance',
    image: '/images/rings/solitaire-2.jpg',
    story:
      'The band gracefully divides as it reaches the diamond. Eye-catching elegance. As the band approaches your center stone, it splits into two delicate strands, creating a dramatic frame. This architectural design adds visual interest and makes your diamond appear larger and more prominent.',
  },
  {
    id: 'tension',
    name: 'Tension',
    price: 600,
    teaser: 'Strikingly modern',
    image: '/images/diamonds/diamond-ring.jpg',
    story:
      'Your diamond appears to float, held by the pressure of the band. Strikingly modern. The tension setting is engineering meets art—your diamond is suspended by the precise pressure of the metal band, with light able to enter from all sides. A conversation starter that showcases cutting-edge craftsmanship.',
  },
]

export default function Step2Setting() {
  const { setting, setSetting, completeStep } = useBuilderStore()
  const [modalSetting, setModalSetting] = useState<SettingData | null>(null)

  const handleSelectSetting = (s: SettingData) => {
    const builderSetting: BuilderSetting = {
      id: s.id,
      name: s.name,
      basePrice: s.price,
      priceModifier: 0,
      image: s.image,
      tagline: s.teaser,
      description: s.story,
      story: s.story,
      style: s.id,
    }
    setSetting(builderSetting)
    completeStep(2)
    setModalSetting(null)
  }

  const isSelected = (id: string) => setting?.id === id

  return (
    <div className="bg-black-soft p-6 rounded-xl">
      <h2 className="text-2xl font-serif text-gold mb-2">Step 2: Choose Your Setting</h2>
      <p className="text-white-off/70 mb-6">
        The setting is the stage for your diamond. Each style tells a different story.
      </p>

      {/* Selected Setting Display */}
      {setting && (
        <div className="mb-8 p-4 bg-black-deep rounded-lg border-2 border-gold">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gold font-semibold text-lg">Selected ✓</span>
              </div>
              <p className="text-white-off text-xl">{setting.name}</p>
              <p className="text-gold text-lg font-semibold mt-1">
                {formatPrice(setting.basePrice)}
              </p>
            </div>
            <button
              onClick={() => setSetting(null)}
              className="px-4 py-2 border border-gold/50 text-gold hover:bg-gold/10 rounded-lg transition-colors"
            >
              Change Setting
            </button>
          </div>
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {settingsData.map((s) => (
          <button
            key={s.id}
            onClick={() => setModalSetting(s)}
            className={cn(
              'group relative flex flex-col rounded-lg overflow-hidden transition-all duration-300',
              'border-2 hover:scale-105 hover:border-gold',
              isSelected(s.id) ? 'border-gold' : 'border-transparent'
            )}
          >
            {/* Setting Image */}
            <div className="aspect-square bg-black-deep relative overflow-hidden">
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* Hover teaser */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
                <p className="text-gold text-sm text-center px-2">{s.teaser}</p>
              </div>

              {/* Selected checkmark */}
              {isSelected(s.id) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-black text-sm">✓</span>
                </div>
              )}
            </div>

            {/* Name and Price */}
            <div className="p-3 bg-black-deep">
              <p className="text-white-off font-medium text-sm">{s.name}</p>
              <p className="text-gold text-sm">{formatPrice(s.price)}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {modalSetting && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setModalSetting(null)}
        >
          <div
            className="bg-black-deep border border-gold/30 rounded-xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-serif text-gold">{modalSetting.name}</h3>
                <p className="text-gold text-xl font-semibold">{formatPrice(modalSetting.price)}</p>
              </div>
              <button
                onClick={() => setModalSetting(null)}
                className="text-white-off/50 hover:text-white-off text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Setting Image */}
            <div className="aspect-video rounded-lg mb-4 overflow-hidden">
              <img
                src={modalSetting.image}
                alt={modalSetting.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Story */}
            <p className="text-white-off/80 leading-relaxed mb-6">{modalSetting.story}</p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => handleSelectSetting(modalSetting)}
                className={cn(
                  'flex-1 py-3 rounded-lg font-semibold transition-all',
                  isSelected(modalSetting.id)
                    ? 'bg-gold/20 text-gold border-2 border-gold'
                    : 'bg-gold text-black hover:bg-gold/90'
                )}
              >
                {isSelected(modalSetting.id) ? 'Selected ✓' : 'Select This Setting'}
              </button>
              <button
                onClick={() => setModalSetting(null)}
                className="px-6 py-3 border border-white-off/30 text-white-off hover:border-white-off rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
