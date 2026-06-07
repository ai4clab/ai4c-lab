import { getNews, NewsItem } from '@/lib/notion'
import NewsClient from './NewsClient'

export const revalidate = 60

export default async function NewsPage() {
  const news = await getNews()
  return <NewsClient news={news} />
}
