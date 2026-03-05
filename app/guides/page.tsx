import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getSiteFromHeaders } from '@/lib/sites'
import { getGuides as getGuidesFromFS } from '@/lib/guides'
import { getGuides as getGuidesFromDB } from '@/lib/db-guides'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  return {
    title: 'Research Guides',
    description: `In-depth research guides on peptides from ${site.name}. Learn about BPC-157, TB-500, and more.`,
  }
}

export default async function GuidesPage() {
  let guides: { slug: string; title: string; description: string; tags?: string[]; date?: string; readTime?: string }[] = []

  const dbGuides = await getGuidesFromDB().catch(() => [])
  if (dbGuides.length > 0) {
    guides = dbGuides.map((g) => ({
      slug: g.slug,
      title: g.title,
      description: g.description,
      tags: g.tags,
      date: g.publishedAt?.toISOString(),
      readTime: g.readTime,
    }))
  } else {
    const fsGuides = await getGuidesFromFS().catch(() => [])
    guides = fsGuides.map((g) => ({
      slug: g.slug,
      title: g.title,
      description: g.description,
      tags: g.tags,
      date: g.date,
      readTime: g.readTime != null ? String(g.readTime) : undefined,
    }))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Research Guides</h1>
        <p className="text-gray-600">
          In-depth articles on peptide research, mechanisms of action, and study summaries.
        </p>
      </div>

      <div className="grid gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {guide.tags?.map((tag: string) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-[--primary] transition-colors mb-2">
              {guide.title}
            </h2>
            <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              {guide.date && <span>{new Date(guide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
              {guide.readTime && <span>{guide.readTime}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
