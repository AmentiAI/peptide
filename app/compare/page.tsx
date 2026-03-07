'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'

const PRODUCT_LIST = Object.values(PRODUCTS).sort((a, b) => a.name.localeCompare(b.name))

const FEATURED_COMPARISONS = [
  { slug: 'bpc-157-vs-tb-500', label: 'BPC-157 vs TB-500', badge: 'Most Popular', desc: 'The top two healing peptides head-to-head' },
  { slug: 'cjc-1295-vs-ipamorelin', label: 'CJC-1295 vs Ipamorelin', badge: 'GH Stack', desc: 'The gold standard growth hormone combination' },
  { slug: 'sermorelin-vs-cjc-1295', label: 'Sermorelin vs CJC-1295', badge: 'GHRH', desc: 'Classic vs modern GHRH analog comparison' },
]

export default function ComparePage() {
  const router = useRouter()
  const [pepA, setPepA] = useState('')
  const [pepB, setPepB] = useState('')
  const [error, setError] = useState('')

  function handleCompare() {
    if (!pepA || !pepB) { setError('Please select two peptides to compare.'); return }
    if (pepA === pepB) { setError('Please select two different peptides.'); return }
    setError('')
    router.push(`/compare/${pepA}-vs-${pepB}`)
  }

  const productA = pepA ? PRODUCTS[pepA] : null
  const productB = pepB ? PRODUCTS[pepB] : null

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-indigo-400 rounded-full" />
            19 research peptides
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Compare Any Two Peptides
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Side-by-side breakdown of mechanisms, half-lives, dosing protocols, and research applications — for any peptides in our catalog.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

        {/* Picker card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Build Your Comparison</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Peptide A */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Peptide A</label>
              <select
                value={pepA}
                onChange={(e) => { setPepA(e.target.value); setError('') }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
              >
                <option value="">Select a peptide...</option>
                {PRODUCT_LIST.map((p) => (
                  <option key={p.slug} value={p.slug} disabled={p.slug === pepB}>
                    {p.name} — {p.category}
                  </option>
                ))}
              </select>
              {productA && (
                <div className="mt-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{productA.category}</div>
                  <div className="text-sm text-gray-700 mt-1 line-clamp-2">{productA.description}</div>
                </div>
              )}
            </div>

            {/* Peptide B */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Peptide B</label>
              <select
                value={pepB}
                onChange={(e) => { setPepB(e.target.value); setError('') }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
              >
                <option value="">Select a peptide...</option>
                {PRODUCT_LIST.map((p) => (
                  <option key={p.slug} value={p.slug} disabled={p.slug === pepA}>
                    {p.name} — {p.category}
                  </option>
                ))}
              </select>
              {productB && (
                <div className="mt-3 p-3 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">{productB.category}</div>
                  <div className="text-sm text-gray-700 mt-1 line-clamp-2">{productB.description}</div>
                </div>
              )}
            </div>
          </div>

          {/* VS divider */}
          {(productA || productB) && (
            <div className="flex items-center justify-center gap-4 mb-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <div className="flex-1 h-px bg-gray-100" />
              VS
              <div className="flex-1 h-px bg-gray-100" />
            </div>
          )}

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center font-medium">{error}</p>
          )}

          <button
            onClick={handleCompare}
            disabled={!pepA || !pepB || pepA === pepB}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base hover:opacity-90 transition-all hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {pepA && pepB && pepA !== pepB
              ? `Compare ${PRODUCTS[pepA]?.shortName} vs ${PRODUCTS[pepB]?.shortName} →`
              : 'Compare Peptides →'}
          </button>
        </div>

        {/* Featured comparisons */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Popular Comparisons</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURED_COMPARISONS.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-5"
              >
                <div className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 mb-3">
                  {comp.badge}
                </div>
                <div className="font-bold text-gray-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                  {comp.label}
                </div>
                <div className="text-xs text-gray-500">{comp.desc}</div>
                <div className="mt-3 text-xs font-semibold text-indigo-500 flex items-center gap-1">
                  View comparison
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All peptides quick-browse */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">All Peptides</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_LIST.map((p) => (
              <button
                key={p.slug}
                onClick={() => {
                  if (!pepA || (pepA && pepB)) { setPepA(p.slug); setPepB('') }
                  else if (pepA && !pepB && p.slug !== pepA) setPepB(p.slug)
                }}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Click any peptide to add it to your comparison selection above.</p>
        </div>
      </div>
    </div>
  )
}
