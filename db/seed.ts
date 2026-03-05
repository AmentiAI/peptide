import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)

const SITES_DATA = [
  {
    domain: 'peptidevault.com',
    name: 'Peptide Vault',
    tagline: 'Premium Research Peptides',
    description: 'Your trusted source for high-purity research peptides. Lab-tested, certificate of analysis included.',
    primaryColor: '#0f4c81',
    accentColor: '#1a73e8',
    vendor: 'peptidesciences',
    affiliateId: 'peptidevault',
    baseUrl: 'https://peptidevault.com',
  },
  {
    domain: 'researchpeps.com',
    name: 'Research Peps',
    tagline: 'Science-Grade Peptides for Researchers',
    description: 'High-quality research peptides with verified purity. Trusted by laboratories worldwide.',
    primaryColor: '#1b4332',
    accentColor: '#40916c',
    vendor: 'peptidesciences',
    affiliateId: 'researchpeps',
    baseUrl: 'https://researchpeps.com',
  },
  {
    domain: 'peptidesource.net',
    name: 'Peptide Source',
    tagline: 'The Source for Research Peptides',
    description: 'Reliable peptide supply for research professionals. Competitive pricing and fast shipping.',
    primaryColor: '#7b2d8b',
    accentColor: '#ab47bc',
    vendor: 'peptidesciences',
    affiliateId: 'peptidesource',
    baseUrl: 'https://peptidesource.net',
  },
  {
    domain: 'alpharesearchpeptides.com',
    name: 'Alpha Research Peptides',
    tagline: 'Alpha-Grade Purity Research Compounds',
    description: 'Premium research peptides for serious scientists. Industry-leading purity standards.',
    primaryColor: '#b71c1c',
    accentColor: '#ef5350',
    vendor: 'peptidesciences',
    affiliateId: 'alpharesearch',
    baseUrl: 'https://alpharesearchpeptides.com',
  },
  {
    domain: 'labgradepeptides.com',
    name: 'Lab Grade Peptides',
    tagline: 'Laboratory Quality Research Peptides',
    description: 'Pharmaceutical-grade peptides for research applications. Third-party tested purity.',
    primaryColor: '#004d6e',
    accentColor: '#0288d1',
    vendor: 'peptidesciences',
    affiliateId: 'labgrade',
    baseUrl: 'https://labgradepeptides.com',
  },
  {
    domain: 'purepeptidelab.com',
    name: 'Pure Peptide Lab',
    tagline: 'Pure Science. Pure Peptides.',
    description: 'Uncompromising purity standards for research peptide compounds. COA on every product.',
    primaryColor: '#1a237e',
    accentColor: '#3f51b5',
    vendor: 'peptidesciences',
    affiliateId: 'purepeptide',
    baseUrl: 'https://purepeptidelab.com',
  },
]

