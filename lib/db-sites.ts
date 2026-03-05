import { db } from '@/db'
import { sites } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { SiteConfig } from '@/sites.config'

export async function getSiteFromDB(host: string): Promise<SiteConfig | null> {
  const domain = host.split(':')[0].replace(/^www\./, '')
  try {
    const rows = await db.select().from(sites).where(eq(sites.domain, domain)).limit(1)
    if (!rows[0]) return null
    const s = rows[0]
    return {
      name: s.name,
      tagline: s.tagline,
      description: s.description,
      primaryColor: s.primaryColor,
      accentColor: s.accentColor,
      vendor: s.vendor,
      affiliateId: s.affiliateId,
      baseUrl: s.baseUrl,
      logo: s.logoUrl ?? undefined,
    }
  } catch {
    return null
  }
}

export async function getAllSites() {
  return db.select().from(sites).orderBy(sites.domain)
}

export async function getSiteById(id: number) {
  const rows = await db.select().from(sites).where(eq(sites.id, id)).limit(1)
  return rows[0] ?? null
}

export async function upsertSite(data: {
  domain: string
  name: string
  tagline: string
  description: string
  primaryColor: string
  accentColor: string
  vendor: string
  affiliateId: string
  baseUrl: string
  logoUrl?: string
  active?: boolean
}) {
  const rows = await db
    .insert(sites)
    .values({ ...data, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: sites.domain,
      set: { ...data, updatedAt: new Date() },
    })
    .returning()
  return rows[0]
}

export async function updateSite(id: number, data: Partial<typeof sites.$inferInsert>) {
  const rows = await db
    .update(sites)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(sites.id, id))
    .returning()
  return rows[0] ?? null
}

export async function deleteSite(id: number) {
  await db.delete(sites).where(eq(sites.id, id))
}
