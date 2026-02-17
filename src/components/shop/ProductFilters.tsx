'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { X, SlidersHorizontal } from 'lucide-react'
import { ProductFilters as Filters, METAL_TYPES } from '@/types/product'
import { cn } from '@/lib/utils'

interface ProductFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
  totalResults: number
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-white/10 pb-5 mb-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center mb-4 group"
      >
        <span className="text-white/60 text-xs uppercase tracking-[0.15em]">{title}</span>
        <span
          className={cn(
            'text-white/40 text-lg leading-none transition-transform group-hover:text-gold',
            !open && 'rotate-180'
          )}
        >
          −
        </span>
      </button>
      {open && children}
    </div>
  )
}

export default function ProductFilters({ filters, onChange, totalResults }: ProductFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const update = (partial: Partial<Filters>) => onChange({ ...filters, ...partial })

  const toggleMetal = (metal: string) => {
    const metalTypes = filters.metalTypes.includes(metal)
      ? filters.metalTypes.filter((m) => m !== metal)
      : [...filters.metalTypes, metal]
    update({ metalTypes })
  }

  const resetAll = () =>
    onChange({
      category: 'All',
      metalTypes: [],
      diamondType: 'Both',
      priceMin: 0,
      priceMax: 15000,
      sort: 'newest',
    })

  const hasActive =
    filters.metalTypes.length > 0 ||
    filters.diamondType !== 'Both' ||
    filters.priceMin > 0 ||
    filters.priceMax < 15000

  const FiltersContent = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-white text-lg">Filters</h3>
        {hasActive && (
          <button
            onClick={resetAll}
            className="text-gold/70 hover:text-gold text-xs uppercase tracking-wider flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="px-1">
          <div className="flex justify-between mb-4">
            <span className="text-white text-sm">${filters.priceMin.toLocaleString()}</span>
            <span className="text-white text-sm">${filters.priceMax.toLocaleString()}</span>
          </div>
          <Slider
            min={0}
            max={15000}
            step={250}
            value={[filters.priceMin, filters.priceMax]}
            onValueChange={([min, max]) => update({ priceMin: min, priceMax: max })}
            className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
          />
          <div className="flex justify-between mt-2 text-white/30 text-xs">
            <span>$0</span>
            <span>$15,000+</span>
          </div>
        </div>
      </FilterSection>

      {/* Metal Type */}
      <FilterSection title="Metal Type">
        <div className="space-y-2">
          {METAL_TYPES.map((metal) => (
            <label key={metal} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={cn(
                  'w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all',
                  filters.metalTypes.includes(metal)
                    ? 'border-gold bg-gold'
                    : 'border-white/20 group-hover:border-gold/50'
                )}
                onClick={() => toggleMetal(metal)}
              >
                {filters.metalTypes.includes(metal) && (
                  <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
              <span
                className={cn(
                  'text-sm transition-colors',
                  filters.metalTypes.includes(metal)
                    ? 'text-gold'
                    : 'text-white/70 group-hover:text-white'
                )}
                onClick={() => toggleMetal(metal)}
              >
                {metal}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Diamond Type */}
      <FilterSection title="Diamond Type">
        <div className="flex gap-2">
          {(['Lab-grown', 'Natural', 'Both'] as const).map((type) => (
            <button
              key={type}
              onClick={() => update({ diamondType: type })}
              className={cn(
                'flex-1 py-2 border text-xs uppercase tracking-wider font-medium transition-all',
                filters.diamondType === type
                  ? 'border-gold bg-gold text-black'
                  : 'border-white/20 text-white/60 hover:border-gold/50'
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </FilterSection>

      <p className="text-white/30 text-xs text-center mt-2">
        {totalResults} {totalResults === 1 ? 'item' : 'items'} found
      </p>
    </div>
  )

  return (
    <>
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center gap-2 border border-white/20 text-white/70 hover:border-gold/50 hover:text-gold px-4 py-2.5 text-sm uppercase tracking-wider transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActive && (
            <span className="bg-gold text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {filters.metalTypes.length + (filters.diamondType !== 'Both' ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-black-deep border-r border-white/10 overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-white text-lg">Filters</h3>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-white/60 hover:text-white" />
              </button>
            </div>
            <FiltersContent />
          </div>
        </div>
      )}

      <aside className="hidden lg:block w-64 flex-shrink-0">
        <FiltersContent />
      </aside>
    </>
  )
}
