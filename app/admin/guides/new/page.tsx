'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewGuidePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    slug: '',
    title: '',
    description: '',
    content: '',
    tags: '',
    readTime: '5 min read',
    relatedProductSlugs: '',
    isPublished: true,
  })

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
          relatedProductSlugs: form.relatedProductSlugs.split(',').map((s) => s.trim()).filter(Boolean),
        }),
      })
      if (res.ok) router.push('/admin/guides')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin/guides" className="text-sm text-gray-500 hover:text-gray-700">Guides</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">New Guide</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {[
          { key: 'slug', label: 'Slug', placeholder: 'what-is-bpc-157' },
          { key: 'title', label: 'Title', placeholder: 'What is BPC-157?' },
          { key: 'readTime', label: 'Read Time', placeholder: '5 min read' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type="text" value={String(form[key as keyof typeof form])} onChange={(e) => set(key, e.target.value)} placeholder={placeholder} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required={key !== 'readTime'} />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content (MDX)</label>
          <textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={15} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="# Your Guide Title&#10;&#10;Content here..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
          <input type="text" value={form.tags} onChange={(e) => set('tags', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Related Product Slugs (comma-separated)</label>
          <input type="text" value={form.relatedProductSlugs} onChange={(e) => set('relatedProductSlugs', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="isPublished" checked={form.isPublished} onChange={(e) => set('isPublished', e.target.checked)} className="rounded" />
          <label htmlFor="isPublished" className="text-sm text-gray-700">Published</label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <a href="/admin/guides" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Cancel</a>
          <button type="submit" disabled={saving} className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Creating...' : 'Create Guide'}
          </button>
        </div>
      </form>
    </div>
  )
}
