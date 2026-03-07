import { headers } from 'next/headers'
import { getSiteFromHeaders } from '@/lib/sites'
import FAQAccordion from '@/components/FAQAccordion'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)
  return {
    title: `Frequently Asked Questions — Research Peptides | ${site.name}`,
    description: `Answers to the most common questions about research peptides — purity standards, ordering, shipping, reconstitution, storage, and safety considerations.`,
    keywords: [
      'research peptide FAQ', 'peptide questions', 'how to buy peptides', 'peptide purity',
      'reconstitute peptides', 'peptide storage', 'peptide shipping', site.name,
    ],
    openGraph: {
      title: `Research Peptide FAQ | ${site.name}`,
      description: 'Common questions about research peptides answered.',
      type: 'website',
    },
  }
}

const FAQ_SECTIONS = [
  {
    category: 'General',
    items: [
      {
        question: 'What are research peptides?',
        answer:
          'Research peptides are short chains of amino acids synthesized for use in laboratory and scientific research settings. They are used to study biological processes, mechanisms of action, and potential therapeutic applications. All peptides listed on this site are strictly for research use only and are not intended for human consumption.',
      },
      {
        question: 'Are these peptides legal to purchase?',
        answer:
          'In the United States, most research peptides can be legally purchased for research and laboratory use. They are not FDA-approved for human therapeutic use. Laws vary by country, so researchers should verify their local regulations before purchasing. These products are sold for research purposes only.',
      },
      {
        question: 'What is the difference between research peptides and pharmaceutical drugs?',
        answer:
          'Pharmaceutical drugs have completed clinical trials, received regulatory approval, and are prescribed for specific medical conditions. Research peptides have not completed this regulatory process and are not approved for therapeutic use. They are used in preclinical research to investigate potential biological mechanisms and effects.',
      },
      {
        question: 'Do you sell directly?',
        answer:
          'No. This site is an affiliate resource that curates product information and links to our trusted vendor partner, Pantheon Peptides. When you click "Buy Now," you are directed to Pantheon Peptides\' website where your purchase is fulfilled. We earn an affiliate commission at no additional cost to you.',
      },
    ],
  },
  {
    category: 'Quality & Purity',
    items: [
      {
        question: 'What does 99%+ purity mean?',
        answer:
          'Purity refers to the percentage of the compound that is the intended peptide vs impurities, byproducts, or residual solvents. 99%+ purity means at least 99% of the compound by mass is the target peptide. This is verified through HPLC (High-Performance Liquid Chromatography) testing by independent third-party laboratories.',
      },
      {
        question: 'What is a Certificate of Analysis (COA)?',
        answer:
          'A Certificate of Analysis is a document from an independent, accredited laboratory confirming the identity, purity, and potency of a compound. Pantheon Peptides provides a COA for every batch they produce. You can request the COA for any product before or after purchase. The COA confirms the peptide is what it claims to be at the stated purity level.',
      },
      {
        question: 'How are peptides tested for purity?',
        answer:
          'Independent laboratories use HPLC (High-Performance Liquid Chromatography) to measure compound purity and Mass Spectrometry (MS) to confirm molecular identity. These tests confirm both the purity percentage and that the correct peptide sequence was synthesized. Reputable vendors like Pantheon Peptides use third-party labs for these tests rather than in-house facilities.',
      },
      {
        question: 'Should I be concerned about peptide quality from other vendors?',
        answer:
          'Quality varies significantly across the research peptide market. Common issues with lower-quality suppliers include underdosing, incorrect peptide sequences, high impurity levels, and no independent verification. We recommend only purchasing from vendors who provide third-party COAs from reputable labs. Always request and review the COA before purchasing.',
      },
    ],
  },
  {
    category: 'Ordering & Shipping',
    items: [
      {
        question: 'How do I place an order?',
        answer:
          'Click "Buy Now" on any product page to be redirected to Pantheon Peptides\' website. You will complete your purchase directly on their platform. They accept major credit cards and other payment methods. Orders are typically processed and shipped within 1–2 business days.',
      },
      {
        question: 'How long does shipping take?',
        answer:
          'Pantheon Peptides ships from within the United States. Standard shipping typically takes 3–7 business days. Expedited options are available at checkout. Orders are shipped in discreet packaging for privacy. International shipping options may vary — check Pantheon Peptides\' website for current options.',
      },
      {
        question: 'Is packaging discreet?',
        answer:
          'Yes. Pantheon Peptides ships in plain, discreet packaging with no identifying product information on the exterior. This ensures your privacy and prevents any issues at delivery. Products are typically shipped in padded envelopes or small boxes with only a return address and standard carrier labels.',
      },
      {
        question: 'What is the return policy?',
        answer:
          'Return and refund policies are determined by Pantheon Peptides, not this website. Please review their current return policy on their website or contact their customer service team directly for any order-related issues. Most reputable vendors offer a satisfaction guarantee on unopened products.',
      },
    ],
  },
  {
    category: 'Reconstitution & Storage',
    items: [
      {
        question: 'How do I reconstitute a lyophilized (freeze-dried) peptide?',
        answer:
          'Most research peptides are supplied as a lyophilized (freeze-dried) powder and must be reconstituted with bacteriostatic water (BW) before use. Use a sterile syringe to slowly inject BW into the vial along the side wall (not directly onto the powder). Gently swirl — do not shake — until fully dissolved. Common reconstitution: 2mg peptide + 2mL BW = 1mg/mL concentration.',
      },
      {
        question: 'How should peptides be stored?',
        answer:
          'Lyophilized (unreconstituted) peptides should be stored in a cool, dark place — a refrigerator (2–8°C) is ideal. Once reconstituted, peptides must be refrigerated and used within 28–30 days. For long-term storage of lyophilized peptides (3–6+ months), a freezer at -20°C is recommended. Avoid repeated freeze-thaw cycles which degrade peptide integrity.',
      },
      {
        question: 'What is bacteriostatic water and where can I get it?',
        answer:
          'Bacteriostatic water is sterile water containing 0.9% benzyl alcohol, which prevents bacterial growth in the solution after it has been opened. It is the recommended diluent for most research peptides. It can be purchased separately from Pantheon Peptides or other research supply companies. Do not use tap water, distilled water, or regular sterile water (which goes bad quickly after opening).',
      },
      {
        question: 'How long does a reconstituted peptide remain viable?',
        answer:
          'Once reconstituted with bacteriostatic water, most peptides remain stable for 28–30 days when refrigerated at 2–8°C. Some peptides are more stable than others. To maximize viability: keep refrigerated at all times, avoid light exposure, use sterile needles for every draw, and never leave reconstituted peptides at room temperature for extended periods.',
      },
    ],
  },
]

export default async function FAQPage() {
  const headersList = await headers()
  const site = getSiteFromHeaders(headersList)

  const allFaqs = FAQ_SECTIONS.flatMap((s) => s.items)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="py-16 text-center" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/80 text-xl">
            Everything you need to know about research peptides, ordering, quality standards, and safe storage.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.category}>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              {section.category}
            </h2>
            <FAQAccordion items={section.items} />
          </div>
        ))}
      </section>

      {/* Still have questions CTA */}
      <section className="bg-gray-50 border-t border-gray-200 py-14 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            Browse our detailed research guides for in-depth coverage of specific peptides, or visit Pantheon Peptides
            directly to speak with their team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/guides"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-colors"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Read Research Guides
            </a>
            <a
              href="https://pantheonpeptides.com/partner/AmentiAI/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Visit Pantheon Peptides
            </a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
