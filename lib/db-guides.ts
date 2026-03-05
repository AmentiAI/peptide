import { db } from '@/db'
import { guides } from '@/db/schema'
import { eq, and, isNull, or } from 'drizzle-orm'

export async function getGuides(siteId?: number) {
  if (siteId !== undefined) {
    return db
      .select()
      .from(guides)
      .where(
        and(
          eq(guides.isPublished, true),
          or(eq(guides.siteId, siteId), isNull(guides.siteId))
        )
      )
      .orderBy(guides.publishedAt)
  }
  return db.select().from(guides).where(eq(guides.isPublished, true)).orderBy(guides.publishedAt)
}

export async function getGuide(slug: string, siteId?: number) {
  if (siteId !== undefined) {
    const rows = await db
      .select()
      .from(guides)
      .where(
        and(
          eq(guides.slug, slug),
          eq(guides.isPublished, true),
          or(eq(guides.siteId, siteId), isNull(guides.siteId))
        )
      )
      .limit(1)
    return rows[0] ?? null
  }
  const rows = await db
    .select()
    .from(guides)
    .where(and(eq(guides.slug, slug), eq(guides.isPublished, true)))
    .limit(1)
  return rows[0] ?? null
}

export async function getAllGuidesAdmin() {
  return db.select().from(guides).orderBy(guides.createdAt)
}

export async function getGuideById(id: number) {
  const rows = await db.select().from(guides).where(eq(guides.id, id)).limit(1)
  return rows[0] ?? null
}

export async function createGuide(data: Omit<typeof guides.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>) {
  const rows = await db.insert(guides).values(data).returning()
  return rows[0]
}

export async function updateGuide(id: number, data: Partial<typeof guides.$inferInsert>) {
  const rows = await db
    .update(guides)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(guides.id, id))
    .returning()
  return rows[0] ?? null
}

export async function deleteGuide(id: number) {
  await db.delete(guides).where(eq(guides.id, id))
}
