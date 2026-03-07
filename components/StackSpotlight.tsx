import Link from 'next/link'

const STACKS = [
  {
    name: 'Ultimate Healing Stack',
    emoji: '🔄',
    slugs: ['bpc-157', 'tb-500'],
    labels: ['BPC-157', 'TB-500'],
    description:
      'The gold standard for tissue repair. BPC-157 accelerates healing while TB-500 promotes new blood vessel formation — a synergistic combination studied extensively in recovery research.',
    gradient: 'from-blue-700 to-blue-900',
    accent: '#3b82f6',
    tags: ['Healing', 'Recovery', 'Injury'],
  },
  {
    name: 'Growth Hormone Stack',
    emoji: '📈',
    slugs: ['cjc-1295', 'ipamorelin'],
    labels: ['CJC-1295', 'Ipamorelin'],
    description:
      'The classic GH optimization protocol. CJC-1295 provides GHRH stimulation while Ipamorelin selectively pulses GH without elevating cortisol or prolactin — the most researched GH stack.',
    gradient: 'from-purple-700 to-purple-900',
    accent: '#8b5cf6',
    tags: ['Growth Hormone', 'Anti-Aging', 'Body Composition'],
  },
  {
    name: 'Anti-Aging Stack',
    emoji: '✨',
    slugs: ['ghk-cu', 'sermorelin'],
    labels: ['GHK-Cu', 'Sermorelin'],
    description:
      'Powerful anti-aging combination. GHK-Cu stimulates collagen and tissue regeneration while Sermorelin restores youthful growth hormone levels through natural pituitary stimulation.',
    gradient: 'from-emerald-700 to-emerald-900',
    accent: '#10b981',
    tags: ['Anti-Aging', 'Collagen', 'Skin', 'Recovery'],
  },
]

export default function StackSpotlight() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
            Research Stacks
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Popular Research Combinations
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Synergistic peptide pairings studied by researchers worldwide. Each stack targets
            complementary pathways for enhanced research outcomes.
          </p>
        </div>

        {/* Stack cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STACKS.map((stack) => (
            <div
              key={stack.name}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient header */}
              <div className={`bg-gradient-to-br ${stack.gradient} p-6 pb-8`}>
                <div className="text-4xl mb-3">{stack.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">{stack.name}</h3>
                {/* Product pills */}
                <div className="flex flex-wrap gap-2">
                  {stack.labels.map((label) => (
                    <span
                      key={label}
                      className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white border border-white/20"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="bg-gray-900 p-6">
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {stack.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {stack.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-white/10 text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-2">
                  {stack.slugs.map((slug, i) => (
                    <Link
                      key={slug}
                      href={`/go/${slug}`}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border"
                      style={
                        i === 0
                          ? { backgroundColor: stack.accent, color: 'white', borderColor: stack.accent }
                          : { backgroundColor: 'transparent', color: stack.accent, borderColor: stack.accent }
                      }
                    >
                      {stack.labels[i]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            View individual product pages for full research details and dosage information.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all text-sm"
          >
            Browse Full Catalog
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
