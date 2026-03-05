import { db } from '@/db'
import { clicks } from '@/db/schema'
import { desc, sql } from 'drizzle-orm'

export default async function AdminAnalyticsPage() {
  const [totalRows, byDomain, byProduct, recent] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(clicks),
    db
      .select({ siteDomain: clicks.siteDomain, count: sql<number>`count(*)::int` })
      .from(clicks)
      .groupBy(clicks.siteDomain)
      .orderBy(desc(sql`count(*)`)),
    db
      .select({ productSlug: clicks.productSlug, productName: clicks.productName, count: sql<number>`count(*)::int` })
      .from(clicks)
      .groupBy(clicks.productSlug, clicks.productName)
      .orderBy(desc(sql`count(*)`))
      .limit(20),
    db.select().from(clicks).orderBy(desc(clicks.createdAt)).limit(50),
  ])

  const total = totalRows[0]?.count ?? 0

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-3xl font-bold text-gray-900">{total.toLocaleString()}</div>
          <div className="text-sm text-gray-500 mt-1">Total Affiliate Clicks</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Clicks by Domain</h2>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {byDomain.map((row) => (
                <tr key={row.siteDomain} className="border-b border-gray-50">
                  <td className="px-5 py-3 text-gray-700">{row.siteDomain}</td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-900">{row.count}</td>
                </tr>
              ))}
              {byDomain.length === 0 && (
                <tr><td className="px-5 py-8 text-center text-gray-400" colSpan={2}>No data yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Top Products</h2>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {byProduct.map((row) => (
                <tr key={row.productSlug} className="border-b border-gray-50">
                  <td className="px-5 py-3 text-gray-700">{row.productName || row.productSlug}</td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-900">{row.count}</td>
                </tr>
              ))}
              {byProduct.length === 0 && (
                <tr><td className="px-5 py-8 text-center text-gray-400" colSpan={2}>No data yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Clicks (last 50)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Domain</th>
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Vendor</th>
                <th className="px-5 py-3 font-medium">IP</th>
                <th className="px-5 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((click) => (
                <tr key={click.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-700">{click.siteDomain}</td>
                  <td className="px-5 py-3 text-gray-700">{click.productName || click.productSlug}</td>
                  <td className="px-5 py-3 text-gray-500">{click.vendor}</td>
                  <td className="px-5 py-3 text-gray-400 font-mono text-xs">{click.ip}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{new Date(click.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr><td className="px-5 py-8 text-center text-gray-400" colSpan={5}>No clicks yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
