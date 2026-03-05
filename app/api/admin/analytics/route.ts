import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/db'
import { clicks } from '@/db/schema'
import { desc, sql } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request)

    const url = new URL(request.url)
    const limit = Math.min(Number(url.searchParams.get('limit') || 100), 500)

    const recent = await db
      .select()
      .from(clicks)
      .orderBy(desc(clicks.createdAt))
      .limit(limit)

    const byDomain = await db
      .select({
        siteDomain: clicks.siteDomain,
        count: sql<number>`count(*)::int`,
      })
      .from(clicks)
      .groupBy(clicks.siteDomain)
      .orderBy(desc(sql`count(*)`))

    const byProduct = await db
      .select({
        productSlug: clicks.productSlug,
        productName: clicks.productName,
        count: sql<number>`count(*)::int`,
      })
      .from(clicks)
      .groupBy(clicks.productSlug, clicks.productName)
      .orderBy(desc(sql`count(*)`))
      .limit(20)

    const total = await db.select({ count: sql<number>`count(*)::int` }).from(clicks)

    return NextResponse.json({
      total: total[0]?.count ?? 0,
      recent,
      byDomain,
      byProduct,
    })
  } catch (e) {
    if (e instanceof Response) return e
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
