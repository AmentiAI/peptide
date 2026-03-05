import { notFound } from 'next/navigation'
import { getSiteById } from '@/lib/db-sites'
import { getSiteProducts, getAllProducts } from '@/lib/db-products'
import SiteProductsEditor from '@/components/admin/SiteProductsEditor'

export default async function SiteProductsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const site = await getSiteById(Number(id))
  if (!site) notFound()

  const [siteProds, allProds] = await Promise.all([
    getSiteProducts(Number(id)),
    getAllProducts(),
  ])

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin/sites" className="text-sm text-gray-500 hover:text-gray-700">Sites</a>
        <span className="text-gray-300">/</span>
        <a href={`/admin/sites/${id}`} className="text-sm text-gray-500 hover:text-gray-700">{site.domain}</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">Products</h1>
      </div>
      <SiteProductsEditor
        siteId={Number(id)}
        initialSiteProducts={siteProds.map((sp) => ({
          id: sp.id,
          productId: sp.productId,
          slug: sp.slug,
          name: sp.name,
          category: sp.category,
          isFeatured: sp.isFeatured,
          isVisible: sp.isVisible,
          position: sp.position,
          affiliateUrl: sp.affiliateUrl,
        }))}
        allProducts={allProds.map((p) => ({ id: p.id, slug: p.slug, name: p.name, category: p.category }))}
      />
    </div>
  )
}
