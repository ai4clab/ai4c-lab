'use client'

import { useEffect, useMemo, useState } from 'react'

type PublicationsKpiProps = {
  paperCount: number
  totalCitations: number
  hIndex: number
}

function easeOutHeavy(t: number) {
  if (t <= 0) return 0
  if (t >= 1) return 1

  const pivot = 1 / 3

  // First 1/3 time: reach 90% quickly.
  if (t <= pivot) {
    const local = t / pivot
    return 0.9 * (1 - Math.pow(1 - local, 3))
  }

  // Remaining 2/3 time: very slow approach to 100%.
  const local = (t - pivot) / (1 - pivot)
  return 0.9 + 0.1 * (1 - Math.pow(1 - local, 5))
}

function useCountUp(target: number, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setValue(target)
      return
    }

    let frame = 0
    let timeout = 0
    let startTs = 0

    const step = (ts: number) => {
      if (!startTs) startTs = ts
      const progress = Math.min((ts - startTs) / duration, 1)
      const eased = easeOutHeavy(progress)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    timeout = window.setTimeout(() => {
      frame = requestAnimationFrame(step)
    }, delay)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      if (timeout) window.clearTimeout(timeout)
    }
  }, [target, duration, delay])

  return value
}

export default function PublicationsKpi({ paperCount, totalCitations, hIndex }: PublicationsKpiProps) {
  const sharedDuration = 3600
  const paperAnimated = useCountUp(paperCount, sharedDuration, 0)
  const citationAnimated = useCountUp(totalCitations, sharedDuration, 0)
  const hIndexAnimated = useCountUp(hIndex, sharedDuration, 0)

  const metrics = useMemo(
    () => [
      { label: 'Papers', value: paperAnimated.toLocaleString() },
      { label: 'Citations', value: citationAnimated.toLocaleString() },
      { label: 'H-Index', value: hIndexAnimated.toLocaleString() },
    ],
    [paperAnimated, citationAnimated, hIndexAnimated]
  )

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-6">
      {metrics.map(metric => (
        <div key={metric.label} className="w-[128px]">
          <p className="font-mono text-[10px] uppercase" style={{ color: 'var(--muted)' }}>
            {metric.label}
          </p>
          <p className="font-display text-3xl leading-none mt-1 tabular-nums" style={{ color: 'var(--accent)' }}>
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  )
}
