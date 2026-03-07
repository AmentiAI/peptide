import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSiteFromHeaders } from '@/lib/sites'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

const CATEGORIES: Record<string, { name: string; description: string; longDescription: string; icon: string; keywords: string[] }> = {
  'healing-recovery': {
    name: 'Healing & Recovery Peptides',
    description: 'Research peptides studied for tissue repair, injury recovery, and regenerative properties.',
    longDescription:
      'Healing and recovery peptides represent some of the most intensively studied compounds in modern peptide research. BPC-157 and TB-500 have accumulated extensive preclinical data showing accelerated healing of tendons, ligaments, muscles, and gastrointestinal tissue. LL-37 adds immune-mediated healing support. These compounds work through distinct but complementary mechanisms — making them among the most popular research subjects in sports science and regenerative medicine research.',
    icon: '🔄',
    keywords: ['healing peptides', 'recovery peptides', 'bpc-157', 'tb-500', 'll-37', 'tendon healing peptide', 'injury recovery peptide'],
  },
  'growth-hormone': {
    name: 'Growth Hormone Peptides',
    description: 'GHRH analogs and GH secretagogues that stimulate the pituitary to increase natural GH production.',
    longDescription:
      'Growth hormone peptides are a class of compounds that stimulate the pituitary gland to produce and release growth hormone through natural physiological mechanisms. Unlike exogenous HGH, these peptides work within the body\'s own regulatory feedback system. CJC-1295 is a GHRH analog that amplifies GH pulse amplitude, while Ipamorelin and Sermorelin are secretagogues that trigger GH release with varying degrees of selectivity. Tesamorelin provides strong visceral fat reduction data, and MK-677 offers the convenience of oral administration.',
    icon: '📈',
    keywords: ['growth hormone peptides', 'GHRH peptide', 'GH secretagogue', 'cjc-1295', 'ipamorelin', 'sermorelin', 'tesamorelin', 'mk-677'],
  },
  'metabolic': {
    name: 'Metabolic Research Peptides',
    description: 'Compounds studied for weight management, insulin sensitivity, fat metabolism, and mitochondrial health.',
    longDescription:
      'Metabolic peptides represent a rapidly growing area of research. Tirzepatide is a dual GIP/GLP-1 agonist with significant published data on weight management and metabolic health. MOTS-C is a unique mitochondria-derived peptide that activates AMPK signaling for improved glucose metabolism. 5-Amino-1MQ inhibits NNMT for enhanced fat metabolism. Together these compounds offer multiple angles for researching metabolic dysfunction, obesity, and longevity.',
    icon: '⚡',
    keywords: ['metabolic peptides', 'weight loss peptide', 'tirzepatide', 'mots-c', '5-amino-1mq', 'glp-1 peptide', 'insulin sensitivity peptide'],
  },
  'anti-aging': {
    name: 'Anti-Aging Peptides',
    description: 'Peptides studied for cellular regeneration, collagen synthesis, and longevity-related mechanisms.',
    longDescription:
      'Anti-aging peptides target multiple hallmarks of cellular aging — from collagen degradation and oxidative stress to declining hormonal signaling. GHK-Cu has an extraordinary research profile showing activation of thousands of genes involved in tissue remodeling. Epithalon is studied for telomerase activation and telomere length maintenance — one of the most direct anti-aging mechanisms in modern research.',
    icon: '✨',
    keywords: ['anti-aging peptides', 'ghk-cu', 'epithalon', 'copper peptide', 'telomere peptide', 'collagen peptide', 'longevity peptide'],
  },
  'cognitive': {
    name: 'Cognitive & Neurological Peptides',
    description: 'Neuropeptides studied for focus, memory, anxiety reduction, and neuroprotection.',
    longDescription:
      'Cognitive peptides act on the central nervous system to modulate neurotransmitter activity, promote neurotrophic factor expression, and protect neurons from damage. Semax is an ACTH analog studied for focus, memory, and neuroprotection. Selank is an anxiolytic peptide studied for anxiety reduction and mood stabilization. Both were developed in Russia and have decades of published research supporting their nootropic and neuroprotective properties.',
    icon: '🧠',
    keywords: ['cognitive peptides', 'nootropic peptides', 'semax', 'selank', 'neuropeptide', 'brain peptide', 'anxiety peptide'],
  },
  'immune': {
    name: 'Immune Support Peptides',
    description: 'Thymic and immune-modulating peptides studied for T-cell activation and immune function.',
    longDescription:
      'Immune peptides modulate the body\'s immune response at a fundamental level. Thymosin Alpha-1 is produced naturally by the thymus gland and plays a key role in T-cell maturation and activation. It is studied in immune deficiency models, chronic infection research, and cancer research contexts. These compounds represent an important frontier in immunology research.',
    icon: '🛡️',
    keywords: ['immune peptides', 'thymosin alpha-1', 'thymic peptide', 'T-cell peptide', 'immunomodulatory peptide'],
  },
  'melanocortin': {
    name: 'Melanocortin Peptides',
    description: 'Melanocortin receptor agonists studied for pigmentation, sexual function, and appetite regulation.',
    longDescription:
      'Melanocortin peptides act on the melanocortin receptor system in the central nervous system and peripheral tissues. PT-141 acts centrally through hypothalamic pathways. MT-2 (Melanotan II) stimulates melanin production for UV protection research. Kisspeptin-10 regulates the HPG axis for reproductive and fertility research. Together these compounds cover multiple aspects of melanocortin receptor biology.',
    icon: '🧬',
    keywords: ['melanocortin peptides', 'pt-141', 'melanotan 2', 'kisspeptin', 'mt-2', 'bremelanotide', 'melanocortin receptor'],
  },
}

