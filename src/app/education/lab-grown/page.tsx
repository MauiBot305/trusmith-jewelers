import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lab-Grown Diamonds',
  description:
    'Learn what lab-grown diamonds are, why they are real diamonds, how they are created, and their ethical, environmental, and value advantages.',
}

const sections = [
  {
    id: 'what-they-are',
    label: 'What They Are',
  },
  {
    id: 'why-real',
    label: 'Why They Are Real',
  },
  {
    id: 'creation-process',
    label: 'Creation Process',
  },
  {
    id: 'ethical-benefits',
    label: 'Ethical Benefits',
  },
  {
    id: 'environmental-benefits',
    label: 'Environmental Benefits',
  },
  {
    id: 'value-advantages',
    label: 'Value Advantages',
  },
]

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-gold flex-shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function LabGrownPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans text-white-off/30 mb-8">
        <Link href="/education" className="hover:text-gold transition-colors">
          Education
        </Link>
        <span>/</span>
        <span className="text-white-off/60">Lab-Grown Diamonds</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <p className="text-gold text-xs font-sans tracking-[0.3em] uppercase mb-4">Guide</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white-off mb-6 leading-tight">
          Lab-Grown <span className="text-gold-gradient italic">Diamonds</span>
        </h1>
        <div className="divider-gold mb-6" style={{ marginLeft: 0 }} />
        <p className="text-white-off/60 font-sans text-lg leading-relaxed max-w-2xl">
          Real diamonds. Grown in a laboratory. Every bit as beautiful, durable, and certified as
          their mined counterparts — with a better origin story and a better price.
        </p>
      </div>

      {/* Quick Nav */}
      <div className="flex flex-wrap gap-2 mb-12">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-xs font-sans text-white-off/50 hover:text-gold border border-white/10 hover:border-gold/30 px-3 py-1.5 transition-all duration-200"
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* Section: What They Are */}
      <section id="what-they-are" className="mb-14 scroll-mt-28">
        <h2 className="font-serif text-2xl text-white-off mb-4">What They Are</h2>
        <div className="w-8 h-px bg-gold mb-6" />
        <p className="text-white-off/70 font-sans text-base leading-relaxed mb-4">
          Lab-grown diamonds are real diamonds created in controlled laboratory environments using
          advanced technological processes that replicate the exact conditions under which natural
          diamonds form deep within the Earth.
        </p>
        <p className="text-white-off/70 font-sans text-base leading-relaxed">
          The result is a diamond that is chemically, physically, and optically identical to one
          mined from the ground — with one critical difference: you know exactly where it came from.
        </p>
      </section>

      {/* Section: Why Real */}
      <section id="why-real" className="mb-14 scroll-mt-28">
        <h2 className="font-serif text-2xl text-white-off mb-4">Why They Are Real Diamonds</h2>
        <div className="w-8 h-px bg-gold mb-6" />
        <p className="text-white-off/70 font-sans text-base leading-relaxed mb-6">
          The most common misconception is that lab-grown diamonds are &quot;fake&quot; or
          &quot;simulated.&quot; They are not. Here is what the science says:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: 'Identical chemical composition',
              body: 'Pure carbon crystal structure — exactly like a mined diamond.',
            },
            {
              title: 'Same physical properties',
              body: 'Hardness of 10 on the Mohs scale, identical brilliance and fire.',
            },
            {
              title: 'Same optical properties',
              body: 'Light refracts and reflects identically to a mined diamond.',
            },
            {
              title: 'Indistinguishable without equipment',
              body: 'Even gemologists cannot tell them apart with the naked eye.',
            },
            {
              title: 'Certified by the same labs',
              body: 'IGI and GIA both certify lab-grown diamonds to the same standards.',
            },
            {
              title: 'Legally and scientifically a diamond',
              body: 'The FTC defines a diamond by its crystal structure — not its origin.',
            },
          ].map((item) => (
            <div key={item.title} className="glass-card p-5 flex gap-3">
              <CheckIcon />
              <div>
                <p className="text-white-off font-sans text-sm font-medium mb-1">{item.title}</p>
                <p className="text-white-off/50 font-sans text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Creation Process */}
      <section id="creation-process" className="mb-14 scroll-mt-28">
        <h2 className="font-serif text-2xl text-white-off mb-4">Creation Process</h2>
        <div className="w-8 h-px bg-gold mb-6" />
        <p className="text-white-off/70 font-sans text-base leading-relaxed mb-8">
          Two proven technologies are used to grow lab diamonds. Both produce identical results —
          real diamond crystals.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gold/20 p-6 bg-gold/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-lg text-white-off">HPHT</h3>
                <p className="text-gold/60 text-xs font-sans">High Pressure High Temperature</p>
              </div>
            </div>
            <p className="text-white-off/60 font-sans text-sm leading-relaxed">
              Mimics the Earth&apos;s natural diamond-forming process. A diamond seed is placed
              under extreme pressure (1.5 million PSI) and heat (2,700°F), causing carbon atoms to
              crystallize around it. The process takes 1–2 weeks, compared to the Earth&apos;s 1–3
              billion years.
            </p>
          </div>
          <div className="border border-gold/20 p-6 bg-gold/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304-.001a3.75 3.75 0 010 5.304m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-lg text-white-off">CVD</h3>
                <p className="text-gold/60 text-xs font-sans">Chemical Vapor Deposition</p>
              </div>
            </div>
            <p className="text-white-off/60 font-sans text-sm leading-relaxed">
              Grows diamond layer by layer from carbon-rich gas in a vacuum chamber. The gas is
              ionized into plasma, and carbon atoms attach to a diamond seed and crystallize one
              atomic layer at a time. CVD offers precise control over the final diamond&apos;s
              quality and characteristics.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Ethical Benefits */}
      <section id="ethical-benefits" className="mb-14 scroll-mt-28">
        <h2 className="font-serif text-2xl text-white-off mb-4">Ethical Benefits</h2>
        <div className="w-8 h-px bg-gold mb-6" />
        <p className="text-white-off/70 font-sans text-base leading-relaxed mb-6">
          When you choose a lab-grown diamond, you know exactly where your stone came from. No
          exceptions, no asterisks.
        </p>
        <ul className="space-y-3">
          {[
            {
              label: '100% conflict-free, guaranteed',
              detail: 'No involvement in regions with armed conflict financing.',
            },
            {
              label: 'No mining community displacement',
              detail:
                'Traditional diamond mining has displaced millions of people. Lab-grown has zero impact.',
            },
            {
              label: 'Transparent supply chain',
              detail: 'From seed to stone — every step is documented and traceable.',
            },
            {
              label: 'Traceable origin',
              detail: 'The facility, method, and date of creation are known.',
            },
          ].map((item) => (
            <li key={item.label} className="flex gap-4 py-3 border-b border-white/5">
              <CheckIcon />
              <div>
                <p className="text-white-off font-sans text-sm font-medium">{item.label}</p>
                <p className="text-white-off/40 font-sans text-sm mt-0.5">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Section: Environmental Benefits */}
      <section id="environmental-benefits" className="mb-14 scroll-mt-28">
        <h2 className="font-serif text-2xl text-white-off mb-4">Environmental Benefits</h2>
        <div className="w-8 h-px bg-gold mb-6" />
        <p className="text-white-off/70 font-sans text-base leading-relaxed mb-6">
          Diamond mining moves over 250 million tons of earth per year globally. Lab-grown diamonds
          need none of it.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              stat: '~90%',
              label: 'Less land disruption',
              detail: 'No open-pit or underground mining operations.',
            },
            {
              stat: '~50%',
              label: 'Less water usage',
              detail: 'Mining uses millions of liters per carat. Labs use a fraction.',
            },
            {
              stat: 'Zero',
              label: 'Large-scale land displacement',
              detail: 'Lab facilities fit on a city block.',
            },
            {
              stat: 'Lower',
              label: 'Carbon footprint per carat',
              detail: 'Especially true when labs use renewable energy.',
            },
          ].map((item) => (
            <div key={item.stat} className="glass-card p-5">
              <p className="font-serif text-2xl text-gold mb-1">{item.stat}</p>
              <p className="text-white-off text-sm font-sans font-medium mb-1">{item.label}</p>
              <p className="text-white-off/40 text-xs font-sans leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Value Advantages */}
      <section id="value-advantages" className="mb-14 scroll-mt-28">
        <h2 className="font-serif text-2xl text-white-off mb-4">Value Advantages</h2>
        <div className="w-8 h-px bg-gold mb-6" />
        <p className="text-white-off/70 font-sans text-base leading-relaxed mb-6">
          Lab-grown diamonds offer dramatically better value — not a compromise, but a smarter
          allocation of what you invest in.
        </p>
        <div className="border border-gold/20 bg-gold/5 p-8 mb-6">
          <p className="font-serif text-display-md text-gold text-center mb-2">
            30–50% Better Value
          </p>
          <p className="text-white-off/50 text-center font-sans text-sm">
            than a comparable natural diamond
          </p>
        </div>
        <ul className="space-y-3">
          {[
            'Same beauty, same durability, same certified quality.',
            'More carat weight for the same budget.',
            'Same cut, same color, same clarity grades.',
            'Investment in what matters: the moment, not the origin story.',
          ].map((item) => (
            <li key={item} className="flex gap-3 text-white-off/60 font-sans text-sm">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="border border-gold/20 p-8 text-center bg-gold/5">
        <h2 className="font-serif text-2xl text-white-off mb-3">Ready to find your diamond?</h2>
        <p className="text-white-off/50 font-sans text-sm mb-6 max-w-md mx-auto">
          Browse our IGI-certified lab-grown diamonds, or jump straight to building your dream ring.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/build"
            className="px-8 py-3 bg-gold text-black font-sans text-sm tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            Build Your Ring →
          </Link>
          <Link
            href="/education/4cs"
            className="px-8 py-3 border border-gold/40 text-gold font-sans text-sm tracking-widest uppercase hover:bg-gold/10 transition-colors"
          >
            Learn the 4Cs
          </Link>
        </div>
      </section>
    </div>
  )
}
