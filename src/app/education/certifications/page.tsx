import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Diamond Certifications — IGI vs GIA',
  description:
    'Understand diamond certifications from IGI and GIA. Learn what is in a diamond certificate and why True Smith Jewelers primarily uses IGI for lab-grown diamonds.',
}

const certificateContents = [
  {
    field: 'Shape & Cutting Style',
    desc: 'The diamond shape (Round Brilliant, Oval, etc.) and how it was faceted.',
  },
  { field: 'Measurements', desc: 'Precise dimensions in millimeters to the hundredth.' },
  { field: 'Carat Weight', desc: 'Exact weight to two decimal places.' },
  { field: 'Origin Confirmation', desc: 'Explicitly states Natural or Laboratory-Grown.' },
  { field: 'Cut Grade', desc: 'Overall cut quality assessment: Ideal, Excellent, Very Good, etc.' },
  { field: 'Color Grade', desc: 'Letter grade from D (colorless) to Z (light yellow).' },
  { field: 'Clarity Grade', desc: 'Clarity grade from FL (Flawless) to I (Included).' },
  { field: 'Polish & Symmetry', desc: 'Evaluation of surface quality and facet alignment.' },
  {
    field: 'Fluorescence',
    desc: 'How the diamond reacts to UV light (None, Faint, Medium, Strong).',
  },
  {
    field: 'Inclusion Plotting',
    desc: 'A diagram mapping the exact location and type of all inclusions.',
  },
  {
    field: 'Security Features',
    desc: 'Hologram, barcode, and unique report number for verification.',
  },
]

const comparisons = [
  {
    aspect: 'Founded',
    igi: '1975, Antwerp, Belgium',
    gia: '1931, United States',
  },
  {
    aspect: 'Specialty',
    igi: 'Industry leader for lab-grown diamonds',
    gia: 'Historically focused on natural diamonds',
  },
  {
    aspect: 'Turnaround',
    igi: '1–2 weeks',
    gia: '2–3 weeks',
  },
  {
    aspect: 'Cost',
    igi: 'More cost-efficient',
    gia: 'Higher certification fees',
  },
  {
    aspect: 'Grading Standards',
    igi: 'Consistent, well-calibrated',
    gia: 'Stricter, slightly more conservative',
  },
  {
    aspect: 'Lab-Grown Expertise',
    igi: 'Specialized protocols and graders',
    gia: 'Expanding, but newer to lab-grown',
  },
  {
    aspect: 'Industry Recognition',
    igi: 'Internationally respected',
    gia: 'Internationally respected',
  },
  {
    aspect: 'Availability at True Smith',
    igi: 'Primary — all standard inventory',
    gia: 'Available on special request',
  },
]

