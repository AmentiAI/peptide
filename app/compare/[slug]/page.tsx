import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSiteFromHeaders } from '@/lib/sites'
import { PRODUCTS } from '@/lib/products'
import { getComparison, getAllComparisonSlugs } from '@/lib/comparisons'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comp = getComparison(slug)
  if (!comp) return {}
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  return {
    title: `${comp.title}`,
    description: comp.description,
    keywords: comp.keywords,
    openGraph: {
      title: comp.title,
      description: comp.description,
      type: 'article',
    },
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const comp = getComparison(slug)
  if (!comp) notFound()

  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)

  const productA = PRODUCTS[comp.a.slug]
  const productB = PRODUCTS[comp.b.slug]

  const rows = [
    { label: 'Category', a: comp.a.category, b: comp.b.category },
    { label: 'Mechanism', a: comp.a.mechanism, b: comp.b.mechanism },
    { label: 'Half-Life', a: comp.a.halfLife, b: comp.b.halfLife },
    { label: 'Typical Dosage', a: comp.a.dosage, b: comp.b.dosage },
    { label: 'Primary Use', a: comp.a.primaryUse, b: comp.b.primaryUse },
    { label: 'Onset', a: comp.a.onset, b: comp.b.onset },
    { label: 'Stacks Well With', a: comp.a.stacksWith.join(', '), b: comp.b.stacksWith.join(', ') },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comp.title,
    description: comp.description,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name, url: site.baseUrl },
    mainEntityOfPage: `${site.baseUrl}/compare/${slug}`,
  }

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <span className="text-gray-400">Compare</span>
          <span>/</span>
          <span className="text-gray-700">{comp.a.name} vs {comp.b.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-14 text-center" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 bg-white/20 text-white border border-white/30">
            Head-to-Head Comparison
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {comp.a.name} vs {comp.b.name}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">{comp.description}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Quick CTA cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {[{ product: productA, side: comp.a }, { product: productB, side: comp.b }].map(({ product, side }) => (
            <div key={side.slug} className="border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="font-bold text-2xl text-gray-900 mb-1">{side.name}</div>
              <div className="text-sm text-gray-500 mb-4">{side.category}</div>
              <div className="flex gap-3 justify-center">
                <Link
                  href={`/products/${side.slug}`}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Full Details
                </Link>
                {product && (
                  <Link
                    href={`/go/${side.slug}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    Buy Now
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200" style={{ backgroundColor: 'var(--primary)' }}>
                  <th className="px-5 py-4 text-left text-white/70 font-medium w-1/4">Property</th>
                  <th className="px-5 py-4 text-left text-white font-bold">{comp.a.name}</th>
                  <th className="px-5 py-4 text-left text-white font-bold">{comp.b.name}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-4 font-semibold text-gray-600">{row.label}</td>
                    <td className="px-5 py-4 text-gray-700">{row.a}</td>
                    <td className="px-5 py-4 text-gray-700">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pros & Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{ side: comp.a }, { side: comp.b }].map(({ side }) => (
              <div key={side.slug} className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 font-bold text-white text-lg" style={{ backgroundColor: 'var(--primary)' }}>
                  {side.name}
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="font-semibold text-green-700 mb-2">✅ Pros</div>
                    <ul className="space-y-1.5">
                      {side.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-red-600 mb-2">⚠️ Considerations</div>
                    <ul className="space-y-1.5">
                      {side.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-14">
          <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--primary)' }}>
            <h2 className="text-2xl font-bold text-white mb-4">Verdict</h2>
            <p className="text-white/90 leading-relaxed text-lg">{comp.verdict}</p>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
          <strong>Research Use Only:</strong> All information on this page is for educational and research purposes only.
          These compounds are not FDA-approved for human use. Consult a licensed professional before any application.
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
