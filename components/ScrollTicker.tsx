'use client'

const ITEMS = [
  '🔬 99%+ Purity Guaranteed',
  '📋 COA on Every Order',
  '🚚 Fast US Shipping',
  '✅ Third-Party Lab Tested',
  '🔒 Secure Checkout',
  '🧬 12+ Premium Compounds',
  '⚡ Same-Day Processing',
  '🏆 Trusted by Researchers',
]

export default function ScrollTicker() {
  // Duplicate for seamless loop
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      className="overflow-hidden text-white text-xs font-semibold tracking-wide py-2"
      style={{ backgroundColor: 'var(--primary-dark, #0a3a61)' }}
      aria-label="Site trust indicators"
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'ticker 30s linear infinite',
          width: 'max-content',
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-8">
            {item}
            <span className="ml-8 text-white/40">·</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-inner { animation: none; }
        }
      `}</style>
    </div>
  )
}
