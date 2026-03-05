import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { updateSection, deleteSection } from '@/lib/db-sections'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    await requireAdmin(request)
    const { sectionId } = await params
    const body = await request.json()
    const section = await updateSection(Number(sectionId), body)
    if (!section) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(section)
  } catch (e) {
    if (e instanceof Response) return e
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; sectionId: string }> }
) {
  try {
    await requireAdmin(request)
    const { sectionId } = await params
    await deleteSection(Number(sectionId))
    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof Response) return e
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
