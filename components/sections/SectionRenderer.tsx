import HeroSection from './HeroSection'
import TrustBarSection from './TrustBarSection'
import FeaturedProductsSection from './FeaturedProductsSection'
import ImageBannerSection from './ImageBannerSection'
import TextBlockSection from './TextBlockSection'
import CtaBannerSection from './CtaBannerSection'

interface Section {
  id: number
  sectionType: string
  isVisible: boolean
  content: unknown
}

export default function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections
        .filter((s) => s.isVisible)
        .map((section) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const content = section.content as any
          switch (section.sectionType) {
            case 'hero':
              return <HeroSection key={section.id} content={content} />
            case 'trust_bar':
              return <TrustBarSection key={section.id} content={content} />
            case 'featured_products':
              return <FeaturedProductsSection key={section.id} content={content} />
            case 'image_banner':
              return <ImageBannerSection key={section.id} content={content} />
            case 'text_block':
              return <TextBlockSection key={section.id} content={content} />
            case 'cta_banner':
              return <CtaBannerSection key={section.id} content={content} />
            default:
              return null
          }
        })}
    </>
  )
}
