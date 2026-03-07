import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/lib/products'
import { PRODUCT_CONTENT } from '@/lib/product-content'
import { getSiteFromHeaders } from '@/lib/sites'
import BuyButton from '@/components/BuyButton'
import StickyBuyBar from '@/components/StickyBuyBar'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = PRODUCTS[slug]
  if (!product) return {}

  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const baseUrl = site.baseUrl || 'https://peptidevault.com'

  const title = `${product.name} Research Peptide — ${product.category}`
  const description = `${product.description} Dosage: ${product.dosage}. Half-life: ${product.halfLife}. Lab-tested with Certificate of Analysis. For research use only.`

  return {
    title,
    description,
    keywords: [
      product.name, ...product.tags, product.category,
      'buy ' + product.name, product.name + ' dosage', product.name + ' research',
      'research peptides', 'lab tested', 'certificate of analysis',
    ],
    alternates: { canonical: `${baseUrl}/products/${slug}` },
    openGraph: {
      title, description, type: 'website',
      url: `${baseUrl}/products/${slug}`,
      images: [{ url: product.image, width: 800, height: 600, alt: product.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [product.image] },
  }
}

const CATEGORY_GRADIENT: Record<string, string> = {
  'Healing & Recovery': 'from-blue-600 to-cyan-500',
  'Growth Hormone': 'from-purple-600 to-violet-500',
  'Metabolic': 'from-emerald-600 to-teal-500',
  'Anti-Aging': 'from-orange-600 to-rose-500',
  'Cognitive': 'from-indigo-600 to-blue-500',
  'Immune': 'from-green-600 to-emerald-500',
  'Melanocortin': 'from-pink-600 to-rose-500',
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = PRODUCTS[slug]
  if (!product) notFound()

  const content = PRODUCT_CONTENT[slug]

  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const baseUrl = site.baseUrl || 'https://peptidevault.com'

  const relatedProducts = Object.values(PRODUCTS)
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 3)

  const gradient = CATEGORY_GRADIENT[product.category] ?? 'from-indigo-600 to-purple-600'

  const stackProducts = content?.stacksWith
    .map((s) => ({ ...s, product: PRODUCTS[s.slug] }))
    .filter((s) => s.product) ?? []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription,
    image: product.image,
    sku: product.slug,
    category: product.category,
    brand: { '@type': 'Brand', name: 'Pantheon Peptides' },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/go/${slug}`,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Pantheon Peptides' },
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Dosage', value: product.dosage },
      { '@type': 'PropertyValue', name: 'Half-life', value: product.halfLife },
      { '@type': 'PropertyValue', name: 'Purity', value: '99%+' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className={`bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white/90">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm p-6 border border-white/20 shadow-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={420}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div className="order-1 lg:order-2">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30">
                  {product.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-100 border border-emerald-400/30">
                  Research Use Only
                </span>
                {product.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/30 text-yellow-100 border border-yellow-400/30">
                    ⭐ Popular Choice
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">{product.description}</p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Dosage', value: product.dosage },
                  { label: 'Half-life', value: product.halfLife },
                  { label: 'Purity', value: '99%+' },
                  { label: 'Form', value: content?.dosingProtocol.form ?? 'Lyophilized powder' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/10 border border-white/20 rounded-xl p-3 backdrop-blur-sm">
                    <div className="text-[10px] text-white/50 font-medium uppercase tracking-wider mb-1">{label}</div>
                    <div className="text-sm font-bold text-white leading-tight">{value}</div>
                  </div>
                ))}
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-3 text-xs text-white/70 mb-7">
                {['✅ 99%+ Purity', '📋 COA Included', '🚚 Fast US Shipping', '🔒 Secure Checkout'].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <BuyButton product={product} size="lg" />
                <Link
                  href="/guides"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-all text-sm"
                >
                  Research Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Affiliate disclosure ──────────────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-2.5 text-center text-xs text-amber-800">
          <strong>Affiliate Disclosure:</strong> This page contains affiliate links. We may earn a commission at no extra cost to you. All content is for educational and research purposes only.
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left: article content ──────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            <section>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
                <span className={`w-1 h-7 bg-gradient-to-b ${gradient} rounded-full`} />
                What Is {product.name}?
              </h2>
              <p className="text-gray-700 leading-relaxed text-[1.05rem]">{product.longDescription}</p>
            </section>

            {/* Mechanism of Action */}
            {content?.mechanism && (
              <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <h2 className="text-lg font-extrabold text-blue-900 mb-3 flex items-center gap-2">
                  <span className="text-blue-500">🔬</span> Mechanism of Action
                </h2>
                <p className="text-blue-800 leading-relaxed text-sm">{content.mechanism}</p>
              </section>
            )}

            {/* Research Benefits */}
            <section>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-5 flex items-center gap-3">
                <span className={`w-1 h-7 bg-gradient-to-b ${gradient} rounded-full`} />
                Research Applications & Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 text-sm font-medium leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Research Highlights */}
            {content?.researchHighlights && content.researchHighlights.length > 0 && (
              <section>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-5 flex items-center gap-3">
                  <span className={`w-1 h-7 bg-gradient-to-b ${gradient} rounded-full`} />
                  Key Research Findings
                </h2>
                <div className="space-y-3">
                  {content.researchHighlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 text-white text-xs font-bold`}>
                        {i + 1}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Dosing Protocol */}
            {content?.dosingProtocol && (
              <section>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-5 flex items-center gap-3">
                  <span className={`w-1 h-7 bg-gradient-to-b ${gradient} rounded-full`} />
                  Research Dosing Protocol
                </h2>
                <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
                  <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                    {[
                      { label: 'Form', value: content.dosingProtocol.form },
                      { label: 'Route', value: content.dosingProtocol.route },
                      ...(content.dosingProtocol.loading ? [{ label: 'Loading Phase', value: content.dosingProtocol.loading }] : []),
                      { label: 'Maintenance Dose', value: content.dosingProtocol.maintenance },
                      { label: 'Timing', value: content.dosingProtocol.timing },
                      { label: 'Cycle Length', value: content.dosingProtocol.cycle },
                      { label: 'Storage', value: content.dosingProtocol.storage },
                    ].map(({ label, value }) => (
                      <div key={label} className="px-5 py-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
                        <div className="text-sm font-semibold text-gray-800">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3 italic">
                  Dosing information is derived from published animal research and is provided for educational purposes only.
                </p>
              </section>
            )}

            {/* Synergistic Stacks */}
            {stackProducts.length > 0 && (
              <section>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-5 flex items-center gap-3">
                  <span className={`w-1 h-7 bg-gradient-to-b ${gradient} rounded-full`} />
                  Synergistic Stack Combinations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stackProducts.map(({ slug: s, name, synergy, product: sp }) => (
                    <div key={s} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className={`h-1 bg-gradient-to-r ${CATEGORY_GRADIENT[sp!.category] ?? gradient}`} />
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{sp!.category}</div>
                            <div className="font-extrabold text-gray-900">{name}</div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">{synergy}</p>
                        <div className="flex gap-2">
                          <Link href={`/products/${s}`} className="flex-1 text-center text-xs font-semibold py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                            Details
                          </Link>
                          <Link href={`/go/${s}`} target="_blank" rel="noopener noreferrer nofollow"
                            className={`flex-1 text-center text-xs font-bold py-2 rounded-lg text-white bg-gradient-to-r ${CATEGORY_GRADIENT[sp!.category] ?? gradient} hover:opacity-90 transition-all`}>
                            Buy Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/stacks" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                    View all research stacks →
                  </Link>
                </div>
              </section>
            )}

            {/* FAQ */}
            {content?.faqs && content.faqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-5 flex items-center gap-3">
                  <span className={`w-1 h-7 bg-gradient-to-b ${gradient} rounded-full`} />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {content.faqs.map(({ q, a }, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                      <h3 className="font-bold text-gray-900 mb-2 text-sm">{q}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Research disclaimer */}
            <div className="rounded-xl border border-red-100 bg-red-50 p-5">
              <div className="flex gap-3">
                <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
                <div>
                  <h4 className="font-bold text-red-900 mb-1 text-sm">Research Use Only</h4>
                  <p className="text-red-700 text-xs leading-relaxed">
                    {product.name} is supplied strictly for in-vitro research and laboratory use. All information provided is for educational and research reference only. This product has not been evaluated by the FDA and is not intended for human consumption, therapeutic use, or clinical application.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                All Products
              </Link>
              <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                Research Guides
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

          {/* ── Sidebar ────────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">

              {/* Purchase card */}
              <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">🧬</span>
                    <h3 className="font-extrabold text-gray-900 text-lg">{product.shortName}</h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-5">For research use only · Verified vendor</p>

                  <div className="space-y-0 mb-6 rounded-xl border border-gray-100 overflow-hidden">
                    {[
                      { label: 'Dosage', value: product.dosage },
                      { label: 'Half-life', value: product.halfLife },
                      { label: 'Form', value: content?.dosingProtocol.form ?? 'Lyophilized powder' },
                      { label: 'Purity', value: '99%+', highlight: true },
                      { label: 'Category', value: product.category },
                    ].map(({ label, value, highlight }, i) => (
                      <div key={label} className={`flex justify-between items-start px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <span className="text-gray-500 font-medium">{label}</span>
                        <span className={`font-semibold text-right max-w-[55%] ${highlight ? 'text-emerald-600' : 'text-gray-900'}`}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <BuyButton product={product} size="lg" className="w-full mb-3" />
                  <Link href={`/compare`} className="block text-center text-xs text-gray-400 hover:text-gray-600 transition-colors mt-2">
                    Compare with other peptides →
                  </Link>
                </div>
              </div>

              {/* Quality assurance */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quality Assurance</h4>
                <div className="space-y-3">
                  {[
                    { icon: '🔬', label: 'Third-Party Lab Tested' },
                    { icon: '📋', label: 'COA Available on Request' },
                    { icon: '✅', label: '99%+ Purity Verified' },
                    { icon: '🚚', label: 'Fast US Shipping' },
                    { icon: '🔒', label: 'Secure Checkout' },
                    { icon: '❄️', label: 'Cold-Chain Handled' },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-3 text-sm text-gray-700">
                      <span>{icon}</span>
                      <span className="font-medium">{label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/go/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={`mt-5 block w-full text-center py-3 rounded-xl text-white font-bold text-sm bg-gradient-to-r ${gradient} hover:opacity-90 transition-all hover:shadow-md`}
                >
                  Shop at Pantheon Peptides →
                </Link>
              </div>

              {/* Related guides */}
              {product.tags.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Related Guides</h4>
                  <div className="space-y-2">
                    <Link href="/guides" className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">Research Blog →</span>
                    </Link>
                    <Link href="/stacks" className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">Peptide Stacks →</span>
                    </Link>
                    <Link href={`/compare`} className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">Compare Peptides →</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 leading-relaxed">
                <strong>Research Use Only:</strong> Not for human consumption. Not evaluated by the FDA. This content is educational only.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ─────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">More in {product.category}</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden">
                  <div className="relative aspect-[4/3] bg-gray-50">
                    <Image src={p.image} alt={p.name} fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{p.category}</div>
                    <h3 className="font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">{p.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <StickyBuyBar product={product} />
    </>
  )
}
