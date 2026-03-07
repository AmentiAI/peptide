export interface SiteConfig {
  name: string
  tagline: string
  description: string
  primaryColor: string
  accentColor: string
  vendor: string
  affiliateId: string
  baseUrl: string
  logo?: string
}

export const SITES: Record<string, SiteConfig> = {
  'peptidevault.com': {
    name: 'Peptide Vault',
    tagline: 'Premium Research Peptides',
    description: 'Your trusted source for high-purity research peptides. Lab-tested, certificate of analysis included.',
    primaryColor: '#0f4c81',
    accentColor: '#1a73e8',
    vendor: 'pantheon',
    affiliateId: 'peptidevault',
    baseUrl: 'https://peptidevault.com',
  },
  'researchpeps.com': {
    name: 'Research Peps',
    tagline: 'Science-Grade Peptides for Researchers',
    description: 'High-quality research peptides with verified purity. Trusted by laboratories worldwide.',
    primaryColor: '#1b4332',
    accentColor: '#40916c',
    vendor: 'pantheon',
    affiliateId: 'researchpeps',
    baseUrl: 'https://researchpeps.com',
  },
  'peptidesource.net': {
    name: 'Peptide Source',
    tagline: 'The Source for Research Peptides',
    description: 'Reliable peptide supply for research professionals. Competitive pricing and fast shipping.',
    primaryColor: '#7b2d8b',
    accentColor: '#ab47bc',
    vendor: 'pantheon',
    affiliateId: 'peptidesource',
    baseUrl: 'https://peptidesource.net',
  },
  'alpharesearchpeptides.com': {
    name: 'Alpha Research Peptides',
    tagline: 'Alpha-Grade Purity Research Compounds',
    description: 'Premium research peptides for serious scientists. Industry-leading purity standards.',
    primaryColor: '#b71c1c',
    accentColor: '#ef5350',
    vendor: 'pantheon',
    affiliateId: 'alpharesearch',
    baseUrl: 'https://alpharesearchpeptides.com',
  },
  'labgradepeptides.com': {
    name: 'Lab Grade Peptides',
    tagline: 'Laboratory Quality Research Peptides',
    description: 'Pharmaceutical-grade peptides for research applications. Third-party tested purity.',
    primaryColor: '#004d6e',
    accentColor: '#0288d1',
    vendor: 'pantheon',
    affiliateId: 'labgrade',
    baseUrl: 'https://labgradepeptides.com',
  },
  'purepeptidelab.com': {
    name: 'Pure Peptide Lab',
    tagline: 'Pure Science, Pure Peptides',
    description: 'Research-grade peptides synthesized to the highest purity standards. COA on every order.',
    primaryColor: '#1a237e',
    accentColor: '#3f51b5',
    vendor: 'pantheon',
    affiliateId: 'purepeptidelab',
    baseUrl: 'https://purepeptidelab.com',
  },
}

export const DEFAULT_SITE = 'peptidevault.com'
