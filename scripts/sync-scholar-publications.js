const { Client } = require('@notionhq/client')

const SCHOLAR_USER_ID = process.env.SCHOLAR_USER_ID || 'egT87vMAAAAJ'
const SCHOLAR_LANG = process.env.SCHOLAR_LANG || 'en'
const MAX_PAGES = Number(process.env.SCHOLAR_MAX_PAGES || '25')
const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY || ''

function ensureEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function decodeHtml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function stripTags(html) {
  return decodeHtml((html || '').replace(/<[^>]+>/g, ''))
}

function normalizeTitle(title) {
  return (title || '').toLowerCase().replace(/\s+/g, ' ').trim()
}

async function fetchScholarPage(cstart) {
  const url = `https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}&hl=${SCHOLAR_LANG}&cstart=${cstart}&pagesize=20`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml',
    },
  })

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error(
        `Failed to fetch Scholar page (403). GitHub Actions runners are commonly blocked by Scholar. ` +
          `Set SERPAPI_API_KEY secret and use SerpAPI path.`
      )
    }
    throw new Error(`Failed to fetch Scholar page (${res.status}): ${url}`)
  }

  return res.text()
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Mozilla/5.0',
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch JSON (${res.status}): ${url}`)
  }

  return res.json()
}

function parseScholarRows(html) {
  const rows = html.match(/<tr class="gsc_a_tr">[\s\S]*?<\/tr>/g) || []

  return rows
    .map((row) => {
      const titleHtml = (row.match(/class="gsc_a_at"[^>]*>([\s\S]*?)<\/a>/) || [])[1]
      const title = stripTags(titleHtml)

      const grays = [...row.matchAll(/<div class="gs_gray">([\s\S]*?)<\/div>/g)].map((m) => stripTags(m[1]))
      const authors = grays[0] || ''
      const journal = grays[1] || ''

      const yearRaw = stripTags((row.match(/class="gsc_a_y"[^>]*>[\s\S]*?<span[^>]*>([0-9]{4})<\/span>/) || [])[1])
      const year = Number(yearRaw) || null

      const citationRaw = stripTags((row.match(/class="gsc_a_ac[^>]*>([\s\S]*?)<\//) || [])[1])
      const citations = Number((citationRaw || '0').replace(/[^0-9]/g, '')) || 0

      const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`

      return {
        title,
        authors,
        journal,
        year,
        citations,
        url,
      }
    })
    .filter((p) => p.title)
}

async function collectScholarPublications() {
  const collected = []
  const seen = new Set()

  for (let page = 0; page < MAX_PAGES; page++) {
    const cstart = page * 20
    const html = await fetchScholarPage(cstart)
    const parsed = parseScholarRows(html)

    if (parsed.length === 0) break

    let added = 0
    for (const pub of parsed) {
      const key = normalizeTitle(pub.title)
      if (!key || seen.has(key)) continue
      seen.add(key)
      collected.push(pub)
      added++
    }

    if (added === 0 || parsed.length < 20) break
  }

  return collected
}

