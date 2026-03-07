import { headers } from 'next/headers'
import { getSiteFromHeaders } from '@/lib/sites'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  return {
    title: `Disclaimer & Terms of Use`,
    description: `Legal disclaimer for ${site.name}. All research peptides on this site are for laboratory use only and not intended for human consumption or therapeutic use.`,
  }
}

export default async function DisclaimerPage() {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)

  return (
    <main className="bg-white">
      <section className="py-14" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-3">Disclaimer</h1>
          <p className="text-white/80 text-lg">Legal terms and research-use notice for {site.name}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-900 mb-3">⚠️ Research Use Only</h2>
            <p className="text-red-800 font-medium">
              All products listed on {site.name} are strictly intended for <strong>in vitro research and laboratory use only</strong>.
              They are NOT intended for human consumption, therapeutic use, clinical application, or use in animals.
              These products are sold for research purposes only.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">FDA Disclaimer</h2>
            <p>
              The statements on this website have not been evaluated by the U.S. Food and Drug Administration (FDA).
              No products listed on {site.name} are FDA-approved for human therapeutic use. No claims are made
              regarding the treatment, cure, prevention, or mitigation of any disease or medical condition.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">No Medical Advice</h2>
            <p>
              {site.name} does not provide medical advice. All content on this website — including product
              descriptions, dosage information, research guides, and blog posts — is provided strictly for
              educational and informational purposes. Nothing on this website should be construed as medical
              advice or a substitute for professional medical consultation.
            </p>
            <p className="mt-3">
              Always consult a qualified healthcare professional before making any medical decisions. Never
              disregard professional medical advice or delay seeking it because of something you have read on
              this website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Affiliate Disclosure</h2>
            <p>
              {site.name} participates in affiliate marketing programs. When you click on certain product links
              and make a purchase, we may earn a commission at no additional cost to you. Our primary vendor
              partner is <strong>Pantheon Peptides</strong>. We disclose this relationship on all relevant pages
              in compliance with FTC guidelines (16 CFR § 255).
            </p>
            <p className="mt-3">
              Our affiliate relationship does not influence the accuracy of our research content. We only
              partner with vendors whose quality standards we have independently evaluated.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Legal Compliance</h2>
            <p>
              The purchase, sale, and use of research peptides is subject to federal, state, and local laws.
              Laws regarding research chemicals vary by jurisdiction. It is the sole responsibility of the
              purchaser to verify the legal status of any compound in their jurisdiction before ordering.
              {site.name} assumes no responsibility for any illegal use of products purchased through links
              on this website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Accuracy of Information</h2>
            <p>
              While we make every effort to ensure the accuracy of product information, research data, and
              dosage information published on this site, we make no warranties or representations regarding
              the completeness, accuracy, or reliability of any content. Research in the peptide field evolves
              rapidly; information may become outdated. Always cross-reference with peer-reviewed literature.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Limitation of Liability</h2>
            <p>
              {site.name} and its operators shall not be liable for any direct, indirect, incidental, special,
              consequential, or punitive damages arising from the use of this website, reliance on any
              information contained herein, or the purchase of products through affiliate links. Use of this
              website constitutes your acceptance of these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Third-Party Websites</h2>
            <p>
              This website contains links to third-party websites including Pantheon Peptides. These links
              are provided for convenience and do not constitute an endorsement of all content on those sites.
              {site.name} is not responsible for the content, accuracy, or practices of any third-party website.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-500">
            <p><strong>Last Updated:</strong> January 2025</p>
            <p className="mt-1">
              By using this website, you acknowledge that you have read, understood, and agree to be bound
              by this disclaimer and all terms of use.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}
