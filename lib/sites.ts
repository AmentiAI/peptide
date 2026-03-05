import { SITES, SiteConfig, DEFAULT_SITE } from '@/sites.config'

export type { SiteConfig }

export function getSiteConfig(host: string): SiteConfig {
  // Strip port if present
  const domain = host.split(':')[0]

  // Direct match
  if (SITES[domain]) return SITES[domain]

  // www subdomain match
  const withoutWww = domain.replace(/^www\./, '')
  if (SITES[withoutWww]) return SITES[withoutWww]

  // Vercel preview URL fallback — use env var or default
  const defaultSite = process.env.NEXT_PUBLIC_DEFAULT_SITE || DEFAULT_SITE
  return SITES[defaultSite] || SITES[DEFAULT_SITE]
}

export function getSiteFromHeaders(headers: Headers): SiteConfig {
  // Prefer x-site-config header set by middleware
  const configJson = headers.get('x-site-config')
  if (configJson) {
    try {
      return JSON.parse(configJson) as SiteConfig
    } catch {
      // fall through
    }
  }

  // Fall back to host header
  const host = headers.get('host') || headers.get('x-forwarded-host') || DEFAULT_SITE
  return getSiteConfig(host)
}
