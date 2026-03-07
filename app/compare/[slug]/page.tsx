import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSiteFromHeaders } from '@/lib/sites'
import { PRODUCTS, type Product } from '@/lib/products'
import { getComparison, getAllComparisonSlugs } from '@/lib/comparisons'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }))
}

/* Parse slug: "{a}-vs-{b}" — product slugs can contain hyphens, so split on -vs- */
function parseCompareSlug(slug: string): [string, string] | null {
  const idx = slug.indexOf('-vs-')
  if (idx === -1) return null
  const a = slug.slice(0, idx)
  const b = slug.slice(idx + 4)
  return [a, b]
}

/* Auto-generate comparison rows from product data */
function buildAutoComparison(a: Product, b: Product) {
  return {
    title: `${a.name} vs ${b.name}: Research Comparison`,
    description: `A detailed head-to-head comparison of ${a.name} and ${b.name}. Compare mechanisms, half-lives, dosing protocols, and research applications.`,
    keywords: [
      `${a.name.toLowerCase()} vs ${b.name.toLowerCase()}`,
      `${a.slug} ${b.slug} comparison`,
      'peptide comparison',
      `${a.category.toLowerCase()} peptide`,
    ],
    rows: [
      { label: 'Category', a: a.category, b: b.category },
      { label: 'Half-Life', a: a.halfLife, b: b.halfLife },
      { label: 'Typical Dosage', a: a.dosage, b: b.dosage },
      { label: 'Primary Focus', a: a.tags.slice(0, 3).join(', '), b: b.tags.slice(0, 3).join(', ') },
    ],
    benefitsA: a.benefits,
    benefitsB: b.benefits,
    descA: a.longDescription,
    descB: b.longDescription,
    verdict: `${a.name} and ${b.name} serve different research purposes. ${a.name} focuses on ${a.tags[0] || a.category.toLowerCase()} while ${b.name} is studied primarily for ${b.tags[0] || b.category.toLowerCase()}. The right choice depends on your specific research goals — they can also be stacked for complementary effects.`,
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comp = getComparison(slug)
  if (comp) {
    return { title: comp.title, description: comp.description, keywords: comp.keywords }
  }
  const parsed = parseCompareSlug(slug)
  if (!parsed) return {}
  const [sa, sb] = parsed
  const a = PRODUCTS[sa]
  const b = PRODUCTS[sb]
  if (!a || !b) return {}
  const auto = buildAutoComparison(a, b)
  return {
    title: auto.title,
    description: auto.description,
    keywords: auto.keywords,
    openGraph: { title: auto.title, description: auto.description, type: 'article' },
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const baseUrl = site.baseUrl || 'https://peptidevault.com'

  /* Try hardcoded first */
  const hardcoded = getComparison(slug)

  /* Parse slug to get products either way */
  const parsed = parseCompareSlug(slug)
  if (!parsed) notFound()
  const [slugA, slugB] = parsed
  const productA = PRODUCTS[slugA]
  const productB = PRODUCTS[slugB]
  if (!productA || !productB) notFound()

  /* Build display data */
  let title: string, description: string, verdict: string
  let rows: { label: string; a: string; b: string }[]
  let benefitsA: string[], benefitsB: string[]
  let descA: string, descB: string

  if (hardcoded) {
    title = hardcoded.title
    description = hardcoded.description
    verdict = hardcoded.verdict
    rows = [
      { label: 'Category', a: hardcoded.a.category, b: hardcoded.b.category },
      { label: 'Mechanism', a: hardcoded.a.mechanism, b: hardcoded.b.mechanism },
      { label: 'Half-Life', a: hardcoded.a.halfLife, b: hardcoded.b.halfLife },
      { label: 'Typical Dosage', a: hardcoded.a.dosage, b: hardcoded.b.dosage },
      { label: 'Primary Use', a: hardcoded.a.primaryUse, b: hardcoded.b.primaryUse },
      { label: 'Onset', a: hardcoded.a.onset, b: hardcoded.b.onset },
      { label: 'Stacks Well With', a: hardcoded.a.stacksWith.join(', '), b: hardcoded.b.stacksWith.join(', ') },
    ]
    benefitsA = hardcoded.a.pros
    benefitsB = hardcoded.b.pros
    descA = hardcoded.a.mechanism
    descB = hardcoded.b.mechanism
  } else {
    const auto = buildAutoComparison(productA, productB)
    title = auto.title
    description = auto.description
    verdict = auto.verdict
    rows = auto.rows
    benefitsA = auto.benefitsA
    benefitsB = auto.benefitsB
    descA = auto.descA
    descB = auto.descB
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name, url: baseUrl },
    mainEntityOfPage: `${baseUrl}/compare/${slug}`,
  }

  const CATEGORY_COLOR: Record<string, string> = {
    'Healing & Recovery': 'from-blue-500 to-cyan-400',
    'Growth Hormone': 'from-purple-600 to-violet-400',
    'Metabolic': 'from-emerald-500 to-teal-400',
    'Anti-Aging': 'from-orange-500 to-rose-400',
    'Cognitive': 'from-indigo-500 to-blue-400',
    'Immune': 'from-green-500 to-emerald-400',
    'Melanocortin': 'from-pink-500 to-rose-400',
  }
  const gradA = CATEGORY_COLOR[productA.category] ?? 'from-indigo-500 to-purple-500'
  const gradB = CATEGORY_COLOR[productB.category] ?? 'from-purple-500 to-indigo-500'

  return (
    <main className="bg-gray-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/compare" className="hover:text-white/70 transition-colors">Compare</Link>
            <span>/</span>
            <span className="text-white/70">{productA.shortName} vs {productB.shortName}</span>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-bold uppercase tracking-widest mb-6">
              Head-to-Head Research Comparison
            </div>

            {/* VS display */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-6">
              <div className="text-right">
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradA} mb-2`}>
                  {productA.category}
                </div>
                <div className="text-2xl md:text-4xl font-extrabold text-white">{productA.name}</div>
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-extrabold text-lg">
                VS
              </div>
              <div className="text-left">
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradB} mb-2`}>
                  {productB.category}
                </div>
                <div className="text-2xl md:text-4xl font-extrabold text-white">{productB.name}</div>
              </div>
            </div>

            <p className="text-white/60 text-base max-w-2xl mx-auto">{description}</p>
          </div>
        </div>
      </div>

      {/* Affiliate disclosure */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 py-2.5 text-center text-xs text-amber-800">
          <strong>Affiliate Disclosure:</strong> This page contains affiliate links. We may earn a commission at no extra cost to you. Content is for research and educational use only.
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Quick CTA cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {[
            { product: productA, grad: gradA },
            { product: productB, grad: gradB },
          ].map(({ product, grad }) => (
            <div key={product.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className={`h-1.5 bg-gradient-to-r ${grad}`} />
              <div className="p-6">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{product.category}</div>
                <div className="text-xl font-extrabold text-gray-900 mb-2">{product.name}</div>
                <p className="text-sm text-gray-500 mb-5 line-clamp-2">{product.description}</p>
                <div className="flex gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Full Details
                  </Link>
                  <Link
                    href={`/go/${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={`flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${grad} hover:opacity-90 transition-all`}
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <th className="px-5 py-4 text-left text-white/60 font-medium w-1/4">Property</th>
                  <th className="px-5 py-4 text-left text-white font-bold">{productA.name}</th>
                  <th className="px-5 py-4 text-left text-white font-bold">{productB.name}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">{row.label}</td>
                    <td className="px-5 py-4 text-gray-800">{row.a}</td>
                    <td className="px-5 py-4 text-gray-800">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Overview / Mechanism */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Research Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { product: productA, desc: descA, grad: gradA },
              { product: productB, desc: descB, grad: gradB },
            ].map(({ product, desc, grad }) => (
              <div key={product.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className={`px-6 py-4 bg-gradient-to-r ${grad}`}>
                  <div className="font-extrabold text-white text-lg">{product.name}</div>
                  <div className="text-white/70 text-xs font-medium">{product.category}</div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Research Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { product: productA, benefits: benefitsA, grad: gradA },
              { product: productB, benefits: benefitsB, grad: gradB },
            ].map(({ product, benefits, grad }) => (
              <div key={product.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${grad}`} />
                <div className="p-6">
                  <div className="font-bold text-gray-900 text-base mb-4">{product.name}</div>
                  <ul className="space-y-2.5">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-12">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest mb-4">
                Research Verdict
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-4">{productA.shortName} vs {productB.shortName}: Bottom Line</h2>
              <p className="text-white/85 leading-relaxed text-base">{verdict}</p>
            </div>
          </div>
        </section>

        {/* Try another comparison */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <h3 className="font-bold text-gray-900 mb-2">Compare Other Peptides</h3>
            <p className="text-sm text-gray-500 mb-4">Mix and match any of the 19 peptides in our catalog for a custom side-by-side comparison.</p>
            <Link href="/compare" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 transition-all hover:shadow-md">
              Build New Comparison
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </section>

        {/* Navigation footer */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <Link href="/compare" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
            All Comparisons
          </Link>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            Shop Peptides
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
          <strong>Research Use Only:</strong> All information on this page is for educational and research purposes only. These compounds are not FDA-approved for human use. Consult a licensed healthcare professional before any application.
        </div>
      </div>
    </main>
  )
}
