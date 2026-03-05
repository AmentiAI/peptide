export interface Product {
  slug: string
  name: string
  shortName: string
  category: string
  description: string
  longDescription: string
  benefits: string[]
  dosage: string
  halfLife: string
  image: string
  tags: string[]
  vendorUrls: Record<string, string>
  featured: boolean
}

// Base vendor URL — affiliate tag appended in /go/[product]
const VENDOR_BASE = {
  peptidesciences: 'https://www.peptidesciences.com',
}

export const PRODUCTS: Record<string, Product> = {
  'bpc-157': {
    slug: 'bpc-157',
    name: 'BPC-157',
    shortName: 'BPC-157',
    category: 'Healing & Recovery',
    description: 'Body Protection Compound 157 — one of the most studied healing peptides.',
    longDescription:
      'BPC-157 (Body Protection Compound 157) is a pentadecapeptide derived from a protective gastric juice protein. It has been extensively studied for its remarkable regenerative properties, promoting healing of tendons, ligaments, muscles, and gut tissue. Research suggests it works through several pathways including growth hormone receptor interactions and angiogenesis.',
    benefits: [
      'Accelerated tendon and ligament healing',
      'Gut health and mucosal protection',
      'Anti-inflammatory effects',
      'Improved wound healing',
      'Neuroprotective properties',
    ],
    dosage: '250-500mcg per day, subcutaneous or intramuscular injection',
    halfLife: '4 hours',
    image: '/images/bpc-157.jpg',
    tags: ['healing', 'recovery', 'gut health', 'tendon'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/bpc-157/`,
    },
    featured: true,
  },
  'tb-500': {
    slug: 'tb-500',
    name: 'TB-500',
    shortName: 'TB-500',
    category: 'Healing & Recovery',
    description: 'Thymosin Beta-4 fragment — promotes healing, flexibility, and regeneration.',
    longDescription:
      'TB-500 is a synthetic fraction of the naturally occurring protein Thymosin Beta-4. It plays a critical role in building new blood vessels, muscle tissue, and cell migration and proliferation. Research has demonstrated its potential in accelerating wound healing and recovery from injury.',
    benefits: [
      'Promotes muscle fiber growth',
      'Speeds up wound healing',
      'Reduces inflammation',
      'Improves flexibility',
      'Supports cardiovascular health',
    ],
    dosage: '2-2.5mg twice per week',
    halfLife: 'Unknown, estimated days',
    image: '/images/tb-500.jpg',
    tags: ['healing', 'recovery', 'muscle', 'injury'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/tb-500/`,
    },
    featured: true,
  },
  'cjc-1295-dac': {
    slug: 'cjc-1295-dac',
    name: 'CJC-1295 DAC',
    shortName: 'CJC-1295',
    category: 'Growth Hormone',
    description: 'Growth hormone releasing hormone analog with extended half-life via DAC technology.',
    longDescription:
      'CJC-1295 DAC is a synthetic analog of growth hormone-releasing hormone (GHRH). The Drug Affinity Complex (DAC) technology extends its half-life significantly, making it a long-acting GHRH analog. It stimulates the pituitary gland to produce more growth hormone, offering benefits for body composition and recovery.',
    benefits: [
      'Increased growth hormone secretion',
      'Enhanced fat metabolism',
      'Improved muscle mass',
      'Better sleep quality',
      'Anti-aging effects',
    ],
    dosage: '1-2mg per week',
    halfLife: '6-8 days (with DAC)',
    image: '/images/cjc-1295.jpg',
    tags: ['growth hormone', 'GHRH', 'anti-aging', 'body composition'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/cjc-1295-with-dac/`,
    },
    featured: true,
  },
  ipamorelin: {
    slug: 'ipamorelin',
    name: 'Ipamorelin',
    shortName: 'Ipamorelin',
    category: 'Growth Hormone',
    description: 'Selective growth hormone secretagogue with minimal side effects.',
    longDescription:
      'Ipamorelin is a selective growth hormone secretagogue and ghrelin receptor agonist. It stimulates growth hormone release with high selectivity, meaning it does not significantly raise cortisol or prolactin levels. Often stacked with CJC-1295 for synergistic effects.',
    benefits: [
      'Selective GH release',
      'Minimal cortisol elevation',
      'Improved sleep',
      'Fat loss support',
      'Lean muscle preservation',
    ],
    dosage: '200-300mcg 2-3x daily',
    halfLife: '2 hours',
    image: '/images/ipamorelin.jpg',
    tags: ['growth hormone', 'secretagogue', 'anti-aging'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/ipamorelin/`,
    },
    featured: true,
  },
  sermorelin: {
    slug: 'sermorelin',
    name: 'Sermorelin',
    shortName: 'Sermorelin',
    category: 'Growth Hormone',
    description: 'GHRH analog that stimulates natural growth hormone production.',
    longDescription:
      'Sermorelin is a synthetic analog of growth hormone-releasing hormone (GHRH). It stimulates the pituitary gland to produce and secrete growth hormone naturally. Widely used in anti-aging research and studied for its ability to restore youthful GH levels.',
    benefits: [
      'Natural GH stimulation',
      'Improved body composition',
      'Enhanced energy levels',
      'Better sleep quality',
      'Bone density support',
    ],
    dosage: '200-500mcg before bed',
    halfLife: '10-20 minutes',
    image: '/images/sermorelin.jpg',
    tags: ['growth hormone', 'GHRH', 'anti-aging'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/sermorelin/`,
    },
    featured: false,
  },
  'melanotan-2': {
    slug: 'melanotan-2',
    name: 'Melanotan II',
    shortName: 'MT-2',
    category: 'Melanocortin',
    description: 'Melanocortin receptor agonist studied for tanning and libido effects.',
    longDescription:
      'Melanotan II is a synthetic analog of the naturally occurring melanocortin peptide alpha-MSH. It acts on melanocortin receptors and has been studied for its effects on skin pigmentation, libido, and appetite suppression.',
    benefits: [
      'Skin pigmentation enhancement',
      'Libido support',
      'Appetite suppression',
      'UV protection research',
    ],
    dosage: '0.5-1mg as needed',
    halfLife: '33-36 hours',
    image: '/images/melanotan-2.jpg',
    tags: ['melanocortin', 'tanning', 'libido'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/melanotan-2/`,
    },
    featured: false,
  },
  'pt-141': {
    slug: 'pt-141',
    name: 'PT-141',
    shortName: 'PT-141',
    category: 'Melanocortin',
    description: 'Bremelanotide — melanocortin agonist studied for sexual function.',
    longDescription:
      'PT-141 (Bremelanotide) is a cyclic heptapeptide melanocortin agonist. Unlike other sexual function peptides, it acts centrally through the nervous system rather than the vascular system. Studied extensively for both male and female sexual dysfunction research.',
    benefits: [
      'Sexual function support',
      'Central nervous system action',
      'Works for both sexes in research',
      'No cardiovascular mechanism',
    ],
    dosage: '1-2mg as needed, 45 min before',
    halfLife: '2.7 hours',
    image: '/images/pt-141.jpg',
    tags: ['melanocortin', 'sexual health', 'libido'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/pt-141-bremelanotide/`,
    },
    featured: false,
  },
  'ghk-cu': {
    slug: 'ghk-cu',
    name: 'GHK-Cu',
    shortName: 'GHK-Cu',
    category: 'Anti-Aging',
    description: 'Copper peptide with powerful anti-aging and wound healing properties.',
    longDescription:
      'GHK-Cu (Copper Peptide GHK-Cu) is a naturally occurring copper complex of the tripeptide glycyl-L-histidyl-L-lysine. It has been found to promote wound healing, attract immune cells, antioxidant and anti-inflammatory effects, and stimulate collagen synthesis.',
    benefits: [
      'Collagen synthesis promotion',
      'Wound healing acceleration',
      'Anti-inflammatory effects',
      'Antioxidant properties',
      'Skin renewal support',
    ],
    dosage: '1-2mg per day topically or subcutaneously',
    halfLife: 'Short, minutes in blood',
    image: '/images/ghk-cu.jpg',
    tags: ['anti-aging', 'skin', 'collagen', 'wound healing'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/ghk-cu/`,
    },
    featured: true,
  },
  semaglutide: {
    slug: 'semaglutide',
    name: 'Semaglutide',
    shortName: 'Semaglutide',
    category: 'Metabolic',
    description: 'GLP-1 receptor agonist studied for metabolic health and weight management.',
    longDescription:
      'Semaglutide is a glucagon-like peptide-1 (GLP-1) receptor agonist. It mimics the action of the hormone GLP-1 which regulates insulin secretion and appetite. Extensively researched for its effects on blood sugar regulation and body weight management.',
    benefits: [
      'Appetite regulation',
      'Blood glucose management',
      'Weight management research',
      'Cardiovascular research',
      'Long-acting weekly dosing',
    ],
    dosage: '0.25-2.4mg once weekly',
    halfLife: '7 days',
    image: '/images/semaglutide.jpg',
    tags: ['GLP-1', 'metabolic', 'weight management', 'diabetes research'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/semaglutide/`,
    },
    featured: true,
  },
  tirzepatide: {
    slug: 'tirzepatide',
    name: 'Tirzepatide',
    shortName: 'Tirzepatide',
    category: 'Metabolic',
    description: 'Dual GIP/GLP-1 receptor agonist — next-generation metabolic research peptide.',
    longDescription:
      'Tirzepatide is a novel dual glucose-dependent insulinotropic polypeptide (GIP) and GLP-1 receptor agonist. This dual-action mechanism represents a new class of metabolic research compounds with enhanced effects compared to single-receptor agonists.',
    benefits: [
      'Dual receptor activity',
      'Enhanced metabolic effects',
      'Appetite suppression research',
      'Blood glucose regulation',
      'Weekly administration',
    ],
    dosage: '2.5-15mg once weekly',
    halfLife: '5 days',
    image: '/images/tirzepatide.jpg',
    tags: ['GIP', 'GLP-1', 'metabolic', 'dual agonist'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/tirzepatide/`,
    },
    featured: true,
  },
  'aod-9604': {
    slug: 'aod-9604',
    name: 'AOD-9604',
    shortName: 'AOD-9604',
    category: 'Metabolic',
    description: 'HGH fragment analog studied for fat metabolism without growth effects.',
    longDescription:
      'AOD-9604 is a modified fragment of human growth hormone (HGH) spanning amino acids 176-191. It was developed to target fat metabolism specifically, without the growth-promoting or insulin-desensitizing effects of full HGH.',
    benefits: [
      'Fat metabolism research',
      'No insulin resistance effects',
      'No growth-promoting activity',
      'Safe profile in research',
      'Cartilage repair research',
    ],
    dosage: '300mcg daily, fasted',
    halfLife: '30-60 minutes',
    image: '/images/aod-9604.jpg',
    tags: ['fat loss', 'metabolic', 'HGH fragment'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/aod-9604/`,
    },
    featured: false,
  },
  'hgh-fragment-176-191': {
    slug: 'hgh-fragment-176-191',
    name: 'HGH Fragment 176-191',
    shortName: 'HGH Frag',
    category: 'Metabolic',
    description: 'C-terminal fragment of HGH studied for lipolysis and fat burning.',
    longDescription:
      'HGH Fragment 176-191 is a stabilized analog of the growth hormone-releasing factor (GRF) encompassing amino acids 176-191. This fragment has been shown to mimic the way HGH regulates fat metabolism without the negative effects of full HGH on blood sugar or cell proliferation.',
    benefits: [
      'Targeted lipolysis',
      'No effect on blood glucose',
      'No promotion of cell growth',
      'Potential anti-aging effects',
      'Short acting, flexible dosing',
    ],
    dosage: '250-500mcg 2x daily, fasted',
    halfLife: '30 minutes',
    image: '/images/hgh-fragment.jpg',
    tags: ['fat loss', 'lipolysis', 'HGH fragment', 'metabolic'],
    vendorUrls: {
      peptidesciences: `${VENDOR_BASE.peptidesciences}/hgh-fragment-176-191/`,
    },
    featured: false,
  },
}

export const FEATURED_PRODUCTS = Object.values(PRODUCTS).filter((p) => p.featured)

export function getProductsByCategory(): Record<string, Product[]> {
  const categories: Record<string, Product[]> = {}
  for (const product of Object.values(PRODUCTS)) {
    if (!categories[product.category]) categories[product.category] = []
    categories[product.category].push(product)
  }
  return categories
}
