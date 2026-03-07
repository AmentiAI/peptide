import Link from 'next/link'

interface GuideCardProps {
  slug: string
  title: string
  description: string
  date?: string
  readTime?: string | number
  tags?: string[]
  featured?: boolean
}

const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'BPC-157':      { bg: 'bg-blue-50',    text: 'text-blue-700',   border: 'border-blue-200' },
  'TB-500':       { bg: 'bg-cyan-50',    text: 'text-cyan-700',   border: 'border-cyan-200' },
  'healing':      { bg: 'bg-blue-50',    text: 'text-blue-700',   border: 'border-blue-200' },
  'recovery':     { bg: 'bg-sky-50',     text: 'text-sky-700',    border: 'border-sky-200' },
  'growth hormone':{ bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'CJC-1295':     { bg: 'bg-purple-50',  text: 'text-purple-700', border: 'border-purple-200' },
  'ipamorelin':   { bg: 'bg-violet-50',  text: 'text-violet-700', border: 'border-violet-200' },
  'MK-677':       { bg: 'bg-indigo-50',  text: 'text-indigo-700', border: 'border-indigo-200' },
  'tirzepatide':  { bg: 'bg-emerald-50', text: 'text-emerald-700',border: 'border-emerald-200' },
  'semaglutide':  { bg: 'bg-teal-50',    text: 'text-teal-700',   border: 'border-teal-200' },
  'metabolic':    { bg: 'bg-green-50',   text: 'text-green-700',  border: 'border-green-200' },
  'anti-aging':   { bg: 'bg-orange-50',  text: 'text-orange-700', border: 'border-orange-200' },
  'GHK-Cu':       { bg: 'bg-orange-50',  text: 'text-orange-700', border: 'border-orange-200' },
  'epithalon':    { bg: 'bg-rose-50',    text: 'text-rose-700',   border: 'border-rose-200' },
  'nootropic':    { bg: 'bg-indigo-50',  text: 'text-indigo-700', border: 'border-indigo-200' },
  'cognitive':    { bg: 'bg-indigo-50',  text: 'text-indigo-700', border: 'border-indigo-200' },
  'semax':        { bg: 'bg-indigo-50',  text: 'text-indigo-700', border: 'border-indigo-200' },
  'dosage':       { bg: 'bg-gray-50',    text: 'text-gray-700',   border: 'border-gray-200' },
  'protocol':     { bg: 'bg-gray-50',    text: 'text-gray-700',   border: 'border-gray-200' },
  'reconstitution':{ bg: 'bg-slate-50',  text: 'text-slate-700',  border: 'border-slate-200' },
  'stack':        { bg: 'bg-pink-50',    text: 'text-pink-700',   border: 'border-pink-200' },
}

const DEFAULT_COLOR = { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' }

function categoryFromTags(tags: string[]): string {
  const t = tags.map(t => t.toLowerCase())
  if (t.some(t => ['bpc-157','tb-500','ll-37','healing','recovery'].includes(t))) return 'Healing & Recovery'
  if (t.some(t => ['cjc-1295','ipamorelin','sermorelin','mk-677','growth hormone','ghrh','ghrp'].includes(t))) return 'Growth Hormone'
  if (t.some(t => ['tirzepatide','semaglutide','metabolic','glp-1','gip'].includes(t))) return 'Metabolic'
  if (t.some(t => ['ghk-cu','epithalon','anti-aging','longevity','telomere'].includes(t))) return 'Anti-Aging'
  if (t.some(t => ['semax','selank','nootropic','cognitive','bdnf'].includes(t))) return 'Cognitive'
  if (t.some(t => ['reconstitution','storage','protocol','dosage','injection'].includes(t))) return 'How-To'
  return 'Research'
}

const CATEGORY_GRADIENT: Record<string, string> = {
  'Healing & Recovery': 'from-blue-500 to-cyan-500',
  'Growth Hormone':     'from-purple-500 to-violet-500',
  'Metabolic':          'from-emerald-500 to-teal-500',
  'Anti-Aging':         'from-orange-500 to-rose-500',
  'Cognitive':          'from-indigo-500 to-blue-500',
  'How-To':             'from-slate-500 to-gray-600',
  'Research':           'from-gray-500 to-gray-700',
}

export default function GuideCard({ slug, title, description, date, readTime, tags = [], featured = false }: GuideCardProps) {
  const category = categoryFromTags(tags)
  const gradient = CATEGORY_GRADIENT[category] ?? 'from-gray-500 to-gray-700'
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null

  if (featured) {
    return (
      <Link href={`/guides/${slug}`} className="group block">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
          {/* Decorative gradient orb */}
          <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${gradient} opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradient}`}>
                {category}
              </span>
              <span className="text-xs text-white/50 font-medium uppercase tracking-wider">Featured Article</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
              {title}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${gradient} group-hover:shadow-lg group-hover:scale-105 transition-all`}>
                Read Full Guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/50">
                {formattedDate && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {formattedDate}
                  </span>
                )}
                {readTime && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {readTime} min read
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/guides/${slug}`} className="group block h-full">
      <article className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
        {/* Color bar */}
        <div className={`h-1 bg-gradient-to-r ${gradient}`} />

        <div className="flex flex-col flex-1 p-6">
          {/* Category + meta */}
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradient}`}>
              {category}
            </span>
            {readTime && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {readTime} min
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map((tag) => {
              const c = TAG_COLORS[tag] ?? DEFAULT_COLOR
              return (
                <span key={tag} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${c.bg} ${c.text} ${c.border}`}>
                  {tag}
                </span>
              )
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            {formattedDate && (
              <span className="text-xs text-gray-400">{formattedDate}</span>
            )}
            <span className={`ml-auto inline-flex items-center gap-1 text-xs font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent group-hover:gap-2 transition-all`}>
              Read Guide
              <svg className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
