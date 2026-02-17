'use client'

import { useState, useEffect } from 'react'
import { Check, HelpCircle, Save, X, Ruler } from 'lucide-react'
import { useBuilderStore } from '@/store/builderStore'
import { cn } from '@/lib/utils'

// ── Ring size options (3-15 with half sizes) ───────────────────────────────────
const RING_SIZES = [
  '3',
  '3.5',
  '4',
  '4.5',
  '5',
  '5.5',
  '6',
  '6.5',
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10',
  '10.5',
  '11',
  '11.5',
  '12',
  '12.5',
  '13',
  '13.5',
  '14',
  '14.5',
  '15',
]

// ── Size guide data (finger circumference in mm) ───────────────────────────────
const SIZE_GUIDE = [
  { size: '4', circumference: 46.5 },
  { size: '5', circumference: 49.3 },
  { size: '6', circumference: 52.5 },
  { size: '7', circumference: 54.4 },
  { size: '8', circumference: 57.2 },
  { size: '9', circumference: 60.0 },
  { size: '10', circumference: 62.8 },
  { size: '11', circumference: 65.7 },
  { size: '12', circumference: 68.5 },
]

// ── Common engraving suggestions ───────────────────────────────────────────────
const ENGRAVING_SUGGESTIONS = [
  'Forever Yours',
  'Always & Forever',
  'I Love You',
  'Eternally Yours',
  'My Soulmate',
  '♡',
]

