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
    vendor: 'pantheon',
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
    vendor: 'pantheon',
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
    vendor: 'pantheon',
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
    vendor: 'pantheon',
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
    vendor: 'pantheon',
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
    vendor: 'pantheon',
    affiliateId: 'purepeptide',
    baseUrl: 'https://purepeptidelab.com',
  },
]

const PP = 'https://pantheonpeptides.com'
const AFFILIATE = '?partner=AmentiAI'
const IMG09 = 'https://pantheonpeptides.com/wp-content/uploads/2024/09'
const IMG10 = 'https://pantheonpeptides.com/wp-content/uploads/2024/10'
const IMG12 = 'https://pantheonpeptides.com/wp-content/uploads/2024/12'

const PRODUCTS_DATA = [
  // Healing & Recovery
  { slug: 'bpc-157', name: 'BPC-157', shortName: 'BPC-157', category: 'Healing & Recovery', description: 'Body Protection Compound 157 — one of the most studied healing peptides.', longDescription: 'BPC-157 is a pentadecapeptide derived from a protective gastric juice protein, extensively studied for regenerative properties promoting healing of tendons, ligaments, muscles, and gut tissue.', benefits: ['Accelerated tendon and ligament healing', 'Gut health and mucosal protection', 'Anti-inflammatory effects', 'Improved wound healing', 'Neuroprotective properties'], dosage: '250-500mcg per day', halfLife: '4 hours', imageUrl: `${IMG09}/BPC-157-2mg-scaled.jpg`, tags: ['healing', 'recovery', 'gut health', 'tendon'], vendorUrls: { pantheon: `${PP}/product/bpc-157/${AFFILIATE}` }, featured: true },
  { slug: 'tb-500', name: 'TB-500', shortName: 'TB-500', category: 'Healing & Recovery', description: 'Thymosin Beta-4 fragment — promotes healing, flexibility, and regeneration.', longDescription: 'TB-500 is a synthetic fraction of Thymosin Beta-4, studied for building new blood vessels, muscle tissue, and cell migration and proliferation.', benefits: ['Promotes muscle fiber growth', 'Speeds up wound healing', 'Reduces inflammation', 'Improves flexibility', 'Supports cardiovascular health'], dosage: '2-2.5mg twice per week', halfLife: 'Unknown, estimated days', imageUrl: `${IMG09}/TD-500-2mg-scaled.jpg`, tags: ['healing', 'recovery', 'muscle', 'injury'], vendorUrls: { pantheon: `${PP}/product/tb-500/${AFFILIATE}` }, featured: true },
  { slug: 'll-37', name: 'LL-37', shortName: 'LL-37', category: 'Healing & Recovery', description: 'Human cathelicidin antimicrobial peptide with immune modulation and wound healing properties.', longDescription: 'LL-37 is the only human cathelicidin antimicrobial peptide, studied for immune modulation, wound healing, and anti-inflammatory signaling.', benefits: ['Immune system support', 'Chronic inflammation reduction', 'Wound healing promotion', 'Gut health support', 'Antimicrobial activity'], dosage: '25-100mcg per injection site', halfLife: 'Minutes to hours', imageUrl: `${IMG10}/LL37-5mg-scaled.jpg`, tags: ['immune', 'healing', 'antimicrobial', 'inflammation'], vendorUrls: { pantheon: `${PP}/product/ll37/${AFFILIATE}` }, featured: false },
  // Growth Hormone
  { slug: 'cjc-1295', name: 'CJC-1295', shortName: 'CJC-1295', category: 'Growth Hormone', description: 'GHRH analog — stimulates natural GH production.', longDescription: 'CJC-1295 is a synthetic GHRH analog that stimulates the pituitary to produce more growth hormone with a physiological pulsatile release pattern.', benefits: ['Increased growth hormone secretion', 'Enhanced fat metabolism', 'Improved muscle mass', 'Better sleep quality', 'Anti-aging effects'], dosage: '100-200mcg 2-3x per week', halfLife: '30 minutes', imageUrl: `${IMG09}/CJC1295-2mg-scaled.jpg`, tags: ['growth hormone', 'GHRH', 'anti-aging', 'body composition'], vendorUrls: { pantheon: `${PP}/product/cjc-1295-without-dac/${AFFILIATE}` }, featured: true },
  { slug: 'ipamorelin', name: 'Ipamorelin', shortName: 'Ipamorelin', category: 'Growth Hormone', description: 'Selective GH secretagogue with minimal side effects.', longDescription: 'Ipamorelin is a selective GH secretagogue and ghrelin receptor agonist, stimulating GH release with high selectivity and minimal cortisol elevation.', benefits: ['Selective GH release', 'Minimal cortisol elevation', 'Improved sleep', 'Fat loss support', 'Lean muscle preservation'], dosage: '200-300mcg 2-3x daily', halfLife: '2 hours', imageUrl: `${IMG09}/IPAMORELIN-2mg-scaled.jpg`, tags: ['growth hormone', 'secretagogue', 'anti-aging'], vendorUrls: { pantheon: `${PP}/product/ipamorelin/${AFFILIATE}` }, featured: true },
  { slug: 'sermorelin', name: 'Sermorelin', shortName: 'Sermorelin', category: 'Growth Hormone', description: 'GHRH analog that stimulates natural GH production.', longDescription: 'Sermorelin is a synthetic GHRH analog that stimulates the pituitary to produce GH naturally, widely used in anti-aging research.', benefits: ['Natural GH stimulation', 'Improved body composition', 'Enhanced energy levels', 'Better sleep quality', 'Bone density support'], dosage: '200-500mcg before bed', halfLife: '10-20 minutes', imageUrl: `${IMG09}/SERMORELIN-2mg-scaled.jpg`, tags: ['growth hormone', 'GHRH', 'anti-aging'], vendorUrls: { pantheon: `${PP}/product/sermorelin-acetate/${AFFILIATE}` }, featured: false },
  { slug: 'tesamorelin', name: 'Tesamorelin', shortName: 'Tesamorelin', category: 'Growth Hormone', description: 'GHRH analog with strong visceral fat reduction and metabolic data.', longDescription: 'Tesamorelin is a stabilized GHRH analog studied for visceral fat reduction and metabolic health improvements.', benefits: ['Reduces abdominal fat', 'Enhances metabolic function', 'Supports muscle maintenance', 'Improves skin elasticity', 'Enhances mental clarity'], dosage: '1-2mg daily', halfLife: '26-38 minutes', imageUrl: `${IMG09}/TESAMORELIN-2mg-scaled.jpg`, tags: ['growth hormone', 'GHRH', 'fat loss', 'metabolic'], vendorUrls: { pantheon: `${PP}/product/tesamorelin/${AFFILIATE}` }, featured: false },
  { slug: 'mk-677', name: 'MK-677 (Ibutamoren)', shortName: 'MK-677', category: 'Growth Hormone', description: 'Oral GH secretagogue — stimulates GH and IGF-1 without injection.', longDescription: 'MK-677 is a non-peptide oral GH secretagogue that activates the ghrelin receptor for sustained GH and IGF-1 elevation.', benefits: ['Enhanced muscle growth and recovery', 'Improved bone density', 'Better sleep quality', 'Fat metabolism support', 'Oral administration'], dosage: '15-25mg orally per day', halfLife: '24 hours', imageUrl: `${IMG12}/MK-677-15mg-Oral-1.jpg`, tags: ['growth hormone', 'oral', 'secretagogue', 'body composition'], vendorUrls: { pantheon: `${PP}/product/mk-677-capsules/${AFFILIATE}` }, featured: false },
  // Metabolic
  { slug: 'tirzepatide', name: 'Tirzepatide', shortName: 'Tirzepatide', category: 'Metabolic', description: 'Dual GIP/GLP-1 receptor agonist for weight management and metabolic health research.', longDescription: 'Tirzepatide is a dual GIP and GLP-1 receptor agonist studied for weight management, diabetes control, and cardiovascular health.', benefits: ['Weight management research', 'Diabetes control studies', 'Cardiovascular health', 'Improved insulin sensitivity', 'Metabolic health optimization'], dosage: '2.5-15mg weekly subcutaneous', halfLife: '5 days', imageUrl: `${IMG09}/TIRZEPTIDE-5mg-scaled.jpg`, tags: ['metabolic', 'weight loss', 'GLP-1', 'GIP', 'diabetes'], vendorUrls: { pantheon: `${PP}/product/tirzeptide/${AFFILIATE}` }, featured: true },
  { slug: 'mots-c', name: 'MOTS-C', shortName: 'MOTS-C', category: 'Metabolic', description: 'Mitochondria-derived peptide for metabolic regulation and longevity research.', longDescription: 'MOTS-C is a mitochondrial-derived peptide that activates AMPK signaling and promotes glucose metabolism through multiple pathways.', benefits: ['Enhances insulin sensitivity', 'Promotes glucose metabolism', 'Anti-inflammatory properties', 'Supports mitochondrial health', 'Longevity mechanisms'], dosage: '5-10mg 3x per week', halfLife: 'Unknown, estimated hours', imageUrl: `${IMG09}/MOTSC-10mg-scaled.jpg`, tags: ['metabolic', 'mitochondria', 'insulin', 'longevity'], vendorUrls: { pantheon: `${PP}/product/mots-c/${AFFILIATE}` }, featured: false },
  { slug: '5-amino-1mq', name: '5-Amino-1MQ', shortName: '5-Amino-1MQ', category: 'Metabolic', description: 'NNMT inhibitor studied for fat loss and lean mass preservation.', longDescription: '5-Amino-1MQ is an NNMT inhibitor studied for its ability to promote fat loss while preserving lean muscle mass and improving insulin sensitivity.', benefits: ['Promotes fat loss', 'Supports weight management', 'Preserves lean muscle mass', 'Improves insulin sensitivity', 'Boosts cellular energy'], dosage: '50-100mg orally 1-3x daily', halfLife: 'Unknown', imageUrl: `${IMG10}/5-AMINO-1MQ-5mg-scaled.jpg`, tags: ['metabolic', 'fat loss', 'NNMT', 'weight management'], vendorUrls: { pantheon: `${PP}/product/5-amino-1mq/${AFFILIATE}` }, featured: false },
  // Anti-Aging
  { slug: 'ghk-cu', name: 'GHK-Cu', shortName: 'GHK-Cu', category: 'Anti-Aging', description: 'Copper peptide with powerful anti-aging and wound healing properties.', longDescription: 'GHK-Cu is a naturally occurring copper tripeptide studied for collagen synthesis, wound healing, antioxidant effects, and modulation of over 4,000 human genes.', benefits: ['Collagen synthesis promotion', 'Wound healing acceleration', 'Anti-inflammatory effects', 'Antioxidant properties', 'Skin renewal support'], dosage: '1-2mg per day topically or subcutaneously', halfLife: 'Short, minutes in blood', imageUrl: `${IMG09}/GHKCU-50mg-scaled.jpg`, tags: ['anti-aging', 'skin', 'collagen', 'wound healing'], vendorUrls: { pantheon: `${PP}/product/ghk-cu/${AFFILIATE}` }, featured: true },
  { slug: 'epithalon', name: 'Epithalon', shortName: 'Epithalon', category: 'Anti-Aging', description: 'Tetrapeptide studied for telomere elongation and longevity mechanisms.', longDescription: 'Epithalon is a synthetic tetrapeptide derived from epithalamin, studied for telomerase stimulation, sleep quality improvement, and immune function.', benefits: ['Stimulates telomerase activity', 'Improves sleep quality', 'Supports immune function', 'Antioxidant properties', 'Anti-aging mechanisms'], dosage: '10mg daily for 10-20 day cycles', halfLife: 'Short, minutes to hours', imageUrl: `${IMG09}/EPITALON-10mg-scaled.jpg`, tags: ['anti-aging', 'telomere', 'longevity', 'sleep'], vendorUrls: { pantheon: `${PP}/product/epithalon/${AFFILIATE}` }, featured: false },
  // Cognitive
  { slug: 'semax', name: 'Semax', shortName: 'Semax', category: 'Cognitive', description: 'Neuropeptide analog studied for focus, memory, and neuroprotection.', longDescription: 'Semax is a synthetic ACTH heptapeptide analog studied for neuroprotective and nootropic effects, including focus, memory, and BDNF modulation.', benefits: ['Improves focus, memory, and clarity', 'Reduces mental fatigue', 'Neuroprotection and neuroregeneration', 'Antidepressant effects in research', 'Non-stimulant mechanism'], dosage: '100-600mcg intranasally or subcutaneously daily', halfLife: 'Minutes to hours', imageUrl: `${IMG09}/SEMAX-10mg-scaled.jpg`, tags: ['cognitive', 'nootropic', 'neuroprotection', 'focus', 'memory'], vendorUrls: { pantheon: `${PP}/product/semax/${AFFILIATE}` }, featured: false },
  { slug: 'selank', name: 'Selank', shortName: 'Selank', category: 'Cognitive', description: 'Anxiolytic peptide studied for anxiety reduction, mood, and cognitive enhancement.', longDescription: 'Selank is a synthetic tuftsin analog studied for anxiolytic, nootropic, and immune-modulating properties without classical benzodiazepine side effects.', benefits: ['Reduces anxiety', 'Enhances cognitive function', 'Supports mood stabilization', 'Immune system support', 'Improves sleep quality'], dosage: '250-500mcg intranasally or subcutaneously 1-2x daily', halfLife: 'Minutes', imageUrl: `${IMG09}/SELANK-5mg-scaled.jpg`, tags: ['cognitive', 'anxiety', 'nootropic', 'mood'], vendorUrls: { pantheon: `${PP}/product/selank/${AFFILIATE}` }, featured: false },
  // Immune
  { slug: 'thymosin-alpha-1', name: 'Thymosin Alpha-1', shortName: 'TA-1', category: 'Immune', description: 'Thymic peptide studied for immune system enhancement and T-cell activation.', longDescription: 'Thymosin Alpha-1 is a 28-amino acid thymic peptide studied for immune modulation, T-cell maturation, and activation in immune deficiency and infection models.', benefits: ['Enhances immune function', 'Reduces chronic inflammation', 'Aids recovery from illness', 'Increases infection resistance', 'T-cell production stimulation'], dosage: '1.6mg subcutaneous 1-2x per week', halfLife: '2 hours', imageUrl: `${IMG09}/THYMOSIN-ALPHA1-2mg-1-scaled.jpg`, tags: ['immune', 'T-cell', 'thymus', 'inflammation'], vendorUrls: { pantheon: `${PP}/product/thymosin-alpha-1/${AFFILIATE}` }, featured: false },
  // Melanocortin
  { slug: 'pt-141', name: 'PT-141', shortName: 'PT-141', category: 'Melanocortin', description: 'Bremelanotide — melanocortin agonist studied for sexual function.', longDescription: 'PT-141 is a cyclic heptapeptide melanocortin agonist that acts centrally through the nervous system for sexual function research.', benefits: ['Sexual function support', 'Central nervous system action', 'Works for both sexes in research', 'No cardiovascular mechanism'], dosage: '1-2mg as needed', halfLife: '2.7 hours', imageUrl: `${IMG09}/PT141-10mg-scaled.jpg`, tags: ['melanocortin', 'sexual health', 'libido'], vendorUrls: { pantheon: `${PP}/product/pt-141/${AFFILIATE}` }, featured: false },
  { slug: 'mt-2', name: 'Melanotan II (MT-2)', shortName: 'MT-2', category: 'Melanocortin', description: 'Melanocortin agonist studied for tanning, libido, and appetite regulation.', longDescription: 'MT-2 is a synthetic alpha-MSH analog studied for melanin stimulation, sexual function, and appetite regulation through MC1R/MC3R/MC4R activation.', benefits: ['Stimulates melanin production', 'Reduces sunburn risk', 'Enhances libido', 'Appetite suppression support', 'UV damage protection'], dosage: '0.5-1mg subcutaneous, titrate slowly', halfLife: '30-60 minutes', imageUrl: `${IMG09}/MT2-10mg-scaled.jpg`, tags: ['melanocortin', 'tanning', 'libido', 'pigmentation'], vendorUrls: { pantheon: `${PP}/product/mt-2-melanotan-2-acetate/${AFFILIATE}` }, featured: false },
  { slug: 'kisspeptin-10', name: 'Kisspeptin-10', shortName: 'Kisspeptin-10', category: 'Melanocortin', description: 'Hypothalamic neuropeptide studied for reproductive hormone regulation and libido.', longDescription: 'Kisspeptin-10 is a hypothalamic neuropeptide that stimulates GnRH release, driving LH and FSH secretion for reproductive hormone regulation research.', benefits: ['Enhances libido in research models', 'Supports fertility research', 'Mood support through hormone balance', 'HPG axis regulation', 'LH and FSH stimulation'], dosage: '100-500mcg subcutaneous as needed', halfLife: 'Minutes to 1 hour', imageUrl: `${IMG09}/KISSPEPTINE-5mg-scaled.jpg`, tags: ['reproductive', 'hormone', 'libido', 'fertility'], vendorUrls: { pantheon: `${PP}/product/kisspeptin-10/${AFFILIATE}` }, featured: false },
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
        productSlugs: ['bpc-157', 'tb-500', 'cjc-1295', 'ipamorelin', 'ghk-cu'],
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

  console.log('Assigning products to all sites...')

  const allSites = await sql`SELECT id FROM sites`
  const allProducts = await sql`SELECT id, slug FROM products`

  for (const site of allSites) {
    let pos = 0
    for (const product of allProducts) {
      const isFeatured = ['bpc-157', 'tb-500', 'cjc-1295', 'ipamorelin', 'ghk-cu', 'tirzepatide'].includes(product.slug)
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
