export interface TrustBarContent {
  items: { icon: string; text: string }[]
}

export default function TrustBarSection({ content }: { content: TrustBarContent }) {
  return (
    <section className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-gray-600">
          {content.items.map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 font-medium">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
