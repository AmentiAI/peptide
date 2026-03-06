'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface CarouselSlide {
  image: string
  headline: string
  subheadline?: string
  badge?: string
  ctaText?: string
  ctaUrl?: string
  ctaSecondaryText?: string
  ctaSecondaryUrl?: string
}

interface HeroCarouselProps {
  slides: CarouselSlide[]
  primaryColor?: string
  height?: 'sm' | 'md' | 'lg'
  autoPlayMs?: number
}

const HEIGHTS = {
  sm: 'h-[320px] md:h-[400px]',
  md: 'h-[420px] md:h-[540px] lg:h-[620px]',
  lg: 'h-[500px] md:h-[620px] lg:h-[720px]',
}

export default function HeroCarousel({
  slides,
  primaryColor = '#0f4c81',
  height = 'lg',
  autoPlayMs = 5000,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % slides.length) + slides.length) % slides.length)
      setProgress(0)
      startTimeRef.current = Date.now()
    },
    [slides.length]
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Progress ticker
  useEffect(() => {
    if (paused) {
      if (progressRef.current) clearInterval(progressRef.current)
      return
    }
    startTimeRef.current = Date.now() - progress * autoPlayMs
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const pct = Math.min(elapsed / autoPlayMs, 1)
      setProgress(pct)
      if (pct >= 1) {
        setCurrent((c) => (c + 1) % slides.length)
        setProgress(0)
        startTimeRef.current = Date.now()
      }
    }, 50)
    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [paused, autoPlayMs, slides.length, progress])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  // Touch swipe
  const touchStartX = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev()
  }

  return (
    <div
      className={`relative overflow-hidden select-none ${HEIGHTS[height]} bg-gray-900`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Hero carousel"
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 10 : 0 }}
        >
          {/* Background image */}
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />

          {/* Gradient overlay — strong on left, subtle on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
              <div
                className="max-w-2xl"
                style={{
                  transform: i === current ? 'translateY(0)' : 'translateY(20px)',
                  opacity: i === current ? 1 : 0,
                  transition: 'transform 0.7s ease, opacity 0.7s ease',
                  transitionDelay: '0.1s',
                }}
              >
                {slide.badge && (
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-5 shadow-lg">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    {slide.badge}
                  </div>
                )}

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight drop-shadow-xl">
                  {slide.headline}
                </h1>

                {slide.subheadline && (
                  <p className="text-base md:text-xl text-white/85 mb-8 leading-relaxed max-w-xl drop-shadow">
                    {slide.subheadline}
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  {slide.ctaText && slide.ctaUrl && (
                    <Link
                      href={slide.ctaUrl}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-sm md:text-base font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
                      style={{ color: primaryColor }}
                    >
                      {slide.ctaText}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                  {slide.ctaSecondaryText && slide.ctaSecondaryUrl && (
                    <Link
                      href={slide.ctaSecondaryUrl}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white text-sm md:text-base font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-200"
                    >
                      {slide.ctaSecondaryText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide counter + dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.45)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide number (top right) */}
      <div className="absolute top-4 right-16 z-20 text-white/60 text-xs font-mono tracking-widest">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-20">
        <div
          className="h-full bg-white/70 transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  )
}
