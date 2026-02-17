'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const educationNav = [
  {
    label: 'Education Hub',
    href: '/education',
    exact: true,
  },
  {
    label: 'Lab-Grown Diamonds',
    href: '/education/lab-grown',
  },
  {
    label: 'Diamond Cuts',
    href: '/education/cuts',
    children: [
      { label: 'Round Brilliant', href: '/education/cuts/round' },
      { label: 'Oval', href: '/education/cuts/oval' },
      { label: 'Princess', href: '/education/cuts/princess' },
      { label: 'Cushion', href: '/education/cuts/cushion' },
      { label: 'Emerald', href: '/education/cuts/emerald' },
      { label: 'Marquise', href: '/education/cuts/marquise' },
      { label: 'Pear', href: '/education/cuts/pear' },
      { label: 'Radiant', href: '/education/cuts/radiant' },
      { label: 'Asscher', href: '/education/cuts/asscher' },
      { label: 'Heart', href: '/education/cuts/heart' },
    ],
  },
  {
    label: 'The 4Cs',
    href: '/education/4cs',
  },
  {
    label: 'Certifications',
    href: '/education/certifications',
  },
]

function NavLink({
  href,
  label,
  exact = false,
  isChild = false,
}: {
  href: string
  label: string
  exact?: boolean
  isChild?: boolean
}) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={href as string}
      className={`
        block transition-all duration-200 font-sans
        ${isChild ? 'text-sm py-1 pl-4' : 'py-2'}
        ${isActive ? 'text-gold' : 'text-white-off/60 hover:text-white-off'}
      `}
    >
      {isActive && !isChild && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold mr-2 mb-0.5" />
      )}
      {label}
    </Link>
  )
}

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pathname = usePathname()
  const onCutsSection = pathname.startsWith('/education/cuts')

  return (
    <div className="min-h-screen bg-black">
      {/* Top nav bar */}
      <header className="border-b border-white/5 sticky top-0 z-50 bg-black/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-white-off text-lg hover:text-gold transition-colors"
          >
            True Smith <span className="text-gold">Jewelers</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/education"
              className="text-gold text-sm font-sans tracking-widest uppercase"
            >
              Education
            </Link>
            <Link
              href="/build"
              className="text-sm font-sans text-white-off/60 hover:text-white-off transition-colors tracking-widest uppercase"
            >
              Build Your Ring
            </Link>
          </div>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden text-white-off/60 hover:text-white-off"
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileNavOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-white/5 bg-black-deep px-4 py-4">
            {educationNav.map((item) => (
              <div key={item.href}>
                <NavLink href={item.href} label={item.label} exact={item.exact} />
                {item.children && onCutsSection && (
                  <div className="ml-2 border-l border-white/10 pl-2">
                    {item.children.map((child) => (
                      <NavLink key={child.href} href={child.href} label={child.label} isChild />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-white/5">
              <Link
                href="/build"
                className="block w-full text-center py-2.5 border border-gold/40 text-gold text-sm font-sans tracking-widest uppercase hover:bg-gold/10 transition-colors"
              >
                Start Your Dream Ring →
              </Link>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12 py-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <p className="text-white-off/30 text-xs font-sans tracking-[0.2em] uppercase mb-6">
                Learn
              </p>
              <nav className="space-y-0.5">
                {educationNav.map((item) => (
                  <div key={item.href}>
                    <NavLink href={item.href} label={item.label} exact={item.exact} />
                    {item.children && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          onCutsSection ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="ml-2 border-l border-gold/20 pl-3 mt-1 mb-2 space-y-0.5">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.href}
                              href={child.href}
                              label={child.label}
                              isChild
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* CTA */}
              <div className="mt-10 pt-6 border-t border-white/5">
                <p className="text-white-off/40 text-xs font-sans mb-4 leading-relaxed">
                  Ready to find your perfect diamond?
                </p>
                <Link
                  href="/build"
                  className="block text-center py-3 border border-gold/40 text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold/10 transition-colors"
                >
                  Build Your Ring →
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
