import Link from 'next/link'
import type { Product } from '@/lib/products'

interface BuyButtonProps {
  product: Product
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function BuyButton({ product, className = '', size = 'md' }: BuyButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <Link
      href={`/go/${product.slug}`}
      className={`inline-flex items-center justify-center gap-1.5 font-semibold text-white rounded-lg transition-colors ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: 'var(--primary)' }}
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      Buy Now
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </Link>
  )
}
