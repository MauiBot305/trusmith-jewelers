'use client'

import Link from 'next/link'
import { useState } from 'react'

const cutGrades = [
  { grade: 'Ideal', sparkle: 100, description: 'Perfect proportions. Maximum light return.' },
  { grade: 'Excellent', sparkle: 90, description: 'Outstanding brilliance and fire.' },
  { grade: 'Very Good', sparkle: 75, description: 'Minor sacrifices. Still very bright.' },
  { grade: 'Good', sparkle: 55, description: 'Noticeable reduction in sparkle.' },
  { grade: 'Fair', sparkle: 35, description: 'Significantly duller. Not recommended.' },
  { grade: 'Poor', sparkle: 15, description: 'Light leaks. Avoid.' },
]

const colorGrades = [
  { grade: 'D', label: 'Colorless', bg: 'bg-white/95', recommended: false },
  { grade: 'E', label: 'Colorless', bg: 'bg-white/92', recommended: false },
  { grade: 'F', label: 'Colorless', bg: 'bg-white/88', recommended: false },
  { grade: 'G', label: 'Near Colorless', bg: 'bg-yellow-50/80', recommended: true },
  { grade: 'H', label: 'Near Colorless', bg: 'bg-yellow-100/80', recommended: true },
  { grade: 'I', label: 'Near Colorless', bg: 'bg-yellow-200/80', recommended: false },
  { grade: 'J', label: 'Near Colorless', bg: 'bg-yellow-300/80', recommended: false },
  { grade: 'K', label: 'Faint', bg: 'bg-yellow-400/80', recommended: false },
]

const clarityGrades = [
  { grade: 'FL', label: 'Flawless', price: 'Premium', visible: false, recommended: false },
  {
    grade: 'IF',
    label: 'Internally Flawless',
    price: 'Very High',
    visible: false,
    recommended: false,
  },
  {
    grade: 'VVS1',
    label: 'Very Very Slightly Included',
    price: 'High',
    visible: false,
    recommended: false,
  },
  {
    grade: 'VVS2',
    label: 'Very Very Slightly Included',
    price: 'High',
    visible: false,
    recommended: false,
  },
  {
    grade: 'VS1',
    label: 'Very Slightly Included',
    price: 'Moderate',
    visible: false,
    recommended: false,
  },
  {
    grade: 'VS2',
    label: 'Very Slightly Included',
    price: 'Good Value',
    visible: false,
    recommended: true,
  },
  {
    grade: 'SI1',
    label: 'Slightly Included',
    price: 'Best Value',
    visible: false,
    recommended: true,
  },
  { grade: 'SI2', label: 'Slightly Included', price: 'Value', visible: true, recommended: false },
  { grade: 'I1', label: 'Included', price: 'Low', visible: true, recommended: false },
]

