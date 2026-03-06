import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getSiteFromHeaders } from '@/lib/sites'
import { PRODUCTS, getProductsByCategory } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import HeroCarousel from '@/components/HeroCarousel'
import { PRODUCTS_SLIDES } from '@/lib/carousel-slides'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  return {
    title: 'Research Peptides',
    description: `Browse all research peptides available through ${site.name}. Lab-tested, COA included.`,
  }
}

export default async function ProductsPage() {
  const categories = getProductsByCategory()

  return (
    <>
      <HeroCarousel slides={PRODUCTS_SLIDES} height="sm" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Research Peptides</h1>
        <p className="text-gray-600 mt-2">
          All products are for research purposes only. Lab-tested with Certificate of Analysis.
        </p>
      </div>

      {Object.entries(categories).map(([category, products]) => (
        <section key={category} className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
    </>
  )
}
