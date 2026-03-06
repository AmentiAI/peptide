import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getSiteFromHeaders } from '@/lib/sites'
import { PRODUCTS, getProductsByCategory } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  return {
    title: 'Research Peptides - Lab-Tested Products',
    description: `Browse all research peptides available through ${site.name}. Pharmaceutical-grade quality, third-party lab tested, COA included.`,
  }
}

export default async function ProductsPage() {
  const categories = getProductsByCategory()
  const categoryList = Object.keys(categories)

  // Category info with icons and gradients
  const categoryMeta: Record<string, { icon: string; gradient: string; description: string }> = {
    'Healing': {
      icon: '💊',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Recovery and tissue repair peptides'
    },
    'Growth Hormone': {
      icon: '📈',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Growth hormone secretagogues and peptides'
    },
    'Metabolic': {
      icon: '⚡',
      gradient: 'from-green-500 to-yellow-500',
      description: 'Weight management and metabolic support'
    },
    'Anti-Aging': {
      icon: '🧬',
      gradient: 'from-orange-500 to-red-500',
      description: 'Longevity and cellular health'
    },
    'Immune': {
      icon: '🛡️',
      gradient: 'from-teal-500 to-cyan-500',
      description: 'Immune system support and optimization'
    },
    'Nootropic': {
      icon: '🧠',
      gradient: 'from-indigo-500 to-violet-500',
      description: 'Cognitive enhancement and neuroprotection'
    },
  }

  return (
    <>
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Research Peptides Catalog
            </h1>
            <p className="text-xl text-purple-100 mb-6">
              Browse {Object.keys(PRODUCTS).length} premium research peptides with verified purity
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                99%+ Purity Verified
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                COA Included
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium">
                <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                Research Use Only
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4 overflow-x-auto scrollbar-hide">
            <span className="text-sm font-semibold text-gray-600 flex-shrink-0">
              Categories:
            </span>
            <div className="flex gap-2">
              {categoryList.map((category) => {
                const meta = categoryMeta[category]
                return (
                  <a
                    key={category}
                    href={`#${category.toLowerCase().replace(/ /g, '-')}`}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${meta.gradient} text-white text-sm font-medium hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap`}
                  >
                    <span>{meta.icon}</span>
                    <span>{category}</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {categories[category].length}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid by Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {Object.entries(categories).map(([category, products], index) => {
          const meta = categoryMeta[category]
          return (
            <section 
              key={category} 
              id={category.toLowerCase().replace(/ /g, '-')}
              className={index > 0 ? 'mt-20' : ''}
            >
              {/* Category Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                    {meta.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                      {category}
                      <span className="text-lg font-semibold text-gray-400">
                        ({products.length} {products.length === 1 ? 'Product' : 'Products'})
                      </span>
                    </h2>
                    <p className="text-gray-600 mt-1">{meta.description}</p>
                  </div>
                </div>
                <div className={`h-1 rounded-full bg-gradient-to-r ${meta.gradient} max-w-xl`} />
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Read our comprehensive research guides covering mechanisms of action, protocols, and safety guidelines.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides" className="btn btn-primary btn-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Browse Research Guides
            </Link>
            <Link href="/" className="btn btn-glass btn-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