const PRODUCTS_DATA = [
  {
    slug: 'bpc-157',
    name: 'BPC-157',
    shortName: 'BPC-157',
    category: 'Healing & Recovery',
    description: 'Body Protection Compound 157 — one of the most studied healing peptides.',
    longDescription: 'BPC-157 (Body Protection Compound 157) is a pentadecapeptide derived from a protective gastric juice protein. It has been extensively studied for its remarkable regenerative properties, promoting healing of tendons, ligaments, muscles, and gut tissue.',
    benefits: ['Accelerated tendon and ligament healing', 'Gut health and mucosal protection', 'Anti-inflammatory effects', 'Improved wound healing', 'Neuroprotective properties'],
    dosage: '250-500mcg per day, subcutaneous or intramuscular injection',
    halfLife: '4 hours',
    imageUrl: '/images/bpc-157.jpg',
    tags: ['healing', 'recovery', 'gut health', 'tendon'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/bpc-157/' },
    featured: true,
  },
  {
    slug: 'tb-500',
    name: 'TB-500',
    shortName: 'TB-500',
    category: 'Healing & Recovery',
    description: 'Thymosin Beta-4 fragment — promotes healing, flexibility, and regeneration.',
    longDescription: 'TB-500 is a synthetic fraction of the naturally occurring protein Thymosin Beta-4. It plays a critical role in building new blood vessels, muscle tissue, and cell migration and proliferation.',
    benefits: ['Promotes muscle fiber growth', 'Speeds up wound healing', 'Reduces inflammation', 'Improves flexibility', 'Supports cardiovascular health'],
    dosage: '2-2.5mg twice per week',
    halfLife: 'Unknown, estimated days',
    imageUrl: '/images/tb-500.jpg',
    tags: ['healing', 'recovery', 'muscle', 'injury'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/tb-500/' },
    featured: true,
  },
  {
    slug: 'cjc-1295-dac',
    name: 'CJC-1295 DAC',
    shortName: 'CJC-1295',
    category: 'Growth Hormone',
    description: 'Growth hormone releasing hormone analog with extended half-life via DAC technology.',
    longDescription: 'CJC-1295 DAC is a synthetic analog of growth hormone-releasing hormone (GHRH). The Drug Affinity Complex (DAC) technology extends its half-life significantly.',
    benefits: ['Increased growth hormone secretion', 'Enhanced fat metabolism', 'Improved muscle mass', 'Better sleep quality', 'Anti-aging effects'],
    dosage: '1-2mg per week',
    halfLife: '6-8 days (with DAC)',
    imageUrl: '/images/cjc-1295.jpg',
    tags: ['growth hormone', 'GHRH', 'anti-aging', 'body composition'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/cjc-1295-with-dac/' },
    featured: true,
  },
  {
    slug: 'ipamorelin',
    name: 'Ipamorelin',
    shortName: 'Ipamorelin',
    category: 'Growth Hormone',
    description: 'Selective growth hormone secretagogue with minimal side effects.',
    longDescription: 'Ipamorelin is a selective growth hormone secretagogue and ghrelin receptor agonist. It stimulates growth hormone release with high selectivity.',
    benefits: ['Selective GH release', 'Minimal cortisol elevation', 'Improved sleep', 'Fat loss support', 'Lean muscle preservation'],
    dosage: '200-300mcg 2-3x daily',
    halfLife: '2 hours',
    imageUrl: '/images/ipamorelin.jpg',
    tags: ['growth hormone', 'secretagogue', 'anti-aging'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/ipamorelin/' },
    featured: true,
  },
  {
    slug: 'sermorelin',
    name: 'Sermorelin',
    shortName: 'Sermorelin',
    category: 'Growth Hormone',
    description: 'GHRH analog that stimulates natural growth hormone production.',
    longDescription: 'Sermorelin is a synthetic analog of growth hormone-releasing hormone (GHRH). It stimulates the pituitary gland to produce and secrete growth hormone naturally.',
    benefits: ['Natural GH stimulation', 'Improved body composition', 'Enhanced energy levels', 'Better sleep quality', 'Bone density support'],
    dosage: '200-500mcg before bed',
    halfLife: '10-20 minutes',
    imageUrl: '/images/sermorelin.jpg',
    tags: ['growth hormone', 'GHRH', 'anti-aging'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/sermorelin/' },
    featured: false,
  },
  {
    slug: 'melanotan-2',
    name: 'Melanotan II',
    shortName: 'MT-2',
    category: 'Melanocortin',
    description: 'Melanocortin receptor agonist studied for tanning and libido effects.',
    longDescription: 'Melanotan II is a synthetic analog of the naturally occurring melanocortin peptide alpha-MSH. It acts on melanocortin receptors.',
    benefits: ['Skin pigmentation enhancement', 'Libido support', 'Appetite suppression', 'UV protection research'],
    dosage: '0.5-1mg as needed',
    halfLife: '33-36 hours',
    imageUrl: '/images/melanotan-2.jpg',
    tags: ['melanocortin', 'tanning', 'libido'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/melanotan-2/' },
    featured: false,
  },
  {
    slug: 'pt-141',
    name: 'PT-141',
    shortName: 'PT-141',
    category: 'Melanocortin',
    description: 'Bremelanotide — melanocortin agonist studied for sexual function.',
    longDescription: 'PT-141 (Bremelanotide) is a cyclic heptapeptide melanocortin agonist. Unlike other sexual function peptides, it acts centrally through the nervous system.',
    benefits: ['Sexual function support', 'Central nervous system action', 'Works for both sexes in research', 'No cardiovascular mechanism'],
    dosage: '1-2mg as needed, 45 min before',
    halfLife: '2.7 hours',
    imageUrl: '/images/pt-141.jpg',
    tags: ['melanocortin', 'sexual health', 'libido'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/pt-141-bremelanotide/' },
    featured: false,
  },
  {
    slug: 'ghk-cu',
    name: 'GHK-Cu',
    shortName: 'GHK-Cu',
    category: 'Anti-Aging',
    description: 'Copper peptide with powerful anti-aging and wound healing properties.',
    longDescription: 'GHK-Cu is a naturally occurring copper complex of the tripeptide glycyl-L-histidyl-L-lysine. It promotes wound healing, attracts immune cells, and stimulates collagen synthesis.',
    benefits: ['Collagen synthesis promotion', 'Wound healing acceleration', 'Anti-inflammatory effects', 'Antioxidant properties', 'Skin renewal support'],
    dosage: '1-2mg per day topically or subcutaneously',
    halfLife: 'Short, minutes in blood',
    imageUrl: '/images/ghk-cu.jpg',
    tags: ['anti-aging', 'skin', 'collagen', 'wound healing'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/ghk-cu/' },
    featured: true,
  },
  {
    slug: 'semaglutide',
    name: 'Semaglutide',
    shortName: 'Semaglutide',
    category: 'Metabolic',
    description: 'GLP-1 receptor agonist studied for metabolic health and weight management.',
    longDescription: 'Semaglutide is a glucagon-like peptide-1 (GLP-1) receptor agonist. It mimics the action of the hormone GLP-1 which regulates insulin secretion and appetite.',
    benefits: ['Appetite regulation', 'Blood glucose management', 'Weight management research', 'Cardiovascular research', 'Long-acting weekly dosing'],
    dosage: '0.25-2.4mg once weekly',
    halfLife: '7 days',
    imageUrl: '/images/semaglutide.jpg',
    tags: ['GLP-1', 'metabolic', 'weight management', 'diabetes research'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/semaglutide/' },
    featured: true,
  },
  {
    slug: 'tirzepatide',
    name: 'Tirzepatide',
    shortName: 'Tirzepatide',
    category: 'Metabolic',
    description: 'Dual GIP/GLP-1 receptor agonist — next-generation metabolic research peptide.',
    longDescription: 'Tirzepatide is a novel dual glucose-dependent insulinotropic polypeptide (GIP) and GLP-1 receptor agonist.',
    benefits: ['Dual receptor activity', 'Enhanced metabolic effects', 'Appetite suppression research', 'Blood glucose regulation', 'Weekly administration'],
    dosage: '2.5-15mg once weekly',
    halfLife: '5 days',
    imageUrl: '/images/tirzepatide.jpg',
    tags: ['GIP', 'GLP-1', 'metabolic', 'dual agonist'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/tirzepatide/' },
    featured: true,
  },
  {
    slug: 'aod-9604',
    name: 'AOD-9604',
    shortName: 'AOD-9604',
    category: 'Metabolic',
    description: 'HGH fragment analog studied for fat metabolism without growth effects.',
    longDescription: 'AOD-9604 is a modified fragment of human growth hormone (HGH) spanning amino acids 176-191. It targets fat metabolism specifically.',
    benefits: ['Fat metabolism research', 'No insulin resistance effects', 'No growth-promoting activity', 'Safe profile in research', 'Cartilage repair research'],
    dosage: '300mcg daily, fasted',
    halfLife: '30-60 minutes',
    imageUrl: '/images/aod-9604.jpg',
    tags: ['fat loss', 'metabolic', 'HGH fragment'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/aod-9604/' },
    featured: false,
  },
  {
    slug: 'hgh-fragment-176-191',
    name: 'HGH Fragment 176-191',
    shortName: 'HGH Frag',
    category: 'Metabolic',
    description: 'C-terminal fragment of HGH studied for lipolysis and fat burning.',
    longDescription: 'HGH Fragment 176-191 is a stabilized analog of the growth hormone-releasing factor encompassing amino acids 176-191.',
    benefits: ['Targeted lipolysis', 'No effect on blood glucose', 'No promotion of cell growth', 'Potential anti-aging effects', 'Short acting, flexible dosing'],
    dosage: '250-500mcg 2x daily, fasted',
    halfLife: '30 minutes',
    imageUrl: '/images/hgh-fragment.jpg',
    tags: ['fat loss', 'lipolysis', 'HGH fragment', 'metabolic'],
    vendorUrls: { peptidesciences: 'https://www.peptidesciences.com/hgh-fragment-176-191/' },
    featured: false,
  },
]

function defaultSections(siteId: number, siteName: string, tagline: string, primaryColor: string) {
  return [
    {
      site_id: siteId,
      page: 'home',
      section_type: 'hero',
      position: 0,
      is_visible: true,
      content: JSON.stringify({
        headline: tagline,
        subheadline: `Welcome to ${siteName}. All products are strictly for research purposes only.`,
        badge: 'Lab-Tested • Certificate of Analysis Included',
        ctaText: 'Browse Products',
        ctaUrl: '/products',
        backgroundColor: primaryColor,
        overlayOpacity: 0.1,
      }),
    },
    {
      site_id: siteId,
      page: 'home',
      section_type: 'trust_bar',
      position: 1,
      is_visible: true,
      content: JSON.stringify({
        items: [
          { icon: '🔬', text: 'Third-Party Lab Tested' },
          { icon: '📋', text: 'COA on Every Order' },
          { icon: '🚚', text: 'Fast US Shipping' },
          { icon: '💳', text: 'Secure Checkout' },
          { icon: '✅', text: '99%+ Purity Standard' },
        ],
      }),
    },
    {
      site_id: siteId,
      page: 'home',
      section_type: 'featured_products',
      position: 2,
      is_visible: true,
      content: JSON.stringify({
        title: 'Featured Research Peptides',
        subtitle: 'Most popular compounds for research applications',
        productSlugs: ['bpc-157', 'tb-500', 'cjc-1295-dac', 'ipamorelin', 'ghk-cu', 'semaglutide'],
      }),
    },
    {
      site_id: siteId,
      page: 'home',
      section_type: 'cta_banner',
      position: 3,
      is_visible: true,
      content: JSON.stringify({
        headline: 'New to Research Peptides?',
        subtext: 'Read our in-depth research guides covering mechanisms of action, dosing protocols, and the latest studies.',
        ctaText: 'Browse Research Guides',
        ctaUrl: '/guides',
        backgroundColor: primaryColor,
      }),
    },
  ]
}

async function seed() {
  console.log('Seeding sites...')

  for (const siteData of SITES_DATA) {
    const [site] = await sql`
      INSERT INTO sites (domain, name, tagline, description, primary_color, accent_color, vendor, affiliate_id, base_url)
      VALUES (${siteData.domain}, ${siteData.name}, ${siteData.tagline}, ${siteData.description}, ${siteData.primaryColor}, ${siteData.accentColor}, ${siteData.vendor}, ${siteData.affiliateId}, ${siteData.baseUrl})
      ON CONFLICT (domain) DO UPDATE SET
        name = EXCLUDED.name,
        tagline = EXCLUDED.tagline,
        description = EXCLUDED.description,
        primary_color = EXCLUDED.primary_color,
        accent_color = EXCLUDED.accent_color,
        vendor = EXCLUDED.vendor,
        affiliate_id = EXCLUDED.affiliate_id,
        base_url = EXCLUDED.base_url,
        updated_at = NOW()
      RETURNING id
    `
    console.log(`  Site: ${siteData.domain} (id=${site.id})`)

    // Seed default sections
    const sections = defaultSections(site.id, siteData.name, siteData.tagline, siteData.primaryColor)
    for (const section of sections) {
      await sql`
        INSERT INTO page_sections (site_id, page, section_type, position, is_visible, content)
        VALUES (${section.site_id}, ${section.page}, ${section.section_type}, ${section.position}, ${section.is_visible}, ${section.content}::jsonb)
        ON CONFLICT DO NOTHING
      `
    }
  }

  console.log('Seeding products...')

  for (const p of PRODUCTS_DATA) {
    await sql`
      INSERT INTO products (slug, name, short_name, category, description, long_description, benefits, dosage, half_life, image_url, tags, vendor_urls)
      VALUES (
        ${p.slug}, ${p.name}, ${p.shortName}, ${p.category}, ${p.description},
        ${p.longDescription}, ${p.benefits}, ${p.dosage}, ${p.halfLife},
        ${p.imageUrl}, ${p.tags}, ${JSON.stringify(p.vendorUrls)}::jsonb
      )
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        short_name = EXCLUDED.short_name,
        category = EXCLUDED.category,
        description = EXCLUDED.description,
        long_description = EXCLUDED.long_description,
        benefits = EXCLUDED.benefits,
        dosage = EXCLUDED.dosage,
        half_life = EXCLUDED.half_life,
        image_url = EXCLUDED.image_url,
        tags = EXCLUDED.tags,
        vendor_urls = EXCLUDED.vendor_urls,
        updated_at = NOW()
      RETURNING id
    `
    console.log(`  Product: ${p.slug}`)
  }

  console.log('Assigning all products to all sites...')

  const allSites = await sql`SELECT id FROM sites`
  const allProducts = await sql`SELECT id, slug FROM products`

  for (const site of allSites) {
    let pos = 0
    for (const product of allProducts) {
      const isFeatured = ['bpc-157', 'tb-500', 'cjc-1295-dac', 'ipamorelin', 'ghk-cu', 'semaglutide', 'tirzepatide'].includes(product.slug)
      await sql`
        INSERT INTO site_products (site_id, product_id, is_featured, position, is_visible)
        VALUES (${site.id}, ${product.id}, ${isFeatured}, ${pos}, true)
        ON CONFLICT (site_id, product_id) DO NOTHING
      `
      pos++
    }
  }

  console.log('Seed complete!')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
