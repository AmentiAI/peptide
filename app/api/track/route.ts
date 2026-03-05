import { NextRequest, NextResponse } from 'next/server'
import { logClick } from '@/lib/tracking'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await logClick({
      ...body,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date().toISOString(),
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
