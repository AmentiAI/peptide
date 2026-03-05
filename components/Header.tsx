import Link from 'next/link'
import type { SiteConfig } from '@/lib/sites'

interface HeaderProps {
  site: SiteConfig
}

export default function Header({ site }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {site.name.charAt(0)}
            </div>
            <span className="font-bold text-lg text-gray-900">{site.name}</span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Products
            </Link>
            <Link href="/guides" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Research Guides
            </Link>
          </nav>

          {/* CTA */}
          <Link
            href="/products"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Shop Now
          </Link>

          {/* Mobile menu icon */}
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
