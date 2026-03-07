import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/products'
import BuyButton from './BuyButton'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Get category gradient based on product category
  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      'Healing': 'from-blue-500 to-cyan-500',
      'Growth Hormone': 'from-purple-500 to-pink-500',
      'Metabolic': 'from-green-500 to-yellow-500',
      'Anti-Aging': 'from-orange-500 to-red-500',
      'Immune': 'from-teal-500 to-cyan-500',
      'Nootropic': 'from-indigo-500 to-violet-500',
    }
    return gradients[category] || 'from-gray-500 to-gray-700'
  }

  const gradient = getCategoryGradient(product.category)

  return (
    <div className="product-card group">
      {/* Image Section with Floating Background */}
      <div className="product-image-wrapper">
        <Link href={`/products/${product.slug}`} className="block relative z-10">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
            priority={product.featured}
          />
        </Link>
        
        {/* Featured Badge */}
        {product.featured && (
          <div className="product-badge bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            ⭐ Popular
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="product-content">
        {/* Category Tag */}
        <div className={`product-category bg-gradient-to-r ${gradient}`}>
          {product.category}
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="product-title group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="product-description">
          {product.description}
        </p>

        {/* Key Benefits (Top 3) */}
        <div className="space-y-2 mb-4">
          {product.benefits.slice(0, 3).map((benefit, index) => (
            <div key={index} className="flex items-start gap-2">
              <svg 
                className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-xs text-gray-600 leading-tight">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Dosage Info - Modern Pill Style */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 mb-4 border border-gray-200">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <div className="text-xs">
              <span className="font-semibold text-gray-700">Typical Dosage: </span>
              <span className="text-gray-600">{product.dosage}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.slice(0, 4).map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 font-semibold text-sm rounded-xl border border-gray-200 transition-all hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Details
          </Link>
          <BuyButton product={product} className="flex-1" size="sm" />
        </div>

        {/* Trust Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>99%+ Purity</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
            </svg>
            <span>COA Included</span>
          </div>
        </div>
      </div>
    </div>
  )
}
