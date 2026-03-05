import { NextRequest, NextResponse } from 'next/server'
import { getSiteConfig } from '@/lib/sites'

export function proxy(request: NextRequest) {
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    process.env.NEXT_PUBLIC_DEFAULT_SITE ||
    'peptidevault.com'

  const siteConfig = getSiteConfig(host)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-site-config', JSON.stringify(siteConfig))
  requestHeaders.set('x-site-host', host)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    // Skip static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|images/|admin).*)',
  ],
}
