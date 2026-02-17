import type { Metadata } from 'next'
import Link from 'next/link'
import DiamondCutIcon from '@/components/education/DiamondCutIcon'
import { diamondCuts } from '@/lib/education/cuts-data'

export const metadata: Metadata = {
  title: 'Diamond Education',
  description:
    'Learn everything about lab-grown diamonds, diamond cuts, the 4Cs grading system, and certifications. Make an informed choice with True Smith Jewelers.',
  keywords: [
    'diamond education',
    '4Cs diamonds',
    'diamond cut guide',
    'diamond clarity',
    'lab grown vs natural diamonds',
    'IGI vs GIA certification',
  ],
  openGraph: {
    title: 'Diamond Education Center | True Smith Jewelers',
    description:
      'Learn the 4Cs, diamond cuts, certifications, and everything about lab-grown diamonds.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://trusmithjewelers.com/education' },
}

const educationSections = [
  {
    href: '/education/lab-grown',
    title: 'Lab-Grown Diamonds',
    subtitle: 'Real diamonds. Better value.',
    description:
      'Understand exactly what lab-grown diamonds are, why they are real diamonds, how they are created, and why they represent a smarter choice.',
    icon: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
        />
      </svg>
    ),
    badge: 'Start Here',
  },
  {
    href: '/education/4cs',
    title: 'The 4Cs',
    subtitle: 'Cut · Color · Clarity · Carat',
    description:
      'The universal language of diamond quality. Learn exactly what each C means in plain English and how to choose the right combination for your budget.',
    icon: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
        />
      </svg>
    ),
    badge: 'Essential',
  },
  {
    href: '/education/cuts',
    title: 'Diamond Cuts',
    subtitle: '10 shapes explained',
    description:
      'From timeless round brilliants to romantic heart shapes — each cut has a distinct personality. Find yours.',
    icon: <DiamondCutIcon cut="round" size={32} />,
    badge: '10 Cuts',
  },
  {
    href: '/education/certifications',
    title: 'Certifications',
    subtitle: 'IGI & GIA explained',
    description:
      'What certificates mean, why they matter, and why we primarily choose IGI for lab-grown diamonds.',
    icon: (
      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    badge: 'Trust',
  },
]

export default function EducationHubPage() {
  return (
    <div>
      {/* Hero */}
      <section className="mb-16">
        <p className="text-gold text-xs font-sans tracking-[0.3em] uppercase mb-4">
          Education Center
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-white-off mb-6 leading-tight">
          Understand Your <span className="text-gold-gradient italic">Diamond</span>
        </h1>
        <div className="divider-gold mb-6" style={{ marginLeft: 0 }} />
        <p className="text-white-off/60 font-sans text-lg leading-relaxed max-w-2xl">
          Buying a diamond is one of the most meaningful purchases you will ever make. We believe
          knowledge transforms that moment from uncertain to joyful. Everything you need to know —
          no industry jargon, no pressure.
        </p>
      </section>

      {/* Education Sections Grid */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {educationSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="glass-card p-8 group hover:border-gold/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-sm border border-gold/20 bg-gold/5 group-hover:border-gold/40 group-hover:bg-gold/10 transition-all duration-300">
                  {section.icon}
                </div>
                <span className="text-xs font-sans text-gold/60 tracking-widest uppercase border border-gold/20 px-3 py-1">
                  {section.badge}
                </span>
              </div>
              <h2 className="font-serif text-xl text-white-off mb-1 group-hover:text-gold transition-colors duration-200">
                {section.title}
              </h2>
              <p className="text-gold/60 text-sm font-sans mb-3">{section.subtitle}</p>
              <p className="text-white-off/50 font-sans text-sm leading-relaxed">
                {section.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-gold text-sm font-sans">
                <span>Learn more</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Diamond Cuts Preview */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl text-white-off">All Diamond Cuts</h2>
          <Link
            href="/education/cuts"
            className="text-gold text-sm font-sans hover:text-gold-light transition-colors flex items-center gap-2"
          >
            Compare all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-3 md:gap-4">
          {diamondCuts.map((cut) => (
            <Link
              key={cut.id}
              href={`/education/cuts/${cut.id}`}
              className="group flex flex-col items-center gap-3 p-4 border border-white/5 hover:border-gold/30 transition-all duration-300"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                <DiamondCutIcon cut={cut.id} size={48} filled />
              </div>
              <span className="text-white-off/50 group-hover:text-gold text-xs font-sans text-center transition-colors leading-tight">
                {cut.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border border-gold/20 p-10 text-center bg-gold/5">
        <p className="text-gold text-xs font-sans tracking-[0.3em] uppercase mb-4">Ready?</p>
        <h2 className="font-serif text-3xl text-white-off mb-4">Start Your Dream Ring</h2>
        <p className="text-white-off/50 font-sans mb-8 max-w-md mx-auto">
          Now that you know the language, use it. Our ring builder walks you through every decision
          with zero pressure.
        </p>
        <Link
          href="/build"
          className="inline-block px-10 py-4 bg-gold text-black font-sans text-sm tracking-widest uppercase hover:bg-gold-light transition-colors duration-300"
        >
          Build Your Ring →
        </Link>
      </section>
    </div>
  )
}
