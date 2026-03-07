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
import HeroCarousel from '@/components/HeroCarousel'
import { HOME_SLIDES } from '@/lib/carousel-slides'
import StackSpotlight from '@/components/StackSpotlight'
import HowItWorks from '@/components/HowItWorks'

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

  const carouselSlides = HOME_SLIDES.map((slide) => ({
    ...slide,
    headline: slide.headline,
    subheadline: slide.subheadline,
  }))
  // Personalize first slide with site tagline
  carouselSlides[0] = {
    ...carouselSlides[0],
    headline: site.tagline,
    subheadline: site.description + ' All products are strictly for research purposes only.',
  }

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel
        slides={carouselSlides}
        primaryColor={site.primaryColor}
        height="lg"
      />

      {/* Trust Bar */}
      <section className="trust-bar">
        {[
          { icon: '🔬', text: 'Third-Party Lab Tested' },
          { icon: '📋', text: 'COA on Every Order' },
          { icon: '🚚', text: 'Fast US Shipping' },
          { icon: '💳', text: 'Secure Checkout' },
          { icon: '✅', text: '99%+ Purity Standard' },
        ].map(({ icon, text }) => (
          <div key={text} className="trust-item">
            <span className="trust-item-icon">{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Research Peptides</h2>
            <p className="text-gray-600 mt-1">Most popular compounds for research applications</p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium hover:underline"
            style={{ color: 'var(--primary)' }}
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* About / Info section */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Researchers Choose {site.name}
              </h2>
              <p className="text-gray-600 mb-6">
                We curate the highest-quality peptide vendors with verified purity standards. Every product listed
                comes with a Certificate of Analysis from independent third-party laboratories.
              </p>
              <ul className="space-y-3">
                {[
                  'Vendors vetted for manufacturing quality',
                  'Independent lab verification on all batches',
                  'Detailed research guides and dosage information',
                  'Transparent affiliate relationships disclosed',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-4xl font-extrabold" style={{ color: 'var(--primary)' }}>99%+</div>
                <div className="text-gray-600 font-medium">Average Purity</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">12+</div>
                  <div className="text-xs text-gray-500 mt-1">Research Compounds</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">COA</div>
                  <div className="text-xs text-gray-500 mt-1">Every Batch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Guides CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl p-8 md:p-12 text-center" style={{ backgroundColor: 'var(--primary)' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            New to Research Peptides?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Read our in-depth research guides covering mechanisms of action, dosing protocols, and the latest studies.
          </p>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            style={{ color: 'var(--primary)' }}
          >
            Browse Research Guides
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Popular Research Stacks */}
      <StackSpotlight />

      {/* JSON-LD WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.name,
            url: site.baseUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${site.baseUrl}/products`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </>
  )
}
