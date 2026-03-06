import { headers } from 'next/headers'
import Link from 'next/link'
import { getSiteFromHeaders } from '@/lib/sites'
import { getSiteFromDB } from '@/lib/db-sites'
import { db } from '@/db'
import { sites as sitesTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getPageSections } from '@/lib/db-sections'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { FEATURED_PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

async function getSiteIdByDomain(host: string): Promise<number | null> {
  try {
    const domain = host.split(':')[0].replace(/^www\./, '')
    const rows = await db.select({ id: sitesTable.id }).from(sitesTable).where(eq(sitesTable.domain, domain)).limit(1)
    return rows[0]?.id ?? null
  } catch {
    return null
  }
}

export default async function HomePage() {
  const headersList = await headers()
  const host =
    headersList.get('x-site-host') ||
    headersList.get('x-forwarded-host') ||
    headersList.get('host') ||
    'peptidevault.com'

  const dbSite = await getSiteFromDB(host).catch(() => null)
  const site = dbSite ?? getSiteFromHeaders(headersList)

  const siteId = await getSiteIdByDomain(host).catch(() => null)
  const dbSections = siteId ? await getPageSections(siteId, 'home').catch(() => []) : []

  if (dbSections.length > 0) {
    return (
      <SectionRenderer
        sections={dbSections.map((s) => ({
          id: s.id,
          sectionType: s.sectionType,
          isVisible: s.isVisible,
          content: s.content,
        }))}
      />
    )
  }

  return (
    <>
      {/* 2026 Ultra-Modern Hero */}
      <section className="hero-2026">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-content">
          <div className="max-w-4xl">
            <div className="hero-badge">
              <span className="hero-pulse" />
              Third-Party Lab Tested • Certificate of Analysis Included
            </div>
            
            <h1 className="hero-title">
              Premium Research Peptides
              <br />
              <span className="gradient-text">For Scientific Discovery</span>
            </h1>
            
            <p className="hero-subtitle">
              {site.description || "Access pharmaceutical-grade research peptides with verified 99%+ purity. Every batch includes independent third-party testing and Certificate of Analysis."}
            </p>
            
            <div className="hero-cta">
              <Link href="/products" className="btn btn-primary btn-lg">
                Browse Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/guides" className="btn btn-glass btn-lg">
                Research Guides
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        {[
          { icon: '🔬', text: 'Third-Party Lab Tested' },
          { icon: '✓', text: '99%+ Purity Verified' },
          { icon: '📋', text: 'COA on Every Order' },
          { icon: '🚚', text: 'Fast Discreet Shipping' },
          { icon: '🔒', text: 'Secure Checkout' },
        ].map(({ icon, text }) => (
          <div key={text} className="trust-item">
            <div className="trust-icon">{icon}</div>
            <span>{text}</span>
          </div>
        ))}
      </section>

      {/* Featured Products - Bento Grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Featured Research Peptides</h2>
            <p className="section-subtitle">
              Pharmaceutical-grade compounds for advanced research applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products" className="btn btn-primary btn-lg hover-lift">
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Bento Grid */}
      <section className="section bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Why Researchers Choose Us</h2>
            <p className="section-subtitle">
              Premium quality, transparent testing, and scientific excellence
            </p>
          </div>
          
          <div className="bento-grid">
            {/* Feature Card 1 - Large */}
            <div className="bento-feature">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">99%+ Purity</h3>
                  <p className="text-white/80 text-lg">Every single batch tested</p>
                </div>
                <div className="text-6xl">🔬</div>
              </div>
              <p className="text-white/90 mb-6">
                Independent third-party laboratory testing on every batch ensures pharmaceutical-grade quality. 
                HPLC, mass spectrometry, and purity verification included.
              </p>
              <Link href="/testing" className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all">
                View Testing Process
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Feature Card 2 */}
            <div className="bento-card">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2">Certificate of Analysis</h3>
              <p className="text-gray-600">
                Every order includes a detailed COA from independent laboratories showing exact purity levels and composition.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bento-card">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Discreet packaging with expedited shipping options available. Track your order every step of the way.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bento-card">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Bank-level encryption, secure payment processing, and complete privacy protection for all orders.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="bento-card">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Research Guides</h3>
              <p className="text-gray-600">
                Comprehensive guides covering mechanisms of action, protocols, and latest research studies.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="bento-card">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2">Multiple Payment Options</h3>
              <p className="text-gray-600">
                Credit cards, cryptocurrency, and secure payment gateways accepted for your convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-in">
              <div className="text-5xl font-black mb-2">99%+</div>
              <div className="text-white/80 font-medium">Average Purity</div>
            </div>
            <div className="animate-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-black mb-2">12+</div>
              <div className="text-white/80 font-medium">Research Peptides</div>
            </div>
            <div className="animate-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-black mb-2">100%</div>
              <div className="text-white/80 font-medium">Lab Tested</div>
            </div>
            <div className="animate-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-5xl font-black mb-2">24/7</div>
              <div className="text-white/80 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">
              Find the perfect research peptide for your specific application
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Healing & Recovery', icon: '💊', count: 2, gradient: 'from-blue-500 to-cyan-500' },
              { name: 'Growth Hormone', icon: '📈', count: 3, gradient: 'from-purple-500 to-pink-500' },
              { name: 'Metabolic', icon: '⚡', count: 3, gradient: 'from-green-500 to-yellow-500' },
              { name: 'Anti-Aging', icon: '🧬', count: 1, gradient: 'from-orange-500 to-red-500' },
              { name: 'Immune Support', icon: '🛡️', count: 1, gradient: 'from-teal-500 to-cyan-500' },
              { name: 'Nootropic', icon: '🧠', count: 2, gradient: 'from-indigo-500 to-violet-500' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
                className="glass-card hover-lift hover-glow group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-5xl w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <div className="text-sm font-bold text-gray-400">
                    {category.count} {category.count === 1 ? 'Product' : 'Products'}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 group-hover:text-purple-600 transition-colors">
                  Explore Category
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            New to Research Peptides?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start with our comprehensive guides covering mechanisms of action, research protocols, and safety guidelines.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides" className="btn btn-primary btn-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Read Research Guides
            </Link>
            <Link href="/products" className="btn btn-glass btn-lg">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Final Trust Section */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card text-center max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🔬</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Research Use Only
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All products are strictly for laboratory research purposes only. Not for human consumption or therapeutic use. 
              By purchasing, you acknowledge that you are a qualified researcher operating within applicable regulations.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
