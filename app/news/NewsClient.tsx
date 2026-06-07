'use client'
import { useState, useMemo } from 'react'
import { NewsItem } from '@/lib/notion'

const CATEGORY_COLORS: Record<string, string> = {
  Award:       'var(--highlight)',
  Publication: 'var(--accent)',
  Event:       '#5B7FA6',
  Recruitment: '#7A9E7E',
  Other:       'var(--muted)',
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function NewsRow({ item }: { item: NewsItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-border group cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      style={{ transition: 'background 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
      <div className="py-5 px-4 flex items-start gap-4">
        {/* Date */}
        <div className="flex-shrink-0 w-28">
          <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
            {formatDate(item.date)}
          </p>
        </div>

        {/* Category badge */}
        <div className="flex-shrink-0 w-28">
          {item.category && (
            <span className="font-mono text-xs px-2 py-0.5"
              style={{
                background: `${CATEGORY_COLORS[item.category] ?? 'var(--muted)'}18`,
                color: CATEGORY_COLORS[item.category] ?? 'var(--muted)',
                border: `1px solid ${CATEGORY_COLORS[item.category] ?? 'var(--muted)'}40`,
              }}>
              {item.category}
            </span>
          )}
        </div>

        {/* Title + expand */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-base text-ink group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <span className="font-mono text-lg transition-transform flex-shrink-0"
              style={{ color: 'var(--muted)', transform: expanded ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>
              +
            </span>
          </div>

          {/* Expanded content */}
          {expanded && (
            <div className="mt-4 pb-2">
              {item.content && (
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                  {item.content}
                </p>
              )}
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="font-mono text-xs tracking-wide hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--accent)' }}>
                  View more →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function NewsClient({ news }: { news: NewsItem[] }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(news.map(n => n.category).filter(Boolean)))
    return ['All', ...cats]
  }, [news])

  const filtered = useMemo(() => {
    return news.filter(n => {
      const matchesQuery = n.title.toLowerCase().includes(query.toLowerCase())
      const matchesCat = activeCategory === 'All' || n.category === activeCategory
      return matchesQuery && matchesCat
    })
  }, [news, query, activeCategory])

  return (
    <div className="max-w-6xl mx-auto px-8 py-20">
      {/* Header */}
      <div className="border-b border-border pb-8 mb-12">
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--highlight)' }}>Updates</p>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-5xl md:text-6xl text-accent">News</h1>
          <span className="font-mono text-sm pb-2" style={{ color: 'var(--muted)' }}>
            {news.length} items
          </span>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Search input */}
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm" style={{ color: 'var(--muted)' }}>
            ⌕
          </span>
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full border border-border pl-10 pr-4 py-3 font-mono text-sm outline-none transition-colors focus:border-accent"
            style={{ background: 'var(--paper)', color: 'var(--ink)' }}
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="font-mono text-xs px-4 py-3 border transition-all"
              style={{
                background: activeCategory === cat ? 'var(--accent)' : 'var(--paper)',
                color: activeCategory === cat ? 'white' : 'var(--muted)',
                borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="font-mono text-xs mb-6" style={{ color: 'var(--muted)' }}>
        Showing {filtered.length} of {news.length} items
        {query && ` · "${query}"`}
      </p>

      {/* News list */}
      <div className="border-t border-border">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl mb-2" style={{ color: 'var(--border)' }}>No results found</p>
            <p className="font-mono text-sm" style={{ color: 'var(--muted)' }}>Try a different search term</p>
          </div>
        ) : (
          filtered.map(item => <NewsRow key={item.id} item={item} />)
        )}
      </div>
    </div>
  )
}
