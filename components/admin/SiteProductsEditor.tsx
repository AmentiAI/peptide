'use client'

import { useState } from 'react'

interface SiteProduct {
  id: number
  productId: number
  slug: string
  name: string
  category: string
  isFeatured: boolean
  isVisible: boolean
  position: number
  affiliateUrl?: string | null
}

interface AllProduct {
  id: number
  slug: string
  name: string
  category: string
}

export default function SiteProductsEditor({
  siteId,
  initialSiteProducts,
  allProducts,
}: {
  siteId: number
  initialSiteProducts: SiteProduct[]
  allProducts: AllProduct[]
}) {
  const [siteProducts, setSiteProducts] = useState(initialSiteProducts)
  const [saving, setSaving] = useState<number | null>(null)

  async function toggle(sp: SiteProduct, field: 'isFeatured' | 'isVisible') {
    setSaving(sp.productId)
    const res = await fetch(`/api/admin/sites/${siteId}/products`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: sp.productId, [field]: !sp[field] }),
    })
    if (res.ok) {
      const updated = await res.json()
      setSiteProducts((prev) => prev.map((p) => (p.productId === updated.productId ? { ...p, ...updated } : p)))
    }
    setSaving(null)
  }

  async function addProduct(productId: number) {
    setSaving(productId)
    const res = await fetch(`/api/admin/sites/${siteId}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, isVisible: true, isFeatured: false, position: siteProducts.length }),
    })
    if (res.ok) {
      const created = await res.json()
      const product = allProducts.find((p) => p.id === productId)!
      setSiteProducts((prev) => [...prev, { ...created, slug: product.slug, name: product.name, category: product.category }])
    }
    setSaving(null)
  }

  const assignedProductIds = new Set(siteProducts.map((sp) => sp.productId))
  const unassigned = allProducts.filter((p) => !assignedProductIds.has(p.id))

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Assigned Products ({siteProducts.length})</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Featured</th>
              <th className="px-5 py-3 font-medium">Visible</th>
            </tr>
          </thead>
          <tbody>
            {siteProducts.sort((a, b) => a.position - b.position).map((sp) => (
              <tr key={sp.productId} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{sp.name}</td>
                <td className="px-5 py-3 text-gray-500">{sp.category}</td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggle(sp, 'isFeatured')}
                    disabled={saving === sp.productId}
                    className={`text-xs font-medium px-2 py-0.5 rounded ${
                      sp.isFeatured ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                    } hover:opacity-80`}
                  >
                    {sp.isFeatured ? '⭐ Featured' : 'Not Featured'}
                  </button>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggle(sp, 'isVisible')}
                    disabled={saving === sp.productId}
                    className={`text-xs font-medium px-2 py-0.5 rounded ${
                      sp.isVisible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    } hover:opacity-80`}
                  >
                    {sp.isVisible ? 'Visible' : 'Hidden'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {unassigned.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Add Products</h2>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {unassigned.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{p.name}</td>
                  <td className="px-5 py-3 text-gray-500">{p.category}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => addProduct(p.id)}
                      disabled={saving === p.id}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      {saving === p.id ? 'Adding...' : '+ Assign'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
