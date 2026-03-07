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
  const baseUrl = site.baseUrl || 'https://peptidevault.com'
  const title = `Research Peptides Catalog | ${site.name}`
  const description = `Browse ${Object.keys(PRODUCTS).length}+ premium research peptides — BPC-157, TB-500, Semaglutide, Tirzepatide and more. Lab-tested with Certificate of Analysis. ${site.name}.`
  return {
    title,
    description,
    keywords: ['research peptides', 'buy peptides online', 'BPC-157', 'TB-500', 'semaglutide', 'tirzepatide', 'CJC-1295', 'ipamorelin', 'peptide catalog', 'lab tested peptides'],
    alternates: { canonical: `${baseUrl}/products` },
    openGraph: { title, description, url: `${baseUrl}/products`, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function ProductsPage() {
  const categories = getProductsByCategory()

  return (
    <>
      <HeroCarousel slides={PRODUCTS_SLIDES} height="sm" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Research Peptide Catalog</h1>
          <p className="text-gray-600 mt-2">
            {Object.keys(PRODUCTS).length}+ lab-tested compounds with Certificate of Analysis. For research use only.
          </p>
        </div>
        {/* Mini trust strip */}
        <div className="flex flex-wrap gap-3 text-xs font-medium text-gray-600">
          <span className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full">✅ 99%+ Purity</span>
          <span className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full">📋 COA Included</span>
          <span className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full">🚚 Fast Shipping</span>
        </div>
      </div>

      {Object.entries(categories).map(([category, products]) => (
        <section key={category} className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
