import Link from 'next/link'

export interface HeroContent {
  headline: string
  subheadline: string
  badge?: string
  ctaText: string
  ctaUrl: string
  backgroundImage?: string
  backgroundColor: string
  overlayOpacity?: number
}

export default function HeroSection({ content }: { content: HeroContent }) {
  const opacity = content.overlayOpacity ?? 0.1
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: content.backgroundColor,
        backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {content.backgroundImage && (
        <div className="absolute inset-0" style={{ backgroundColor: content.backgroundColor, opacity }} />
      )}
      {!content.backgroundImage && (
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, white 0%, transparent 50%), radial-gradient(circle at 75% 75%, white 0%, transparent 50%)',
            }}
          />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          {content.badge && (
            <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {content.badge}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {content.headline}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">{content.subheadline}</p>
          <Link
            href={content.ctaUrl}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold rounded-xl transition-colors hover:bg-gray-100"
            style={{ color: content.backgroundColor }}
          >
            {content.ctaText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
