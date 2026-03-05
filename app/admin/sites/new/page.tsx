'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewSitePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    domain: '',
    name: '',
    tagline: '',
    description: '',
    primaryColor: '#0f4c81',
    accentColor: '#1a73e8',
    vendor: 'peptidesciences',
    affiliateId: '',
    baseUrl: '',
    logoUrl: '',
  })

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        router.push('/admin/sites')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin/sites" className="text-sm text-gray-500 hover:text-gray-700">Sites</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">New Site</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {[
          { key: 'domain', label: 'Domain', placeholder: 'peptidevault.com' },
          { key: 'name', label: 'Site Name', placeholder: 'Peptide Vault' },
          { key: 'tagline', label: 'Tagline', placeholder: 'Premium Research Peptides' },
          { key: 'affiliateId', label: 'Affiliate ID', placeholder: 'peptidevault' },
          { key: 'baseUrl', label: 'Base URL', placeholder: 'https://peptidevault.com' },
          { key: 'vendor', label: 'Vendor', placeholder: 'peptidesciences' },
          { key: 'logoUrl', label: 'Logo URL (optional)', placeholder: 'https://...' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="text"
              value={form[key as keyof typeof form]}
              onChange={(e) => set(key, e.target.value)}
              placeholder={placeholder}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={key !== 'logoUrl'}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.primaryColor}
                onChange={(e) => set('primaryColor', e.target.value)}
                className="h-9 w-16 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={form.primaryColor}
                onChange={(e) => set('primaryColor', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.accentColor}
                onChange={(e) => set('accentColor', e.target.value)}
                className="h-9 w-16 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={form.accentColor}
                onChange={(e) => set('accentColor', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <a href="/admin/sites" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Cancel
          </a>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Creating...' : 'Create Site'}
          </button>
        </div>
      </form>
    </div>
  )
}
