import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getSiteFromHeaders } from '@/lib/sites'
import { getGuides as getGuidesFromFS } from '@/lib/guides'
import { getGuides as getGuidesFromDB } from '@/lib/db-guides'
import GuideCard from '@/components/GuideCard'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const baseUrl = site.baseUrl || 'https://peptidevault.com'
  return {
    title: `Research Blog & Peptide Guides`,
    description: `In-depth research guides on BPC-157, TB-500, CJC-1295, Tirzepatide, and more. Science-backed articles on peptide mechanisms, dosing, and stacking.`,
    alternates: { canonical: `${baseUrl}/guides` },
    openGraph: { title: `Research Blog`, type: 'website', url: `${baseUrl}/guides` },
  }
}

type GuideItem = {
  slug: string
  title: string
  description: string
  tags?: string[]
  date?: string
  readTime?: string | number
}

const CATEGORIES = ['All', 'Healing & Recovery', 'Growth Hormone', 'Metabolic', 'Anti-Aging', 'Cognitive', 'How-To']

const STATS = [
  { label: 'Research Articles', value: '12+' },
  { label: 'Peptides Covered', value: '19' },
  { label: 'Research Citations', value: '50+' },
  { label: 'Updated', value: '2025' },
]

export default async function GuidesPage() {
  let guides: GuideItem[] = []

  const dbGuides = await getGuidesFromDB().catch(() => [])
  if (dbGuides.length > 0) {
    guides = dbGuides.map((g) => ({
      slug: g.slug,
      title: g.title,
      description: g.description,
      tags: g.tags,
      date: g.publishedAt?.toISOString(),
      readTime: g.readTime,
    }))
  } else {
    const fsGuides = await getGuidesFromFS().catch(() => [])
    guides = fsGuides.map((g) => ({
      slug: g.slug,
      title: g.title,
      description: g.description,
      tags: g.tags,
      date: g.date,
      readTime: g.readTime,
    }))
  }

  const featured = guides[0]
  const rest = guides.slice(1)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Science-backed research articles
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Peptide Research
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Knowledge Base
              </span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-10">
              In-depth guides on mechanisms of action, dosing protocols, and research findings —
              everything you need to understand modern research peptides.
            </p>

            {/* Search-style CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all hover:shadow-lg">
                Browse All Peptides
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/stacks" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all backdrop-blur-sm">
                Research Stacks
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto">
            {STATS.map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-extrabold text-white mb-1">{value}</div>
                <div className="text-xs text-white/50 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Affiliate Disclosure ─────────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-xs text-amber-800 text-center">
            <strong>Disclosure:</strong> This site contains affiliate links to verified research vendors. We may earn a commission at no extra cost to you. All content is for educational and research purposes only — not medical advice.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Category Filter ───────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border transition-colors bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 select-none"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* ── Featured Article ──────────────────────────────────── */}
        {featured && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Latest Article</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
            </div>
            <GuideCard
              slug={featured.slug}
              title={featured.title}
              description={featured.description}
              date={featured.date}
              readTime={featured.readTime}
              tags={featured.tags}
              featured
            />
          </div>
        )}

        {/* ── Article Grid ──────────────────────────────────────── */}
        {rest.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">All Guides</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((guide) => (
                <GuideCard
                  key={guide.slug}
                  slug={guide.slug}
                  title={guide.title}
                  description={guide.description}
                  date={guide.date}
                  readTime={guide.readTime}
                  tags={guide.tags}
                />
              ))}
            </div>
          </>
        )}

        {/* ── Bottom CTA ────────────────────────────────────────── */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
          <div className="relative">
            <div className="text-4xl mb-4">🧬</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Ready to Source Research-Grade Peptides?
            </h2>
            <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">
              All peptides featured in our guides are available from Pantheon Peptides — 99%+ purity, COA included, fast US shipping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-bold hover:bg-gray-50 transition-all hover:shadow-xl text-base"
              >
                Shop All Peptides
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/stacks"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-all text-base"
              >
                View Research Stacks
              </Link>
            </div>
            <p className="mt-6 text-indigo-300 text-sm">
              ✅ 99%+ Purity &nbsp;·&nbsp; 📋 COA Included &nbsp;·&nbsp; 🚚 Fast US Shipping &nbsp;·&nbsp; 🔒 Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
