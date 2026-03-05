import Link from 'next/link'
import Image from 'next/image'

export interface ImageBannerContent {
  imageUrl: string
  headline?: string
  subtext?: string
  ctaText?: string
  ctaUrl?: string
  textPosition: 'left' | 'center' | 'right'
}

export default function ImageBannerSection({ content }: { content: ImageBannerContent }) {
  const alignClass =
    content.textPosition === 'right'
      ? 'items-end text-right'
      : content.textPosition === 'center'
      ? 'items-center text-center'
      : 'items-start text-left'

  return (
    <section className="relative overflow-hidden h-64 md:h-96">
      <Image
        src={content.imageUrl}
        alt={content.headline || 'Banner'}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className={`absolute inset-0 flex flex-col justify-end p-8 md:p-12 ${alignClass}`}>
        {content.headline && (
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{content.headline}</h2>
        )}
        {content.subtext && <p className="text-white/80 mb-4 max-w-xl">{content.subtext}</p>}
        {content.ctaText && content.ctaUrl && (
          <Link
            href={content.ctaUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            {content.ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
