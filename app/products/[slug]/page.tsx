import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/lib/products'
import { getSiteFromHeaders } from '@/lib/sites'
import BuyButton from '@/components/BuyButton'
import StickyBuyBar from '@/components/StickyBuyBar'

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

  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const baseUrl = site.baseUrl || 'https://peptidevault.com'

  const title = `${product.name} Research Peptide — ${product.category} | ${site.name}`
  const description = `${product.description} Dosage: ${product.dosage}. Half-life: ${product.halfLife}. Lab-tested with Certificate of Analysis. For research use only.`

  return {
    title,
    description,
    keywords: [
      product.name, ...product.tags, product.category,
      'buy ' + product.name, product.name + ' dosage', product.name + ' research',
      'research peptides', 'lab tested', 'certificate of analysis',
    ],
    alternates: { canonical: `${baseUrl}/products/${slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/products/${slug}`,
      images: [{ url: product.image, width: 800, height: 600, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = PRODUCTS[slug]
  if (!product) notFound()

  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const baseUrl = site.baseUrl || 'https://peptidevault.com'

  const relatedProducts = Object.values(PRODUCTS)
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription,
    image: product.image,
    sku: product.slug,
    category: product.category,
    brand: { '@type': 'Brand', name: 'Peptide Sciences' },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/go/${slug}`,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Peptide Sciences' },
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Dosage', value: product.dosage },
      { '@type': 'PropertyValue', name: 'Half-life', value: product.halfLife },
      { '@type': 'PropertyValue', name: 'Purity', value: '99%+' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section with Image */}
      <div className="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden bg-white/10 p-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-white/70 mb-6" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                <span>/</span>
                <span className="text-white font-medium">{product.name}</span>
              </nav>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="badge badge-primary bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {product.category}
                </span>
                <span className="badge badge-success bg-emerald-500/20 text-emerald-100 border-emerald-400/30 backdrop-blur-sm">
                  Research Use Only
                </span>
                {product.featured && (
                  <span className="badge bg-yellow-500/20 text-yellow-100 border-yellow-400/30 backdrop-blur-sm">
                    ⭐ Popular Choice
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-dark rounded-lg p-4">
                  <div className="text-xs text-white/60 mb-1">Dosage</div>
                  <div className="text-sm font-semibold text-white">{product.dosage}</div>
                </div>
                <div className="glass-dark rounded-lg p-4">
                  <div className="text-xs text-white/60 mb-1">Half-life</div>
                  <div className="text-sm font-semibold text-white">{product.halfLife}</div>
                </div>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-4 text-xs text-white/70 mb-6">
                <span className="flex items-center gap-1.5">✅ 99%+ Purity</span>
                <span className="flex items-center gap-1.5">📋 COA Included</span>
                <span className="flex items-center gap-1.5">🚚 Fast US Shipping</span>
                <span className="flex items-center gap-1.5">🔒 Secure Checkout</span>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <BuyButton product={product} size="lg" className="sm:w-auto" />
                <Link
                  href="/guides"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 glass-dark text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm"
                >
                  Research Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-primary rounded-full"></span>
                About {product.name}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.longDescription}
              </p>
            </div>

            {/* Research Applications */}
            <div className="info-box-highlight mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📋 Research Applications
              </h2>
              <ul className="space-y-3">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-primary">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Research Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-10">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span>🔬</span> Research Context
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                {product.name} is supplied strictly for in-vitro research and laboratory use. All
                information provided is for educational and research reference only. This product
                has not been evaluated by the FDA and is not intended for human consumption,
                therapeutic use, or clinical application.
              </p>
            </div>

            {/* Tags */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge badge-outline hover:bg-gray-50 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Purchase Card */}
              <div className="bg-white border-2 rounded-2xl p-6 shadow-lg" style={{ borderColor: 'var(--primary)' }}>
                <h3 className="font-bold text-gray-900 text-xl mb-2 flex items-center gap-2">
                  <span className="text-2xl">🧬</span>
                  Purchase {product.shortName}
                </h3>
                <p className="text-xs text-gray-500 mb-5">For research use only · Verified vendor</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between py-2.5 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Dosage</span>
                    <span className="text-sm font-semibold text-gray-900 text-right max-w-[60%]">{product.dosage}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Half-life</span>
                    <span className="text-sm font-semibold text-gray-900">{product.halfLife}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Purity</span>
                    <span className="text-sm font-bold text-emerald-600">99%+</span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-sm text-gray-500">Category</span>
                    <span className="badge badge-primary">{product.category}</span>
                  </div>
                </div>

                <BuyButton product={product} size="lg" className="w-full mb-3" />
                <Link
                  href={`/products/${product.slug}`}
                  className="block text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  View full research details →
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="info-box border-2 border-emerald-100">
                <h4 className="font-semibold text-gray-900 mb-4 text-sm">Quality Assurance</h4>
                <div className="space-y-3">
                  {[
                    { icon: '🔬', label: 'Third-Party Lab Tested' },
                    { icon: '📋', label: 'COA Available' },
                    { icon: '🔒', label: 'Secure Checkout' },
                    { icon: '🚚', label: 'Fast US Shipping' },
                    { icon: '✅', label: '99%+ Purity' },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="text-lg">{icon}</span>
                      <span className="font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="info-box-warning text-xs leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">⚠️</span>
                  <div>
                    <strong className="font-semibold">Research Use Only:</strong> Not for human
                    consumption. Not evaluated by the FDA.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 border-y border-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Related Products</h2>
              <p className="text-gray-600">Other peptides in the {product.category} category</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="product-card group"
                >
                  <div className="product-card-image">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors mb-2">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Buy Bar */}
      <StickyBuyBar product={product} />
    </>
  )
}
