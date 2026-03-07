import { headers } from 'next/headers'
import Link from 'next/link'
import { getSiteFromHeaders } from '@/lib/sites'
import { PRODUCTS } from '@/lib/products'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  return {
    title: `Research Peptide Stacks — Synergistic Combinations | ${site.name}`,
    description:
      'Explore the most researched peptide stacking protocols. The healing stack, GH optimization stack, anti-aging stack — with mechanisms, dosing guidance, and product links.',
    keywords: [
      'peptide stacks', 'peptide combinations', 'bpc-157 tb-500 stack',
      'cjc-1295 ipamorelin stack', 'ghk-cu sermorelin stack', 'research peptide protocol',
      'best peptide stack', 'peptide stacking guide',
    ],
    openGraph: {
      title: `Peptide Research Stacks | ${site.name}`,
      description: 'The most researched synergistic peptide combinations.',
      type: 'website',
    },
  }
}

const STACKS = [
  {
    id: 'healing',
    name: 'Ultimate Healing Stack',
    tagline: 'The gold standard for tissue repair research',
    emoji: '🔄',
    gradient: 'from-blue-600 to-blue-800',
    textColor: 'text-blue-600',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    slugs: ['bpc-157', 'tb-500'],
    synergy:
      'BPC-157 works locally on the specific injury site through angiogenesis and GH receptor upregulation. TB-500 works systemically throughout the body, promoting cell migration and muscle fiber repair. Together they address healing from both a targeted and systemic perspective — making this the most studied healing combination in research.',
    protocol:
      'BPC-157: 250–500 mcg/day subcutaneous near the injury site. TB-500: 2–2.5 mg twice per week subcutaneous. Typical research duration: 4–12 weeks.',
    researchNote:
      'Multiple animal studies have shown significantly faster recovery times when both compounds are used together compared to either alone.',
    tags: ['Tendon Repair', 'Ligament Healing', 'Muscle Recovery', 'Gut Health', 'Anti-Inflammatory'],
  },
  {
    id: 'gh',
    name: 'GH Optimization Stack',
    tagline: 'Maximum growth hormone stimulation with selectivity',
    emoji: '📈',
    gradient: 'from-purple-600 to-purple-800',
    textColor: 'text-purple-600',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    slugs: ['cjc-1295', 'ipamorelin'],
    synergy:
      'CJC-1295 is a GHRH analog that amplifies the amount of GH released per pulse. Ipamorelin is a GHSR agonist that triggers the GH pulse itself — without elevating cortisol or prolactin. Together they create a high-amplitude, high-selectivity GH pulse that neither compound achieves alone. This combination is studied as the modern gold standard for GH optimization.',
    protocol:
      'CJC-1295: 100–200 mcg subcutaneous. Ipamorelin: 200–300 mcg subcutaneous. Administer together 2–3x per week, ideally before sleep for maximum GH pulse alignment with natural circadian rhythm.',
    researchNote:
      'Studies show GH pulse amplitude increases of 2–10x when GHRH and GHSR agonists are combined, versus 2–3x for either compound alone.',
    tags: ['Growth Hormone', 'Body Composition', 'Fat Metabolism', 'Lean Mass', 'Anti-Aging'],
  },
  {
    id: 'antiaging',
    name: 'Anti-Aging Stack',
    tagline: 'Collagen synthesis + natural GH restoration',
    emoji: '✨',
    gradient: 'from-emerald-600 to-emerald-800',
    textColor: 'text-emerald-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    slugs: ['ghk-cu', 'sermorelin'],
    synergy:
      'GHK-Cu directly stimulates collagen and elastin production, promotes wound healing, and acts as a potent antioxidant at the cellular level. Sermorelin restores age-declining GH levels through natural pituitary stimulation, supporting systemic tissue repair, bone density, and sleep quality. Together they target aging from both a cellular/skin level and a hormonal level.',
    protocol:
      'GHK-Cu: 1–2 mg/day topical or subcutaneous. Sermorelin: 200–500 mcg subcutaneous before bed. Research duration typically 12–24 weeks for meaningful anti-aging endpoints.',
    researchNote:
      'GHK-Cu has been shown to activate 4,000+ genes involved in tissue remodeling. Sermorelin has decades of clinical data supporting GH restoration in aging populations.',
    tags: ['Collagen', 'Skin Health', 'Bone Density', 'Sleep Quality', 'Hormonal Balance'],
  },
  {
    id: 'recovery',
    name: 'Post-Workout Recovery Stack',
    tagline: 'Accelerated recovery and lean mass support',
    emoji: '💪',
    gradient: 'from-orange-600 to-red-700',
    textColor: 'text-orange-600',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200',
    slugs: ['tb-500', 'ipamorelin'],
    synergy:
      'TB-500 promotes muscle fiber repair and reduces exercise-induced inflammation systemically. Ipamorelin supports GH release during sleep — the critical recovery window when most tissue repair occurs. Together they address both the physical repair (TB-500) and the hormonal signaling (Ipamorelin) sides of recovery.',
    protocol:
      'TB-500: 2–2.5 mg twice per week subcutaneous. Ipamorelin: 200–300 mcg subcutaneous before sleep. Best used during training blocks of 8–16 weeks.',
    researchNote:
      'Both compounds have shown positive effects on recovery markers in independent studies. The combination is widely used by recovery researchers for its complementary mechanisms.',
    tags: ['Muscle Recovery', 'Exercise Science', 'Lean Mass', 'Sleep Quality', 'Anti-Inflammatory'],
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
    <main className="bg-white">
      {/* Hero */}
      <section className="py-20 text-center" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="max-w-3xl mx-auto px-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 bg-white/20 text-white border border-white/30">
            Research Protocols
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Peptide Research Stacks
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Synergistic peptide combinations studied for complementary mechanisms. Each stack targets
            multiple pathways simultaneously for enhanced research outcomes.
          </p>
        </div>
      </section>

      {/* Stacks */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {STACKS.map((stack) => {
          const products = stack.slugs.map((s) => PRODUCTS[s]).filter(Boolean)
          return (
            <div key={stack.id} className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Stack header */}
              <div className={`bg-gradient-to-r ${stack.gradient} px-8 py-8`}>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="text-5xl">{stack.emoji}</div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1">{stack.name}</h2>
                    <p className="text-white/80 text-lg">{stack.tagline}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {products.map((p) => (
                        <span key={p.slug} className="px-3 py-1 rounded-full text-xs font-bold bg-white/25 text-white border border-white/30">
                          {p.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stack content */}
              <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Synergy + Protocol */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Why This Stack Works</h3>
                    <p className="text-gray-600 leading-relaxed">{stack.synergy}</p>
                  </div>
                  <div className={`rounded-xl p-5 border ${stack.bgLight} ${stack.borderColor}`}>
                    <h3 className={`font-bold mb-2 ${stack.textColor}`}>Typical Research Protocol</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{stack.protocol}</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-amber-800 text-sm">
                      <strong>📚 Research Note: </strong>{stack.researchNote}
                    </p>
                  </div>
                </div>

                {/* Right: Products + CTAs */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">Products in This Stack</h3>
                  {products.map((p) => (
                    <div key={p.slug} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <div className="font-semibold text-gray-900 mb-1">{p.name}</div>
                      <div className="text-xs text-gray-500 mb-3">{p.category}</div>
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${p.slug}`}
                          className="flex-1 text-center py-2 rounded-lg text-xs font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Details
                        </Link>
                        <Link
                          href={`/go/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="flex-1 text-center py-2 rounded-lg text-xs font-semibold text-white transition-colors"
                          style={{ backgroundColor: 'var(--primary)' }}
                        >
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  ))}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {stack.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-500 border border-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Disclaimer */}
      <section className="bg-amber-50 border-t border-amber-200 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-amber-800 text-sm leading-relaxed">
            <strong>Research Use Only:</strong> All stacking protocols described are for research and informational
            purposes only. These combinations have not been evaluated by the FDA and are not intended for human
            use. Dosages are referenced from published research literature only.
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
