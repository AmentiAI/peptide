import { headers } from 'next/headers'
import Link from 'next/link'
import { getSiteFromHeaders } from '@/lib/sites'
import { PRODUCTS } from '@/lib/products'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Research Peptide Stacks — Synergistic Combinations`,
    description:
      'Explore the most researched peptide stacking protocols. Healing, GH optimization, anti-aging, cognitive, metabolic, and immune stacks — with mechanisms, dosing guidance, and product links.',
    keywords: [
      'peptide stacks', 'peptide combinations', 'bpc-157 tb-500 stack',
      'cjc-1295 ipamorelin stack', 'ghk-cu sermorelin stack', 'research peptide protocol',
      'best peptide stack', 'peptide stacking guide',
    ],
    openGraph: {
      title: `Peptide Research Stacks`,
      description: 'The most researched synergistic peptide combinations.',
      type: 'website',
    },
  }
}

const STACKS = [
  {
    id: 'healing',
    name: 'Ultimate Healing Stack',
    tagline: 'Gold standard for tissue repair',
    emoji: '🔄',
    gradient: 'from-blue-600 to-cyan-500',
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    slugs: ['bpc-157', 'tb-500'],
    synergy: 'BPC-157 targets specific injury sites through angiogenesis; TB-500 works systemically to promote cell migration and muscle repair. Together they cover both local and whole-body healing pathways.',
    protocol: 'BPC-157: 250–500 mcg/day SC near injury. TB-500: 2–2.5 mg 2×/week SC. Duration: 4–12 weeks.',
    tags: ['Tendon', 'Ligament', 'Gut Health', 'Anti-Inflammatory'],
  },
  {
    id: 'gh',
    name: 'GH Optimization Stack',
    tagline: 'Maximum GH release with high selectivity',
    emoji: '📈',
    gradient: 'from-purple-600 to-violet-500',
    border: 'border-purple-200',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    slugs: ['cjc-1295', 'ipamorelin'],
    synergy: 'CJC-1295 amplifies the GH pulse amplitude; Ipamorelin triggers the pulse without raising cortisol or prolactin. Combined GH pulse amplitude is 2–10× higher than either alone.',
    protocol: 'CJC-1295: 100–200 mcg SC. Ipamorelin: 200–300 mcg SC. Administer together 2–3×/week before sleep.',
    tags: ['Growth Hormone', 'Body Composition', 'Fat Loss', 'Lean Mass'],
  },
  {
    id: 'antiaging',
    name: 'Anti-Aging Stack',
    tagline: 'Collagen synthesis + GH restoration',
    emoji: '✨',
    gradient: 'from-emerald-600 to-teal-500',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    slugs: ['ghk-cu', 'sermorelin'],
    synergy: 'GHK-Cu stimulates 4,000+ genes for collagen and tissue remodeling. Sermorelin restores age-declining GH levels via pituitary stimulation — addressing aging at both cellular and hormonal levels.',
    protocol: 'GHK-Cu: 1–2 mg/day SC or topical. Sermorelin: 200–500 mcg SC before bed. Duration: 12–24 weeks.',
    tags: ['Collagen', 'Skin Health', 'Bone Density', 'Longevity'],
  },
  {
    id: 'recovery',
    name: 'Post-Workout Recovery',
    tagline: 'Faster recovery and lean mass support',
    emoji: '💪',
    gradient: 'from-orange-600 to-red-500',
    border: 'border-orange-200',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    slugs: ['tb-500', 'ipamorelin'],
    synergy: 'TB-500 repairs exercise-induced muscle damage and reduces inflammation. Ipamorelin boosts GH during sleep — the critical recovery window. Physical repair and hormonal signaling addressed simultaneously.',
    protocol: 'TB-500: 2–2.5 mg 2×/week SC. Ipamorelin: 200–300 mcg SC before sleep. Best used in 8–16 week blocks.',
    tags: ['Muscle Recovery', 'Exercise Science', 'Sleep Quality', 'Anti-Inflammatory'],
  },
  {
    id: 'cognitive',
    name: 'Cognitive Enhancement Stack',
    tagline: 'Nootropic peptides for focus and resilience',
    emoji: '🧠',
    gradient: 'from-indigo-600 to-blue-500',
    border: 'border-indigo-200',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    slugs: ['semax', 'selank'],
    synergy: 'Semax upregulates BDNF and stimulates dopamine/serotonin pathways for focus and memory. Selank modulates GABAergic activity for anxiolysis and mental clarity. Complementary nootropic profiles with no overlap in mechanism.',
    protocol: 'Semax: 100–300 mcg intranasal 1–2×/day. Selank: 250–500 mcg intranasal 1–2×/day. 2–4 week cycles with breaks.',
    tags: ['Focus', 'Memory', 'Anxiety Relief', 'BDNF', 'Neuroprotection'],
  },
  {
    id: 'metabolic',
    name: 'Metabolic Stack',
    tagline: 'GLP-1 + mitochondrial optimization',
    emoji: '⚡',
    gradient: 'from-green-600 to-emerald-500',
    border: 'border-green-200',
    bg: 'bg-green-50',
    text: 'text-green-700',
    slugs: ['tirzepatide', 'mots-c'],
    synergy: 'Tirzepatide acts on GLP-1 and GIP receptors to regulate appetite and glucose. MOTS-C is a mitochondrial-derived peptide that activates AMPK and improves insulin sensitivity at the cellular level. A top-down and bottom-up approach to metabolic health.',
    protocol: 'Tirzepatide: 2.5–5 mg/week SC. MOTS-C: 5–10 mg/week SC. Research duration: 12–24 weeks.',
    tags: ['Glucose Control', 'Insulin Sensitivity', 'Fat Loss', 'AMPK', 'Mitochondria'],
  },
  {
    id: 'longevity',
    name: 'Longevity Stack',
    tagline: 'Telomere support + cellular rejuvenation',
    emoji: '🌿',
    gradient: 'from-rose-600 to-pink-500',
    border: 'border-rose-200',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    slugs: ['epithalon', 'ghk-cu'],
    synergy: 'Epithalon stimulates telomerase to lengthen telomeres — a core mechanism of cellular aging — and restores melatonin production. GHK-Cu drives collagen synthesis and gene expression for tissue renewal. Together they target aging at the DNA and structural protein levels.',
    protocol: 'Epithalon: 5–10 mg/day SC for 10–20 day cycles. GHK-Cu: 1–2 mg/day SC or topical. Run 2–4× per year.',
    tags: ['Telomeres', 'Melatonin', 'Collagen', 'Cellular Aging', 'DNA Repair'],
  },
  {
    id: 'immune',
    name: 'Immune Defense Stack',
    tagline: 'Dual-pathway immune modulation',
    emoji: '🛡️',
    gradient: 'from-sky-600 to-blue-500',
    border: 'border-sky-200',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    slugs: ['thymosin-alpha-1', 'll-37'],
    synergy: 'Thymosin Alpha-1 modulates T-cell activity and enhances antigen presentation — the adaptive immune response. LL-37 provides broad-spectrum antimicrobial action and activates the innate immune system. Together they reinforce both branches of immunity.',
    protocol: 'Thymosin Alpha-1: 1–1.6 mg 2×/week SC. LL-37: 100–200 mcg/day SC. Duration: 4–8 weeks.',
    tags: ['T-Cell', 'Adaptive Immunity', 'Antimicrobial', 'Innate Immunity', 'Inflammation'],
  },
]

export default async function StacksPage() {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Research Peptide Stacks',
    description: 'Synergistic research peptide combinations and protocols',
    url: `${site.baseUrl}/stacks`,
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            8 Research Protocols
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Peptide Research Stacks
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Synergistic combinations targeting multiple pathways simultaneously. Each stack is built around complementary mechanisms backed by published research.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { value: '8', label: 'Research Stacks' },
              { value: '12+', label: 'Peptides Featured' },
              { value: '4', label: 'Research Goals' },
              { value: '99%+', label: 'Purity Guaranteed' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-extrabold text-white">{value}</div>
                <div className="text-xs text-white/40 font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclosure */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-2.5 text-center text-xs text-amber-800">
          <strong>Disclosure:</strong> Affiliate links included. Content is for educational and research purposes only — not medical advice.
        </div>
      </div>

      {/* Stacks Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {STACKS.map((stack) => {
            const products = stack.slugs.map((s) => PRODUCTS[s]).filter(Boolean)
            return (
              <div key={stack.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">

                {/* Card header */}
                <div className={`bg-gradient-to-r ${stack.gradient} px-6 py-5`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-3xl flex-shrink-0">{stack.emoji}</span>
                      <div className="min-w-0">
                        <h2 className="text-lg font-extrabold text-white leading-tight">{stack.name}</h2>
                        <p className="text-white/70 text-sm mt-0.5">{stack.tagline}</p>
                      </div>
                    </div>
                    {/* Peptide chips */}
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      {products.map((p) => (
                        <span key={p.slug} className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 text-white border border-white/30 whitespace-nowrap text-right">
                          {p.shortName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1 gap-4">

                  {/* Synergy */}
                  <p className="text-sm text-gray-600 leading-relaxed">{stack.synergy}</p>

                  {/* Protocol */}
                  <div className={`rounded-xl p-4 border ${stack.bg} ${stack.border}`}>
                    <div className={`text-[11px] font-bold uppercase tracking-wider ${stack.text} mb-1.5`}>Research Protocol</div>
                    <p className="text-xs text-gray-700 leading-relaxed">{stack.protocol}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {stack.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-500 border border-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Product CTAs */}
                  <div className="flex gap-3 mt-auto pt-2 border-t border-gray-100">
                    {products.map((p) => (
                      <div key={p.slug} className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold text-gray-500 mb-1.5 truncate">{p.name}</div>
                        <div className="flex gap-1.5">
                          <Link
                            href={`/products/${p.slug}`}
                            className="flex-1 text-center py-2 rounded-lg text-[11px] font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            Details
                          </Link>
                          <Link
                            href={`/go/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className={`flex-1 text-center py-2 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r ${stack.gradient} hover:opacity-90 transition-all`}
                          >
                            Buy
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 md:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Source All Stack Peptides in One Order
            </h2>
            <p className="text-indigo-200 text-base mb-6 max-w-xl mx-auto">
              Every peptide in these stacks is available from Pantheon Peptides — 99%+ purity, COA included, fast US shipping.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-indigo-700 font-bold hover:bg-gray-50 transition-all hover:shadow-xl">
                Shop All Peptides
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/guides" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-all">
                Read Research Guides
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-t border-amber-200 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-amber-800 leading-relaxed">
          <strong>Research Use Only:</strong> All stacking protocols are for educational and research purposes only. These compounds have not been evaluated by the FDA and are not intended for human use. Dosages are referenced from published research literature only. Always consult a licensed professional.
        </div>
      </div>
    </main>
  )
}
