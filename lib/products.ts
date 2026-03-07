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

const PANTHEON = 'https://pantheonpeptides.com'
const AFFILIATE = '?partner=AmentiAI'
const IMG09 = 'https://pantheonpeptides.com/wp-content/uploads/2024/09'
const IMG10 = 'https://pantheonpeptides.com/wp-content/uploads/2024/10'
const IMG12 = 'https://pantheonpeptides.com/wp-content/uploads/2024/12'

export const PRODUCTS: Record<string, Product> = {
  // ── Healing & Recovery ──────────────────────────────────────────────────────
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
    dosage: '250–500 mcg per day, subcutaneous or intramuscular injection',
    halfLife: '4 hours',
    image: `${IMG09}/BPC-157-2mg-scaled.jpg`,
    tags: ['healing', 'recovery', 'gut health', 'tendon'],
    vendorUrls: { pantheon: `${PANTHEON}/product/bpc-157/${AFFILIATE}` },
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
    dosage: '2–2.5 mg twice per week',
    halfLife: 'Unknown, estimated days',
    image: `${IMG09}/TD-500-2mg-scaled.jpg`,
    tags: ['healing', 'recovery', 'muscle', 'injury'],
    vendorUrls: { pantheon: `${PANTHEON}/product/tb-500/${AFFILIATE}` },
    featured: true,
  },
  'll-37': {
    slug: 'll-37',
    name: 'LL-37',
    shortName: 'LL-37',
    category: 'Healing & Recovery',
    description: 'Human cathelicidin antimicrobial peptide with immune modulation and wound healing properties.',
    longDescription:
      'LL-37 is the only member of the cathelicidin family of antimicrobial peptides expressed in humans. Beyond its antimicrobial properties, LL-37 is studied for its role in immune modulation, wound healing, and anti-inflammatory signaling. It is naturally produced by neutrophils, macrophages, and epithelial cells in response to injury and infection.',
    benefits: [
      'Immune system support',
      'Chronic inflammation reduction',
      'Wound healing promotion',
      'Gut health support',
      'Antimicrobial activity in research models',
    ],
    dosage: '25–100 mcg per injection site, 2–3x per week',
    halfLife: 'Minutes to hours',
    image: `${IMG10}/LL37-5mg-scaled.jpg`,
    tags: ['immune', 'healing', 'antimicrobial', 'inflammation'],
    vendorUrls: { pantheon: `${PANTHEON}/product/ll37/${AFFILIATE}` },
    featured: false,
  },

  // ── Growth Hormone ───────────────────────────────────────────────────────────
  'cjc-1295': {
    slug: 'cjc-1295',
    name: 'CJC-1295',
    shortName: 'CJC-1295',
    category: 'Growth Hormone',
    description: 'Growth hormone releasing hormone analog — stimulates natural GH production.',
    longDescription:
      'CJC-1295 is a synthetic analog of growth hormone-releasing hormone (GHRH). It stimulates the pituitary gland to produce more growth hormone, offering benefits for body composition and recovery. This is the standard (without DAC) version, providing a more physiological pulsatile GH release pattern.',
    benefits: [
      'Increased growth hormone secretion',
      'Enhanced fat metabolism',
      'Improved muscle mass',
      'Better sleep quality',
      'Anti-aging effects',
    ],
    dosage: '100–200 mcg 2–3x per week',
    halfLife: '30 minutes',
    image: `${IMG09}/CJC1295-2mg-scaled.jpg`,
    tags: ['growth hormone', 'GHRH', 'anti-aging', 'body composition'],
    vendorUrls: { pantheon: `${PANTHEON}/product/cjc-1295-without-dac/${AFFILIATE}` },
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
    dosage: '200–300 mcg 2–3x daily',
    halfLife: '2 hours',
    image: `${IMG09}/IPAMORELIN-2mg-scaled.jpg`,
    tags: ['growth hormone', 'secretagogue', 'anti-aging'],
    vendorUrls: { pantheon: `${PANTHEON}/product/ipamorelin/${AFFILIATE}` },
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
    dosage: '200–500 mcg before bed',
    halfLife: '10–20 minutes',
    image: `${IMG09}/SERMORELIN-2mg-scaled.jpg`,
    tags: ['growth hormone', 'GHRH', 'anti-aging'],
    vendorUrls: { pantheon: `${PANTHEON}/product/sermorelin-acetate/${AFFILIATE}` },
    featured: false,
  },
  tesamorelin: {
    slug: 'tesamorelin',
    name: 'Tesamorelin',
    shortName: 'Tesamorelin',
    category: 'Growth Hormone',
    description: 'GHRH analog with strong visceral fat reduction and metabolic research data.',
    longDescription:
      'Tesamorelin is a stabilized GHRH analog studied for its ability to reduce visceral adipose tissue (VAT) and improve metabolic markers. It stimulates GH release through GHRH receptors and has been the subject of multiple published clinical studies for metabolic and body composition endpoints.',
    benefits: [
      'Reduces abdominal/visceral fat',
      'Enhances metabolic function',
      'Supports muscle maintenance',
      'Improves skin elasticity',
      'Enhances mental clarity in research models',
    ],
    dosage: '1–2 mg subcutaneous daily',
    halfLife: '26–38 minutes',
    image: `${IMG09}/TESAMORELIN-2mg-scaled.jpg`,
    tags: ['growth hormone', 'GHRH', 'fat loss', 'metabolic', 'body composition'],
    vendorUrls: { pantheon: `${PANTHEON}/product/tesamorelin/${AFFILIATE}` },
    featured: false,
  },
  'mk-677': {
    slug: 'mk-677',
    name: 'MK-677 (Ibutamoren)',
    shortName: 'MK-677',
    category: 'Growth Hormone',
    description: 'Oral GH secretagogue — stimulates GH and IGF-1 without injection.',
    longDescription:
      'MK-677 (Ibutamoren) is a non-peptide oral GH secretagogue that mimics ghrelin and activates the GH secretagogue receptor (GHSR). Unlike injectable GH peptides, MK-677 is taken orally and provides sustained GH and IGF-1 elevation. It is studied for body composition, bone density, and anti-aging research.',
    benefits: [
      'Enhanced muscle growth and recovery',
      'Improved bone density',
      'Better sleep quality',
      'Fat metabolism support',
      'Oral administration — no injection required',
    ],
    dosage: '15–25 mg orally per day',
    halfLife: '24 hours',
    image: `${IMG12}/MK-677-15mg-Oral-1.jpg`,
    tags: ['growth hormone', 'oral', 'secretagogue', 'body composition', 'anti-aging'],
    vendorUrls: { pantheon: `${PANTHEON}/product/mk-677-capsules/${AFFILIATE}` },
    featured: false,
  },

  // ── Metabolic ───────────────────────────────────────────────────────────────
  tirzepatide: {
    slug: 'tirzepatide',
    name: 'Tirzepatide',
    shortName: 'Tirzepatide',
    category: 'Metabolic',
    description: 'Dual GIP/GLP-1 receptor agonist studied for weight management and metabolic health.',
    longDescription:
      'Tirzepatide is a novel dual agonist targeting both GIP (glucose-dependent insulinotropic polypeptide) and GLP-1 (glucagon-like peptide-1) receptors. It is studied for its effects on weight management, diabetes control, cardiovascular health, and insulin sensitivity. Published research has shown significant metabolic improvements in clinical settings.',
    benefits: [
      'Weight management research',
      'Diabetes control studies',
      'Cardiovascular health research',
      'Improved insulin sensitivity',
      'Metabolic health optimization',
    ],
    dosage: '2.5–15 mg weekly subcutaneous injection',
    halfLife: '5 days',
    image: `${IMG09}/TIRZEPTIDE-5mg-scaled.jpg`,
    tags: ['metabolic', 'weight loss', 'GLP-1', 'GIP', 'diabetes', 'insulin'],
    vendorUrls: { pantheon: `${PANTHEON}/product/tirzeptide/${AFFILIATE}` },
    featured: true,
  },
  'mots-c': {
    slug: 'mots-c',
    name: 'MOTS-C',
    shortName: 'MOTS-C',
    category: 'Metabolic',
    description: 'Mitochondria-derived peptide studied for metabolic regulation and longevity.',
    longDescription:
      'MOTS-C is a mitochondrial-derived peptide encoded by the mitochondrial genome. It is studied for its role in metabolic regulation, insulin sensitivity, and anti-aging mechanisms. MOTS-C activates AMPK signaling and promotes glucose metabolism through multiple pathways. Research suggests it may play a role in mediating exercise-like metabolic benefits.',
    benefits: [
      'Enhances insulin sensitivity',
      'Promotes glucose metabolism',
      'Anti-inflammatory properties',
      'Supports mitochondrial health',
      'Potential longevity-related mechanisms',
    ],
    dosage: '5–10 mg 3x per week subcutaneous',
    halfLife: 'Unknown, estimated hours',
    image: `${IMG09}/MOTSC-10mg-scaled.jpg`,
    tags: ['metabolic', 'mitochondria', 'insulin', 'longevity', 'anti-aging'],
    vendorUrls: { pantheon: `${PANTHEON}/product/mots-c/${AFFILIATE}` },
    featured: false,
  },
  '5-amino-1mq': {
    slug: '5-amino-1mq',
    name: '5-Amino-1MQ',
    shortName: '5-Amino-1MQ',
    category: 'Metabolic',
    description: 'NNMT inhibitor studied for fat loss, metabolism enhancement, and lean mass preservation.',
    longDescription:
      '5-Amino-1MQ is a small molecule inhibitor of nicotinamide N-methyltransferase (NNMT) — an enzyme involved in fat cell metabolism. By inhibiting NNMT, research suggests 5-Amino-1MQ can activate metabolic pathways that promote fat loss while preserving lean muscle mass. It also appears to improve insulin sensitivity and boost cellular energy.',
    benefits: [
      'Promotes fat loss by increasing fat breakdown',
      'Supports weight management through enhanced metabolism',
      'Preserves lean muscle mass',
      'Improves insulin sensitivity',
      'Boosts cellular energy production',
    ],
    dosage: '50–100 mg orally 1–3x daily',
    halfLife: 'Unknown',
    image: `${IMG10}/5-AMINO-1MQ-5mg-scaled.jpg`,
    tags: ['metabolic', 'fat loss', 'NNMT', 'weight management', 'energy'],
    vendorUrls: { pantheon: `${PANTHEON}/product/5-amino-1mq/${AFFILIATE}` },
    featured: false,
  },

  // ── Anti-Aging ──────────────────────────────────────────────────────────────
  'ghk-cu': {
    slug: 'ghk-cu',
    name: 'GHK-Cu',
    shortName: 'GHK-Cu',
    category: 'Anti-Aging',
    description: 'Copper peptide with powerful anti-aging and wound healing properties.',
    longDescription:
      'GHK-Cu (Copper Peptide GHK-Cu) is a naturally occurring copper complex of the tripeptide glycyl-L-histidyl-L-lysine. It has been found to promote wound healing, attract immune cells, antioxidant and anti-inflammatory effects, and stimulate collagen synthesis. Research shows it modulates over 4,000 human genes.',
    benefits: [
      'Collagen synthesis promotion',
      'Wound healing acceleration',
      'Anti-inflammatory effects',
      'Antioxidant properties',
      'Skin renewal support',
    ],
    dosage: '1–2 mg per day topically or subcutaneously',
    halfLife: 'Short, minutes in blood',
    image: `${IMG09}/GHKCU-50mg-scaled.jpg`,
    tags: ['anti-aging', 'skin', 'collagen', 'wound healing'],
    vendorUrls: { pantheon: `${PANTHEON}/product/ghk-cu/${AFFILIATE}` },
    featured: true,
  },
  epithalon: {
    slug: 'epithalon',
    name: 'Epithalon',
    shortName: 'Epithalon',
    category: 'Anti-Aging',
    description: 'Tetrapeptide studied for telomere elongation, sleep quality, and longevity mechanisms.',
    longDescription:
      'Epithalon (Epitalon) is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) derived from epithalamin, a natural polypeptide produced by the pineal gland. It is studied for its ability to stimulate telomerase activity — the enzyme responsible for maintaining telomere length — which is associated with cellular aging. Research also shows effects on sleep quality and immune function.',
    benefits: [
      'Stimulates telomerase activity',
      'Improves sleep quality',
      'Supports immune function',
      'Antioxidant properties',
      'Anti-aging mechanisms',
    ],
    dosage: '10 mg daily for 10–20 day cycles, subcutaneous or IV',
    halfLife: 'Short, minutes to hours',
    image: `${IMG09}/EPITALON-10mg-scaled.jpg`,
    tags: ['anti-aging', 'telomere', 'longevity', 'sleep', 'immune'],
    vendorUrls: { pantheon: `${PANTHEON}/product/epithalon/${AFFILIATE}` },
    featured: false,
  },

  // ── Cognitive / Neurological ────────────────────────────────────────────────
  semax: {
    slug: 'semax',
    name: 'Semax',
    shortName: 'Semax',
    category: 'Cognitive',
    description: 'Neuropeptide analog studied for focus, memory, and neuroprotection.',
    longDescription:
      'Semax is a synthetic heptapeptide analog of ACTH (adrenocorticotropic hormone) developed in Russia and studied extensively for neuroprotective and nootropic effects. Research shows it may improve focus, memory, and mental clarity while reducing mental fatigue. It works by modulating BDNF and other neurotrophic factors.',
    benefits: [
      'Improves focus, memory, and mental clarity',
      'Reduces mental fatigue',
      'Neuroprotection and neuroregeneration',
      'Antidepressant and anti-anxiety effects in research',
      'Non-stimulant mechanism',
    ],
    dosage: '100–600 mcg intranasally or subcutaneously per day',
    halfLife: 'Minutes to hours',
    image: `${IMG09}/SEMAX-10mg-scaled.jpg`,
    tags: ['cognitive', 'nootropic', 'neuroprotection', 'focus', 'memory', 'BDNF'],
    vendorUrls: { pantheon: `${PANTHEON}/product/semax/${AFFILIATE}` },
    featured: false,
  },
  selank: {
    slug: 'selank',
    name: 'Selank',
    shortName: 'Selank',
    category: 'Cognitive',
    description: 'Anxiolytic peptide studied for anxiety reduction, mood, and cognitive enhancement.',
    longDescription:
      'Selank is a synthetic heptapeptide analog of tuftsin (Thr-Lys-Pro-Arg) developed by the Institute of Molecular Genetics of the Russian Academy of Sciences. It is studied for its anxiolytic (anti-anxiety), nootropic, and immune-modulating properties. Research suggests it works by modulating the GABAergic and serotonergic systems without the side effects of classical benzodiazepines.',
    benefits: [
      'Reduces anxiety in research models',
      'Enhances cognitive function',
      'Supports mood stabilization',
      'Immune system support',
      'Improves sleep quality',
    ],
    dosage: '250–500 mcg intranasally or subcutaneously 1–2x daily',
    halfLife: 'Minutes',
    image: `${IMG09}/SELANK-5mg-scaled.jpg`,
    tags: ['cognitive', 'anxiety', 'nootropic', 'mood', 'GABAergic'],
    vendorUrls: { pantheon: `${PANTHEON}/product/selank/${AFFILIATE}` },
    featured: false,
  },

  // ── Immune ──────────────────────────────────────────────────────────────────
  'thymosin-alpha-1': {
    slug: 'thymosin-alpha-1',
    name: 'Thymosin Alpha-1',
    shortName: 'TA-1',
    category: 'Immune',
    description: 'Thymic peptide studied for immune system enhancement and T-cell activation.',
    longDescription:
      'Thymosin Alpha-1 (Tα1) is a 28-amino acid peptide naturally produced by the thymus gland. It is studied for its ability to modulate immune function by promoting T-cell maturation and activation. Research applications include immune deficiency models, cancer research, and chronic infection studies. It is a key regulator of both innate and adaptive immunity.',
    benefits: [
      'Enhances immune function',
      'Reduces chronic inflammation',
      'Aids in recovery from illness',
      'Increases infection resistance',
      'T-cell production stimulation',
    ],
    dosage: '1.6 mg subcutaneous 1–2x per week',
    halfLife: '2 hours',
    image: `${IMG09}/THYMOSIN-ALPHA1-2mg-1-scaled.jpg`,
    tags: ['immune', 'T-cell', 'thymus', 'inflammation', 'infection'],
    vendorUrls: { pantheon: `${PANTHEON}/product/thymosin-alpha-1/${AFFILIATE}` },
    featured: false,
  },

  // ── Melanocortin ────────────────────────────────────────────────────────────
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
    dosage: '1–2 mg as needed, 45 min before',
    halfLife: '2.7 hours',
    image: `${IMG09}/PT141-10mg-scaled.jpg`,
    tags: ['melanocortin', 'sexual health', 'libido'],
    vendorUrls: { pantheon: `${PANTHEON}/product/pt-141/${AFFILIATE}` },
    featured: false,
  },
  'mt-2': {
    slug: 'mt-2',
    name: 'Melanotan II (MT-2)',
    shortName: 'MT-2',
    category: 'Melanocortin',
    description: 'Melanocortin agonist studied for tanning, libido, and appetite regulation.',
    longDescription:
      'Melanotan II (MT-2) is a synthetic analog of alpha-melanocyte-stimulating hormone (α-MSH). It acts on melanocortin receptors (MC1R, MC3R, MC4R) and is studied for its effects on skin pigmentation, sexual function, and appetite regulation. Research shows it stimulates melanin production for UV-protective tanning without sun exposure.',
    benefits: [
      'Stimulates melanin production for sunless tanning',
      'Reduces sunburn risk',
      'Enhances libido',
      'Appetite suppression support',
      'UV damage protection mechanisms',
    ],
    dosage: '0.5–1 mg subcutaneous, titrate slowly',
    halfLife: '30–60 minutes',
    image: `${IMG09}/MT2-10mg-scaled.jpg`,
    tags: ['melanocortin', 'tanning', 'libido', 'appetite', 'pigmentation'],
    vendorUrls: { pantheon: `${PANTHEON}/product/mt-2-melanotan-2-acetate/${AFFILIATE}` },
    featured: false,
  },
  'kisspeptin-10': {
    slug: 'kisspeptin-10',
    name: 'Kisspeptin-10',
    shortName: 'Kisspeptin-10',
    category: 'Melanocortin',
    description: 'Hypothalamic neuropeptide studied for reproductive hormone regulation and libido.',
    longDescription:
      'Kisspeptin-10 is a neuropeptide produced in the hypothalamus that plays a critical role in regulating the hypothalamic-pituitary-gonadal (HPG) axis. It stimulates GnRH (gonadotropin-releasing hormone) release, leading to downstream LH and FSH secretion. Research applications include fertility studies, reproductive hormone regulation, and libido research.',
    benefits: [
      'Enhances libido in research models',
      'Supports fertility in research models',
      'Mood support through hormone balance',
      'HPG axis regulation',
      'LH and FSH stimulation',
    ],
    dosage: '100–500 mcg subcutaneous as needed',
    halfLife: 'Minutes to 1 hour',
    image: `${IMG09}/KISSPEPTINE-5mg-scaled.jpg`,
    tags: ['reproductive', 'hormone', 'libido', 'fertility', 'hypothalamic'],
    vendorUrls: { pantheon: `${PANTHEON}/product/kisspeptin-10/${AFFILIATE}` },
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
