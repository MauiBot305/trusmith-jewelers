import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DiamondCutIcon from '@/components/education/DiamondCutIcon'
import { diamondCuts, getCutById, isValidCutId } from '@/lib/education/cuts-data'

interface PageProps {
  params: { cut: string }
}

export async function generateStaticParams() {
  return diamondCuts.map((cut) => ({ cut: cut.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cut = getCutById(params.cut)
  if (!cut) return { title: 'Cut Not Found' }

  return {
    title: `${cut.name} Diamond Cut`,
    description: `${cut.teaser} ${cut.description}`,
  }
}

export default function DiamondCutPage({ params }: PageProps) {
  if (!isValidCutId(params.cut)) notFound()

  const cut = getCutById(params.cut)!
  const currentIndex = diamondCuts.findIndex((c) => c.id === cut.id)
  const prevCut = currentIndex > 0 ? diamondCuts[currentIndex - 1] : null
  const nextCut = currentIndex < diamondCuts.length - 1 ? diamondCuts[currentIndex + 1] : null

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans text-white-off/30 mb-8 flex-wrap">
        <Link href="/education" className="hover:text-gold transition-colors">
          Education
        </Link>
        <span>/</span>
        <Link href="/education/cuts" className="hover:text-gold transition-colors">
          Diamond Cuts
        </Link>
        <span>/</span>
        <span className="text-white-off/60">{cut.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start gap-6 mb-6">
          {/* Large SVG Icon */}
          <div className="flex-shrink-0 hidden sm:block">
            <div className="p-5 border border-gold/20 bg-gold/5">
              <DiamondCutIcon cut={cut.id} size={96} filled />
            </div>
          </div>
          <div>
            <p className="text-gold text-xs font-sans tracking-[0.3em] uppercase mb-3">
              Diamond Cut
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-white-off mb-4 leading-tight">
              {cut.name}
            </h1>
            <p className="text-gold/80 font-display text-xl italic">{cut.teaser}</p>
          </div>
        </div>
        <div className="divider-gold" style={{ marginLeft: 0 }} />
      </div>

      {/* Mobile icon */}
      <div className="flex justify-center sm:hidden mb-8">
        <div className="p-6 border border-gold/20 bg-gold/5">
          <DiamondCutIcon cut={cut.id} size={100} filled />
        </div>
      </div>

      {/* Description */}
      <section className="mb-12">
        <p className="text-white-off/70 font-sans text-lg leading-relaxed">{cut.description}</p>
      </section>

      {/* Details Grid */}
      <section className="mb-12 grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h2 className="font-serif text-base text-white-off mb-4 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            Key Characteristics
          </h2>
          <ul className="space-y-2">
            {cut.characteristics.map((trait) => (
              <li key={trait} className="flex gap-2 text-sm text-white-off/60 font-sans">
                <svg
                  className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="2" />
                </svg>
                {trait}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-6">
          <h2 className="font-serif text-base text-white-off mb-4 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            Best For
          </h2>
          <ul className="space-y-2">
            {cut.bestFor.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-white-off/60 font-sans">
                <svg
                  className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5"
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

        <div className="glass-card p-6">
          <h2 className="font-serif text-base text-white-off mb-4 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
              />
            </svg>
            Style Keywords
          </h2>
          <div className="flex flex-wrap gap-2">
            {cut.styleKeywords.map((kw) => (
              <span
                key={kw}
                className="text-xs font-sans text-gold/70 border border-gold/20 px-3 py-1.5"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Is This Your Cut? */}
      <section className="mb-12 border border-gold/20 bg-gold/5 p-8">
        <h2 className="font-serif text-2xl text-white-off mb-3">
          Is the {cut.name} right for you?
        </h2>
        <p className="text-white-off/50 font-sans text-sm leading-relaxed mb-6">
          The best way to know is to build your ring and see it with your chosen setting. Our
          builder lets you explore freely — no commitment, no pressure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/build"
            className="px-8 py-3 bg-gold text-black font-sans text-sm tracking-widest uppercase hover:bg-gold-light transition-colors text-center"
          >
            Build With {cut.name} →
          </Link>
          <Link
            href="/education/cuts"
            className="px-8 py-3 border border-gold/40 text-gold font-sans text-sm tracking-widest uppercase hover:bg-gold/10 transition-colors text-center"
          >
            Compare All Cuts
          </Link>
        </div>
      </section>

      {/* Next/Prev navigation */}
      <div className="flex items-center gap-4">
        {prevCut ? (
          <Link
            href={`/education/cuts/${prevCut.id}`}
            className="flex items-center gap-3 flex-1 group py-4 border-t border-white/5 hover:border-gold/20 transition-colors"
          >
            <svg
              className="w-4 h-4 text-white-off/30 group-hover:text-gold transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <div>
              <p className="text-white-off/30 text-xs font-sans mb-0.5">Previous</p>
              <p className="text-white-off/70 font-serif text-sm group-hover:text-gold transition-colors">
                {prevCut.name}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        <Link
          href="/education/cuts"
          className="px-4 py-2 border border-white/10 text-white-off/30 text-xs font-sans hover:border-gold/30 hover:text-gold transition-all"
        >
          All Cuts
        </Link>

        {nextCut ? (
          <Link
            href={`/education/cuts/${nextCut.id}`}
            className="flex items-center gap-3 flex-1 justify-end group py-4 border-t border-white/5 hover:border-gold/20 transition-colors text-right"
          >
            <div>
              <p className="text-white-off/30 text-xs font-sans mb-0.5">Next</p>
              <p className="text-white-off/70 font-serif text-sm group-hover:text-gold transition-colors">
                {nextCut.name}
              </p>
            </div>
            <svg
              className="w-4 h-4 text-white-off/30 group-hover:text-gold transition-colors"
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
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  )
}
