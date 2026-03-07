import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides')

export interface GuideFrontmatter {
  title: string
  description: string
  date: string
  tags?: string[]
  readTime?: number
  image?: string
  relatedProducts?: string[]
}

export interface Guide {
  slug: string
  frontmatter: GuideFrontmatter
  content: string
}

export interface GuideMeta {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
  readTime?: number
  image?: string
}

export async function getGuides(): Promise<GuideMeta[]> {
  if (!fs.existsSync(GUIDES_DIR)) return []

  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith('.mdx'))

  const guides = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const filePath = path.join(GUIDES_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(raw)
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      tags: data.tags || [],
      readTime: data.readTime,
      image: data.image,
    }
  })

  return guides.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getGuide(slug: string): Promise<Guide | null> {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    frontmatter: data as GuideFrontmatter,
    content,
  }
}
