'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

const HERO_IMAGES = Array.from({ length: 12 }, (_, i) => `/src/landing-img/${i + 1}.png`)
const SLIDE_INTERVAL_MS = 10000

export default function HeroSlideshow() {
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

  return (
    <div className="hidden md:block absolute inset-y-0 right-0 w-[56vw] max-w-[860px] pointer-events-none z-[1]">
      <div className="relative h-full w-full flex justify-end overflow-hidden">
        <div
          className="relative h-full aspect-square mr-0"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.78) 30%, rgba(0,0,0,1) 65%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.78) 30%, rgba(0,0,0,1) 65%)',
          }}
        >
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt="AI4C lab activity"
              fill
              priority={index === 0}
              sizes="(max-width: 767px) 0px, (max-width: 1280px) 48vw, 720px"
              className="object-cover object-right transition-opacity duration-[1800ms] ease-in-out"
              style={{ opacity: index === activeIndex ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}