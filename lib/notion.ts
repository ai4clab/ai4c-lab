import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

// ── Types ──────────────────────────────────────────────────────────────────

export type Member = {
  id: string
  name: string
  course: string
  period: string
  email: string
  order: number
  active: boolean
  imageUrl: string | null
}

export type Publication = {
  id: string
  title: string
  authors: string
  journal: string
  date: string
  url: string
  citations: number
}

export type Project = {
  id: string
  title: string
  description: string
  period: string
  status: string
  tags: string[]
  thumbnailUrl: string | null
}

export type NewsItem = {
  id: string
  title: string
  date: string
  category: string
  content: string
  link: string
}

// ── Helpers ────────────────────────────────────────────────────────────────

function getTitle(prop: any): string {
  return prop?.title?.[0]?.plain_text ?? ''
}
function getRichText(prop: any): string {
  return prop?.rich_text?.[0]?.plain_text ?? ''
}
function getSelect(prop: any): string {
  return prop?.select?.name ?? ''
}
function getSelectOrRichText(prop: any): string {
  return prop?.select?.name ?? prop?.rich_text?.[0]?.plain_text ?? ''
}
function getMultiSelect(prop: any): string[] {
  return prop?.multi_select?.map((s: any) => s.name) ?? []
}
function getNumber(prop: any): number {
  return prop?.number ?? 0
}
function getUrl(prop: any): string {
  return prop?.url ?? ''
}
function getEmail(prop: any): string {
  return prop?.email ?? ''
}
function getCheckbox(prop: any): boolean {
  return prop?.checkbox ?? false
}
function getDate(prop: any): string {
  return prop?.date?.start ?? ''
}
function getFileUrl(prop: any): string | null {
  const files = prop?.files
  if (!files || files.length === 0) return null
  const f = files[0]
  return f.type === 'external' ? f.external.url : f.file?.url ?? null
}

// ── Fetchers ───────────────────────────────────────────────────────────────

export async function getMembers(): Promise<Member[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_MEMBERS_DB_ID!,
    sorts: [{ property: 'order', direction: 'ascending' }],
  })

  return res.results
    .filter((p: any) => p.object === 'page')
    .map((p: any) => ({
      id: p.id,
      name: getTitle(p.properties.name),
      course: getSelect(p.properties.course),
      period: getRichText(p.properties.period),
      email: getEmail(p.properties.email),
      order: getNumber(p.properties.order),
      active: getCheckbox(p.properties.active),
      imageUrl: getFileUrl(p.properties.image),
    }))
}

export async function getPublications(): Promise<Publication[]> {
  const results: any[] = []
  let hasMore = true
  let cursor: string | undefined = undefined

  while (hasMore) {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_PUBLICATIONS_DB_ID!,
      sorts: [{ property: 'date', direction: 'descending' }],
      start_cursor: cursor,
      page_size: 100,
    })
    results.push(...res.results)
    hasMore = res.has_more
    cursor = res.next_cursor ?? undefined
  }

  return results
    .filter((p: any) => p.object === 'page')
    .map((p: any) => ({
      id: p.id,
      title: getTitle(p.properties.title),
      authors: getRichText(p.properties.authors),
      journal: getSelectOrRichText(p.properties.journal),
      date: getDate(p.properties.date),
      url: getUrl(p.properties.url),
      citations: getNumber(p.properties.citations),
    }))
}

export async function getProjects(): Promise<Project[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_PROJECTS_DB_ID!,
    sorts: [{ property: 'title', direction: 'ascending' }],
  })

  return res.results
    .filter((p: any) => p.object === 'page')
    .map((p: any) => ({
      id: p.id,
      title: getTitle(p.properties.title),
      description: getRichText(p.properties.description),
      period: getRichText(p.properties.period),
      status: getSelect(p.properties.status),
      tags: getMultiSelect(p.properties.tags),
      thumbnailUrl: getFileUrl(p.properties.thumbnail),
    }))
}

export async function getNews(): Promise<NewsItem[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_NEWS_DB_ID!,
    sorts: [{ property: 'date', direction: 'descending' }],
  })

  return res.results
    .filter((p: any) => p.object === 'page')
    .map((p: any) => ({
      id: p.id,
      title: getTitle(p.properties.title),
      date: getDate(p.properties.date),
      category: getSelect(p.properties.category),
      content: getRichText(p.properties.content),
      link: getUrl(p.properties.link),
    }))
}
