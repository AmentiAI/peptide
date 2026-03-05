import Link from 'next/link'

export interface CtaBannerContent {
  headline: string
  subtext?: string
  ctaText: string
  ctaUrl: string
  backgroundColor: string
}

export default function CtaBannerSection({ content }: { content: CtaBannerContent }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div
        className="rounded-2xl p-8 md:p-12 text-center"
        style={{ backgroundColor: content.backgroundColor }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{content.headline}</h2>
        {content.subtext && (
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">{content.subtext}</p>
        )}
        <Link
          href={content.ctaUrl}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          style={{ color: content.backgroundColor }}
        >
          {content.ctaText}
        </Link>
      </div>
    </section>
  )
}
