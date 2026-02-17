import Link from 'next/link'
import { ArrowRight, BookOpen, BarChart3, Scissors } from 'lucide-react'

const topics = [
  {
    icon: BookOpen,
    title: 'Lab vs. Natural',
    description: 'Understand the difference and why lab-grown makes sense for most buyers.',
    href: '/education/lab-vs-natural',
  },
  {
    icon: BarChart3,
    title: 'The 4Cs',
    description: 'Cut, Color, Clarity, Carat — master the grading system in minutes.',
    href: '/education/4cs',
  },
  {
    icon: Scissors,
    title: 'Diamond Cuts',
    description: 'Round, oval, cushion, emerald — find the shape that speaks to you.',
    href: '/education/diamond-cuts',
  },
]

export default function EducationTeaser() {
  return (
    <section className="section-padding bg-black-deep relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left: CTA block */}
          <div className="lg:col-span-2">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
              Education Center
            </p>
            <h2 className="font-serif text-display-sm sm:text-display-md text-white-off mb-6">
              Understand Your Diamond
            </h2>
            <div className="divider-gold mb-8 mx-0" />
            <p className="font-sans text-white-off/50 text-base leading-relaxed mb-8">
              Buying a diamond is one of the most meaningful purchases you&rsquo;ll make. Our
              education center gives you the knowledge to choose with confidence.
            </p>
            <Link
              href="/education"
              className="group inline-flex items-center gap-3 px-6 py-3 border border-gold/40 text-gold font-sans text-sm tracking-widest uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300"
            >
              Learn More
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: topics */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topics.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={href}
                href={href}
                className="group glass-card p-6 hover:border-gold/40 transition-all duration-300 flex flex-col"
              >
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="font-serif text-white-off text-base font-medium mb-2 group-hover:text-gold transition-colors">
                  {title}
                </h3>
                <p className="font-sans text-white-off/40 text-xs leading-relaxed flex-1">
                  {description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-gold/60 text-xs font-sans uppercase tracking-wider group-hover:text-gold transition-colors">
                  Read{' '}
                  <ArrowRight
                    size={10}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
