import Link from 'next/link'
import type { Product } from '@/lib/products'
import BuyButton from './BuyButton'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Category badge */}
      <div className="px-4 pt-4">
        <span
          className="inline-block px-2 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-lg text-gray-900 hover:text-[--primary] transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-3 flex-1">{product.description}</p>

        {/* Benefits preview */}
        <ul className="space-y-1 mb-4">
          {product.benefits.slice(0, 3).map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>

        {/* Dosage */}
        <div className="text-xs text-gray-500 mb-4 p-2 bg-gray-50 rounded-lg">
          <span className="font-medium">Dosage: </span>{product.dosage}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Learn More
          </Link>
          <BuyButton product={product} className="flex-1" />
        </div>
      </div>
    </div>
  )
}
