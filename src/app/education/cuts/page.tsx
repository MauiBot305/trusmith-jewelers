'use client'

import Link from 'next/link'
import { useState } from 'react'
import DiamondCutIcon from '@/components/education/DiamondCutIcon'
import { diamondCuts, type DiamondCut } from '@/lib/education/cuts-data'

function CutCard({
  cut,
  isSelected,
  onSelect,
  selectable,
}: {
  cut: DiamondCut
  isSelected: boolean
  onSelect?: () => void
  selectable?: boolean
}) {
  const inner = (
    <div
      className={`
        group flex flex-col items-center p-5 border transition-all duration-300 cursor-pointer
        ${
          isSelected
            ? 'border-gold bg-gold/10 shadow-gold'
            : 'border-white/10 hover:border-gold/40 hover:bg-gold/5'
        }
      `}
      onClick={selectable ? onSelect : undefined}
    >
      <div
        className={`mb-4 transition-transform duration-300 ${!selectable ? 'group-hover:scale-110' : ''}`}
      >
        <DiamondCutIcon cut={cut.id} size={64} filled={isSelected} />
      </div>
      <h3
        className={`font-serif text-base mb-1 transition-colors ${isSelected ? 'text-gold' : 'text-white-off group-hover:text-gold'}`}
      >
        {cut.name}
      </h3>
      <p className="text-white-off/40 text-xs font-sans text-center leading-relaxed">
        {cut.teaser}
      </p>
      {isSelected && (
        <div className="mt-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  )

  if (selectable) return inner

  return <Link href={`/education/cuts/${cut.id}`}>{inner}</Link>
}

function ComparisonPanel({
  cutA,
  cutB,
  onRemoveA,
  onRemoveB,
}: {
  cutA: DiamondCut
  cutB: DiamondCut
  onRemoveA: () => void
  onRemoveB: () => void
}) {
  const rows = [
    {
      label: 'Style',
      getA: () => cutA.styleKeywords.join(', '),
      getB: () => cutB.styleKeywords.join(', '),
    },
    {
      label: 'Best For',
      getA: () => cutA.bestFor.join(' · '),
      getB: () => cutB.bestFor.join(' · '),
    },
    {
      label: 'Key Traits',
      getA: () => cutA.characteristics.join(' · '),
      getB: () => cutB.characteristics.join(' · '),
    },
  ]

  return (
    <div className="border border-gold/30 bg-gold/5 p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-serif text-xl text-white-off">Side-by-Side Comparison</h3>
        <button
          onClick={() => {
            onRemoveA()
            onRemoveB()
          }}
          className="text-white-off/30 hover:text-white-off/60 transition-colors text-xs font-sans"
        >
          Clear
        </button>
      </div>

      {/* Diamond shapes */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {[
          { cut: cutA, onRemove: onRemoveA },
          { cut: cutB, onRemove: onRemoveB },
        ].map(({ cut, onRemove }) => (
          <div key={cut.id} className="text-center">
            <div className="flex justify-center mb-4">
              <DiamondCutIcon cut={cut.id} size={80} filled />
            </div>
            <h4 className="font-serif text-lg text-gold mb-1">{cut.name}</h4>
            <p className="text-white-off/40 text-xs font-sans mb-3">{cut.teaser}</p>
            <button
              onClick={onRemove}
              className="text-white-off/20 hover:text-white-off/50 text-xs font-sans transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Descriptions */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {[cutA, cutB].map((cut) => (
          <p key={cut.id} className="text-white-off/60 font-sans text-sm leading-relaxed">
            {cut.description}
          </p>
        ))}
      </div>

      {/* Comparison rows */}
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[80px_1fr_1fr] gap-4 items-start">
            <span className="text-white-off/30 text-xs font-sans uppercase tracking-wider pt-0.5">
              {row.label}
            </span>
            <span className="text-white-off/70 text-sm font-sans">{row.getA()}</span>
            <span className="text-white-off/70 text-sm font-sans">{row.getB()}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
        {[cutA, cutB].map((cut) => (
          <Link
            key={cut.id}
            href={`/education/cuts/${cut.id}`}
            className="text-center py-3 border border-gold/40 text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold/10 transition-colors"
          >
            Full {cut.name} Guide
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function CutsIndexPage() {
  const [selectedCuts, setSelectedCuts] = useState<string[]>([])
  const [compareMode, setCompareMode] = useState(false)

  function toggleCut(id: string) {
    setSelectedCuts((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id)
      if (prev.length >= 2) return [prev[1], id]
      return [...prev, id]
    })
  }

  function removeCut(id: string) {
    setSelectedCuts((prev) => prev.filter((c) => c !== id))
  }

  const cutA = selectedCuts[0] ? diamondCuts.find((c) => c.id === selectedCuts[0]) : null
  const cutB = selectedCuts[1] ? diamondCuts.find((c) => c.id === selectedCuts[1]) : null

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans text-white-off/30 mb-8">
        <Link href="/education" className="hover:text-gold transition-colors">
          Education
        </Link>
        <span>/</span>
        <span className="text-white-off/60">Diamond Cuts</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <p className="text-gold text-xs font-sans tracking-[0.3em] uppercase mb-4">Guide</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white-off mb-6 leading-tight">
          Diamond <span className="text-gold-gradient italic">Cuts</span>
        </h1>
        <div className="divider-gold mb-6" style={{ marginLeft: 0 }} />
        <p className="text-white-off/60 font-sans text-lg leading-relaxed max-w-2xl">
          Every diamond cut has a distinct personality — some dazzle with maximum brilliance, others
          captivate with sophisticated lines. Your cut says something about who you are.
        </p>
      </div>

      {/* Compare Mode Toggle */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-white-off/40 text-sm font-sans">
          {compareMode
            ? `Select 2 cuts to compare${selectedCuts.length > 0 ? ` (${selectedCuts.length}/2 selected)` : ''}`
            : '10 cuts — click any to explore'}
        </p>
        <button
          onClick={() => {
            setCompareMode(!compareMode)
            if (compareMode) setSelectedCuts([])
          }}
          className={`
            text-xs font-sans tracking-widest uppercase px-4 py-2 border transition-all duration-200
            ${
              compareMode
                ? 'border-gold text-gold bg-gold/10'
                : 'border-white/20 text-white-off/50 hover:border-gold/40 hover:text-gold'
            }
          `}
        >
          {compareMode ? '✓ Comparing' : 'Compare Cuts'}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
        {diamondCuts.map((cut) => (
          <CutCard
            key={cut.id}
            cut={cut}
            isSelected={selectedCuts.includes(cut.id)}
            onSelect={() => toggleCut(cut.id)}
            selectable={compareMode}
          />
        ))}
      </div>

      {/* Comparison Panel */}
      {compareMode && cutA && cutB && (
        <div className="mb-12">
          <ComparisonPanel
            cutA={cutA}
            cutB={cutB}
            onRemoveA={() => removeCut(cutA.id)}
            onRemoveB={() => removeCut(cutB.id)}
          />
        </div>
      )}

      {/* Compare prompt */}
      {compareMode && selectedCuts.length === 1 && (
        <div className="mb-12 py-8 border border-dashed border-gold/20 text-center">
          <p className="text-white-off/40 font-sans text-sm">Select one more cut to compare</p>
        </div>
      )}

      {/* Cut list with teasers */}
      {!compareMode && (
        <div className="space-y-px mb-12">
          {diamondCuts.map((cut, i) => (
            <Link
              key={cut.id}
              href={`/education/cuts/${cut.id}`}
              className="group flex items-center gap-6 px-4 py-4 border-b border-white/5 hover:bg-gold/5 transition-all duration-200"
            >
              <span className="text-white-off/20 text-xs font-sans w-5 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <DiamondCutIcon cut={cut.id} size={36} />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-base text-white-off group-hover:text-gold transition-colors">
                  {cut.name}
                </h3>
                <p className="text-white-off/40 text-xs font-sans truncate">{cut.teaser}</p>
              </div>
              <svg
                className="w-4 h-4 text-white-off/20 group-hover:text-gold group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="border border-gold/20 p-8 text-center bg-gold/5">
        <h2 className="font-serif text-2xl text-white-off mb-3">Found your cut?</h2>
        <p className="text-white-off/50 font-sans text-sm mb-6 max-w-md mx-auto">
          Use it as your starting point in the ring builder. You can always change your mind.
        </p>
        <Link
          href="/build"
          className="inline-block px-10 py-4 bg-gold text-black font-sans text-sm tracking-widest uppercase hover:bg-gold-light transition-colors"
        >
          Build Your Ring →
        </Link>
      </div>
    </div>
  )
}
