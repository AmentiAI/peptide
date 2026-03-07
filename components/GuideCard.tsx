import Link from 'next/link'
import Image from 'next/image'

interface GuideCardProps {
  slug: string
  title: string
  description: string
  date?: string
  readTime?: string | number
  tags?: string[]
  image?: string
  featured?: boolean
}

function categoryFromTags(tags: string[]): string {
  const t = tags.map(s => s.toLowerCase())
  if (t.some(s => ['bpc-157','tb-500','ll-37','healing','recovery'].includes(s))) return 'Healing & Recovery'
  if (t.some(s => ['cjc-1295','ipamorelin','sermorelin','mk-677','growth hormone','ghrh','ghrp'].includes(s))) return 'Growth Hormone'
  if (t.some(s => ['tirzepatide','semaglutide','metabolic','glp-1','gip'].includes(s))) return 'Metabolic'
  if (t.some(s => ['ghk-cu','epithalon','anti-aging','longevity','telomere'].includes(s))) return 'Anti-Aging'
  if (t.some(s => ['semax','selank','nootropic','cognitive','bdnf'].includes(s))) return 'Cognitive'
  if (t.some(s => ['reconstitution','storage','protocol','dosage','injection'].includes(s))) return 'How-To'
  return 'Research'
}

const CATEGORY_GRADIENT: Record<string, string> = {
  'Healing & Recovery': 'from-blue-500 to-cyan-400',
  'Growth Hormone':     'from-purple-600 to-violet-400',
  'Metabolic':          'from-emerald-500 to-teal-400',
  'Anti-Aging':         'from-orange-500 to-rose-400',
  'Cognitive':          'from-indigo-500 to-blue-400',
  'How-To':             'from-slate-600 to-slate-400',
  'Research':           'from-gray-600 to-gray-400',
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&h=450&q=80'

export default function GuideCard({
  slug, title, description, date, readTime, tags = [], image, featured = false,
}: GuideCardProps) {
  const category = categoryFromTags(tags)
  const gradient = CATEGORY_GRADIENT[category] ?? 'from-gray-600 to-gray-400'
  const thumb = image ?? FALLBACK_IMAGE
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  /* ── FEATURED (wide hero card) ──────────────────────────────── */
  if (featured) {
    return (
      <Link href={`/guides/${slug}`} className="group block">
        <article className="relative rounded-3xl overflow-hidden bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[340px] flex items-end">
          {/* Background image */}
          <Image
            src={thumb}
            alt={title}
            fill
            className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/70 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-10`} />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-10 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradient} shadow`}>
                {category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/50 font-medium uppercase tracking-widest">
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                Latest Article
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 leading-tight group-hover:text-white/90 transition-colors max-w-3xl">
              {title}
            </h2>
            <p className="text-white/65 text-base md:text-lg leading-relaxed mb-6 max-w-2xl line-clamp-2">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${gradient} shadow group-hover:shadow-lg group-hover:scale-105 transition-all`}>
                Read Full Guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="flex items-center gap-4 text-xs text-white/40">
                {formattedDate && <span>{formattedDate}</span>}
                {readTime && <span>{readTime} min read</span>}
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  /* ── STANDARD card ──────────────────────────────────────────── */
  return (
    <Link href={`/guides/${slug}`} className="group block h-full">
      <article className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">

        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-[16/9] bg-gray-100 flex-shrink-0">
          <Image
            src={thumb}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Category badge over image */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r ${gradient} shadow-md`}>
              {category}
            </span>
          </div>
          {/* Read time badge */}
          {readTime && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-sm">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {readTime} min
              </span>
            </div>
          )}
          {/* Bottom gradient for readability */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3.5 border-t border-gray-100">
            <span className="text-xs text-gray-400">{formattedDate ?? ''}</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all">
              Read Guide
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
