import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/react'
import { getSiteFromHeaders } from '@/lib/sites'
import { getSiteFromDB } from '@/lib/db-sites'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

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
  return {
    title: {
      default: `${site.name} | ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    metadataBase: new URL(site.baseUrl || 'https://peptidevault.com'),
    openGraph: {
      siteName: site.name,
      type: 'website',
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteConfig()

  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --primary: ${site.primaryColor};
            --accent: ${site.accentColor};
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Header site={site} />
        <main>{children}</main>
        <Footer site={site} />
        <Analytics />
      </body>
    </html>
  )
}