export default function CertificationsPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans text-white-off/30 mb-8">
        <Link href="/education" className="hover:text-gold transition-colors">
          Education
        </Link>
        <span>/</span>
        <span className="text-white-off/60">Certifications</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <p className="text-gold text-xs font-sans tracking-[0.3em] uppercase mb-4">Guide</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white-off mb-6 leading-tight">
          Diamond <span className="text-gold-gradient italic">Certifications</span>
        </h1>
        <div className="divider-gold mb-6" style={{ marginLeft: 0 }} />
        <p className="text-white-off/60 font-sans text-lg leading-relaxed max-w-2xl">
          A diamond certificate is a third-party verification of exactly what you are buying. It
          removes subjectivity, confirms origin, and protects your investment. Here is everything
          you need to know.
        </p>
      </div>

      {/* Why Certificates Matter */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl text-white-off mb-4">Why Certificates Matter</h2>
        <div className="w-8 h-px bg-gold mb-6" />
        <p className="text-white-off/70 font-sans text-base leading-relaxed mb-4">
          Without a certificate, a diamond&apos;s quality is whatever the seller says it is. With a
          certificate from an independent gemological laboratory, every quality attribute is
          verified by trained experts with no financial stake in the sale.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: '🔬',
              title: 'Independent Verification',
              body: 'Graded by experts with no connection to the sale. No conflict of interest.',
            },
            {
              icon: '📄',
              title: 'Permanent Record',
              body: 'A permanent document describing your stone. Useful for insurance and resale.',
            },
            {
              icon: '✅',
              title: 'Origin Confirmation',
              body: 'Explicitly states lab-grown or natural. No ambiguity, ever.',
            },
          ].map((item) => (
            <div key={item.title} className="glass-card p-6">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-serif text-base text-white-off mb-2">{item.title}</h3>
              <p className="text-white-off/50 font-sans text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Two Labs */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl text-white-off mb-4">The Two Certifying Labs</h2>
        <div className="w-8 h-px bg-gold mb-6" />
        <p className="text-white-off/70 font-sans text-base leading-relaxed mb-8">
          We work with two internationally respected grading laboratories. Both produce reliable,
          detailed diamond reports. Here is how they compare.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* IGI */}
          <div className="border border-gold/30 bg-gold/5 p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-gold font-sans text-xs tracking-[0.2em] uppercase mb-1">
                  Our Primary Partner
                </p>
                <h3 className="font-serif text-2xl text-white-off">IGI</h3>
                <p className="text-white-off/50 font-sans text-sm">
                  International Gemological Institute
                </p>
              </div>
              <div className="w-12 h-12 border border-gold/40 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
            </div>
            <ul className="space-y-2">
              {[
                'Founded 1975 in Antwerp, Belgium',
                "One of the world's largest grading labs",
                'Industry leader in lab-grown diamond certification',
                'Specialized graders with lab-grown expertise',
                'Faster turnaround — 1 to 2 weeks',
                'More cost-efficient certification',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-white-off/70 font-sans">
                  <svg
                    className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* GIA */}
          <div className="glass-card p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white-off/30 font-sans text-xs tracking-[0.2em] uppercase mb-1">
                  Available on Request
                </p>
                <h3 className="font-serif text-2xl text-white-off">GIA</h3>
                <p className="text-white-off/50 font-sans text-sm">
                  Gemological Institute of America
                </p>
              </div>
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white-off/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
            </div>
            <ul className="space-y-2">
              {[
                'Founded 1931 in the United States',
                'Created the original 4Cs grading system',
                'Historically focused on natural diamonds',
                'Stricter, more conservative grading standards',
                'Longer processing — 2 to 3 weeks',
                'Higher certification costs',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-white-off/60 font-sans">
                  <svg
                    className="w-3.5 h-3.5 text-white-off/30 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl text-white-off mb-4">Side-by-Side Comparison</h2>
        <div className="w-8 h-px bg-gold mb-6" />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 text-white-off/30 text-xs font-sans tracking-widest uppercase w-1/3">
                  Feature
                </th>
                <th className="text-left py-3 px-4 text-gold text-xs font-sans tracking-widest uppercase w-1/3">
                  IGI
                </th>
                <th className="text-left py-3 pl-4 text-white-off/50 text-xs font-sans tracking-widest uppercase w-1/3">
                  GIA
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr
                  key={row.aspect}
                  className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
                >
                  <td className="py-3 pr-4 text-white-off/40 text-sm font-sans">{row.aspect}</td>
                  <td className="py-3 px-4 text-white-off/80 text-sm font-sans">{row.igi}</td>
                  <td className="py-3 pl-4 text-white-off/60 text-sm font-sans">{row.gia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* What's in a Certificate */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl text-white-off mb-4">What&apos;s in a Certificate</h2>
        <div className="w-8 h-px bg-gold mb-6" />
        <p className="text-white-off/70 font-sans text-base leading-relaxed mb-8">
          Every certified diamond comes with a detailed report. Here is what each section tells you:
        </p>
        <div className="space-y-1">
          {certificateContents.map((item, i) => (
            <div
              key={item.field}
              className="flex gap-4 py-3 border-b border-white/5 items-start group hover:bg-gold/5 transition-colors px-1"
            >
              <span className="text-gold/30 text-xs font-sans w-5 flex-shrink-0 pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-white-off font-sans text-sm font-medium">{item.field}</p>
                <p className="text-white-off/40 font-sans text-sm mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="mb-14 border border-gold/20 bg-gold/5 p-8">
        <h2 className="font-serif text-2xl text-white-off mb-4">Our Approach</h2>
        <div className="w-8 h-px bg-gold mb-6" />
        <p className="text-white-off/70 font-sans text-base leading-relaxed mb-4">
          We primarily offer{' '}
          <strong className="text-white-off">IGI-certified lab-grown diamonds</strong>. IGI is the
          industry leader for lab-grown certification — their graders have specialized expertise in
          lab-grown stones, their turnaround is faster, and their pricing is more efficient, which
          we pass on to you.
        </p>
        <p className="text-white-off/70 font-sans text-base leading-relaxed mb-6">
          For clients who specifically want GIA certification — whether for resale purposes or
          personal preference — we can source GIA-certified stones on request. The stone will be
          real, beautiful, and graded to the same 4Cs standards. It will simply cost a bit more and
          take a bit longer.
        </p>
        <p className="text-white-off/50 font-sans text-sm italic">
          Every diamond we sell comes with a certificate. No exceptions.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl text-white-off mb-4">Common Questions</h2>
        <div className="w-8 h-px bg-gold mb-6" />
        <div className="space-y-4">
          {[
            {
              q: 'Can I look up my certificate online?',
              a: 'Yes. Both IGI and GIA have online verification portals. Enter your report number to view your certificate at any time.',
            },
            {
              q: 'Is an IGI certificate less credible than GIA?',
              a: 'No. Both are globally respected. IGI is often considered more appropriate for lab-grown diamonds due to their specialized expertise in this category.',
            },
            {
              q: 'What does "eye-clean" mean if my certificate shows inclusions?',
              a: 'Many diamonds have inclusions that are noted on a certificate but are completely invisible without magnification. VS2 and SI1 grades are typically eye-clean — you would need a 10x loupe to see anything.',
            },
            {
              q: 'Will GIA grade a lab-grown diamond differently than IGI?',
              a: 'GIA applies stricter grading standards generally, which means a diamond graded G-VS2 by IGI might receive H-SI1 by GIA. This is not a quality difference — it is a grading difference. The diamond is the same.',
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-white/5 pb-4">
              <p className="font-serif text-base text-white-off mb-2">{faq.q}</p>
              <p className="text-white-off/50 font-sans text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="border border-gold/20 p-8 text-center bg-gold/5">
        <h2 className="font-serif text-2xl text-white-off mb-3">
          Every stone. Every time. Certified.
        </h2>
        <p className="text-white-off/50 font-sans text-sm mb-6 max-w-md mx-auto">
          Browse our IGI-certified lab-grown diamonds with full documentation, or start building
          your ring and filter by certificate type.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/build"
            className="px-10 py-4 bg-gold text-black font-sans text-sm tracking-widest uppercase hover:bg-gold-light transition-colors"
          >
            Build Your Ring →
          </Link>
          <Link
            href="/education/4cs"
            className="px-10 py-4 border border-gold/40 text-gold font-sans text-sm tracking-widest uppercase hover:bg-gold/10 transition-colors"
          >
            Learn the 4Cs
          </Link>
        </div>
      </div>
    </div>
  )
}
