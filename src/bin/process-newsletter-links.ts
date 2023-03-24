import * as fs from 'node:fs/promises'
import path from 'node:path'

import pMap from 'p-map'
import papaparse from 'papaparse'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

import * as config from '@/server/config'
import * as markdown from '@/server/markdown'
import * as types from '@/server/types'

async function main() {
  const force = !!process.env.FORCE
  const noop = !!process.env.NOOP

  const newsletter: types.beehiiv.Newsletter = JSON.parse(
    await fs.readFile(config.newsletterMetadataPath, 'utf-8')
  )

  const newsletterLinkMap: types.NewsletterLinkMap = {}
  const newsletterLinkMapNew: types.NewsletterLinkMap = {}

  if (!force) {
    try {
      const parsed = papaparse.parse(
        await fs.readFile(config.newsletterLinksPath, 'utf-8'),
        {
          header: true,
          dynamicTyping: true
        }
      )
      const newsletterLinks: types.NewsletterLink[] = parsed.data

      for (const link of newsletterLinks) {
        if (link.url) {
          newsletterLinkMap[link.url] = link
        }
      }
    } catch (err) {
      console.warn(
        'warning unable to read newsletter link cache',
        err.toString()
      )
    }
  }

  const newsletterLinkMapOld: types.NewsletterLinkMap = { ...newsletterLinkMap }

  const posts = await pMap(
    newsletter.posts,
    async (post) => {
      const postPath = path.join(config.newsletterDir, `${post.slug}.md`)
      const markdown = await fs.readFile(postPath, 'utf-8')
      post.markdown = markdown
      return post
    },
    {
      concurrency: 8
    }
  )
  // great for debugging a single post
  // .slice(0, 1)

  console.log(
    '\nprocessing',
    posts.length,
    'posts',
    `(${Object.keys(newsletterLinkMap).length} cached links)\n`
  )

  await pMap(
    posts,
    async (post) => {
      try {
        console.log('processing post', post.url, `"${post.web_title}"`)

        const ast = unified().use(remarkParse).parse(post.markdown)

        const urlToMetadata = await markdown.resolveMarkdownLinksWithMetadata(
          ast,
          {
            noop,
            isValidLink: (url: string) => {
              if (!url) return false
              if (!force && newsletterLinkMap[url]) {
                delete newsletterLinkMapOld[url]
                return false
              }

              try {
                const parsedUrl = new URL(url)
                if (!config.protocolAllowList.has(parsedUrl.protocol)) {
                  return false
                }

                if (/bensbites/i.test(parsedUrl.hostname)) {
                  return false
                }

                if (
                  parsedUrl.hostname === 'twitter.com' &&
                  parsedUrl.pathname.startsWith('/intent')
                ) {
                  return false
                }

                return true
              } catch (err) {
                return false
              }
            }
          }
        )

        const numLinks = Object.keys(urlToMetadata).length
        if (numLinks <= 0) return

        console.log(
          'post',
          post.url,
          `"${post.web_title}"`,
          'found',
          numLinks,
          'new links'
        )

        for (const url of Object.keys(urlToMetadata)) {
          const metadata = urlToMetadata[url]

          const link = {
            ...metadata,
            url,
            postTitle: post.web_title,
            postDate: post.created_at,
            postId: post.id,
            postUrl: post.url
          }

          newsletterLinkMap[url] = link
          newsletterLinkMapNew[url] = link
        }
      } catch (err) {
        console.warn(
          'error processing post',
          post.url,
          `"${post.web_title}"`,
          err
        )
      }
    },
    {
      concurrency: 4
    }
  )

  if (!force) {
    console.log(
      '\nremoving old links',
      Object.keys(newsletterLinkMapOld).length,
      '\n'
    )

    for (const url of Object.keys(newsletterLinkMapOld)) {
      console.log('removing old link', url)
      delete newsletterLinkMap[url]
    }

    console.log(
      '\nremoved old links',
      Object.keys(newsletterLinkMapOld).length,
      '\n'
    )
  }

  function linkComparator(a: types.NewsletterLink, b: types.NewsletterLink) {
    const diff = new Date(a.postDate).getTime() - new Date(b.postDate).getTime()
    if (diff) {
      return diff
    }

    return a.url.localeCompare(b.url)
  }

  const urls = Object.values(newsletterLinkMap).sort(linkComparator)
  const newUrls = Object.values(newsletterLinkMapNew).sort(linkComparator)

  console.log(
    '\n\n\n\nfound',
    newUrls.length,
    'new links',
    `(${urls.length} total)\n\n\n\n`
  )

  if (noop) {
    console.log('\nnoop, not writing anything\n')
    return
  }
  // console.log(JSON.stringify(newUrls, null, 2))

  await fs.writeFile(
    config.newsletterLinksPath,
    papaparse.unparse(urls, {
      columns: [
        'linkText',
        'url',
        'title',
        'site',
        'description',
        'author',
        'category',
        'shortlink',
        'canonical',
        'date',
        'author_url',
        'thumbnail',
        'thumbnailWidth',
        'thumbnailHeight',
        'icon',
        'iconWidth',
        'iconHeight',
        'postTitle',
        'postDate',
        'postId',
        'postUrl'
      ]
    }),
    'utf-8'
  )
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
