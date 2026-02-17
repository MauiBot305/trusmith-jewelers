'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { useBuilderStore } from '@/store/builderStore'
import { BuilderStepper } from './BuilderStepper'
import { BuilderSidebar } from './BuilderSidebar'

// Lazy load step components
const Step1Diamond = dynamic(
  () => import('./steps/Step1Diamond').then((m) => ({ default: m.Step1Diamond })),
  { ssr: false, loading: () => <StepSkeleton /> }
)
const Step2Setting = dynamic(
  () => import('./steps/Step2Setting').then((m) => ({ default: m.Step2Setting })),
  { ssr: false, loading: () => <StepSkeleton /> }
)
const Step3Metal = dynamic(
  () => import('./steps/Step3Metal').then((m) => ({ default: m.Step3Metal })),
  { ssr: false, loading: () => <StepSkeleton /> }
)
const Step4AddOns = dynamic(
  () => import('./steps/Step4AddOns').then((m) => ({ default: m.Step4AddOns })),
  { ssr: false, loading: () => <StepSkeleton /> }
)
const Step5Preview = dynamic(
  () => import('./steps/Step5Preview').then((m) => ({ default: m.Step5Preview })),
  { ssr: false, loading: () => <StepSkeleton /> }
)
const Step6Quote = dynamic(
  () => import('./steps/Step6Quote').then((m) => ({ default: m.Step6Quote })),
  { ssr: false, loading: () => <StepSkeleton /> }
)

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
  const { currentStep, setStep, canNavigateToStep } = useBuilderStore()

  // Sync URL step param with store
  useEffect(() => {
    const urlStep = searchParams.get('step')
    if (urlStep) {
      const step = parseInt(urlStep, 10)
      if (step >= 1 && step <= 6 && canNavigateToStep(step)) {
        setStep(step)
      }
    }
  }, [searchParams, setStep, canNavigateToStep])

  // Update URL when step changes
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('step', String(currentStep))
    router.replace(url.pathname + url.search, { scroll: false })
  }, [currentStep, router])

  const handleNext = () => {
    if (currentStep < 6) {
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
          <div
            className={cn(
              'transition-opacity duration-300',
              'animate-in fade-in slide-in-from-right-4 duration-500'
            )}
            key={currentStep}
          >
            {currentStep === 1 && <Step1Diamond onNext={handleNext} />}
            {currentStep === 2 && <Step2Setting onNext={handleNext} onBack={handleBack} />}
            {currentStep === 3 && <Step3Metal onNext={handleNext} onBack={handleBack} />}
            {currentStep === 4 && <Step4AddOns onNext={handleNext} onBack={handleBack} />}
            {currentStep === 5 && <Step5Preview onBack={handleBack} />}
            {currentStep === 6 && <Step6Quote onBack={handleBack} />}
          </div>
        </main>

        {/* Persistent sidebar */}
        <BuilderSidebar />
      </div>
    </div>
  )
}
