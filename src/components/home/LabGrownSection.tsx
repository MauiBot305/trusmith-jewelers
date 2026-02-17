import { Gem, Leaf, Globe, TrendingUp } from 'lucide-react'

const benefits = [
  {
    icon: Gem,
    title: 'Real Diamonds',
    description:
      'Chemically, physically, and optically identical to mined diamonds. Certified by GIA and IGI.',
  },
  {
    icon: Leaf,
    title: 'Ethical Sourcing',
    description:
      'Conflict-free, always. Every stone is grown in a controlled environment with a clear chain of custody.',
  },
  {
    icon: Globe,
    title: 'Environmental Care',
    description:
      'Dramatically lower carbon footprint than mining. No land disruption, no ecosystem damage.',
  },
  {
    icon: TrendingUp,
    title: 'Exceptional Value',
    description:
      'Get up to 70% more diamond for your budget. Same brilliance, same quality — better price.',
  },
]

export default function LabGrownSection() {
  return (
    <section className="section-padding bg-black-deep relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_80%,rgba(212,175,55,0.04)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: text */}
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-sans mb-4">
              Why Lab-Grown
            </p>
            <h2 className="font-serif text-display-sm sm:text-display-md text-white-off mb-6 leading-tight">
              Real diamonds.{' '}
              <span className="text-gold-gradient">Ethical &amp; conflict‑free.</span> Better value.
            </h2>
            <div className="divider-gold mb-8 mx-0" />
            <p className="font-sans text-white-off/60 text-base leading-relaxed mb-8">
              Lab-grown diamonds are the future of fine jewelry. They share every property of
              earth-mined diamonds — the same hardness (10 on Mohs scale), the same fire and
              brilliance — but with a clean conscience and more carats for your investment.
            </p>
            <p className="font-sans text-white-off/40 text-sm leading-relaxed italic">
              &ldquo;I wouldn&rsquo;t sell my clients anything I wouldn&rsquo;t wear myself.&rdquo;
              <br />
              <span className="not-italic text-gold/60">— True Smith, Founder</span>
            </p>
          </div>

          {/* Right: benefit cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="glass-card p-6 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="font-serif text-white-off text-base font-medium mb-2">{title}</h3>
                <p className="font-sans text-white-off/50 text-xs leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
