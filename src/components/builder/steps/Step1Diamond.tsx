'use client'
export function Step1Diamond({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center py-20">
      <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">Step 1</p>
      <h2 className="font-serif text-3xl text-white-off mb-6">Choose Your Diamond</h2>
      <p className="text-white-off/50 font-sans mb-8">Coming soon — Phase 3</p>
      <button onClick={onNext} className="px-6 py-3 bg-gold text-black text-sm font-sans font-semibold uppercase tracking-widest">
        Continue
      </button>
    </div>
  )
}