// ── Size Guide Modal ───────────────────────────────────────────────────────────
interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-black-soft border border-gold/30 rounded-2xl p-6 max-h-[85vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white-off/50 hover:text-gold transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Ruler className="w-6 h-6 text-gold" />
          <h2 className="text-xl font-serif text-gold">Ring Size Guide</h2>
        </div>

        {/* Measurement tips */}
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-black/40 border border-white/10 rounded-lg">
            <h3 className="text-white-off font-semibold text-sm mb-2">📏 String Method</h3>
            <ol className="text-white-off/70 text-xs space-y-1.5 list-decimal list-inside">
              <li>Wrap string or paper strip around your ring finger</li>
              <li>Mark where the string overlaps</li>
              <li>Measure the length in millimeters</li>
              <li>Match to the circumference chart below</li>
            </ol>
          </div>

          <div className="p-4 bg-black/40 border border-white/10 rounded-lg">
            <h3 className="text-white-off font-semibold text-sm mb-2">💍 Existing Ring Method</h3>
            <ol className="text-white-off/70 text-xs space-y-1.5 list-decimal list-inside">
              <li>Find a ring that fits the intended finger well</li>
              <li>Measure the inside diameter in millimeters</li>
              <li>Multiply by π (3.14) to get circumference</li>
            </ol>
          </div>

          <div className="p-4 bg-gold/10 border border-gold/30 rounded-lg">
            <h3 className="text-gold font-semibold text-sm mb-2">💡 Pro Tips</h3>
            <ul className="text-white-off/70 text-xs space-y-1.5">
              <li>• Measure at end of day (fingers swell slightly)</li>
              <li>• Measure 3-4 times for accuracy</li>
              <li>• If between sizes, choose the larger size</li>
              <li>• Consider wider bands may need a half size up</li>
            </ul>
          </div>
        </div>

        {/* Circumference chart */}
        <h3 className="text-white-off font-semibold text-sm mb-3">Circumference Chart</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-gold/70 font-semibold">Size</div>
          <div className="text-gold/70 font-semibold col-span-2">Circumference (mm)</div>
          {SIZE_GUIDE.map((item) => (
            <>
              <div key={`size-${item.size}`} className="text-white-off">
                {item.size}
              </div>
              <div key={`circ-${item.size}`} className="text-white-off/60 col-span-2">
                {item.circumference} mm
              </div>
            </>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-gold text-black font-semibold text-sm tracking-wider uppercase rounded-lg hover:bg-gold-light transition-colors"
        >
          Got It
        </button>
      </div>
    </div>
  )
}

// ── Main Step 4 Component ──────────────────────────────────────────────────────
export function Step4AddOns() {
  const { engraving, setEngraving, ringSize, setRingSize, notes, setNotes, completeStep, setStep } =
    useBuilderStore()

  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [saved, setSaved] = useState(false)
  const [designId, setDesignId] = useState<string | null>(null)

  // Generate or retrieve design ID
  useEffect(() => {
    const existingId = localStorage.getItem('trusmith-design-id')
    if (existingId) {
      setDesignId(existingId)
    }
  }, [])

  const handleSaveDesign = () => {
    const newDesignId = designId || `TS-${Date.now().toString(36).toUpperCase()}`

    const design = {
      id: newDesignId,
      savedAt: new Date().toISOString(),
      engraving,
      ringSize,
      notes,
      // The full design state is already persisted by zustand
    }

    localStorage.setItem('trusmith-design-id', newDesignId)
    localStorage.setItem(`trusmith-design-${newDesignId}`, JSON.stringify(design))

    setDesignId(newDesignId)
    setSaved(true)

    setTimeout(() => setSaved(false), 2500)
  }

  const handleContinue = () => {
    completeStep(4)
    setStep(5)
  }

  const charCount = engraving.length
  const maxChars = 25

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-serif text-gold">Personalize Your Ring</h2>
        <p className="text-white-off/60 text-sm">
          Add the finishing touches to make it uniquely yours
        </p>
      </div>

      {/* Engraving Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-white-off font-semibold tracking-wide text-sm">ENGRAVING</span>
          <span className="text-white-off/40 text-xs">(Optional)</span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={engraving}
            onChange={(e) => setEngraving(e.target.value.slice(0, maxChars))}
            placeholder="Enter your personal message..."
            className="w-full px-4 py-3 bg-black-soft border border-gold/30 rounded-lg text-white-off placeholder:text-white-off/30 focus:outline-none focus:border-gold transition-colors"
            maxLength={maxChars}
          />
          <span
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 text-xs',
              charCount >= maxChars ? 'text-red-400' : 'text-white-off/40'
            )}
          >
            {charCount}/{maxChars}
          </span>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2">
          {ENGRAVING_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setEngraving(suggestion.slice(0, maxChars))}
              className={cn(
                'px-3 py-1.5 text-xs border rounded-full transition-all duration-200',
                engraving === suggestion
                  ? 'border-gold bg-gold/20 text-gold'
                  : 'border-white/20 text-white-off/60 hover:border-gold/40 hover:text-white-off'
              )}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Engraving Preview */}
        {engraving && (
          <div className="p-6 bg-black-soft border border-gold/20 rounded-xl text-center">
            <p className="text-white-off/40 text-xs uppercase tracking-widest mb-3">Preview</p>
            <p
              className="text-2xl text-gold"
              style={{ fontFamily: "'Pinyon Script', 'Dancing Script', cursive" }}
            >
              {engraving}
            </p>
          </div>
        )}
      </div>

      {/* Ring Size Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white-off font-semibold tracking-wide text-sm">RING SIZE</span>
            <span className="text-white-off/40 text-xs">(Optional)</span>
          </div>
          <button
            onClick={() => setShowSizeGuide(true)}
            className="flex items-center gap-1.5 text-gold text-xs hover:text-gold-light transition-colors"
          >
            <Ruler className="w-3.5 h-3.5" />
            Size Guide
          </button>
        </div>

        <div className="relative">
          <select
            value={ringSize}
            onChange={(e) => setRingSize(e.target.value)}
            className="w-full px-4 py-3 bg-black-soft border border-gold/30 rounded-lg text-white-off focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-black-soft text-white-off/50">
              Select your ring size
            </option>
            {RING_SIZES.map((size) => (
              <option key={size} value={size} className="bg-black-soft text-white-off">
                Size {size}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-black/40 border border-white/10 rounded-lg">
          <HelpCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
          <p className="text-white-off/50 text-xs leading-relaxed">
            Not sure of your size? No worries! You can finalize this during your consultation. We
            also offer complimentary resizing within 30 days.
          </p>
        </div>
      </div>

      {/* Special Requests Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-white-off font-semibold tracking-wide text-sm">
            SPECIAL REQUESTS
          </span>
          <span className="text-white-off/40 text-xs">(Optional)</span>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special requests or notes for our jewelers..."
          rows={4}
          className="w-full px-4 py-3 bg-black-soft border border-gold/30 rounded-lg text-white-off placeholder:text-white-off/30 focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>

      {/* Save Design */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={handleSaveDesign}
          disabled={saved}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-3 border rounded-lg text-sm font-medium tracking-wider uppercase transition-all duration-300',
            saved
              ? 'border-green-500/50 bg-green-500/10 text-green-400'
              : 'border-gold/40 text-gold hover:border-gold hover:bg-gold/10'
          )}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Design Saved!
              {designId && (
                <span className="text-xs opacity-60 normal-case ml-1">({designId})</span>
              )}
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Design for Later
            </>
          )}
        </button>
      </div>

      {/* Continue Button */}
      <div className="pt-2">
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-gold text-black font-semibold text-sm tracking-widest uppercase rounded-lg hover:bg-gold-light transition-colors shadow-gold"
        >
          Continue to Preview
        </button>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </div>
  )
}

export default Step4AddOns
