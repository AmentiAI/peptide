import Link from 'next/link'
import { getAllSites } from '@/lib/db-sites'

export default async function AdminSitesPage() {
  const allSites = await getAllSites()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sites</h1>
        <Link
          href="/admin/sites/new"
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + New Site
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">Domain</th>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Affiliate ID</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allSites.map((site) => (
              <tr key={site.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: site.primaryColor }}
                    />
                    <span className="font-medium text-gray-900">{site.domain}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-700">{site.name}</td>
                <td className="px-5 py-3 text-gray-500 font-mono text-xs">{site.affiliateId}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      site.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {site.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/sites/${site.id}`}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/sites/${site.id}/sections`}
                      className="text-purple-600 hover:underline text-xs"
                    >
                      Sections
                    </Link>
                    <Link
                      href={`/admin/sites/${site.id}/products`}
                      className="text-green-600 hover:underline text-xs"
                    >
                      Products
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
