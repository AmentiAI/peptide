import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/react'
import { getSiteFromHeaders } from '@/lib/sites'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  return {
    title: {
      default: `${site.name} | ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    metadataBase: new URL(site.baseUrl),
    openGraph: {
      siteName: site.name,
      type: 'website',
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)

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
