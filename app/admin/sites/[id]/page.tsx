import { notFound, redirect } from 'next/navigation'
import { getSiteById, updateSite } from '@/lib/db-sites'

export default async function EditSitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const site = await getSiteById(Number(id))
  if (!site) notFound()

  async function save(formData: FormData) {
    'use server'
    await updateSite(Number(id), {
      name: formData.get('name') as string,
      tagline: formData.get('tagline') as string,
      description: formData.get('description') as string,
      primaryColor: formData.get('primaryColor') as string,
      accentColor: formData.get('accentColor') as string,
      vendor: formData.get('vendor') as string,
      affiliateId: formData.get('affiliateId') as string,
      baseUrl: formData.get('baseUrl') as string,
      logoUrl: (formData.get('logoUrl') as string) || null,
      active: formData.get('active') === 'on',
    })
    redirect(`/admin/sites`)
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin/sites" className="text-sm text-gray-500 hover:text-gray-700">Sites</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">{site.domain}</h1>
      </div>

      <form action={save} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {[
          { name: 'name', label: 'Site Name', defaultValue: site.name },
          { name: 'tagline', label: 'Tagline', defaultValue: site.tagline },
          { name: 'affiliateId', label: 'Affiliate ID', defaultValue: site.affiliateId },
          { name: 'baseUrl', label: 'Base URL', defaultValue: site.baseUrl },
          { name: 'vendor', label: 'Vendor', defaultValue: site.vendor },
          { name: 'logoUrl', label: 'Logo URL (optional)', defaultValue: site.logoUrl || '' },
        ].map(({ name, label, defaultValue }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="text"
              name={name}
              defaultValue={defaultValue}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={site.description}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <div className="flex items-center gap-2">
              <input type="color" name="primaryColor" defaultValue={site.primaryColor} className="h-9 w-16 rounded border border-gray-300 cursor-pointer" />
              <input type="text" name="primaryColor" defaultValue={site.primaryColor} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
            <div className="flex items-center gap-2">
              <input type="color" name="accentColor" defaultValue={site.accentColor} className="h-9 w-16 rounded border border-gray-300 cursor-pointer" />
              <input type="text" name="accentColor" defaultValue={site.accentColor} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="active" id="active" defaultChecked={site.active} className="rounded" />
          <label htmlFor="active" className="text-sm text-gray-700">Active</label>
        </div>

        <div className="flex items-center justify-between pt-2 gap-3">
          <div className="flex gap-3">
            <a href={`/admin/sites/${id}/sections`} className="text-sm text-purple-600 hover:underline">
              Edit Sections →
            </a>
            <a href={`/admin/sites/${id}/products`} className="text-sm text-green-600 hover:underline">
              Manage Products →
            </a>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
