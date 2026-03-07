import { headers } from 'next/headers'
import Link from 'next/link'
import { getSiteFromHeaders } from '@/lib/sites'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  return {
    title: `About ${site.name} — Research Peptide Information Resource`,
    description: `Learn about ${site.name} — our mission, standards, and commitment to providing accurate research peptide information with verified sources and transparent affiliate disclosures.`,
    keywords: ['about', 'research peptides', 'peptide information', 'affiliate disclosure', site.name],
    openGraph: {
      title: `About ${site.name}`,
      description: `Our mission, standards, and commitment to research peptide education.`,
      type: 'website',
    },
  }
}

export default async function AboutPage() {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="py-20 text-center" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">About {site.name}</h1>
          <p className="text-white/80 text-xl">
            An independent research peptide information resource committed to accuracy, transparency, and education.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {site.name} exists to bridge the gap between cutting-edge peptide research and researchers who need accurate,
            accessible information. We aggregate data from published studies, vendor Certificates of Analysis, and
            the broader scientific community to help researchers make informed decisions.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            We are an affiliate marketing resource — meaning we earn a commission when users purchase through our
            links at no extra cost to them. This business model funds our research content while keeping our
            information free to access. We are fully transparent about this relationship on every page.
          </p>
        </div>
      </section>

      {/* Standards */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Our Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔬',
                title: 'Research-Based Content',
                body: 'All product information references published research, peer-reviewed journals, and verified laboratory data. We cite our sources and update content when new research emerges.',
              },
              {
                icon: '🤝',
                title: 'Transparent Affiliates',
                body: 'We clearly disclose all affiliate relationships. We only partner with vendors whose quality standards we have independently evaluated. Your trust is our most important asset.',
              },
              {
                icon: '⚖️',
                title: 'Legal Compliance',
                body: 'All products listed are for research use only and clearly labeled as such. We comply with FTC affiliate disclosure requirements and include comprehensive disclaimers on all pages.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Relationship */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vendor Relationship</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {site.name} partners exclusively with <strong>Pantheon Peptides</strong>, a US-based research peptide
            supplier that provides independent Certificate of Analysis (COA) documentation with every batch. We
            selected Pantheon Peptides after evaluating their purity standards, customer service reputation, and
            compliance with research-use regulations.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            When you click "Buy Now" on any product, you are directed to Pantheon Peptides' website where your
            purchase is fulfilled. {site.name} receives an affiliate commission for this referral. The product price
            you pay is identical whether you arrive through our link or directly.
          </p>
          <a
            href="https://pantheonpeptides.com/partner/AmentiAI/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Visit Pantheon Peptides →
          </a>
        </div>
      </section>

      {/* What We Are Not */}
      <section className="bg-amber-50 border-y border-amber-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-amber-900 mb-4">Important Clarification</h2>
          <p className="text-amber-800 leading-relaxed mb-3">
            <strong>{site.name} is NOT a medical website.</strong> We do not provide medical advice, diagnoses, or
            treatment recommendations. All content on this site is strictly for educational and research information
            purposes.
          </p>
          <p className="text-amber-800 leading-relaxed">
            All peptides listed on {site.name} are <strong>for research use only</strong> and are not intended for
            human consumption, therapeutic use, or clinical application. These statements have not been evaluated by
            the Food and Drug Administration. Always consult a licensed medical professional before any use.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Research?</h2>
          <p className="text-gray-600 mb-8">Browse our curated catalog or read our in-depth research guides.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-colors"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Browse Products
            </Link>
            <Link
              href="/guides"
              className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Research Guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
