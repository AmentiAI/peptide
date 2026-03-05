import { NextRequest, NextResponse } from 'next/server'
import { createAdminToken, getAdminCookieOptions } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const { password } = body as { password?: string }

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = createAdminToken()
  const opts = getAdminCookieOptions()

  const response = NextResponse.json({ ok: true })
  response.cookies.set(opts.name, token, {
    maxAge: opts.maxAge,
    httpOnly: opts.httpOnly,
    secure: opts.secure,
    sameSite: opts.sameSite,
    path: opts.path,
  })
  return response
}
