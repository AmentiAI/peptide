import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/products'
import BuyButton from './BuyButton'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-card-image">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-cover"
            priority={product.featured}
          />
        </Link>
        
        {/* Category Badge */}
        <div className="product-card-badge">
          {product.category}
        </div>
        
        {/* Featured indicator */}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ⭐ Popular
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`} className="group">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Benefits preview - top 3 */}
        <ul className="space-y-2 mb-4">
          {product.benefits.slice(0, 3).map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-xs text-gray-700">
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
              <span className="leading-tight">{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Dosage info */}
        <div className="info-box mb-4 py-2.5 px-3">
          <div className="text-xs">
            <span className="font-semibold text-gray-700">Dosage: </span>
            <span className="text-gray-600">{product.dosage}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="badge badge-outline text-[10px] px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/products/${product.slug}`}
            className="btn btn-outline btn-sm flex-1"
          >
            Learn More
          </Link>
          <BuyButton product={product} className="flex-1" size="sm" />
        </div>
      </div>
    </div>
  )
}
