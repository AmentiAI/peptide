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
  // In production, replace with your preferred analytics/DB:
  // - Vercel KV, PlanetScale, Supabase, or a simple webhook
  // For now, log to console (visible in Vercel function logs)
  console.log('[affiliate-click]', JSON.stringify(event))

  // Optional: POST to external analytics endpoint
  // await fetch(process.env.ANALYTICS_WEBHOOK_URL!, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(event),
  // })
}
