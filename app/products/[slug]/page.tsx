import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'
import BuyButton from '@/components/BuyButton'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = PRODUCTS[slug]
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = PRODUCTS[slug]
  if (!product) notFound()

  const relatedProducts = Object.values(PRODUCTS)
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-900">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-start gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {product.category}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              For Research Use Only
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>

          <div className="prose prose-gray max-w-none mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">About {product.name}</h2>
            <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
          </div>

          {/* Benefits */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Research Applications</h2>
            <ul className="space-y-2">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            {/* Buy card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Purchase {product.shortName}</h3>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Dosage</span>
                  <span className="font-medium text-gray-900 text-right max-w-[60%]">{product.dosage}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Half-life</span>
                  <span className="font-medium text-gray-900">{product.halfLife}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-900">{product.category}</span>
                </div>
              </div>

              <BuyButton product={product} size="lg" className="w-full mb-3" />
              <p className="text-xs text-gray-400 text-center">
                You&apos;ll be redirected to our verified vendor. For research use only.
              </p>
            </div>

            {/* Trust badges */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="space-y-3">
                {[
                  { icon: '🔬', label: 'Third-Party Lab Tested' },
                  { icon: '📋', label: 'COA Available' },
                  { icon: '🔒', label: 'Secure Checkout' },
                  { icon: '🚚', label: 'Fast Shipping' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-sm text-gray-700">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800">
              <strong>Research Use Only:</strong> This product is not intended for human consumption.
              Not evaluated by the FDA.
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-gray-900 mb-1">{p.name}</div>
                <p className="text-sm text-gray-600">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
