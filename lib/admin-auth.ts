import { cookies } from 'next/headers'
import { createHmac } from 'crypto'

const COOKIE_NAME = 'admin_token'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

function sign(value: string): string {
  const secret = process.env.ADMIN_SECRET
  if (!secret) {
    throw new Error('ADMIN_SECRET environment variable is not set. Please configure it in Vercel settings.')
  }
  const mac = createHmac('sha256', secret).update(value).digest('hex')
  return `${value}.${mac}`
}

function verify(signed: string): string | null {
  const lastDot = signed.lastIndexOf('.')
  if (lastDot === -1) return null
  const value = signed.slice(0, lastDot)
  const expected = sign(value)
  if (signed !== expected) return null
  return value
}

export function createAdminToken(): string {
  const payload = `admin:${Date.now()}`
  return sign(payload)
}

export function verifyAdminToken(token: string): boolean {
  return verify(token) !== null
}

export async function getAdminToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value ?? null
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAdminToken()
  if (!token) return false
  return verifyAdminToken(token)
}

export function getAdminCookieOptions() {
  return {
    name: COOKIE_NAME,
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  }
}

/** Use in API routes — throws Response with 401 if not authed */
export async function requireAdmin(request: Request): Promise<void> {
  const cookieHeader = request.headers.get('cookie') || ''
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
  const token = match ? decodeURIComponent(match[1]) : null
  if (!token || !verifyAdminToken(token)) {
    throw new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
