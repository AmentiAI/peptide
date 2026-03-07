import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getGuide as getGuideFromFS, getGuides as getGuidesFromFS } from '@/lib/guides'
import { getGuide as getGuideFromDB } from '@/lib/db-guides'
import { PRODUCTS } from '@/lib/products'
import { getSiteFromHeaders } from '@/lib/sites'
import BuyButton from '@/components/BuyButton'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const guides = await getGuidesFromFS().catch(() => [])
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const baseUrl = site.baseUrl || 'https://peptidevault.com'

  const dbGuide = await getGuideFromDB(slug).catch(() => null)
  if (dbGuide) {
    return {
      title: dbGuide.title,
      description: dbGuide.description,
      alternates: { canonical: `${baseUrl}/guides/${slug}` },
      openGraph: {
        title: dbGuide.title,
        description: dbGuide.description,
        type: 'article',
        url: `${baseUrl}/guides/${slug}`,
      },
      twitter: { card: 'summary_large_image', title: dbGuide.title, description: dbGuide.description },
    }
  }
  const guide = await getGuideFromFS(slug).catch(() => null)
  if (!guide) return {}
  return {
    title: guide.frontmatter.title,
    description: guide.frontmatter.description,
    alternates: { canonical: `${baseUrl}/guides/${slug}` },
    openGraph: {
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
      type: 'article',
      url: `${baseUrl}/guides/${slug}`,
    },
    twitter: { card: 'summary_large_image', title: guide.frontmatter.title, description: guide.frontmatter.description },
  }
}

const mdxComponents = { BuyButton }

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const baseUrl = site.baseUrl || 'https://peptidevault.com'

  // Try DB first
  const dbGuide = await getGuideFromDB(slug).catch(() => null)
  if (dbGuide) {
    const relatedProducts = dbGuide.relatedProductSlugs
      .map((s) => PRODUCTS[s])
      .filter(Boolean)

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: dbGuide.title,
      description: dbGuide.description,
      author: { '@type': 'Organization', name: site.name },
      publisher: { '@type': 'Organization', name: site.name },
      datePublished: dbGuide.publishedAt?.toISOString(),
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}/guides/${slug}` },
      keywords: dbGuide.tags.join(', '),
    }

    return (
      <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-gray-900">Guides</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{dbGuide.title}</span>
        </nav>
        <article>
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {dbGuide.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{dbGuide.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{dbGuide.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-200">
              {dbGuide.publishedAt && <span>{new Date(dbGuide.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
              <span>{dbGuide.readTime}</span>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm text-blue-800">
            <strong>Disclosure:</strong> This guide contains affiliate links. We may earn a commission if you purchase through our links.
          </div>
          <div className="prose prose-gray prose-lg max-w-none">
            <MDXRemote source={dbGuide.content} components={mdxComponents} />
          </div>
          {relatedProducts.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Mentioned Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map((product) => (
                  <div key={product!.slug} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900">{product!.name}</div>
                      <div className="text-sm text-gray-600">{product!.category}</div>
                    </div>
                    <BuyButton product={product!} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
      </>
    )
  }

  // Fallback to filesystem guides
  const guide = await getGuideFromFS(slug).catch(() => null)
  if (!guide) notFound()

  const { frontmatter, content } = guide
  const relatedProducts = frontmatter.relatedProducts
    ? frontmatter.relatedProducts.map((s: string) => PRODUCTS[s]).filter(Boolean)
    : []

  const fsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
    datePublished: frontmatter.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}/guides/${slug}` },
    keywords: frontmatter.tags?.join(', '),
  }

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fsJsonLd) }} />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-gray-900">Guides</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{frontmatter.title}</span>
      </nav>
      <article>
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.tags?.map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{frontmatter.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{frontmatter.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-200">
            {frontmatter.date && <span>{new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
            {frontmatter.readTime && <span>{frontmatter.readTime} min read</span>}
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm text-blue-800">
          <strong>Disclosure:</strong> This guide contains affiliate links. We may earn a commission if you purchase through our links.
        </div>
        <div className="prose prose-gray prose-lg max-w-none">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
        {relatedProducts.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mentioned Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedProducts.map((product: NonNullable<(typeof PRODUCTS)[string]>) => (
                <div key={product.slug} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.category}</div>
                  </div>
                  <BuyButton product={product} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
    </>
  )
}
