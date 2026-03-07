import Link from 'next/link'
import type { SiteConfig } from '@/lib/sites'

interface FooterProps {
  site: SiteConfig
}

export default function Footer({ site }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-bold text-white text-lg mb-2">{site.name}</div>
            <p className="text-sm text-gray-400 mb-4">{site.tagline}</p>
            <a
              href="https://pantheonpeptides.com/partner/AmentiAI/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-block text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
            >
              Shop at Pantheon Peptides →
            </a>
          </div>

          {/* Products */}
          <div>
            <div className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Products</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/category/healing-recovery" className="hover:text-white transition-colors">Healing & Recovery</Link></li>
              <li><Link href="/category/growth-hormone" className="hover:text-white transition-colors">Growth Hormone</Link></li>
              <li><Link href="/category/metabolic" className="hover:text-white transition-colors">Metabolic</Link></li>
              <li><Link href="/category/anti-aging" className="hover:text-white transition-colors">Anti-Aging</Link></li>
              <li><Link href="/category/cognitive" className="hover:text-white transition-colors">Cognitive</Link></li>
              <li><Link href="/category/immune" className="hover:text-white transition-colors">Immune</Link></li>
              <li><Link href="/category/melanocortin" className="hover:text-white transition-colors">Melanocortin</Link></li>
              <li><Link href="/stacks" className="hover:text-white transition-colors">Research Stacks</Link></li>
            </ul>
          </div>

          {/* Research */}
          <div>
            <div className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Research</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides" className="hover:text-white transition-colors">Research Guides</Link></li>
              <li><Link href="/compare/bpc-157-vs-tb-500" className="hover:text-white transition-colors">BPC-157 vs TB-500</Link></li>
              <li><Link href="/compare/cjc-1295-vs-ipamorelin" className="hover:text-white transition-colors">CJC-1295 vs Ipamorelin</Link></li>
              <li><Link href="/compare/sermorelin-vs-cjc-1295" className="hover:text-white transition-colors">Sermorelin vs CJC-1295</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company / Legal */}
          <div>
            <div className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Company</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclosures */}
        <div className="border-t border-gray-700 pt-8 space-y-3">
          <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-400">
            <span className="font-semibold text-gray-300">Affiliate Disclosure: </span>
            This site contains affiliate links to Pantheon Peptides. When you click on a link and make a purchase, {site.name} may earn a
            commission at no additional cost to you. This helps us maintain and improve our research content.
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-400">
            <span className="font-semibold text-gray-300">Research Use Only: </span>
            All products listed on {site.name} are intended for research purposes only. They are not intended for
            human consumption, therapeutic use, or clinical application. These products have not been evaluated by
            the FDA.{' '}
            <Link href="/disclaimer" className="text-gray-300 underline hover:text-white">Read full disclaimer →</Link>
          </div>
          <p className="text-xs text-gray-500 text-center pt-2">
            © {new Date().getFullYear()} {site.name}. All rights reserved. All product information is for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
