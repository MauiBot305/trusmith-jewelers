import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Shield, Award, Heart, Users, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'True Smith Jewelers — our story, philosophy, and commitment to ethical luxury lab-grown diamonds. Family-run, Miami-based jewelers serving clients nationwide.',
  openGraph: {
    title: 'About True Smith Jewelers',
    description: 'Learn about our commitment to ethical luxury and lab-grown diamonds.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://trusmithjewelers.com/about' },
}

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'We believe you deserve to know exactly what you&apos;re buying — and to trust that it&apos;s worth every dollar.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description:
      'Every ring, bracelet, and chain we create carries the weight of the moments it will mark.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'From the diamond cut to the final polish, we hold ourselves to the highest standard in the industry.',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'We&apos;re a local business built on relationships — serving Miami and clients nationwide.',
  },
]

const certifications = [
  'GIA Certified Diamonds',
  'IGI Certified Diamonds',
  'Conflict-Free Guarantee',
  'Lifetime Warranty',
  'Insured Shipping',
  'Secure Checkout',
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-end pb-20 pt-32 overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(212,175,55,0.07)_0%,transparent_70%)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-gold text-xs tracking-[0.4em] uppercase font-sans mb-5">
                Our Story
              </p>
              <h1
                className="font-display text-5xl sm:text-6xl lg:text-7xl text-white-off leading-[1.05] mb-6"
                style={{ fontWeight: 300 }}
              >
                Built on trust.
                <br />
                <span className="text-gold-gradient italic">Crafted with love.</span>
              </h1>
              <div className="divider-gold mb-6 mx-0" />
              <p className="font-sans text-white-off/60 text-lg leading-relaxed max-w-xl">
                True Smith Jewelers was born from a simple belief: everyone deserves access to
                extraordinary diamonds without the extraordinary markup.
              </p>
            </div>
          </div>
        </section>

        {/* Brand story */}
        <section className="section-padding bg-black-deep">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image placeholder */}
              <div className="relative">
                <div className="aspect-[4/5] bg-black-soft border border-gold/10 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85"
                    alt="True Smith craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Gold frame accent */}
                <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border border-gold/15 -z-10" />
              </div>

              {/* Text */}
              <div className="space-y-6">
                <h2 className="font-serif text-display-sm text-white-off">Why True Smith Exists</h2>
                <div className="divider-gold mx-0" />
                <div className="space-y-4 font-sans text-white-off/60 text-base leading-relaxed">
                  <p>
                    Our founder watched friends and family overpay for mined diamonds — paying a
                    premium for scarcity that was, in many cases, artificially manufactured.
                    Meanwhile, lab-grown technology had quietly reached parity in every measurable
                    way.
                  </p>
                  <p>
                    True Smith was built to bridge that gap: bringing the same GIA-certified
                    brilliance that fills the cases of luxury department stores, at prices that
                    reflect the true cost of the craft — not the cost of the marketing.
                  </p>
                  <p>
                    We&rsquo;re a boutique operation. That means personal service, real expertise,
                    and no pressure. Whether you spend $800 or $30,000, you get our full attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="section-padding bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
              Philosophy
            </p>
            <h2 className="font-serif text-display-sm sm:text-display-md text-white-off mb-4">
              Our Values
            </h2>
            <div className="divider-gold mb-16" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, title, description }) => (
                <div key={title} className="glass-card p-8 text-left">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-white-off text-lg font-medium mb-3">{title}</h3>
                  <p
                    className="font-sans text-white-off/50 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Craftsmanship & ethics */}
        <section className="section-padding bg-black-deep">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
                  Craftsmanship
                </p>
                <h2 className="font-serif text-display-sm text-white-off mb-6">
                  Every Detail Matters
                </h2>
                <div className="divider-gold mb-6 mx-0" />
                <div className="space-y-4 font-sans text-white-off/60 text-sm leading-relaxed">
                  <p>
                    We work with master jewelers who have decades of experience in fine jewelry
                    production. Each piece undergoes rigorous quality checks before it reaches you.
                  </p>
                  <p>
                    Our settings are hand-finished. Our prongs are hand-set. Our polishing is done
                    to mirror standards. We don&rsquo;t cut corners because the people wearing our
                    jewelry deserve perfection.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
                  Ethics
                </p>
                <h2 className="font-serif text-display-sm text-white-off mb-6">
                  Conflict-Free, Always
                </h2>
                <div className="divider-gold mb-6 mx-0" />
                <div className="space-y-4 font-sans text-white-off/60 text-sm leading-relaxed">
                  <p>
                    Lab-grown diamonds eliminate the ethical concerns associated with traditional
                    diamond mining — no conflict zones, no forced labor, no environmental
                    destruction.
                  </p>
                  <p>
                    Every diamond we sell comes with full certification and a traceable chain of
                    custody. You know exactly where your stone comes from.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team placeholder */}
        <section className="section-padding bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">The Team</p>
            <h2 className="font-serif text-display-sm text-white-off mb-4">
              Meet the People Behind Your Ring
            </h2>
            <div className="divider-gold mb-16" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { name: 'True Smith', role: 'Founder & Lead Designer' },
                { name: 'Coming Soon', role: 'Master Jeweler' },
                { name: 'Coming Soon', role: 'Diamond Specialist' },
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-black-soft border border-gold/15 mx-auto mb-4 flex items-center justify-center">
                    <Users size={32} className="text-gold/30" />
                  </div>
                  <h3 className="font-serif text-white-off text-base font-medium">{member.name}</h3>
                  <p className="font-sans text-white-off/40 text-xs tracking-wide mt-1">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-12 bg-black-deep border-t border-gold/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white-off/30 text-xs tracking-[0.3em] uppercase font-sans mb-8">
              Certifications &amp; Guarantees
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 px-4 py-2 border border-gold/10 text-white-off/50 text-xs font-sans tracking-wide"
                >
                  <CheckCircle size={12} className="text-gold/50" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
