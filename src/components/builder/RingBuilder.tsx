'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { useBuilderStore } from '@/store/builderStore'
import { BuilderStepper } from './BuilderStepper'
import { BuilderSidebar } from './BuilderSidebar'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// Lazy load step components
const Step1Diamond = dynamic(() => import('./steps/Step1Diamond'), {
  ssr: false,
  loading: () => <StepSkeleton />,
})
const Step2Setting = dynamic(() => import('./steps/Step2Setting'), {
  ssr: false,
  loading: () => <StepSkeleton />,
})
const Step3Metal = dynamic(() => import('./steps/Step3Metal'), {
  ssr: false,
  loading: () => <StepSkeleton />,
})
const Step4AddOns = dynamic(() => import('./steps/Step4AddOns'), {
  ssr: false,
  loading: () => <StepSkeleton />,
})
const Step5Preview = dynamic(() => import('./steps/Step5Preview'), {
  ssr: false,
  loading: () => <StepSkeleton />,
})
const Step6Quote = dynamic(() => import('./steps/Step6Quote'), {
  ssr: false,
  loading: () => <StepSkeleton />,
})

function StepSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-8">
      <div className="h-8 bg-white/5 rounded w-64" />
      <div className="h-4 bg-white/5 rounded w-96" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-white/5 rounded-lg" />
        ))}
      </div>
    </div>
  )
}

export function RingBuilder() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentStep, setStep, canNavigateToStep, completedSteps } = useBuilderStore()

  // Sync URL step param with store on mount
  useEffect(() => {
    const urlStep = searchParams.get('step')
    if (urlStep) {
      const step = parseInt(urlStep, 10)
      if (step >= 1 && step <= 6 && canNavigateToStep(step)) {
        setStep(step)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update URL when step changes
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('step', String(currentStep))
    router.replace(url.pathname + url.search, { scroll: false })
  }, [currentStep, router])

  const canGoNext = () => {
    if (currentStep === 1) return completedSteps.includes(1)
    if (currentStep === 2) return completedSteps.includes(2)
    if (currentStep === 3) return completedSteps.includes(3)
    if (currentStep === 4) return true // optional step
    if (currentStep === 5) return true
    return false
  }

  const handleNext = () => {
    if (currentStep < 6 && canGoNext()) {
      setStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Stepper */}
      <BuilderStepper />

      {/* Main layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Step content */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 lg:py-12 pb-32 lg:pb-12">
          <div key={currentStep}>
            {currentStep === 1 && <Step1Diamond />}
            {currentStep === 2 && <Step2Setting />}
            {currentStep === 3 && <Step3Metal />}
            {currentStep === 4 && <Step4AddOns />}
            {currentStep === 5 && <Step5Preview />}
            {currentStep === 6 && <Step6Quote />}
          </div>
        </main>

        {/* Persistent sidebar */}
        <BuilderSidebar />
      </div>

      {/* Bottom navigation bar */}
      <div className="border-t border-white/10 bg-black-deep px-4 py-4 sticky bottom-0 z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200',
              currentStep === 1
                ? 'text-white/20 cursor-not-allowed'
                : 'text-white/60 hover:text-white hover:bg-white/5 border border-white/10'
            )}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {currentStep < 6 ? (
            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className={cn(
                'flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200',
                canGoNext()
                  ? 'bg-gold text-black hover:bg-gold-light shadow-gold'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              )}
            >
              {currentStep === 5 ? 'Get Quote & Reserve' : 'Continue'}
              <ArrowRight size={16} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
