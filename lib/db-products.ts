import { db } from '@/db'
import { products, siteProducts, sites } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function getAllProducts() {
  return db.select().from(products).where(eq(products.isActive, true)).orderBy(products.name)
}

export async function getProductById(id: number) {
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1)
  return rows[0] ?? null
}

export async function getProductBySlug(slug: string) {
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1)
  return rows[0] ?? null
}

export async function getSiteProducts(siteId: number) {
  return db
    .select({
      id: siteProducts.id,
      siteId: siteProducts.siteId,
      productId: siteProducts.productId,
      affiliateUrl: siteProducts.affiliateUrl,
      customImageUrl: siteProducts.customImageUrl,
      isFeatured: siteProducts.isFeatured,
      position: siteProducts.position,
      isVisible: siteProducts.isVisible,
      slug: products.slug,
      name: products.name,
      shortName: products.shortName,
      category: products.category,
      description: products.description,
      longDescription: products.longDescription,
      benefits: products.benefits,
      dosage: products.dosage,
      halfLife: products.halfLife,
      imageUrl: products.imageUrl,
      tags: products.tags,
      vendorUrls: products.vendorUrls,
    })
    .from(siteProducts)
    .innerJoin(products, eq(siteProducts.productId, products.id))
    .where(and(eq(siteProducts.siteId, siteId), eq(siteProducts.isVisible, true)))
    .orderBy(siteProducts.position)
}

export async function getFeaturedSiteProducts(siteId: number) {
  return db
    .select({
      id: siteProducts.id,
      siteId: siteProducts.siteId,
      productId: siteProducts.productId,
      affiliateUrl: siteProducts.affiliateUrl,
      customImageUrl: siteProducts.customImageUrl,
      isFeatured: siteProducts.isFeatured,
      position: siteProducts.position,
      isVisible: siteProducts.isVisible,
      slug: products.slug,
      name: products.name,
      shortName: products.shortName,
      category: products.category,
      description: products.description,
      longDescription: products.longDescription,
      benefits: products.benefits,
      dosage: products.dosage,
      halfLife: products.halfLife,
      imageUrl: products.imageUrl,
      tags: products.tags,
      vendorUrls: products.vendorUrls,
    })
    .from(siteProducts)
    .innerJoin(products, eq(siteProducts.productId, products.id))
    .where(and(eq(siteProducts.siteId, siteId), eq(siteProducts.isFeatured, true), eq(siteProducts.isVisible, true)))
    .orderBy(siteProducts.position)
}

export async function upsertProduct(data: Omit<typeof products.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>) {
  const rows = await db
    .insert(products)
    .values({ ...data, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: products.slug,
      set: { ...data, updatedAt: new Date() },
    })
    .returning()
  return rows[0]
}

export async function updateProduct(id: number, data: Partial<typeof products.$inferInsert>) {
  const rows = await db
    .update(products)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning()
  return rows[0] ?? null
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id))
}

export async function upsertSiteProduct(
  siteId: number,
  productId: number,
  data: Partial<typeof siteProducts.$inferInsert>
) {
  const existing = await db
    .select()
    .from(siteProducts)
    .where(and(eq(siteProducts.siteId, siteId), eq(siteProducts.productId, productId)))
    .limit(1)

  if (existing[0]) {
    const rows = await db
      .update(siteProducts)
      .set(data)
      .where(eq(siteProducts.id, existing[0].id))
      .returning()
    return rows[0]
  } else {
    const rows = await db
      .insert(siteProducts)
      .values({ siteId, productId, ...data })
      .returning()
    return rows[0]
  }
}
