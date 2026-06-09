import Link from 'next/link'
import { getNews } from '@/lib/notion'

export const revalidate = 60

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <div className="max-w-6xl mx-auto px-8 pt-10 pb-20">
      <div className="border-b border-border pb-8 mb-12">
        <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--highlight)' }}>Updates</p>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-5xl md:text-6xl text-accent fade-up fade-up-delay-1">News</h1>
          <span className="font-mono text-sm pb-2" style={{ color: 'var(--muted)' }}>
            {news.length} items
          </span>
        </div>
      </div>

      <p className="font-mono text-xs mb-6" style={{ color: 'var(--muted)' }}>
        Showing {news.length} of {news.length} items
      </p>

      <div className="border-t border-border">
        {news.map((item, index) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="group block border-b border-border transition-colors duration-200 hover:bg-[var(--surface)]"
          >
            <div className="grid grid-cols-[70px_1fr_130px] gap-4 items-center py-2.5 px-2.5 md:px-5">
              <div className="font-mono text-xs md:text-sm text-center" style={{ color: 'var(--muted)' }}>
                {index + 1}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-base md:text-lg text-ink group-hover:text-accent transition-colors truncate font-medium">
                  {item.title}
                </h3>
              </div>
              <div className="text-right font-mono text-xs md:text-sm whitespace-nowrap" style={{ color: 'var(--muted)' }}>
                {formatDate(item.date)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
