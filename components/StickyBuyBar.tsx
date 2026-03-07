'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/products'

interface Props {
  product: Product
}

export default function StickyBuyBar({ product }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
      aria-hidden={!visible}
    >
      <div
        className="border-t shadow-2xl"
        style={{ backgroundColor: 'var(--primary)', borderColor: 'rgba(255,255,255,0.15)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Product info */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div className="min-w-0">
              <div className="font-bold text-white text-sm truncate">{product.name}</div>
              <div className="text-xs text-white/70 truncate hidden sm:block">{product.category}</div>
            </div>
          </div>

          {/* Trust signals - hidden on small */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-white/80">
            <span>✅ 99%+ Purity</span>
            <span>📋 COA Included</span>
            <span>🚚 Fast Shipping</span>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href={`/products/${product.slug}`}
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-lg border border-white/30 hover:border-white/60 transition-all"
            >
              Details
            </Link>
            <Link
              href={`/go/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white font-bold text-sm rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ color: 'var(--primary)' }}
            >
              Buy Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
