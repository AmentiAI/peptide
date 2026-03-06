import type { CarouselSlide } from '@/components/HeroCarousel'

const BASE = 'https://images.unsplash.com'

export const HOME_SLIDES: CarouselSlide[] = [
  {
    image: `${BASE}/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&h=900&q=80`,
    headline: 'Premium Research Peptides',
    subheadline: 'Lab-tested compounds trusted by research professionals. Every batch verified with a Certificate of Analysis.',
    badge: 'Lab-Tested • COA on Every Order',
    ctaText: 'Browse Products',
    ctaUrl: '/products',
    ctaSecondaryText: 'Research Guides',
    ctaSecondaryUrl: '/guides',
  },
  {
    image: `${BASE}/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1920&h=900&q=80`,
    headline: '99%+ Purity Guaranteed',
    subheadline: 'Independent third-party laboratory verification on every batch. No compromises on quality.',
    badge: 'Third-Party Verified',
    ctaText: 'View Products',
    ctaUrl: '/products',
    ctaSecondaryText: 'Learn More',
    ctaSecondaryUrl: '/guides',
  },
  {
    image: `${BASE}/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=1920&h=900&q=80`,
    headline: 'Science-Grade Compounds',
    subheadline: 'From healing peptides to metabolic research compounds — the most studied molecules in modern research.',
    badge: 'Research Use Only',
    ctaText: 'Shop Now',
    ctaUrl: '/products',
    ctaSecondaryText: 'Read Guides',
    ctaSecondaryUrl: '/guides',
  },
  {
    image: `${BASE}/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1920&h=900&q=80`,
    headline: 'Fast US Shipping',
    subheadline: 'Discreet packaging, rapid fulfillment, and full tracking on every order. Trusted vendor network.',
    badge: '🚚 Fast & Discreet',
    ctaText: 'Browse Catalog',
    ctaUrl: '/products',
  },
]

export const PRODUCTS_SLIDES: CarouselSlide[] = [
  {
    image: `${BASE}/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1920&h=600&q=80`,
    headline: 'Research Peptide Catalog',
    subheadline: '12 premium research compounds — BPC-157, Semaglutide, Tirzepatide and more.',
    badge: 'All Products',
    ctaText: 'View All',
    ctaUrl: '#catalog',
  },
  {
    image: `${BASE}/photo-1631651363775-dba8c9c86c55?auto=format&fit=crop&w=1920&h=600&q=80`,
    headline: 'Lab-Certified Quality',
    subheadline: 'Independent Certificate of Analysis available for every product we list.',
    badge: 'COA Verified',
    ctaText: 'Learn About COAs',
    ctaUrl: '/guides',
  },
  {
    image: `${BASE}/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1920&h=600&q=80`,
    headline: '99%+ Pharmaceutical Purity',
    subheadline: 'Strict purity standards. Only the best vendors make our catalog.',
    badge: 'Purity Guaranteed',
    ctaText: 'Shop Products',
    ctaUrl: '#catalog',
  },
]

export const GUIDES_SLIDES: CarouselSlide[] = [
  {
    image: `${BASE}/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1920&h=600&q=80`,
    headline: 'Peptide Research Guides',
    subheadline: 'Evidence-based articles on mechanisms of action, dosing protocols, and the latest study results.',
    badge: 'Research Library',
    ctaText: 'Start Reading',
    ctaUrl: '#guides',
  },
  {
    image: `${BASE}/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1920&h=600&q=80`,
    headline: 'Evidence-Based Science',
    subheadline: 'Every guide is written with referenced research. Stay current with peptide science.',
    badge: 'Science-Backed',
    ctaText: 'Browse Guides',
    ctaUrl: '#guides',
  },
  {
    image: `${BASE}/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&h=600&q=80`,
    headline: 'Dosage & Protocol Guides',
    subheadline: 'Detailed dosage information, half-lives, and stacking protocols for research applications.',
    badge: 'Protocols',
    ctaText: 'View Guides',
    ctaUrl: '#guides',
  },
]

// Per-product image map — Unsplash photos
export const PRODUCT_IMAGES: Record<string, string> = {
  'bpc-157':             `${BASE}/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&h=600&q=80`,
  'tb-500':              `${BASE}/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&h=600&q=80`,
  'cjc-1295-dac':        `${BASE}/photo-1631651363775-dba8c9c86c55?auto=format&fit=crop&w=800&h=600&q=80`,
  'ipamorelin':          `${BASE}/photo-1576671081837-49000212a223?auto=format&fit=crop&w=800&h=600&q=80`,
  'sermorelin':          `${BASE}/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&h=600&q=80`,
  'melanotan-2':         `${BASE}/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&h=600&q=80`,
  'pt-141':              `${BASE}/photo-1576091160400-b7be5f35a2bb?auto=format&fit=crop&w=800&h=600&q=80`,
  'ghk-cu':              `${BASE}/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&h=600&q=80`,
  'semaglutide':         `${BASE}/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&h=600&q=80`,
  'tirzepatide':         `${BASE}/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=800&h=600&q=80`,
  'aod-9604':            `${BASE}/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&h=600&q=80`,
  'hgh-fragment-176-191':`${BASE}/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&h=600&q=80`,
}
