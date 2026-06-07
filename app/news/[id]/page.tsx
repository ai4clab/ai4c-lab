import Link from 'next/link'
import { notFound } from 'next/navigation'
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

function splitParagraphs(text: string) {
  return text
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean)
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const news = await getNews()
  const item = news.find(n => n.id === id)

  if (!item) notFound()

  const paragraphs = splitParagraphs(item.content || '')

  return (
    <div className="max-w-6xl mx-auto px-8 pt-10 pb-20">
      <div className="mb-10">
        <Link href="/news" className="font-mono text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--highlight)' }}>
          ← Back to News
        </Link>
      </div>

      {item.imageUrls.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] items-start">
          <div className="flex flex-col gap-4 md:w-full">
            {item.imageUrls.map((imageUrl, index) => (
              <div key={`${imageUrl}-${index}`} className="w-full overflow-hidden border border-border bg-[var(--surface)]">
                <img
                  src={imageUrl}
                  alt={`${item.title} ${index + 1}`}
                  className="block w-full h-auto"
                />
              </div>
            ))}
          </div>

          <div>
            <div className="border-b border-border pb-6 mb-8">
              <p className="font-mono text-xs tracking-[0.15em] uppercase mb-3" style={{ color: 'var(--highlight)' }}>Updates</p>
              <h1 className="font-display text-[2.1rem] md:text-[2.6rem] leading-[1.05] text-accent">{item.title}</h1>
              <p className="font-mono text-sm mt-4" style={{ color: 'var(--muted)' }}>{formatDate(item.date)}</p>
            </div>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
              ) : (
                <p>내용이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl">
          <div className="border-b border-border pb-6 mb-8">
            <p className="font-mono text-xs tracking-[0.15em] uppercase mb-3" style={{ color: 'var(--highlight)' }}>Updates</p>
            <h1 className="font-display text-[2.1rem] md:text-[2.6rem] leading-[1.05] text-accent">{item.title}</h1>
            <p className="font-mono text-sm mt-4" style={{ color: 'var(--muted)' }}>{formatDate(item.date)}</p>
          </div>

          <div className="space-y-5 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
            ) : (
              <p>내용이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}