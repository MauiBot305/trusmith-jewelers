'use client'

import { useState } from 'react'
import { CheckCircle2, ChevronRight, ChevronLeft, X, Info } from 'lucide-react'
import { useBuilderStore, type BuilderSetting } from '@/store/builderStore'
import { RING_SETTINGS, type SettingStyle } from '@/lib/builder/settings-data'
import { cn } from '@/lib/utils'

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

// ── Setting Card ───────────────────────────────────────────────────────────────
interface SettingCardProps {
  setting: SettingStyle
  isSelected: boolean
  onSelect: (setting: SettingStyle) => void
  onInfoClick: (setting: SettingStyle) => void
}

function SettingCard({ setting, isSelected, onSelect, onInfoClick }: SettingCardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-xl border transition-all duration-300 cursor-pointer glass-card overflow-hidden',
        isSelected ? 'border-gold shadow-gold' : 'border-white/10 hover:border-gold/40'
      )}
      onClick={() => onSelect(setting)}
    >
      {/* Popular badge */}
      {setting.popular && (
        <div className="absolute top-2 left-2 z-10">
          <span className="text-xs bg-gold text-black px-2 py-0.5 rounded-full font-semibold">
            Popular
          </span>
        </div>
      )}

      {/* Selected check */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-10">
          <CheckCircle2 className="w-5 h-5 text-gold fill-gold" />
        </div>
      )}

      {/* Image placeholder */}
      <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <span className="text-4xl block mb-1">{setting.icon}</span>
        </div>
        {/* Hover overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200',
            isSelected && 'opacity-0'
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              onInfoClick(setting)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs text-white hover:bg-white/20 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            Learn More
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-1">
          <h3
            className={cn(
              'text-sm font-semibold transition-colors',
              isSelected ? 'text-gold' : 'text-white'
            )}
          >
            {setting.name}
          </h3>
          <span className="text-xs text-gold font-medium">{formatPrice(setting.basePrice)}</span>
        </div>
        <p className="text-xs text-white/50 leading-tight">{setting.tagline}</p>
      </div>
    </div>
  )
}

// ── Setting Modal ──────────────────────────────────────────────────────────────
interface SettingModalProps {
  setting: SettingStyle
  isSelected: boolean
  onSelect: (setting: SettingStyle) => void
  onClose: () => void
}

function SettingModal({ setting, isSelected, onSelect, onClose }: SettingModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-black-deep border border-white/15 rounded-2xl overflow-hidden shadow-luxury animate-scale-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Image */}
        <div className="aspect-video bg-gradient-to-br from-white/10 to-black/20 flex items-center justify-center relative overflow-hidden">
          <span className="text-8xl opacity-70">{setting.icon}</span>
          <div className="absolute bottom-4 left-4">
            {setting.popular && (
              <span className="text-xs bg-gold text-black px-3 py-1 rounded-full font-semibold">
                Most Popular
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-serif text-white">{setting.name}</h2>
              <p className="text-sm text-gold italic">{setting.tagline}</p>
            </div>
            <span className="text-xl font-bold text-gold">{formatPrice(setting.basePrice)}</span>
          </div>

          {/* Story */}
          <div className="mb-4 p-3 rounded-lg bg-gold/5 border border-gold/10">
            <p className="text-sm text-white/80 italic leading-relaxed">
              &ldquo;{setting.story}&rdquo;
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-white/60 leading-relaxed mb-4">{setting.description}</p>

          {/* Compatible cuts */}
          <div className="mb-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Compatible Cuts</p>
            {setting.compatibleCuts[0] === 'all' ? (
              <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded border border-gold/20">
                All Diamond Cuts
              </span>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {setting.compatibleCuts.map((cut) => (
                  <span
                    key={cut}
                    className="text-xs bg-white/5 text-white/60 px-2 py-0.5 rounded border border-white/10"
                  >
                    {cut}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              onSelect(setting)
              onClose()
            }}
            className={cn(
              'w-full py-3 rounded-lg font-semibold transition-all duration-200',
              isSelected
                ? 'bg-green-600/20 border border-green-500/50 text-green-400'
                : 'bg-gold text-black hover:bg-gold-light shadow-gold'
            )}
          >
            {isSelected ? (
              <>
                <CheckCircle2 className="w-4 h-4 inline mr-2" />
                Setting Selected
              </>
            ) : (
              'Select This Setting'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Setting Step ──────────────────────────────────────────────────────────
export function SettingStep() {
  const { setting: selectedSetting, setSetting, setStep } = useBuilderStore()
  const [modalSetting, setModalSetting] = useState<SettingStyle | null>(null)

  const handleSelect = (s: SettingStyle) => {
    const builderSetting: BuilderSetting = {
      id: s.id,
      name: s.name,
      style: s.style,
      basePrice: s.basePrice,
      priceModifier: s.priceModifier,
      image: s.image,
      tagline: s.tagline,
      description: s.description,
      story: s.story,
    }
    setSetting(builderSetting)
  }

  const handleContinue = () => {
    if (selectedSetting) setStep(3)
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif text-white mb-2">
          Choose Your <span className="text-gold-gradient">Setting</span>
        </h1>
        <p className="text-white/60 text-sm">
          The setting is the soul of the ring. Choose the style that speaks to your story.
        </p>
      </div>

      {/* Settings grid (2×5) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {RING_SETTINGS.map((setting) => (
          <SettingCard
            key={setting.id}
            setting={setting}
            isSelected={selectedSetting?.id === setting.id}
            onSelect={handleSelect}
            onInfoClick={setModalSetting}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep(1)}
          className="flex items-center gap-2 px-4 py-2.5 border border-white/20 text-white/70 rounded-lg hover:border-gold/50 hover:text-gold transition-all duration-200 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Diamond
        </button>

        {selectedSetting && (
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-white/40">Selected Setting</p>
              <p className="text-sm font-semibold text-gold">{selectedSetting.name}</p>
            </div>
            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-5 py-2.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-200 hover:shadow-gold"
            >
              Continue to Metal
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalSetting && (
        <SettingModal
          setting={modalSetting}
          isSelected={selectedSetting?.id === modalSetting.id}
          onSelect={handleSelect}
          onClose={() => setModalSetting(null)}
        />
      )}
    </div>
  )
}
