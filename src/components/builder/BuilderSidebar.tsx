'use client'

import { useState } from 'react'
import {
  ChevronUp,
  ChevronDown,
  Diamond,
  Gem,
  Layers,
  Save,
  FileText,
  Sparkles,
} from 'lucide-react'
import { useBuilderStore, DEPOSIT_AMOUNT, DEPOSIT_PERCENTAGE } from '@/store/builderStore'
import { cn } from '@/lib/utils'

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

interface SidebarSectionProps {
  icon: React.ReactNode
  label: string
  value?: string
  subValue?: string
  price?: number
  placeholder?: string
  isEmpty?: boolean
}

function SidebarSection({
  icon,
  label,
  value,
  subValue,
  price,
  placeholder,
  isEmpty,
}: SidebarSectionProps) {
  return (
    <div
      className={cn('flex items-start gap-3 py-3 border-b border-white/5', isEmpty && 'opacity-40')}
    >
      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-gold w-4 h-4">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">{label}</p>
        {isEmpty ? (
          <p className="text-sm text-white/30 italic">{placeholder}</p>
        ) : (
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-white leading-tight">{value}</p>
              {subValue && <p className="text-xs text-white/50 mt-0.5">{subValue}</p>}
            </div>
            {price !== undefined && (
              <span className="text-sm font-semibold text-gold whitespace-nowrap">
                {price > 0 ? formatPrice(price) : 'Included'}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function BuilderSidebar() {
  const { diamond, setting, metal, engraving, ringSize, setStep, getTotal } = useBuilderStore()
  const [isExpanded, setIsExpanded] = useState(false)
  const [saved, setSaved] = useState(false)

  const total = getTotal()
  const depositAmount = Math.max(DEPOSIT_AMOUNT, total * DEPOSIT_PERCENTAGE)

  const handleSaveDesign = () => {
    const design = {
      diamond,
      setting,
      metal,
      engraving,
      ringSize,
      total,
      savedAt: new Date().toISOString(),
    }
    try {
      localStorage.setItem('trusmith-saved-design', JSON.stringify(design))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      // silently fail
    }
  }

  const hasAnySelection = diamond || setting || metal

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-80 flex-shrink-0 bg-black-deep border-l border-white/10 h-[calc(100vh-8rem)] sticky top-32 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-gold" />
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gold">
              Your Design
            </h2>
          </div>
          <p className="text-xs text-white/40">Building your dream ring</p>
        </div>

        {/* Selections */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <SidebarSection
            icon={<Diamond className="w-4 h-4" />}
            label="Diamond"
            value={diamond ? `${diamond.carat}ct ${diamond.cut}` : undefined}
            subValue={
              diamond
                ? `${diamond.color} | ${diamond.clarity} | ${diamond.certification}`
                : undefined
            }
            price={diamond?.price}
            placeholder="Not selected"
            isEmpty={!diamond}
          />

          <SidebarSection
            icon={<Gem className="w-4 h-4" />}
            label="Setting"
            value={setting?.name}
            subValue={setting?.tagline}
            price={setting?.basePrice}
            placeholder="Not selected"
            isEmpty={!setting}
          />

          <SidebarSection
            icon={<Layers className="w-4 h-4" />}
            label="Metal"
            value={metal?.name}
            subValue={metal?.description?.substring(0, 45) + '...'}
            price={metal?.priceModifier ?? 0}
            placeholder="Not selected"
            isEmpty={!metal}
          />

          {engraving && (
            <div className="flex items-start gap-3 py-3 border-b border-white/5">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-gold text-xs">✍️</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Engraving</p>
                <p className="text-sm font-medium text-white italic">&ldquo;{engraving}&rdquo;</p>
              </div>
            </div>
          )}

          {ringSize && (
            <div className="flex items-start gap-3 py-3 border-b border-white/5">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-gold text-xs">💍</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Ring Size</p>
                <p className="text-sm font-medium text-white">Size {ringSize}</p>
              </div>
            </div>
          )}
        </div>

        {/* Total + CTAs */}
        <div className="px-6 py-5 border-t border-white/10 bg-black-soft/50">
          {/* Total */}
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-sm text-white/60">Estimated Total</span>
            <span className="text-2xl font-bold text-gold">
              {total > 0 ? formatPrice(total) : '—'}
            </span>
          </div>
          {total > 0 && (
            <p className="text-xs text-white/40 mb-4">
              Deposit: {formatPrice(depositAmount)} to begin
            </p>
          )}

          {/* CTAs */}
          <div className="space-y-2">
            <button
              onClick={() => setStep(6)}
              disabled={!hasAnySelection}
              className={cn(
                'w-full py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200',
                hasAnySelection
                  ? 'bg-gold text-black hover:bg-gold-light shadow-gold hover:shadow-gold-lg'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              )}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Request Quote
            </button>

            <button
              onClick={handleSaveDesign}
              disabled={!hasAnySelection}
              className={cn(
                'w-full py-2.5 px-4 rounded-lg text-xs font-medium border transition-all duration-200',
                hasAnySelection
                  ? saved
                    ? 'border-green-500/50 text-green-400 bg-green-500/10'
                    : 'border-white/20 text-white/60 hover:border-gold/50 hover:text-gold'
                  : 'border-white/5 text-white/20 cursor-not-allowed'
              )}
            >
              <Save className="w-3.5 h-3.5 inline mr-1.5" />
              {saved ? 'Design Saved!' : 'Save Design'}
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile bottom sheet ─────────────────────────────────────── */}
      <div
        className={cn(
          'lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black-deep border-t border-white/20 transition-all duration-300',
          isExpanded ? 'max-h-[80vh]' : 'max-h-24'
        )}
      >
        {/* Toggle handle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">
              Your Design
            </span>
            {hasAnySelection && (
              <span className="text-xs text-white/50">
                {[diamond && '💎', setting && '💍', metal && '✨'].filter(Boolean).join(' ')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-gold">
              {total > 0 ? formatPrice(total) : '—'}
            </span>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gold" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gold" />
            )}
          </div>
        </button>

        {/* Expanded content */}
        {isExpanded && (
          <div className="px-4 pb-4 overflow-y-auto max-h-[60vh]">
            <div className="space-y-1">
              <SidebarSection
                icon={<Diamond className="w-4 h-4" />}
                label="Diamond"
                value={diamond ? `${diamond.carat}ct ${diamond.cut}` : undefined}
                price={diamond?.price}
                placeholder="Not selected"
                isEmpty={!diamond}
              />
              <SidebarSection
                icon={<Gem className="w-4 h-4" />}
                label="Setting"
                value={setting?.name}
                price={setting?.basePrice}
                placeholder="Not selected"
                isEmpty={!setting}
              />
              <SidebarSection
                icon={<Layers className="w-4 h-4" />}
                label="Metal"
                value={metal?.name}
                price={metal?.priceModifier ?? 0}
                placeholder="Not selected"
                isEmpty={!metal}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={handleSaveDesign}
                disabled={!hasAnySelection}
                className="py-2.5 px-3 rounded-lg text-xs font-medium border border-white/20 text-white/60 disabled:opacity-30"
              >
                Save Design
              </button>
              <button
                onClick={() => {
                  setStep(6)
                  setIsExpanded(false)
                }}
                disabled={!hasAnySelection}
                className="py-2.5 px-3 rounded-lg text-xs font-semibold bg-gold text-black disabled:opacity-30"
              >
                Request Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
