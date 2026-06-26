'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

const HERO_IMAGES = Array.from({ length: 12 }, (_, i) => `/src/landing-img/${i + 1}.png`)
const SLIDE_INTERVAL_MS = 10000

type HeroSlideshowProps = {
  mode?: 'desktop' | 'mobile'
}

export default function HeroSlideshow({ mode = 'desktop' }: HeroSlideshowProps) {
  const images = useMemo(() => HERO_IMAGES, [])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const randomStartIndex = Math.floor(Math.random() * images.length)
    setActiveIndex(randomStartIndex)

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [images.length])

  const slideImages = images.map((src, index) => (
    <Image
      key={src}
      src={src}
      alt="AI4C lab activity"
      fill
      priority={index === 0}
      sizes={mode === 'mobile' ? '(max-width: 767px) 100vw, 0px' : '(max-width: 767px) 0px, (max-width: 1280px) 44vw, 760px'}
      className={
        mode === 'mobile'
          ? 'object-cover object-center transition-opacity duration-[1800ms] ease-in-out'
          : 'object-cover object-right transition-opacity duration-[1800ms] ease-in-out'
      }
      style={{ opacity: index === activeIndex ? 1 : 0 }}
    />
  ))

  if (mode === 'mobile') {
    return <div className="absolute inset-0 pointer-events-none">{slideImages}</div>
  }

  return (
    <div
      className="hidden md:block absolute inset-y-0 right-0 pointer-events-none z-[1] overflow-hidden"
      style={{ width: 'min(56vw, 88vh)', maxWidth: '860px' }}
    >
      <div className="relative h-full w-full flex justify-end overflow-hidden">
        <div
          className="relative h-full aspect-square mr-0"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.42) 28%, rgba(0,0,0,0.82) 58%, rgba(0,0,0,1) 86%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.42) 28%, rgba(0,0,0,0.82) 58%, rgba(0,0,0,1) 86%)',
          }}
        >
          {slideImages}
        </div>

        <div
          className="absolute inset-y-0 left-0 w-[42%]"
          style={{
            background: 'rgb(255,255,255)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.72) 48%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.72) 48%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>
    </div>
  )
}