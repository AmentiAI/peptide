import { notFound } from 'next/navigation'
import { getSiteById } from '@/lib/db-sites'
import { getPageSections } from '@/lib/db-sections'
import SectionsEditor from '@/components/admin/SectionsEditor'

export default async function SiteSectionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const site = await getSiteById(Number(id))
  if (!site) notFound()

  const sections = await getPageSections(Number(id), 'home')

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin/sites" className="text-sm text-gray-500 hover:text-gray-700">Sites</a>
        <span className="text-gray-300">/</span>
        <a href={`/admin/sites/${id}`} className="text-sm text-gray-500 hover:text-gray-700">{site.domain}</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">Sections</h1>
      </div>
      <SectionsEditor
        siteId={Number(id)}
        siteName={site.domain}
        initialSections={sections.map((s) => ({
          id: s.id,
          sectionType: s.sectionType,
          position: s.position,
          isVisible: s.isVisible,
          content: s.content as Record<string, unknown>,
        }))}
      />
    </div>
  )
}
