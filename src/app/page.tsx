import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'True Smith Jewelers | Lab-Grown Diamond Engagement Rings',
  description:
    'Affordable luxury lab-grown diamond engagement rings, tennis bracelets, and fine jewelry. Build your perfect custom ring with ethical, certified diamonds. Lifetime warranty, 30-day returns.',
  openGraph: {
    title: 'True Smith Jewelers | Lab-Grown Diamond Engagement Rings',
    description: 'Build your dream engagement ring with ethical, certified lab-grown diamonds.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://trusmithjewelers.com',
  },
}
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import TrustStrip from '@/components/home/TrustStrip'
import FeatureTiles from '@/components/home/FeatureTiles'
import LabGrownSection from '@/components/home/LabGrownSection'
import FeaturedCarousel from '@/components/home/FeaturedCarousel'
import EducationTeaser from '@/components/home/EducationTeaser'
import InstagramPreview from '@/components/home/InstagramPreview'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <FeatureTiles />
        <LabGrownSection />
        <FeaturedCarousel />
        <EducationTeaser />
        <InstagramPreview />
      </main>
      <Footer />
    </>
  )
}
