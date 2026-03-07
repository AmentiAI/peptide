import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getGuide as getGuideFromFS, getGuides as getGuidesFromFS } from '@/lib/guides'
import { getGuide as getGuideFromDB } from '@/lib/db-guides'
import { PRODUCTS } from '@/lib/products'
import { getSiteFromHeaders } from '@/lib/sites'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const guides = await getGuidesFromFS().catch(() => [])
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const baseUrl = site.baseUrl || 'https://peptidevault.com'

  const dbGuide = await getGuideFromDB(slug).catch(() => null)
  const title = dbGuide?.title ?? (await getGuideFromFS(slug).catch(() => null))?.frontmatter.title ?? slug
  const description = dbGuide?.description ?? (await getGuideFromFS(slug).catch(() => null))?.frontmatter.description ?? ''

  return {
    title: `${title} | ${site.name} Research Blog`,
    description,
    alternates: { canonical: `${baseUrl}/guides/${slug}` },
    openGraph: { title, description, type: 'article', url: `${baseUrl}/guides/${slug}` },
    twitter: { card: 'summary_large_image', title, description },
  }
}

/* ── Custom MDX components ──────────────────────────────────────── */

function ResearchNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <span className="text-xl flex-shrink-0">🔬</span>
      <div className="text-sm text-blue-800 leading-relaxed">{children}</div>
    </div>
  )
}

function ImportantNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <span className="text-xl flex-shrink-0">⚠️</span>
      <div className="text-sm text-amber-800 leading-relaxed">{children}</div>
    </div>
  )
}

function KeyFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="not-prose inline-flex flex-col items-center text-center px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100">
      <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-1">{label}</span>
      <span className="text-base font-bold text-indigo-900">{value}</span>
    </div>
  )
}

