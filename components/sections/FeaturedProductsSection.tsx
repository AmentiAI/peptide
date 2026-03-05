import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/products'

export interface FeaturedProductsContent {
  title: string
  subtitle: string
  productSlugs: string[]
}

export default function FeaturedProductsSection({ content }: { content: FeaturedProductsContent }) {
  const featuredProducts = content.productSlugs
    .map((slug) => PRODUCTS[slug])
    .filter(Boolean)

  if (featuredProducts.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{content.title}</h2>
          <p className="text-gray-600 mt-1">{content.subtitle}</p>
        </div>
        <Link
          href="/products"
          className="text-sm font-medium hover:underline"
          style={{ color: 'var(--primary)' }}
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  )
}
