import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/react'
import { getSiteFromHeaders } from '@/lib/sites'
import { getSiteFromDB } from '@/lib/db-sites'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollTicker from '@/components/ScrollTicker'
import './globals.css'

const OG_IMAGE = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=630&q=80'

async function getSiteConfig() {
  const headersList = await headers()
  const host =
    headersList.get('x-site-host') ||
    headersList.get('x-forwarded-host') ||
    headersList.get('host') ||
    'peptidevault.com'
  const dbSite = await getSiteFromDB(host).catch(() => null)
  return dbSite ?? getSiteFromHeaders(headersList)
}

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig()
  const baseUrl = site.baseUrl || 'https://peptidevault.com'

  return {
    title: {
      default: `${site.name} | ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    metadataBase: new URL(baseUrl),
    keywords: [
      'research peptides', 'buy peptides', 'BPC-157', 'TB-500', 'semaglutide',
      'tirzepatide', 'CJC-1295', 'ipamorelin', 'peptide research', 'lab tested peptides',
      'certificate of analysis', 'high purity peptides', 'peptide sciences',
    ],
    authors: [{ name: site.name }],
    creator: site.name,
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: `${site.name} | ${site.tagline}`,
      description: site.description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} | ${site.tagline}`,
      description: site.description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteConfig()

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.baseUrl,
    description: site.description,
    logo: site.logo ?? `${site.baseUrl}/favicon.ico`,
  }

  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --primary: ${site.primaryColor};
            --accent: ${site.accentColor};
            --primary-dark: color-mix(in srgb, ${site.primaryColor} 80%, black);
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <ScrollTicker />
        <Header site={site} />
        <main>{children}</main>
        <Footer site={site} />
        <Analytics />
      </body>
    </html>
  )
}
