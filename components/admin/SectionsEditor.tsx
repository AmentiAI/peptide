'use client'

import { useState } from 'react'

interface Section {
  id: number
  sectionType: string
  position: number
  isVisible: boolean
  content: Record<string, unknown>
}

const SECTION_TYPES = [
  { value: 'hero', label: 'Hero' },
  { value: 'trust_bar', label: 'Trust Bar' },
  { value: 'featured_products', label: 'Featured Products' },
  { value: 'image_banner', label: 'Image Banner' },
  { value: 'text_block', label: 'Text Block' },
  { value: 'cta_banner', label: 'CTA Banner' },
]

const DEFAULT_CONTENT: Record<string, Record<string, unknown>> = {
  hero: { headline: 'Premium Research Peptides', subheadline: 'Lab-tested compounds for researchers.', badge: 'Lab-Tested • COA Included', ctaText: 'Shop Now', ctaUrl: '/products', backgroundColor: '#0f4c81', overlayOpacity: 0.1 },
  trust_bar: { items: [{ icon: '🔬', text: 'Third-Party Lab Tested' }, { icon: '📋', text: 'COA on Every Order' }, { icon: '🚚', text: 'Fast US Shipping' }] },
  featured_products: { title: 'Featured Products', subtitle: 'Top research compounds', productSlugs: ['bpc-157', 'tb-500', 'cjc-1295-dac'] },
  image_banner: { imageUrl: '', headline: 'Research Grade Peptides', subtext: '', ctaText: 'Shop Now', ctaUrl: '/products', textPosition: 'left' },
  text_block: { title: 'About Our Products', content: 'All products are strictly for research purposes only.', align: 'left', backgroundColor: '' },
  cta_banner: { headline: 'New to Research Peptides?', subtext: 'Read our in-depth guides.', ctaText: 'Browse Guides', ctaUrl: '/guides', backgroundColor: '#0f4c81' },
}

