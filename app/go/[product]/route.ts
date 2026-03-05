import { NextRequest, NextResponse } from 'next/server'
import { getSiteFromHeaders } from '@/lib/sites'
import { PRODUCTS } from '@/lib/products'
import { logClick } from '@/lib/tracking'

interface RouteContext {
  params: Promise<{ product: string }>
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { product: productSlug } = await params
  const site = getSiteFromHeaders(request.headers)
  const product = PRODUCTS[productSlug]

  if (!product) {
    return NextResponse.redirect(new URL('/products', request.url))
  }

  const vendorUrl = product.vendorUrls[site.vendor]
  if (!vendorUrl) {
    // Fallback to first available vendor URL
    const fallbackUrl = Object.values(product.vendorUrls)[0]
    return NextResponse.redirect(fallbackUrl || new URL('/products', request.url))
  }

  // Build affiliate URL with tracking params
  const affiliateUrl = new URL(vendorUrl)
  affiliateUrl.searchParams.set('ref', site.affiliateId)
  affiliateUrl.searchParams.set('utm_source', site.affiliateId)
  affiliateUrl.searchParams.set('utm_medium', 'affiliate')
  affiliateUrl.searchParams.set('utm_campaign', productSlug)

  // Log the click (fire-and-forget — don't await to avoid slowing redirect)
  logClick({
    site: site.baseUrl,
    affiliateId: site.affiliateId,
    vendor: site.vendor,
    productSlug,
    productName: product.name,
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    referrer: request.headers.get('referer') || '',
    timestamp: new Date().toISOString(),
  }).catch(console.error)

  return NextResponse.redirect(affiliateUrl.toString(), { status: 302 })
}
