'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    slug: '',
    name: '',
    shortName: '',
    category: '',
    description: '',
    longDescription: '',
    benefits: '',
    dosage: '',
    halfLife: '',
    imageUrl: '',
    tags: '',
  })

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          benefits: form.benefits.split('\n').map((s) => s.trim()).filter(Boolean),
          tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
          vendorUrls: {},
        }),
      })
      if (res.ok) router.push('/admin/products')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin/products" className="text-sm text-gray-500 hover:text-gray-700">Products</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {[
          { key: 'slug', label: 'Slug', placeholder: 'bpc-157' },
          { key: 'name', label: 'Name', placeholder: 'BPC-157' },
          { key: 'shortName', label: 'Short Name', placeholder: 'BPC-157' },
          { key: 'category', label: 'Category', placeholder: 'Healing & Recovery' },
          { key: 'dosage', label: 'Dosage', placeholder: '250-500mcg per day' },
          { key: 'halfLife', label: 'Half Life', placeholder: '4 hours' },
          { key: 'imageUrl', label: 'Image URL', placeholder: '/images/bpc-157.jpg' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="text"
              value={form[key as keyof typeof form]}
              onChange={(e) => set(key, e.target.value)}
              placeholder={placeholder}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={['slug', 'name'].includes(key)}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
          <textarea value={form.longDescription} onChange={(e) => set('longDescription', e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (one per line)</label>
          <textarea value={form.benefits} onChange={(e) => set('benefits', e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
          <input type="text" value={form.tags} onChange={(e) => set('tags', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <a href="/admin/products" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Cancel</a>
          <button type="submit" disabled={saving} className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
