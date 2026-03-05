import { notFound, redirect } from 'next/navigation'
import { getGuideById, updateGuide } from '@/lib/db-guides'

export default async function EditGuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const guide = await getGuideById(Number(id))
  if (!guide) notFound()

  async function save(formData: FormData) {
    'use server'
    await updateGuide(Number(id), {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      content: formData.get('content') as string,
      readTime: formData.get('readTime') as string,
      tags: ((formData.get('tags') as string) || '').split(',').map((s) => s.trim()).filter(Boolean),
      relatedProductSlugs: ((formData.get('relatedProductSlugs') as string) || '').split(',').map((s) => s.trim()).filter(Boolean),
      isPublished: formData.get('isPublished') === 'on',
    })
    redirect('/admin/guides')
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin/guides" className="text-sm text-gray-500 hover:text-gray-700">Guides</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">{guide.title}</h1>
      </div>

      <form action={save} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {[
          { name: 'title', label: 'Title', defaultValue: guide.title },
          { name: 'readTime', label: 'Read Time', defaultValue: guide.readTime },
        ].map(({ name, label, defaultValue }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type="text" name={name} defaultValue={defaultValue} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" defaultValue={guide.description} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content (MDX)</label>
          <textarea name="content" defaultValue={guide.content} rows={20} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
          <input type="text" name="tags" defaultValue={guide.tags.join(', ')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Related Product Slugs (comma-separated)</label>
          <input type="text" name="relatedProductSlugs" defaultValue={guide.relatedProductSlugs.join(', ')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="isPublished" id="isPublished" defaultChecked={guide.isPublished} className="rounded" />
          <label htmlFor="isPublished" className="text-sm text-gray-700">Published</label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <a href="/admin/guides" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Cancel</a>
          <button type="submit" className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700">Save Changes</button>
        </div>
      </form>
    </div>
  )
}
