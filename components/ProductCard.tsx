import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

const CATEGORY_STYLES: Record<string, { gradient: string; bg: string; text: string }> = {
  'Healing & Recovery': { gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-700' },
  'Growth Hormone':     { gradient: 'from-purple-500 to-violet-500', bg: 'bg-purple-50', text: 'text-purple-700' },
  'Metabolic':          { gradient: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'Anti-Aging':         { gradient: 'from-orange-500 to-rose-500', bg: 'bg-orange-50', text: 'text-orange-700' },
  'Cognitive':          { gradient: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50', text: 'text-indigo-700' },
  'Immune':             { gradient: 'from-teal-500 to-cyan-500', bg: 'bg-teal-50', text: 'text-teal-700' },
  'Melanocortin':       { gradient: 'from-pink-500 to-rose-500', bg: 'bg-pink-50', text: 'text-pink-700' },
}

export default function ProductCard({ product }: ProductCardProps) {
  const style = CATEGORY_STYLES[product.category] ?? {
    gradient: 'from-gray-500 to-gray-700',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
  }

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative block bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="aspect-[4/3] relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={product.featured}
          />
        </div>
        {product.featured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            ⭐ Popular
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">

        {/* Category */}
        <span className={`inline-flex items-center self-start px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 bg-gradient-to-r ${style.gradient} text-white`}>
          {product.category}
        </span>

        {/* Title + description */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Key benefits */}
        <ul className="space-y-1.5 mb-4">
          {product.benefits.slice(0, 3).map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>

        {/* Dosage pill */}
        <div className={`flex items-center gap-2 rounded-lg px-3 py-2 mb-5 ${style.bg}`}>
          <svg className={`w-3.5 h-3.5 flex-shrink-0 ${style.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className={`text-xs font-medium ${style.text}`}>
            <span className="font-semibold">Dosage:</span> {product.dosage}
          </span>
        </div>

        {/* Spacer so buttons always sit at bottom */}
        <div className="flex-1" />

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-sm transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Details
          </Link>
          <Link
            href={`/go/${product.slug}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r ${style.gradient} hover:opacity-90 hover:shadow-md transition-all`}
          >
            Buy Now
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>

        {/* Trust strip */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">✅ 99%+ Purity</span>
          <span className="flex items-center gap-1">📋 COA</span>
          <span className="flex items-center gap-1">🚚 US Shipping</span>
        </div>
      </div>
    </div>
  )
}
