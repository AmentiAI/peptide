import { db } from '@/db'
import { pageSections } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function getPageSections(siteId: number, page = 'home') {
  return db
    .select()
    .from(pageSections)
    .where(and(eq(pageSections.siteId, siteId), eq(pageSections.page, page)))
    .orderBy(pageSections.position)
}

export async function getSectionById(id: number) {
  const rows = await db.select().from(pageSections).where(eq(pageSections.id, id)).limit(1)
  return rows[0] ?? null
}

export async function createSection(data: Omit<typeof pageSections.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>) {
  const rows = await db.insert(pageSections).values(data).returning()
  return rows[0]
}

export async function updateSection(id: number, data: Partial<typeof pageSections.$inferInsert>) {
  const rows = await db
    .update(pageSections)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(pageSections.id, id))
    .returning()
  return rows[0] ?? null
}

export async function deleteSection(id: number) {
  await db.delete(pageSections).where(eq(pageSections.id, id))
}
