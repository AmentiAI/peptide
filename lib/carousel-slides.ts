import type { CarouselSlide } from '@/components/HeroCarousel'

const BASE = 'https://images.unsplash.com'
const PP09 = 'https://pantheonpeptides.com/wp-content/uploads/2024/09'
const PP10 = 'https://pantheonpeptides.com/wp-content/uploads/2024/10'
const PP12 = 'https://pantheonpeptides.com/wp-content/uploads/2024/12'

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

// Per-product image map — Pantheon Peptides product images
export const PRODUCT_IMAGES: Record<string, string> = {
  'bpc-157':          `${PP09}/BPC-157-2mg-scaled.jpg`,
  'tb-500':           `${PP09}/TD-500-2mg-scaled.jpg`,
  'cjc-1295':         `${PP09}/CJC1295-2mg-scaled.jpg`,
  'ipamorelin':       `${PP09}/IPAMORELIN-2mg-scaled.jpg`,
  'sermorelin':       `${PP09}/SERMORELIN-2mg-scaled.jpg`,
  'pt-141':           `${PP09}/PT141-10mg-scaled.jpg`,
  'ghk-cu':           `${PP09}/GHKCU-50mg-scaled.jpg`,
  'tirzepatide':      `${PP09}/TIRZEPTIDE-5mg-scaled.jpg`,
  'mt-2':             `${PP09}/MT2-10mg-scaled.jpg`,
  'semax':            `${PP09}/SEMAX-10mg-scaled.jpg`,
  'mots-c':           `${PP09}/MOTSC-10mg-scaled.jpg`,
  'tesamorelin':      `${PP09}/TESAMORELIN-2mg-scaled.jpg`,
  'thymosin-alpha-1': `${PP09}/THYMOSIN-ALPHA1-2mg-1-scaled.jpg`,
  'epithalon':        `${PP09}/EPITALON-10mg-scaled.jpg`,
  'selank':           `${PP09}/SELANK-5mg-scaled.jpg`,
  'kisspeptin-10':    `${PP09}/KISSPEPTINE-5mg-scaled.jpg`,
  'mk-677':           `${PP12}/MK-677-15mg-Oral-1.jpg`,
  'll-37':            `${PP10}/LL37-5mg-scaled.jpg`,
  '5-amino-1mq':      `${PP10}/5-AMINO-1MQ-5mg-scaled.jpg`,
}
