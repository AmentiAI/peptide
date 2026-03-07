export interface ComparisonData {
  slug: string
  title: string
  description: string
  a: {
    slug: string
    name: string
    category: string
    mechanism: string
    halfLife: string
    dosage: string
    primaryUse: string
    onset: string
    stacksWith: string[]
    pros: string[]
    cons: string[]
  }
  b: {
    slug: string
    name: string
    category: string
    mechanism: string
    halfLife: string
    dosage: string
    primaryUse: string
    onset: string
    stacksWith: string[]
    pros: string[]
    cons: string[]
  }
  verdict: string
  keywords: string[]
}

export const COMPARISONS: Record<string, ComparisonData> = {
  'bpc-157-vs-tb-500': {
    slug: 'bpc-157-vs-tb-500',
    title: 'BPC-157 vs TB-500: Which Healing Peptide Is Right for Your Research?',
    description:
      'A detailed head-to-head comparison of BPC-157 and TB-500 — the two most studied healing peptides. Compare mechanisms, dosing, half-lives, and research applications.',
    a: {
      slug: 'bpc-157',
      name: 'BPC-157',
      category: 'Healing & Recovery',
      mechanism: 'Promotes angiogenesis, upregulates growth hormone receptors, modulates nitric oxide synthesis, and directly activates healing pathways in tendons, muscles, and gut tissue.',
      halfLife: '~4 hours',
      dosage: '250–500 mcg/day subcutaneous or intramuscular',
      primaryUse: 'Tendon/ligament healing, gut mucosal repair, systemic anti-inflammatory',
      onset: '1–2 weeks for soft tissue; gut effects often within days',
      stacksWith: ['TB-500', 'GHK-Cu'],
      pros: [
        'Most studied peptide for healing overall',
        'Strong gut health and mucosal protection data',
        'Works through multiple synergistic pathways',
        'Excellent safety profile in animal research',
        'Effective on tendons, ligaments, and GI tract',
      ],
      cons: [
        'Shorter half-life requires daily dosing',
        'Human trial data is limited',
        'Requires refrigeration after reconstitution',
      ],
    },
    b: {
      slug: 'tb-500',
      name: 'TB-500',
      category: 'Healing & Recovery',
      mechanism: 'Synthetic Thymosin Beta-4 fragment that upregulates actin, promotes cell migration, and stimulates new blood vessel formation for tissue repair and regeneration.',
      halfLife: 'Unknown — estimated several days',
      dosage: '2–2.5 mg twice per week subcutaneous',
      primaryUse: 'Muscle repair, cardiovascular tissue healing, systemic recovery',
      onset: '2–4 weeks for most effects',
      stacksWith: ['BPC-157', 'CJC-1295', 'Ipamorelin'],
      pros: [
        'Longer half-life allows less frequent dosing',
        'Strong cardiovascular and muscle repair data',
        'Works systemically throughout the body',
        'Excellent for post-injury and surgical recovery research',
        'Well-tolerated in animal models',
      ],
      cons: [
        'Higher per-dose cost vs BPC-157',
        'Onset is slower than BPC-157',
        'Less research on gut-specific effects',
      ],
    },
    verdict:
      'For gut health and localized tendon/ligament repair research, BPC-157 is the preferred compound. For systemic recovery and cardiovascular tissue research, TB-500 shows stronger evidence. Many researchers combine both in a healing stack for synergistic effects — BPC-157 targets specific injury sites while TB-500 supports whole-body recovery.',
    keywords: [
      'bpc-157 vs tb-500', 'bpc157 tb500 comparison', 'healing peptide comparison',
      'best peptide for healing', 'bpc-157 or tb-500', 'peptide for tendon healing',
    ],
  },

  'cjc-1295-vs-ipamorelin': {
    slug: 'cjc-1295-vs-ipamorelin',
    title: 'CJC-1295 vs Ipamorelin: The Complete GH Peptide Comparison',
    description:
      'Compare CJC-1295 and Ipamorelin — the two most popular growth hormone peptides. Understand their mechanisms, half-lives, and why they are often stacked together.',
    a: {
      slug: 'cjc-1295',
      name: 'CJC-1295',
      category: 'Growth Hormone',
      mechanism: 'GHRH analog that binds growth hormone-releasing hormone receptors, stimulating the pituitary to produce and release GH in a sustained, physiological pattern.',
      halfLife: '~30 minutes (without DAC); up to 8 days (with DAC)',
      dosage: '100–200 mcg 2–3x per week subcutaneous',
      primaryUse: 'Sustained growth hormone stimulation, body composition, anti-aging research',
      onset: '2–4 weeks for measurable IGF-1 elevation',
      stacksWith: ['Ipamorelin', 'Sermorelin'],
      pros: [
        'Strong pituitary GH stimulation',
        'Physiological GH release pattern',
        'Excellent body composition data',
        'Well-characterized half-life',
        'Widely studied in human trials',
      ],
      cons: [
        'Can increase cortisol and prolactin slightly',
        'Best used with a GHS like Ipamorelin',
        'Without DAC, requires more frequent dosing',
      ],
    },
    b: {
      slug: 'ipamorelin',
      name: 'Ipamorelin',
      category: 'Growth Hormone',
      mechanism: 'Selective ghrelin receptor agonist (GHSR) and GH secretagogue that triggers GH pulses from the pituitary without significantly affecting cortisol, prolactin, or ACTH.',
      halfLife: '~2 hours',
      dosage: '200–300 mcg 2–3x daily subcutaneous',
      primaryUse: 'Selective GH pulsing, fat loss, sleep quality, lean mass preservation',
      onset: '1–2 weeks for sleep quality improvements; 4–6 weeks for body composition',
      stacksWith: ['CJC-1295', 'Sermorelin'],
      pros: [
        'Highly selective — no cortisol or prolactin elevation',
        'Mimics natural GH pulsatile release',
        'Excellent sleep quality research data',
        'Minimal side effect profile',
        'Strong fat loss and lean mass support data',
      ],
      cons: [
        'Short half-life requires dosing 2–3x daily',
        'Less potent GH release when used alone vs combo',
        'Results are slower vs GHRH+GHSR stacks',
      ],
    },
    verdict:
      'Used alone, both CJC-1295 and Ipamorelin produce moderate GH increases. Together, they create a synergistic effect — CJC-1295 amplifies the GH pulse amplitude while Ipamorelin triggers the pulse with high selectivity. This combination is considered the gold standard GH optimization protocol in research settings and is far more effective than either compound individually.',
    keywords: [
      'cjc-1295 vs ipamorelin', 'cjc1295 ipamorelin comparison', 'gh peptide comparison',
      'best growth hormone peptide', 'cjc-1295 ipamorelin stack', 'ghrh vs ghs peptide',
    ],
  },

  'sermorelin-vs-cjc-1295': {
    slug: 'sermorelin-vs-cjc-1295',
    title: 'Sermorelin vs CJC-1295: Which GHRH Analog Has Better Research Support?',
    description:
      'Head-to-head comparison of Sermorelin and CJC-1295 — both GHRH analogs for growth hormone research. Compare half-lives, mechanisms, and clinical evidence.',
    a: {
      slug: 'sermorelin',
      name: 'Sermorelin',
      category: 'Growth Hormone',
      mechanism: 'Synthetic analog of the first 29 amino acids of endogenous GHRH. Binds GHRH receptors in the pituitary to stimulate natural, pulsatile GH secretion.',
      halfLife: '10–20 minutes',
      dosage: '200–500 mcg before bed subcutaneous',
      primaryUse: 'Natural GH stimulation, anti-aging, sleep improvement, bone density research',
      onset: '3–6 weeks for measurable hormonal changes',
      stacksWith: ['Ipamorelin', 'CJC-1295'],
      pros: [
        'Longest clinical history of any GHRH analog',
        'Naturally occurring sequence — high biocompatibility',
        'FDA-approved form (Geref) used for decades',
        'Strong sleep quality improvement data',
        'Excellent safety profile across long studies',
      ],
      cons: [
        'Very short half-life requires nightly dosing',
        'Less potent GH stimulation than CJC-1295',
        'Effects plateau faster than newer analogs',
      ],
    },
    b: {
      slug: 'cjc-1295',
      name: 'CJC-1295',
      category: 'Growth Hormone',
      mechanism: 'Modified GHRH analog with substituted amino acids for increased receptor binding affinity and stability vs endogenous GHRH.',
      halfLife: '~30 minutes',
      dosage: '100–200 mcg 2–3x per week subcutaneous',
      primaryUse: 'Enhanced GH stimulation, body composition optimization, anti-aging research',
      onset: '2–4 weeks for measurable IGF-1 changes',
      stacksWith: ['Ipamorelin', 'Sermorelin'],
      pros: [
        'Longer half-life vs Sermorelin — less frequent dosing',
        'Greater GH stimulation at equivalent doses',
        'Strong body composition and fat metabolism data',
        'Works well in the CJC-1295/Ipamorelin stack',
        'Well-characterized in published studies',
      ],
      cons: [
        'Less clinical history than Sermorelin',
        'Slight cortisol/prolactin elevation possible',
        'More expensive per milligram vs Sermorelin',
      ],
    },
    verdict:
      'Sermorelin is the safer, more clinically established option with decades of research behind it. CJC-1295 provides a stronger GH response with a more convenient dosing schedule. For anti-aging and sleep research, Sermorelin remains highly relevant. For maximizing GH output and body composition research, CJC-1295 with Ipamorelin is the modern standard.',
    keywords: [
      'sermorelin vs cjc-1295', 'sermorelin cjc1295 comparison', 'ghrh peptide comparison',
      'sermorelin or cjc 1295', 'best ghrh analog', 'sermorelin cjc difference',
    ],
  },
}

export function getComparison(slug: string): ComparisonData | null {
  return COMPARISONS[slug] ?? null
}

export function getAllComparisonSlugs(): string[] {
  return Object.keys(COMPARISONS)
}
