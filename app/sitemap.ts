import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { PRODUCTS } from '@/lib/products'
import { getGuides } from '@/lib/guides'
import { getAllComparisonSlugs } from '@/lib/comparisons'

const CATEGORIES = ['healing-recovery', 'growth-hormone', 'metabolic', 'anti-aging', 'cognitive', 'immune', 'melanocortin']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers()
  const host = headersList.get('host') || 'peptidevault.com'
  const domain = host.split(':')[0]
  const baseUrl = `https://${domain}`

  const productUrls: MetadataRoute.Sitemap = Object.keys(PRODUCTS).map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const fsGuides = await getGuides().catch(() => [] as { slug: string; date?: string }[])
  const guideUrls: MetadataRoute.Sitemap = fsGuides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: g.date ? new Date(g.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const comparisonUrls: MetadataRoute.Sitemap = getAllComparisonSlugs().map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/stacks`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    ...productUrls,
    ...guideUrls,
    ...comparisonUrls,
    ...categoryUrls,
  ]
}