const CATEGORY_PRODUCT_MAP: Record<string, string[]> = {
  'healing-recovery': ['bpc-157', 'tb-500', 'll-37'],
  'growth-hormone': ['cjc-1295', 'ipamorelin', 'sermorelin', 'tesamorelin', 'mk-677'],
  'metabolic': ['tirzepatide', 'mots-c', '5-amino-1mq'],
  'anti-aging': ['ghk-cu', 'epithalon'],
  'cognitive': ['semax', 'selank'],
  'immune': ['thymosin-alpha-1'],
  'melanocortin': ['pt-141', 'mt-2', 'kisspeptin-10'],
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }))
}

// Keep comparisons updated for new categories


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = CATEGORIES[slug]
  if (!cat) return {}
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  return {
    title: `${cat.name} | ${site.name}`,
    description: cat.description,
    keywords: cat.keywords,
    openGraph: {
      title: cat.name,
      description: cat.description,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const cat = CATEGORIES[slug]
  if (!cat) notFound()

  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const productSlugs = CATEGORY_PRODUCT_MAP[slug] ?? []
  const products = productSlugs.map((s) => PRODUCTS[s]).filter(Boolean)

  // Related comparisons for this category
  const RELATED_COMPARISONS: Record<string, { slug: string; title: string }[]> = {
    'healing-recovery': [{ slug: 'bpc-157-vs-tb-500', title: 'BPC-157 vs TB-500' }],
    'growth-hormone': [
      { slug: 'cjc-1295-vs-ipamorelin', title: 'CJC-1295 vs Ipamorelin' },
      { slug: 'sermorelin-vs-cjc-1295', title: 'Sermorelin vs CJC-1295' },
    ],
    'metabolic': [],
    'anti-aging': [],
    'cognitive': [],
    'immune': [],
    'melanocortin': [],
  }
  const comparisons = RELATED_COMPARISONS[slug] ?? []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cat.name,
    description: cat.description,
    url: `${site.baseUrl}/category/${slug}`,
  }

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-700">Products</Link>
          <span>/</span>
          <span className="text-gray-700">{cat.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-16" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">{cat.icon}</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{cat.name}</h1>
          <p className="text-white/80 text-xl">{cat.description}</p>
        </div>
      </section>

      {/* Category description */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 leading-relaxed text-lg">{cat.longDescription}</p>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {products.length} {cat.name} {products.length === 1 ? 'Compound' : 'Compounds'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Comparisons */}
      {comparisons.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Compare {cat.name.replace(' Peptides', '')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {comparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="flex items-center gap-3 px-5 py-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all group"
                >
                  <span className="text-2xl">⚖️</span>
                  <span className="font-semibold text-gray-900 group-hover:underline">{c.title}</span>
                  <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Categories nav */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Browse Other Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(CATEGORIES)
            .filter(([key]) => key !== slug)
            .map(([key, val]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className="flex flex-col items-center gap-2 px-4 py-5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-center"
              >
                <span className="text-3xl">{val.icon}</span>
                <span className="text-sm font-medium text-gray-700">{val.name.replace(' Peptides', '')}</span>
              </Link>
            ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