function CaratVisual({ carat }: { carat: number }) {
  const size = Math.max(20, Math.min(100, carat * 45 + 15))
  return (
    <div className="flex items-end justify-center gap-4 py-6">
      {[0.5, 1, 1.5, 2].map((c) => {
        const s = Math.max(18, Math.min(90, c * 40 + 10))
        const isSelected = Math.abs(c - carat) < 0.26
        return (
          <div key={c} className="flex flex-col items-center gap-2">
            <div
              className={`rounded-full border transition-all duration-300 ${
                isSelected ? 'border-gold bg-gold/20' : 'border-white/20 bg-white/5'
              }`}
              style={{ width: s, height: s }}
            />
            <span className={`text-xs font-sans ${isSelected ? 'text-gold' : 'text-white-off/30'}`}>
              {c}ct
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function FourCsPage() {
  const [activeCutGrade, setActiveCutGrade] = useState(0) // Ideal
  const [activeColorIndex, setActiveColorIndex] = useState(3) // G
  const [activeClarityIndex, setActiveClarityIndex] = useState(5) // VS2
  const [caratValue, setCaratValue] = useState(1.0)

  const currentCutGrade = cutGrades[activeCutGrade]
  const currentColor = colorGrades[activeColorIndex]
  const currentClarity = clarityGrades[activeClarityIndex]

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans text-white-off/30 mb-8">
        <Link href="/education" className="hover:text-gold transition-colors">
          Education
        </Link>
        <span>/</span>
        <span className="text-white-off/60">The 4Cs</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <p className="text-gold text-xs font-sans tracking-[0.3em] uppercase mb-4">Guide</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white-off mb-6 leading-tight">
          The <span className="text-gold-gradient italic">4Cs</span>
        </h1>
        <div className="divider-gold mb-6" style={{ marginLeft: 0 }} />
        <p className="text-white-off/60 font-sans text-lg leading-relaxed max-w-2xl">
          Four qualities define every diamond: Cut, Color, Clarity, and Carat. Understanding them
          helps you get the most beauty for your budget — and make a choice you will love forever.
        </p>
      </div>

      {/* The Four Cs */}
      <div className="space-y-16">
        {/* ── CUT ─────────────────────────────────────────────── */}
        <section id="cut" className="scroll-mt-28">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-serif text-5xl text-gold/20 select-none">C</span>
            <h2 className="font-serif text-3xl text-white-off">Cut</h2>
          </div>
          <p className="text-gold/60 text-sm font-sans mb-4 font-medium tracking-wide">
            The most important C for beauty
          </p>
          <div className="w-8 h-px bg-gold mb-6" />
          <p className="text-white-off/70 font-sans text-base leading-relaxed mb-4">
            Cut determines how well a diamond sparkles. It&apos;s about the angles and proportions
            that let light bounce around inside and shoot back to your eye as brilliance.
          </p>
          <p className="text-white-off/70 font-sans text-base leading-relaxed mb-8">
            A well-cut diamond dances with light. A poorly cut one looks dull even if it&apos;s big
            and clear.{' '}
            <strong className="text-white-off">Cut is the most important C for beauty</strong> —
            never compromise here.
          </p>

          {/* Interactive Cut Grades */}
          <div className="glass-card p-6">
            <p className="text-white-off/40 text-xs font-sans tracking-widest uppercase mb-4">
              Interactive — explore cut grades
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {cutGrades.map((g, i) => (
                <button
                  key={g.grade}
                  onClick={() => setActiveCutGrade(i)}
                  className={`px-3 py-1.5 text-xs font-sans border transition-all duration-200 ${
                    activeCutGrade === i
                      ? 'border-gold text-gold bg-gold/10'
                      : 'border-white/10 text-white-off/40 hover:border-gold/30 hover:text-white-off/70'
                  }`}
                >
                  {g.grade}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1 bg-white/5 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-gradient transition-all duration-500 rounded-full"
                  style={{ width: `${currentCutGrade.sparkle}%` }}
                />
              </div>
              <span className="text-gold font-sans text-sm font-medium w-12 text-right">
                {currentCutGrade.sparkle}%
              </span>
            </div>
            <p className="text-white-off/50 font-sans text-sm">{currentCutGrade.description}</p>

            {activeCutGrade === 0 && (
              <p className="mt-3 text-gold text-xs font-sans">
                ★ Our recommendation — always choose Ideal or Excellent
              </p>
            )}
          </div>
        </section>

        {/* ── COLOR ───────────────────────────────────────────── */}
        <section id="color" className="scroll-mt-28">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-serif text-5xl text-gold/20 select-none">C</span>
            <h2 className="font-serif text-3xl text-white-off">Color</h2>
          </div>
          <p className="text-gold/60 text-sm font-sans mb-4 font-medium tracking-wide">
            D–Z scale · G–H is the sweet spot
          </p>
          <div className="w-8 h-px bg-gold mb-6" />
          <p className="text-white-off/70 font-sans text-base leading-relaxed mb-4">
            Diamond color grades how &ldquo;white&rdquo; or colorless a diamond is. The scale runs
            from D (perfectly colorless) to Z (light yellow).
          </p>
          <p className="text-white-off/70 font-sans text-base leading-relaxed mb-8">
            Most people cannot tell the difference between a few grades, especially once the diamond
            is set in a ring. We recommend G–H for best value — looks white, costs less than D–F.
          </p>

          {/* Color scale */}
          <div className="glass-card p-6">
            <p className="text-white-off/40 text-xs font-sans tracking-widest uppercase mb-4">
              Interactive — tap a grade
            </p>
            <div className="flex gap-1 mb-4">
              {colorGrades.map((c, i) => (
                <button
                  key={c.grade}
                  onClick={() => setActiveColorIndex(i)}
                  className={`flex-1 py-3 font-sans text-xs transition-all duration-200 border-b-2 ${
                    activeColorIndex === i
                      ? 'border-gold text-white-off'
                      : 'border-transparent text-white-off/30 hover:text-white-off/60'
                  }`}
                >
                  {c.grade}
                </button>
              ))}
            </div>

            {/* Color swatch */}
            <div
              className={`rounded-sm h-16 mb-4 transition-all duration-500 ${currentColor.bg}`}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white-off font-sans text-sm">
                  {currentColor.grade} — {currentColor.label}
                </p>
                <p className="text-white-off/40 text-xs font-sans mt-0.5">
                  {currentColor.recommended
                    ? 'Recommended: looks white, exceptional value'
                    : currentColor.grade <= 'F'
                      ? 'Premium price for a difference most people cannot see'
                      : 'Visible warmth — noticeable in most settings'}
                </p>
              </div>
              {currentColor.recommended && (
                <span className="text-gold text-xs font-sans border border-gold/40 px-2 py-1">
                  ★ Best Value
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── CLARITY ─────────────────────────────────────────── */}
        <section id="clarity" className="scroll-mt-28">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-serif text-5xl text-gold/20 select-none">C</span>
            <h2 className="font-serif text-3xl text-white-off">Clarity</h2>
          </div>
          <p className="text-gold/60 text-sm font-sans mb-4 font-medium tracking-wide">
            FL–I · VS2–SI1 is the sweet spot
          </p>
          <div className="w-8 h-px bg-gold mb-6" />
          <p className="text-white-off/70 font-sans text-base leading-relaxed mb-4">
            Clarity measures tiny natural marks inside or on the surface of a diamond. These are
            called inclusions and blemishes. They form during the diamond&apos;s growth — in nature
            or in the lab.
          </p>
          <p className="text-white-off/70 font-sans text-base leading-relaxed mb-8">
            Most are invisible to the naked eye. We recommend{' '}
            <strong className="text-white-off">VS2–SI1</strong> for the sweet spot: looks perfect to
            the eye, significant savings over &ldquo;flawless&rdquo; grades.
          </p>

          {/* Clarity scale */}
          <div className="glass-card p-6">
            <p className="text-white-off/40 text-xs font-sans tracking-widest uppercase mb-4">
              Interactive — explore clarity grades
            </p>
            <div className="grid grid-cols-3 md:grid-cols-9 gap-1 mb-6">
              {clarityGrades.map((c, i) => (
                <button
                  key={c.grade}
                  onClick={() => setActiveClarityIndex(i)}
                  className={`py-2 px-1 font-sans text-xs border transition-all duration-200 ${
                    activeClarityIndex === i
                      ? 'border-gold text-gold bg-gold/10'
                      : 'border-white/10 text-white-off/40 hover:border-gold/30 hover:text-white-off'
                  }`}
                >
                  {c.grade}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-white-off font-sans text-sm font-medium">
                  {currentClarity.grade} — {currentClarity.label}
                </p>
                <p className="text-white-off/40 text-xs font-sans mt-1">
                  Price tier: <span className="text-gold">{currentClarity.price}</span>
                </p>
                <p className="text-white-off/50 text-xs font-sans mt-2">
                  {currentClarity.visible
                    ? 'Inclusions may be visible to the naked eye.'
                    : 'Clean to the naked eye — inclusions require magnification to see.'}
                </p>
              </div>
              <div className="flex items-center">
                {currentClarity.recommended && (
                  <div className="border border-gold/30 bg-gold/5 p-3 text-xs font-sans text-gold w-full">
                    ★ Our recommendation — eye-clean and smart value
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── CARAT ───────────────────────────────────────────── */}
        <section id="carat" className="scroll-mt-28">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-serif text-5xl text-gold/20 select-none">C</span>
            <h2 className="font-serif text-3xl text-white-off">Carat</h2>
          </div>
          <p className="text-gold/60 text-sm font-sans mb-4 font-medium tracking-wide">
            Weight · 1 carat = 0.2 grams
          </p>
          <div className="w-8 h-px bg-gold mb-6" />
          <p className="text-white-off/70 font-sans text-base leading-relaxed mb-4">
            Carat is simply weight — how big the diamond is. One carat equals 0.2 grams. Bigger
            costs more, but cut matters more for beauty.
          </p>
          <p className="text-white-off/70 font-sans text-base leading-relaxed mb-8">
            A well-cut 1-carat diamond can look more impressive than a poorly cut 1.5-carat. And
            with lab-grown, your budget stretches significantly further — so you can choose a larger
            stone without sacrificing cut or clarity.
          </p>

          {/* Carat slider */}
          <div className="glass-card p-6">
            <p className="text-white-off/40 text-xs font-sans tracking-widest uppercase mb-4">
              Interactive — explore carat sizes
            </p>
            <div className="mb-2">
              <div className="flex justify-between text-xs font-sans text-white-off/40 mb-2">
                <span>0.25 ct</span>
                <span className="text-gold text-sm">{caratValue.toFixed(2)} ct</span>
                <span>3.00 ct</span>
              </div>
              <input
                type="range"
                min={0.25}
                max={3.0}
                step={0.05}
                value={caratValue}
                onChange={(e) => setCaratValue(parseFloat(e.target.value))}
                className="w-full accent-yellow-400"
              />
            </div>

            <CaratVisual carat={caratValue} />

            <p className="text-white-off/40 font-sans text-xs text-center">
              Visual size comparison (relative proportions)
            </p>
          </div>
        </section>
      </div>

      {/* Summary recommendation */}
      <section className="my-16 border border-gold/20 bg-gold/5 p-8">
        <h2 className="font-serif text-2xl text-white-off mb-2">Our Sweet Spot Recommendation</h2>
        <p className="text-white-off/50 font-sans text-sm mb-6">
          For the best combination of beauty and value in a lab-grown diamond:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { c: 'Cut', value: 'Ideal or Excellent', note: 'Never compromise here' },
            { c: 'Color', value: 'G or H', note: 'Eye-white at great value' },
            { c: 'Clarity', value: 'VS2 or SI1', note: 'Eye-clean, smart savings' },
            { c: 'Carat', value: 'Your choice', note: 'Budget goes further with lab-grown' },
          ].map((item) => (
            <div key={item.c} className="text-center p-4 border border-gold/20">
              <p className="text-gold/40 font-serif text-3xl mb-1">{item.c[0]}</p>
              <p className="text-white-off font-sans text-sm font-medium">{item.value}</p>
              <p className="text-white-off/30 text-xs font-sans mt-1">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h2 className="font-serif text-2xl text-white-off mb-3">Apply what you know</h2>
        <p className="text-white-off/50 font-sans text-sm mb-8 max-w-md mx-auto">
          Now that you understand the 4Cs, use them in our ring builder. Every filter makes sense.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/build"
            className="px-10 py-4 bg-gold text-black font-sans text-sm tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            Build Your Ring →
          </Link>
          <Link
            href="/education/cuts"
            className="px-10 py-4 border border-gold/40 text-gold font-sans text-sm tracking-widest uppercase hover:bg-gold/10 transition-colors"
          >
            Explore Diamond Cuts
          </Link>
        </div>
      </div>
    </div>
  )
}
