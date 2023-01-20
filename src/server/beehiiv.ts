import cheerio from 'cheerio'
import html2md from 'html-to-md'
import pMap from 'p-map'

import got from './got'
import { beehiiv } from './types'
import { normalizeMarkdown } from './utils'

export async function resolveBeeHiivNewsletter(
  url: string,
  {
    normalizeMarkdown: shouldNormalizeMarkdown = true
  }: {
    normalizeMarkdown?: boolean
  } = {}
) {
  const u = new URL(url)
  const domain = u.hostname
  const baseUrl = u.origin

  const page = await got(baseUrl).text()

  const $ = cheerio.load(page)
  const s = $('script')
    .map((s, el) => $.text([el]))
    .get()
    .filter(Boolean)
    .find((script) => /window\.__remixContext *= */.test(script))

  // const s2 = s.replace(/^.*window\.__remixContext *= *(.*);\s*$/, '$1')
  // console.log(s2)

  // TODO: this is really, really hacky and a huge security vulnerability...
  ;(globalThis as any).window = global
  const ctx = eval(s)

  const publication: beehiiv.Publication = ctx.routeData.root.publication
  // console.log(JSON.stringify(publication, null, 2))

  const route = ctx.routeData['routes/index']
  const numPages = route?.paginatedPosts?.pagination?.total_pages
  // route?.paginatedPosts?.posts

  const pages = []
  for (let i = 1; i <= numPages; ++i) {
    pages.push(i)
  }

  const postPages: beehiiv.Post[][] = await pMap(
    pages,
    async (index) => {
      const url = `${baseUrl}/posts?page=${index}&_data=routes%2F__loaders%2Fposts`
      const page: any = await got(url).json()
      return page.posts
    },
    {
      concurrency: 4
    }
  )

  const posts: beehiiv.Post[] = postPages.flat()

  await pMap(
    posts,
    async (post) => {
      const url = `${baseUrl}/p/${post.slug}`
      post.url = url

      try {
        post.markdown = await resolveBeeHiivPostContent(url, {
          baseUrl,
          normalizeMarkdown: shouldNormalizeMarkdown
        })
      } catch (err) {
        console.warn('error processing beehiiv post', url, err.toString())
      }
    },
    {
      concurrency: 8
    }
  )

  return {
    domain,
    baseUrl,
    publication,
    posts
  }
}

export async function resolveBeeHiivPostContent(
  url: string,
  {
    baseUrl,
    normalizeMarkdown: shouldNormalizeMarkdown = true
  }: { baseUrl?: string; normalizeMarkdown?: boolean } = {}
) {
  console.log(url)
  const page = await got(url).text()

  const $ = cheerio.load(page)
  const s = $('script')
    .map((s, el) => $.text([el]))
    .get()
    .filter(Boolean)
    .find((script) => /window\.__remixContext *= */.test(script))

  // TODO: this is really, really hacky and a huge security vulnerability...
  ;(globalThis as any).window = global
  const ctx = eval(s)

  const route = ctx.routeData['routes/p/$slug']
  // console.log(JSON.stringify(ctx, null, 2))

  const html = route.gatedHTML
  const $post = cheerio.load(html)
  const postHtml = $post('.rendered-post').html()

  const postMarkdown = html2md(postHtml)

  if (shouldNormalizeMarkdown) {
    return normalizeMarkdown(postMarkdown, { baseUrl })
  } else {
    return postMarkdown
  }
}
