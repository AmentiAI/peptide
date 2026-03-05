import { db } from '@/db'
import { clicks } from '@/db/schema'

export interface ClickEvent {
  site: string
  affiliateId: string
  vendor: string
  productSlug: string
  productName: string
  ip: string
  userAgent: string
  referrer: string
  timestamp: string
}

export async function logClick(event: ClickEvent): Promise<void> {
  try {
    await db.insert(clicks).values({
      siteDomain: event.site,
      affiliateId: event.affiliateId,
      vendor: event.vendor,
      productSlug: event.productSlug,
      productName: event.productName,
      ip: event.ip,
      userAgent: event.userAgent,
      referrer: event.referrer,
    })
  } catch (err) {
    console.log('[affiliate-click]', JSON.stringify(event), err)
  }
}
