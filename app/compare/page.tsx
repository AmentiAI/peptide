import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getSiteFromHeaders } from '@/lib/sites'
import ComparePicker from './ComparePicker'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  const baseUrl = site.baseUrl || 'https://peptidevault.com'
  const OG_IMAGE = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=630&q=80'

  return {
    title: `Compare Research Peptides — Side-by-Side Analysis`,
    description: `Compare any two of 19 research peptides side-by-side. Mechanisms, half-lives, dosing protocols, and research applications — instantly for any combination.`,
    keywords: [
      'compare peptides', 'peptide comparison', 'bpc-157 vs tb-500',
      'cjc-1295 vs ipamorelin', 'peptide side by side', 'research peptide comparison tool',
    ],
    alternates: { canonical: `${baseUrl}/compare` },
    openGraph: {
      title: `Compare Research Peptides — Side-by-Side`,
      description: `Compare any two of 19 research peptides. Mechanisms, dosing, half-lives, and more.`,
      type: 'website',
      url: `${baseUrl}/compare`,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Peptide Comparison Tool' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Compare Research Peptides`,
      description: `Side-by-side peptide comparison tool — 19 compounds, any combination.`,
      images: [OG_IMAGE],
    },
  }
}

export default function ComparePage() {
  return <ComparePicker />
}