function ContentEditor({
  sectionType,
  content,
  onChange,
}: {
  sectionType: string
  content: Record<string, unknown>
  onChange: (c: Record<string, unknown>) => void
}) {
  function set(key: string, value: unknown) {
    onChange({ ...content, [key]: value })
  }

  const fields: React.ReactNode[] = []

  if (sectionType === 'hero') {
    fields.push(
      <Field key="headline" label="Headline">
        <input type="text" value={String(content.headline ?? '')} onChange={(e) => set('headline', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="subheadline" label="Subheadline">
        <textarea rows={2} value={String(content.subheadline ?? '')} onChange={(e) => set('subheadline', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="badge" label="Badge (optional)">
        <input type="text" value={String(content.badge ?? '')} onChange={(e) => set('badge', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="ctaText" label="CTA Text">
        <input type="text" value={String(content.ctaText ?? '')} onChange={(e) => set('ctaText', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="ctaUrl" label="CTA URL">
        <input type="text" value={String(content.ctaUrl ?? '')} onChange={(e) => set('ctaUrl', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="backgroundImage" label="Background Image URL">
        <input type="text" value={String(content.backgroundImage ?? '')} onChange={(e) => set('backgroundImage', e.target.value || undefined)} className={inputCls} placeholder="https://..." />
      </Field>,
      <Field key="backgroundColor" label="Background Color">
        <div className="flex gap-2">
          <input type="color" value={String(content.backgroundColor ?? '#0f4c81')} onChange={(e) => set('backgroundColor', e.target.value)} className="h-9 w-12 rounded border border-gray-300 cursor-pointer" />
          <input type="text" value={String(content.backgroundColor ?? '')} onChange={(e) => set('backgroundColor', e.target.value)} className={inputCls + ' font-mono'} />
        </div>
      </Field>
    )
  } else if (sectionType === 'trust_bar') {
    const items = (content.items as { icon: string; text: string }[]) ?? []
    fields.push(
      <div key="items" className="space-y-2">
        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">Trust Items</div>
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input type="text" value={item.icon} onChange={(e) => { const next = [...items]; next[i] = { ...item, icon: e.target.value }; set('items', next) }} className="w-14 border border-gray-300 rounded px-2 py-1.5 text-sm" />
            <input type="text" value={item.text} onChange={(e) => { const next = [...items]; next[i] = { ...item, text: e.target.value }; set('items', next) }} className={inputCls + ' flex-1'} />
            <button type="button" onClick={() => set('items', items.filter((_, j) => j !== i))} className="text-red-500 text-xs hover:underline">✕</button>
          </div>
        ))}
        <button type="button" onClick={() => set('items', [...items, { icon: '✅', text: 'New Item' }])} className="text-blue-600 text-xs hover:underline">+ Add Item</button>
      </div>
    )
  } else if (sectionType === 'featured_products') {
    fields.push(
      <Field key="title" label="Title">
        <input type="text" value={String(content.title ?? '')} onChange={(e) => set('title', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="subtitle" label="Subtitle">
        <input type="text" value={String(content.subtitle ?? '')} onChange={(e) => set('subtitle', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="productSlugs" label="Product Slugs (comma-separated)">
        <input type="text" value={(content.productSlugs as string[] ?? []).join(', ')} onChange={(e) => set('productSlugs', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} className={inputCls} />
      </Field>
    )
  } else if (sectionType === 'image_banner') {
    fields.push(
      <Field key="imageUrl" label="Image URL">
        <input type="text" value={String(content.imageUrl ?? '')} onChange={(e) => set('imageUrl', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="headline" label="Headline (optional)">
        <input type="text" value={String(content.headline ?? '')} onChange={(e) => set('headline', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="subtext" label="Subtext (optional)">
        <input type="text" value={String(content.subtext ?? '')} onChange={(e) => set('subtext', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="ctaText" label="CTA Text">
        <input type="text" value={String(content.ctaText ?? '')} onChange={(e) => set('ctaText', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="ctaUrl" label="CTA URL">
        <input type="text" value={String(content.ctaUrl ?? '')} onChange={(e) => set('ctaUrl', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="textPosition" label="Text Position">
        <select value={String(content.textPosition ?? 'left')} onChange={(e) => set('textPosition', e.target.value)} className={inputCls}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </Field>
    )
  } else if (sectionType === 'text_block') {
    fields.push(
      <Field key="title" label="Title (optional)">
        <input type="text" value={String(content.title ?? '')} onChange={(e) => set('title', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="content" label="Content (HTML allowed)">
        <textarea rows={4} value={String(content.content ?? '')} onChange={(e) => set('content', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="align" label="Alignment">
        <select value={String(content.align ?? 'left')} onChange={(e) => set('align', e.target.value)} className={inputCls}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </Field>,
      <Field key="backgroundColor" label="Background Color (optional)">
        <input type="text" value={String(content.backgroundColor ?? '')} onChange={(e) => set('backgroundColor', e.target.value)} placeholder="#ffffff" className={inputCls + ' font-mono'} />
      </Field>
    )
  } else if (sectionType === 'cta_banner') {
    fields.push(
      <Field key="headline" label="Headline">
        <input type="text" value={String(content.headline ?? '')} onChange={(e) => set('headline', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="subtext" label="Subtext (optional)">
        <textarea rows={2} value={String(content.subtext ?? '')} onChange={(e) => set('subtext', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="ctaText" label="CTA Text">
        <input type="text" value={String(content.ctaText ?? '')} onChange={(e) => set('ctaText', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="ctaUrl" label="CTA URL">
        <input type="text" value={String(content.ctaUrl ?? '')} onChange={(e) => set('ctaUrl', e.target.value)} className={inputCls} />
      </Field>,
      <Field key="backgroundColor" label="Background Color">
        <div className="flex gap-2">
          <input type="color" value={String(content.backgroundColor ?? '#0f4c81')} onChange={(e) => set('backgroundColor', e.target.value)} className="h-9 w-12 rounded border border-gray-300 cursor-pointer" />
          <input type="text" value={String(content.backgroundColor ?? '')} onChange={(e) => set('backgroundColor', e.target.value)} className={inputCls + ' font-mono'} />
        </div>
      </Field>
    )
  }

  return <>{fields}</>
}

const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  )
}

export default function SectionsEditor({
  siteId,
  siteName,
  initialSections,
}: {
  siteId: number
  siteName: string
  initialSections: Section[]
}) {
  const [sections, setSections] = useState(initialSections)
  const [selected, setSelected] = useState<Section | null>(sections[0] ?? null)
  const [editContent, setEditContent] = useState<Record<string, unknown>>(sections[0]?.content ?? {})
  const [saving, setSaving] = useState(false)
  const [newType, setNewType] = useState('hero')
  const [status, setStatus] = useState('')

  function selectSection(s: Section) {
    setSelected(s)
    setEditContent(s.content)
    setStatus('')
  }

  async function saveSection() {
    if (!selected) return
    setSaving(true)
    setStatus('')
    try {
      const res = await fetch(`/api/admin/sites/${siteId}/sections/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent }),
      })
      if (res.ok) {
        const updated = await res.json()
        setSections((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
        setSelected(updated)
        setStatus('Saved!')
      }
    } finally {
      setSaving(false)
    }
  }

  async function toggleVisibility(s: Section) {
    const res = await fetch(`/api/admin/sites/${siteId}/sections/${s.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isVisible: !s.isVisible }),
    })
    if (res.ok) {
      const updated = await res.json()
      setSections((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))
      if (selected?.id === updated.id) setSelected(updated)
    }
  }

  async function deleteSection(s: Section) {
    if (!confirm('Delete this section?')) return
    await fetch(`/api/admin/sites/${siteId}/sections/${s.id}`, { method: 'DELETE' })
    const next = sections.filter((x) => x.id !== s.id)
    setSections(next)
    if (selected?.id === s.id) {
      setSelected(next[0] ?? null)
      setEditContent(next[0]?.content ?? {})
    }
  }

  async function moveSection(s: Section, dir: -1 | 1) {
    const idx = sections.findIndex((x) => x.id === s.id)
    const targetIdx = idx + dir
    if (targetIdx < 0 || targetIdx >= sections.length) return

    const swapped = [...sections]
    const temp = swapped[idx]
    swapped[idx] = { ...swapped[targetIdx], position: temp.position }
    swapped[targetIdx] = { ...temp, position: swapped[targetIdx].position }

    setSections(swapped)

    await Promise.all([
      fetch(`/api/admin/sites/${siteId}/sections/${swapped[idx].id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position: swapped[idx].position }),
      }),
      fetch(`/api/admin/sites/${siteId}/sections/${swapped[targetIdx].id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position: swapped[targetIdx].position }),
      }),
    ])
  }

  async function addSection() {
    const lastPos = sections.length > 0 ? Math.max(...sections.map((s) => s.position)) + 1 : 0
    const res = await fetch(`/api/admin/sites/${siteId}/sections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: 'home',
        sectionType: newType,
        position: lastPos,
        isVisible: true,
        content: DEFAULT_CONTENT[newType] ?? {},
      }),
    })
    if (res.ok) {
      const created = await res.json()
      setSections((prev) => [...prev, created])
      selectSection(created)
    }
  }

  return (
    <div className="flex gap-0 border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Left panel */}
      <div className="w-64 flex-shrink-0 border-r border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sections — {siteName}</p>
        </div>
        <div className="p-3 border-b border-gray-100 flex gap-2">
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-xs"
          >
            {SECTION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <button
            onClick={addSection}
            className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-700"
          >
            + Add
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {sections.sort((a, b) => a.position - b.position).map((s, idx) => (
            <div
              key={s.id}
              onClick={() => selectSection(s)}
              className={`px-3 py-2.5 cursor-pointer hover:bg-gray-50 ${selected?.id === s.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-800 capitalize">
                  {s.isVisible ? '●' : '○'} {s.sectionType.replace('_', ' ')}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleVisibility(s) }}
                  className={`text-xs ${s.isVisible ? 'text-green-600' : 'text-gray-400'} hover:underline`}
                  title={s.isVisible ? 'Visible' : 'Hidden'}
                >
                  {s.isVisible ? '👁' : '🚫'}
                </button>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <button onClick={(e) => { e.stopPropagation(); moveSection(s, -1) }} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs">↑</button>
                <button onClick={(e) => { e.stopPropagation(); moveSection(s, 1) }} disabled={idx === sections.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs">↓</button>
                <button onClick={(e) => { e.stopPropagation(); deleteSection(s) }} className="text-red-400 hover:text-red-600 text-xs ml-auto">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 p-6">
        {selected ? (
          <>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900 capitalize">
                Edit: {selected.sectionType.replace('_', ' ')}
              </h3>
              {status && <span className="text-green-600 text-sm">{status}</span>}
            </div>
            <div className="space-y-4">
              <ContentEditor
                sectionType={selected.sectionType}
                content={editContent}
                onChange={setEditContent}
              />
            </div>
            <div className="mt-6">
              <button
                onClick={saveSection}
                disabled={saving}
                className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400 text-sm py-12">
            Select a section to edit, or add a new one.
          </div>
        )}
      </div>
    </div>
  )
}
