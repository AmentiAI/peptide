import Link from 'next/link'
import type { SiteConfig } from '@/lib/sites'

interface FooterProps {
  site: SiteConfig
}

export default function Footer({ site }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="font-bold text-white text-lg mb-2">{site.name}</div>
            <p className="text-sm text-gray-400">{site.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <div className="font-semibold text-white mb-3">Quick Links</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Research Guides</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-semibold text-white mb-3">Legal</div>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">For Research Use Only</span></li>
              <li><span className="text-gray-400">Not for human consumption</span></li>
            </ul>
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div className="border-t border-gray-700 pt-6">
          <div className="bg-gray-800 rounded-lg p-4 mb-4 text-sm text-gray-400">
            <span className="font-semibold text-gray-300">Affiliate Disclosure: </span>
            This site contains affiliate links. When you click on a link and make a purchase, {site.name} may earn a
            commission at no additional cost to you. This helps us maintain and improve our research content.
            We only recommend vendors we have vetted for quality and reliability.
          </div>
          <div className="bg-gray-800 rounded-lg p-4 mb-4 text-sm text-gray-400">
            <span className="font-semibold text-gray-300">Research Use Only: </span>
            All products listed on {site.name} are intended for research purposes only. They are not intended for
            human consumption, therapeutic use, or clinical application. These products have not been evaluated by
            the FDA. Always consult with a qualified professional before any research use.
          </div>
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} {site.name}. All rights reserved. All product information is for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
