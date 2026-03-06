import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
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
    title: `${product.name} - Research Peptide | Peptide Vault`,
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

  // Get category gradient
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
    <>
      {/* Hero Section - 2026 Style */}
      <section className={`bg-gradient-to-br ${gradient} py-16 md:py-24 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md p-12 border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0" />
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={500}
                  className="w-full h-auto relative z-10 transform hover:scale-105 transition-transform duration-500"
                  priority
                />
                {product.featured && (
                  <div className="absolute top-6 right-6 bg-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    ⭐ Popular
                  </div>
                )}
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-4">
                {product.category}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Key Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <div className="text-sm text-white/70">Dosage</div>
                  </div>
                  <div className="text-sm font-semibold text-white">{product.dosage}</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-white/70">Half-Life</div>
                  </div>
                  <div className="text-sm font-semibold text-white">{product.halfLife}</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <BuyButton product={product} className="flex-1" size="lg" />
                <button className="btn btn-glass btn-lg flex-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                <div className="text-center p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <div className="text-2xl mb-1">✓</div>
                  <div className="text-xs text-white/70">99%+ Purity</div>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <div className="text-2xl mb-1">📋</div>
                  <div className="text-xs text-white/70">COA Included</div>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <div className="text-2xl mb-1">🔬</div>
                  <div className="text-xs text-white/70">Lab Tested</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section className="glass-card">
              <h2 className="text-2xl font-black mb-4 gradient-text">Overview</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.longDescription}
              </p>
            </section>

            {/* Key Benefits */}
            <section className="glass-card">
              <h2 className="text-2xl font-black mb-6 gradient-text">Key Benefits</h2>
              <div className="grid gap-4">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed flex-1">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Dosage & Administration */}
            <section className="glass-card">
              <h2 className="text-2xl font-black mb-6 gradient-text">Dosage & Administration</h2>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Typical Research Dosage</h3>
                    <p className="text-gray-700 mb-3">{product.dosage}</p>
                    <h3 className="font-bold text-gray-900 mb-2">Half-Life</h3>
                    <p className="text-gray-700">{product.halfLife}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Research Use Disclaimer */}
            <section className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
              <div className="flex gap-4">
                <div className="text-3xl">⚠️</div>
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">Research Use Only</h3>
                  <p className="text-yellow-800 text-sm leading-relaxed">
                    This product is strictly for laboratory research purposes only. Not for human consumption or therapeutic use. 
                    By purchasing, you acknowledge that you are a qualified researcher operating within applicable regulations.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Purchase Card */}
              <div className={`glass-card bg-gradient-to-br ${gradient} text-white`}>
                <h3 className="text-xl font-black mb-4">Purchase from Vendors</h3>
                <p className="text-sm text-white/80 mb-6">
                  All vendors are vetted for quality and include Certificate of Analysis with each order.
                </p>
                <BuyButton product={product} className="w-full" size="lg" />
                
                <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>99%+ Purity Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Third-Party Lab Tested</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Fast Discreet Shipping</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="glass-card">
                <h3 className="text-lg font-black mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200 transition-all hover:shadow-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-black gradient-text mb-2">Related Products</h2>
              <p className="text-gray-600">Other {product.category} research peptides</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.slug} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className={`bg-gradient-to-br ${gradient} py-16`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Questions About {product.name}?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Check our comprehensive research guides for detailed protocols and safety information.
          </p>
          <Link href="/guides" className="btn btn-primary btn-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            View Research Guides
          </Link>
        </div>
      </section>
    </>
  )
}
