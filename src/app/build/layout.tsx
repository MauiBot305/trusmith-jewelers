import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Build Your Dream Ring',
  description:
    'Design your perfect custom engagement ring step by step. Choose your lab-grown diamond, setting style, metal, and personalize every detail. Deposit to begin.',
  keywords: [
    'custom engagement ring',
    'build a ring',
    'ring configurator',
    'design your ring',
    'custom ring builder',
    'lab grown diamond ring',
  ],
  openGraph: {
    title: 'Build Your Dream Engagement Ring | True Smith Jewelers',
    description: 'Design a fully custom engagement ring with a certified lab-grown diamond.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://trusmithjewelers.com/build' },
}

export default function BuildLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
