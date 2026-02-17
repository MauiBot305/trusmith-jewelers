import type { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Build Your Ring | True Smith Jewelers',
  description:
    'Design your perfect lab-grown diamond engagement ring. Choose your cut, setting, metal, and personalize every detail.',
}

const RingBuilder = dynamic(
  () => import('@/components/builder/RingBuilder').then((m) => ({ default: m.RingBuilder })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-gold/60 text-sm tracking-widest uppercase font-sans">
            Loading Ring Builder...
          </p>
        </div>
      </div>
    ),
  }
)

export default function BuildPage() {
  return (
    <Suspense>
      <RingBuilder />
    </Suspense>
  )
}