async function collectScholarPublicationsViaSerpApi() {
  const collected = []
  const seen = new Set()

  for (let page = 0; page < MAX_PAGES; page++) {
    const start = page * 20
    const url =
      `https://serpapi.com/search.json?engine=google_scholar_author` +
      `&author_id=${encodeURIComponent(SCHOLAR_USER_ID)}` +
      `&hl=${encodeURIComponent(SCHOLAR_LANG)}` +
      `&start=${start}` +
      `&api_key=${encodeURIComponent(SERPAPI_API_KEY)}`

    const payload = await fetchJson(url)
    const articles = payload?.articles || []
    if (!Array.isArray(articles) || articles.length === 0) break

    let added = 0
    for (const article of articles) {
      const title = decodeHtml((article?.title || '').trim())
      const key = normalizeTitle(title)
      if (!key || seen.has(key)) continue

      const authors = decodeHtml((article?.authors || '').trim())
      const journal = decodeHtml((article?.publication || '').trim())
      const year = Number(article?.year) || null
      const citations = Number(article?.cited_by?.value || 0) || 0
      const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`

      seen.add(key)
      collected.push({
        title,
        authors,
        journal,
        year,
        citations,
        url,
      })
      added++
    }

    if (added === 0 || articles.length < 20) break
  }

  return collected
}

function richTextValue(text) {
  if (!text) return []
  return [{ text: { content: text.slice(0, 2000) } }]
}

function buildJournalPropertyValue(schemaType, value) {
  if (schemaType === 'rich_text') {
    return { rich_text: richTextValue(value) }
  }
  if (schemaType === 'select') {
    const clean = (value || '').replace(/,/g, ' ').trim().slice(0, 100)
    return clean ? { select: { name: clean } } : { select: null }
  }
  return { rich_text: richTextValue(value) }
}

async function main() {
  const notionToken = ensureEnv('NOTION_TOKEN')
  const publicationsDbId = ensureEnv('NOTION_PUBLICATIONS_DB_ID')
  const notion = new Client({ auth: notionToken })

  const scholarPublications = SERPAPI_API_KEY
    ? await collectScholarPublicationsViaSerpApi()
    : await collectScholarPublications()
  if (scholarPublications.length === 0) {
    throw new Error('No publications parsed from Google Scholar. Sync aborted.')
  }

  const dbInfo = await notion.databases.retrieve({ database_id: publicationsDbId })
  const journalSchemaType = dbInfo.properties?.journal?.type || 'rich_text'

  const existing = []
  let hasMore = true
  let cursor = undefined

  while (hasMore) {
    const res = await notion.databases.query({
      database_id: publicationsDbId,
      start_cursor: cursor,
      page_size: 100,
    })
    existing.push(...res.results)
    hasMore = res.has_more
    cursor = res.next_cursor || undefined
  }

  const existingMap = new Map()
  for (const page of existing) {
    const title = page.properties?.title?.title?.[0]?.plain_text || ''
    const key = normalizeTitle(title)
    if (key) existingMap.set(key, page)
  }

  let created = 0
  let updated = 0
  let skipped = 0

  for (const pub of scholarPublications) {
    const key = normalizeTitle(pub.title)
    if (!key) continue

    const date = pub.year ? `${pub.year}-01-01` : null
    const existingPage = existingMap.get(key)

    if (!existingPage) {
      await notion.pages.create({
        parent: { database_id: publicationsDbId },
        properties: {
          title: { title: [{ text: { content: pub.title.slice(0, 2000) } }] },
          authors: { rich_text: richTextValue(pub.authors) },
          journal: buildJournalPropertyValue(journalSchemaType, pub.journal),
          date: date ? { date: { start: date } } : { date: null },
          url: { url: pub.url || null },
          citations: { number: pub.citations || 0 },
        },
      })
      created++
      continue
    }

    const currentAuthors = existingPage.properties?.authors?.rich_text?.[0]?.plain_text || ''
    const currentJournalRichText = existingPage.properties?.journal?.rich_text?.[0]?.plain_text || ''
    const currentJournalSelect = existingPage.properties?.journal?.select?.name || ''
    const currentJournal = currentJournalRichText || currentJournalSelect
    const currentDate = existingPage.properties?.date?.date?.start || ''
    const currentUrl = existingPage.properties?.url?.url || ''
    const currentCitations = existingPage.properties?.citations?.number || 0

    const same =
      currentAuthors === pub.authors &&
      currentJournal === pub.journal &&
      currentDate === (date || '') &&
      currentUrl === (pub.url || '') &&
      currentCitations === (pub.citations || 0)

    if (same) {
      skipped++
      continue
    }

    await notion.pages.update({
      page_id: existingPage.id,
      properties: {
        authors: { rich_text: richTextValue(pub.authors) },
        journal: buildJournalPropertyValue(journalSchemaType, pub.journal),
        date: date ? { date: { start: date } } : { date: null },
        url: { url: pub.url || null },
        citations: { number: pub.citations || 0 },
      },
    })
    updated++
  }

  console.log(
    JSON.stringify(
      {
        scholarCount: scholarPublications.length,
        notionExisting: existing.length,
        created,
        updated,
        skipped,
      },
      null,
      2
    )
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