function InlineProductCTA({ slug, name, category }: { slug: string; name: string; category: string }) {
  return (
    <div className="not-prose my-8 flex flex-col sm:flex-row items-center gap-4 rounded-2xl border-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-5">
      <div className="flex-1">
        <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">{category}</div>
        <div className="text-lg font-bold text-gray-900 mb-1">{name}</div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">✅ 99%+ Purity</span>
          <span className="flex items-center gap-1">📋 COA Included</span>
          <span className="flex items-center gap-1">🚚 Fast Shipping</span>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <Link
          href={`/products/${slug}`}
          className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all"
        >
          Details
        </Link>
        <Link
          href={`/go/${slug}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold hover:opacity-90 transition-all hover:shadow-md"
        >
          Buy Now
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </Link>
      </div>
    </div>
  )
}

const mdxComponents = { ResearchNote, ImportantNote, KeyFact, InlineProductCTA }

/* ── Sidebar product card ───────────────────────────────────────── */
function SidebarProductCard({ product }: { product: NonNullable<typeof PRODUCTS[string]> }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
      <div className="p-4">
        <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">{product.category}</div>
        <div className="font-bold text-gray-900 mb-1">{product.name}</div>
        <div className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</div>
        <div className="text-xs text-gray-400 mb-4">
          <span className="font-semibold text-gray-600">Dosage:</span> {product.dosage}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all"
          >
            Details
          </Link>
          <Link
            href={`/go/${product.slug}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex-1 text-center text-xs font-bold px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-all"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ── Main page ──────────────────────────────────────────────────── */
export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const baseUrl = site.baseUrl || 'https://peptidevault.com'

  // Try DB first
  const dbGuide = await getGuideFromDB(slug).catch(() => null)

  let title: string, description: string, date: string | null, readTime: string | null,
      tags: string[], content: string, relatedProductSlugs: string[]

  if (dbGuide) {
    title = dbGuide.title
    description = dbGuide.description
    date = dbGuide.publishedAt?.toISOString() ?? null
    readTime = dbGuide.readTime
    tags = dbGuide.tags
    content = dbGuide.content
    relatedProductSlugs = dbGuide.relatedProductSlugs
  } else {
    const guide = await getGuideFromFS(slug).catch(() => null)
    if (!guide) notFound()
    title = guide.frontmatter.title
    description = guide.frontmatter.description
    date = guide.frontmatter.date ?? null
    readTime = guide.frontmatter.readTime != null ? String(guide.frontmatter.readTime) : null
    tags = guide.frontmatter.tags ?? []
    content = guide.content
    relatedProductSlugs = guide.frontmatter.relatedProducts ?? []
  }

  const relatedProducts = relatedProductSlugs.map((s) => PRODUCTS[s]).filter(Boolean) as NonNullable<typeof PRODUCTS[string]>[]

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` } },
    datePublished: date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}/guides/${slug}` },
    keywords: tags.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Article Hero ──────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-white transition-colors">Research Blog</Link>
            <span>/</span>
            <span className="text-white/80 truncate max-w-xs">{title}</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.slice(0, 4).map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight max-w-4xl">
            {title}
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-3xl leading-relaxed">
            {description}
          </p>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs">R</div>
              <span>Research Team</span>
            </div>
            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {formattedDate}
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {readTime} min read
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Research purposes only
            </span>
          </div>
        </div>
      </div>

      {/* ── Disclosure banner ─────────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <p className="text-xs text-amber-800 text-center">
            <strong>Affiliate Disclosure:</strong> This article contains affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you. Content is for research and educational use only.
          </p>
        </div>
      </div>

      {/* ── Content + Sidebar ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">

          {/* Article body */}
          <div className="lg:col-span-2">

            {/* Quick summary box */}
            {relatedProducts.length > 0 && (
              <div className="mb-8 rounded-2xl border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider">🧬 Products in this guide</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {relatedProducts.map((p) => (
                    <Link key={p.slug} href={`/go/${p.slug}`} target="_blank" rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-indigo-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                      <span className="font-bold text-gray-900 text-sm">{p.name}</span>
                      <span className="text-xs text-indigo-500 font-semibold">Buy →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* MDX prose */}
            <div className="prose prose-lg prose-gray max-w-none
              prose-headings:font-extrabold prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-indigo-900
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-table:text-sm
              prose-th:bg-indigo-50 prose-th:text-indigo-900 prose-th:font-bold prose-th:py-3 prose-th:px-4
              prose-td:py-2.5 prose-td:px-4
              prose-tr:border-b prose-tr:border-gray-100
              prose-blockquote:border-indigo-400 prose-blockquote:bg-indigo-50 prose-blockquote:rounded-xl prose-blockquote:px-6 prose-blockquote:not-italic
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-indigo-700 prose-code:before:content-none prose-code:after:content-none
              prose-ul:text-gray-600 prose-li:my-1
            ">
              <MDXRemote source={content} components={mdxComponents} />
            </div>

            {/* Research disclaimer */}
            <div className="mt-12 rounded-xl border border-red-100 bg-red-50 p-5">
              <div className="flex gap-3">
                <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
                <div>
                  <h4 className="font-bold text-red-900 mb-1 text-sm">Research Use Only Disclaimer</h4>
                  <p className="text-red-700 text-xs leading-relaxed">
                    All information in this article is for educational and research purposes only. The peptides discussed have not been approved by the FDA for human therapeutic use. This content does not constitute medical advice. Always consult a qualified healthcare professional before making any decisions related to your health.
                  </p>
                </div>
              </div>
            </div>

            {/* Share + Navigation */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
              <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                All Research Guides
              </Link>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                Shop Peptides
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────────────── */}
          <aside className="lg:col-span-1 mt-10 lg:mt-0">
            <div className="sticky top-24 space-y-6">

              {/* Mentioned products */}
              {relatedProducts.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Peptides in this guide
                  </h3>
                  <div className="space-y-3">
                    {relatedProducts.map((product) => (
                      <SidebarProductCard key={product.slug} product={product} />
                    ))}
                  </div>
                </div>
              )}

              {/* Trust box */}
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quality Assurance</h4>
                <div className="space-y-3">
                  {[
                    { icon: '🔬', text: 'Third-Party Lab Tested' },
                    { icon: '📋', text: 'COA Available' },
                    { icon: '✅', text: '99%+ Purity Verified' },
                    { icon: '🚚', text: 'Fast US Shipping' },
                    { icon: '🔒', text: 'Secure Checkout' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="text-base">{icon}</span>
                      <span className="font-medium">{text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/products"
                  className="mt-5 block w-full text-center py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 transition-all hover:shadow-md"
                >
                  Shop All Peptides →
                </Link>
              </div>

              {/* Related guides */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">More Guides</h4>
                <div className="space-y-2">
                  {[
                    { href: '/guides/what-is-bpc-157', label: 'BPC-157 Complete Guide' },
                    { href: '/guides/tb-500-benefits', label: 'TB-500 Research Guide' },
                    { href: '/guides/cjc-1295-ipamorelin-stack-guide', label: 'CJC-1295 + Ipamorelin Stack' },
                    { href: '/guides/tirzepatide-research-overview', label: 'Tirzepatide Overview' },
                    { href: '/guides/epithalon-anti-aging-guide', label: 'Epithalon & Longevity' },
                  ].map(({ href, label }) => (
                    <Link key={href} href={href} className="flex items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 leading-relaxed">
                <strong>Research Use Only:</strong> Not for human consumption. Not evaluated by the FDA. This content is educational only.
              </div>
            </div>
          </aside>
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 rounded-3xl bg-gradient-to-br from-gray-900 to-indigo-950 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                Source the Peptides from this Guide
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                All peptides are sourced from Pantheon Peptides — independent lab-tested, 99%+ purity, COA included with every order.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProducts.map((product) => (
                <div key={product.slug} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
                  <div>
                    <div className="text-xs text-white/40 font-medium mb-1">{product.category}</div>
                    <div className="text-white font-bold text-lg">{product.name}</div>
                    <div className="text-white/60 text-sm mt-1 line-clamp-2">{product.description}</div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Link href={`/products/${product.slug}`} className="flex-1 text-center text-xs font-semibold px-3 py-2.5 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition-all">
                      Details
                    </Link>
                    <Link href={`/go/${product.slug}`} target="_blank" rel="noopener noreferrer nofollow"
                      className="flex-1 text-center text-xs font-bold px-3 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all">
                      Buy Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-white/30 text-xs mt-6">
              Affiliate disclosure: We earn a commission on purchases at no extra cost to you.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
