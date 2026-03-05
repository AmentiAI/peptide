export interface TextBlockContent {
  title?: string
  content: string
  align: 'left' | 'center' | 'right'
  backgroundColor?: string
}

export default function TextBlockSection({ content }: { content: TextBlockContent }) {
  return (
    <section
      className="py-12"
      style={{ backgroundColor: content.backgroundColor || 'transparent' }}
    >
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-${content.align}`}>
        {content.title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
        )}
        <div
          className="text-gray-600 leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
    </section>
  )
}
