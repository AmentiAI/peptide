import { db } from '@/db'
import { sites, products, guides, clicks } from '@/db/schema'
import { desc, sql } from 'drizzle-orm'

export default async function AdminDashboard() {
  const [siteCount, productCount, guideCount, clickCount] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(sites),
    db.select({ count: sql<number>`count(*)::int` }).from(products),
    db.select({ count: sql<number>`count(*)::int` }).from(guides),
    db.select({ count: sql<number>`count(*)::int` }).from(clicks),
  ])

  const recentClicks = await db
    .select()
    .from(clicks)
    .orderBy(desc(clicks.createdAt))
    .limit(10)

  const stats = [
    { label: 'Sites', value: siteCount[0]?.count ?? 0, href: '/admin/sites', color: 'bg-blue-500' },
    { label: 'Products', value: productCount[0]?.count ?? 0, href: '/admin/products', color: 'bg-green-500' },
    { label: 'Guides', value: guideCount[0]?.count ?? 0, href: '/admin/guides', color: 'bg-purple-500' },
    { label: 'Total Clicks', value: clickCount[0]?.count ?? 0, href: '/admin/analytics', color: 'bg-orange-500' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <div className={`w-8 h-8 ${stat.color} rounded-lg mb-3`} />
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
          </a>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Clicks</h2>
        </div>
        {recentClicks.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-400 text-sm">No clicks yet</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Domain</th>
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Vendor</th>
                <th className="px-5 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentClicks.map((click) => (
                <tr key={click.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-700">{click.siteDomain}</td>
                  <td className="px-5 py-3 text-gray-700">{click.productName || click.productSlug}</td>
                  <td className="px-5 py-3 text-gray-500">{click.vendor}</td>
                  <td className="px-5 py-3 text-gray-400">
                    {new Date(click.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
