import { headers } from 'next/headers'
import { getSiteFromHeaders } from '@/lib/sites'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  return {
    title: `Privacy Policy`,
    description: `Privacy policy for ${site.name}. Learn how we collect, use, and protect your information.`,
  }
}

export default async function PrivacyPage() {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)

  return (
    <main className="bg-white">
      <section className="py-14" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/80 text-lg">How {site.name} collects and uses your data</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10 text-gray-700 leading-relaxed">

          <div>
            <p className="text-sm text-gray-500 mb-6">Last Updated: January 2025</p>
            <p>
              This Privacy Policy describes how {site.name} ("{site.name}", "we", "us", or "our") collects,
              uses, and shares information when you visit our website. We are committed to protecting your
              privacy and being transparent about our data practices.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <h3 className="font-semibold text-gray-800 mb-2">Automatically Collected Data</h3>
            <p className="mb-3">
              When you visit our website, we may automatically collect certain information about your device and
              browsing behavior, including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
              <li>IP address (anonymized)</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website URL</li>
              <li>Device type (desktop, mobile, tablet)</li>
              <li>Geographic region (country/state level)</li>
            </ul>
            <h3 className="font-semibold text-gray-800 mb-2 mt-5">Affiliate Click Tracking</h3>
            <p>
              When you click on affiliate links to Pantheon Peptides, we log the click event for analytics
              purposes. This may include the product you clicked on, timestamp, and anonymized referral data.
              We do not receive your personal information from Pantheon Peptides or other vendors.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
              <li>Analyze website traffic and improve our content</li>
              <li>Track affiliate link performance for commission purposes</li>
              <li>Understand which products and guides are most helpful to researchers</li>
              <li>Diagnose technical issues and improve site performance</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-4">
              We do not sell your personal information. We do not use your information for targeted advertising.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies & Tracking Technologies</h2>
            <p className="mb-3">
              Our website uses cookies and similar tracking technologies:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
              <li><strong>Analytics cookies:</strong> Vercel Analytics tracks anonymous page view data</li>
              <li><strong>Affiliate cookies:</strong> When you click to Pantheon Peptides, their affiliate system (AffiliateWP) sets a 90-day tracking cookie to attribute any purchase you make</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              You can control cookies through your browser settings. Disabling cookies may affect site functionality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services that may collect data:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
              <li><strong>Vercel Analytics:</strong> Anonymous traffic analysis. See Vercel's privacy policy.</li>
              <li><strong>Pantheon Peptides:</strong> Affiliate partner. Their privacy policy governs data collected when you visit their site.</li>
              <li><strong>Unsplash:</strong> Stock images. No user data is shared.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Retention</h2>
            <p>
              Anonymous analytics data is retained for up to 13 months. Affiliate click logs are retained
              for 12 months for commission verification purposes. We do not store personally identifiable
              information beyond what is described in this policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
              <li>Access the personal data we hold about you</li>
              <li>Request deletion of your data</li>
              <li>Opt out of analytics tracking (use browser Do Not Track settings)</li>
              <li>File a complaint with your local data protection authority</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Children's Privacy</h2>
            <p>
              This website is not directed to individuals under 18 years of age. We do not knowingly collect
              personal information from minors. If you believe a minor has provided us with personal information,
              please contact us to request deletion.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Material changes will be reflected with an
              updated "Last Updated" date. Continued use of the website after changes constitutes acceptance
              of the updated policy.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Contact Us</h2>
            <p className="text-gray-600 text-sm">
              If you have questions about this Privacy Policy or your data, please contact us through the
              Pantheon Peptides affiliate program contact page or send a message via the vendor's support system.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}
