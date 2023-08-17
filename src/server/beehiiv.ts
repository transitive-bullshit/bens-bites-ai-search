import cheerio from 'cheerio'
import html2md from 'html-to-md'
import pMap from 'p-map'

import got from './got'
import { normalizeMarkdown } from './markdown'
import { beehiiv } from './types'

export async function resolveBeeHiivNewsletter(
  url: string,
  {
    normalizeMarkdown: shouldNormalizeMarkdown = true,
    beehiivCookie = process.env.BEEHIIV_COOKIE,
    newsletter
  }: {
    normalizeMarkdown?: boolean
    beehiivCookie?: string
    newsletter?: beehiiv.Newsletter
  } = {}
) {
  const u = new URL(url)
  const domain = u.hostname
  const baseUrl = u.origin

  if (!newsletter) {
    newsletter = {
      domain,
      baseUrl,
      publication: null,
      posts: []
    }
  }

  const page = await got(baseUrl, {
    headers: { cookie: beehiivCookie }
  }).text()

  console.log(url)
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

  newsletter.publication = ctx.routeData.root.publication

  const route = ctx.routeData['routes/index']
  const numPages = route?.paginatedPosts?.pagination?.total_pages
  // route?.paginatedPosts?.posts

  const pages = []
  for (let i = 1; i <= numPages; ++i) {
    pages.push(i)
  }

  const existingPostsById = new Map<string, beehiiv.Post>()
  for (const post of newsletter.posts) {
    existingPostsById.set(post.id, post)
  }

  console.log()

  const posts: beehiiv.Post[] = (
    await pMap(
      pages,
      async (index) => {
        const url = `${baseUrl}/posts?page=${index}&_data=routes%2F__loaders%2Fposts`
        const page: any = await got(url, {
          headers: { cookie: beehiivCookie }
        }).json()
        return (page.posts as beehiiv.Post[]).map((post) => {
          const url = `${baseUrl}/p/${post.slug}`
          post.url = url
          return post
        })
      },
      {
        concurrency: 4
      }
    )
  )
    .flat()
    .filter((post, index) => {
      if (existingPostsById.has(post.id)) {
        console.log(`${index}) skipping cached post`, post.slug)
        return false
      }

      return true
    })

  console.log()

  await pMap(
    posts,
    async (post) => {
      try {
        post.markdown = await resolveBeeHiivPostContent(post.url, {
          baseUrl,
          normalizeMarkdown: shouldNormalizeMarkdown,
          beehiivCookie
        })
      } catch (err) {
        console.warn('error processing beehiiv post', url, err.toString())
      }
    },
    {
      concurrency: 8
    }
  )

  newsletter.posts = posts.concat(newsletter.posts)
  // newsletter.posts.sort((a, b) => {
  //   return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  // })

  return newsletter
}

export async function resolveBeeHiivPostContent(
  url: string,
  {
    baseUrl,
    normalizeMarkdown: shouldNormalizeMarkdown = true,
    beehiivCookie
  }: {
    baseUrl?: string
    normalizeMarkdown?: boolean
    beehiivCookie?: string
  } = {}
) {
  console.log(url)
  const page = await got(url, { headers: { cookie: beehiivCookie } }).text()

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
  const postHtml = $post('.rendered-post')
    .html()
    .replaceAll(/<b>\s*&nbsp;\s*<\/b>/g, '  ')

  const postMarkdown = html2md(postHtml, {
    // TODO: we really only want to do this when <u> is inside of <a>
    // TODO: same thing for <b> inside of <a>
    // TODO: same thing for <b> inside of headings
    aliasTags: {
      u: 'span'
    }
  })

  if (shouldNormalizeMarkdown) {
    return normalizeMarkdown(postMarkdown, { baseUrl })
  } else {
    return postMarkdown
  }
}
