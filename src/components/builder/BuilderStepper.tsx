'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useBuilderStore } from '@/store/builderStore'

const STEPS = [
  { number: 1, label: 'Diamond', shortLabel: '💎' },
  { number: 2, label: 'Setting', shortLabel: '💍' },
  { number: 3, label: 'Metal', shortLabel: '✨' },
  { number: 4, label: 'Add-Ons', shortLabel: '🔧' },
  { number: 5, label: 'Preview', shortLabel: '👁️' },
  { number: 6, label: 'Quote', shortLabel: '📋' },
]

export function BuilderStepper() {
  const { currentStep, completedSteps, setStep, canNavigateToStep } = useBuilderStore()

  return (
    <div className="w-full bg-black-deep border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav aria-label="Ring builder progress">
          <ol className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const isCompleted = completedSteps.includes(step.number)
              const isCurrent = currentStep === step.number
              const isNavigable = canNavigateToStep(step.number)
              const isLast = index === STEPS.length - 1

              return (
                <li key={step.number} className="flex items-center flex-1">
                  {/* Step button */}
                  <button
                    onClick={() => isNavigable && setStep(step.number)}
                    disabled={!isNavigable}
                    aria-current={isCurrent ? 'step' : undefined}
                    className={cn(
                      'flex flex-col items-center gap-1 group transition-all duration-200',
                      isNavigable ? 'cursor-pointer' : 'cursor-not-allowed'
                    )}
                  >
                    {/* Circle */}
                    <div
                      className={cn(
                        'relative flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300',
                        isCompleted && 'bg-gold border-gold text-black shadow-gold',
                        isCurrent &&
                          !isCompleted &&
                          'border-gold bg-black-deep text-gold animate-gold-pulse',
                        !isCurrent && !isCompleted && 'border-white/20 bg-black-deep text-white/40',
                        isNavigable &&
                          !isCurrent &&
                          !isCompleted &&
                          'group-hover:border-gold/50 group-hover:text-gold/60'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" strokeWidth={3} />
                      ) : (
                        <span className="text-xs font-bold">{step.number}</span>
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={cn(
                        'text-xs font-medium transition-colors duration-200 hidden sm:block',
                        isCurrent && 'text-gold',
                        isCompleted && 'text-gold/80',
                        !isCurrent && !isCompleted && 'text-white/40',
                        isNavigable && !isCurrent && !isCompleted && 'group-hover:text-white/60'
                      )}
                    >
                      {step.label}
                    </span>
                    {/* Mobile: emoji only */}
                    <span className="text-xs sm:hidden">{step.shortLabel}</span>
                  </button>

                  {/* Connector line */}
                  {!isLast && (
                    <div className="flex-1 mx-2">
                      <div
                        className={cn(
                          'h-px transition-all duration-500',
                          completedSteps.includes(step.number) ? 'bg-gold' : 'bg-white/10'
                        )}
                      />
                    </div>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </div>
  )
}
