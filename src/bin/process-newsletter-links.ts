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
  const newsletter: types.beehiiv.Newsletter = JSON.parse(
    await fs.readFile(config.newsletterMetadataPath, 'utf-8')
  )

  let newsletterLinkMap: types.NewsletterLinkMap = {}
  try {
    const parsed = papaparse.parse(
      await fs.readFile(config.newsletterLinksPath, 'utf-8'),
      {
        header: true
      }
    )
    const newsletterLinks: types.NewsletterLink[] = parsed.data

    for (const link of newsletterLinks) {
      if (link.url) {
        newsletterLinkMap[link.url] = link
      }
    }
  } catch (err) {
    console.log(err)
  }

  console.log(newsletterLinkMap)
  return

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

  console.log('\nprocessing', posts.length, 'posts\n')

  const postIdToUrlsMap: Record<string, Record<string, types.LinkMetadata>> = {}

  await pMap(
    posts,
    async (post) => {
      try {
        console.log('processing post', post.url, `"${post.web_title}"`)

        const ast = unified().use(remarkParse).parse(post.markdown)

        const urlToMetadata = await markdown.resolveMarkdownLinksWithMetadata(
          ast,
          {
            isValidLink: (url: string) => {
              try {
                const parsedUrl = new URL(url)
                if (/bensbites/i.test(parsedUrl.hostname)) {
                  return false
                }

                return true
              } catch (err) {
                return false
              }
            }
          }
        )

        console.log(
          'post',
          post.url,
          `"${post.web_title}"`,
          'found',
          Object.keys(urlToMetadata).length,
          'links'
        )

        postIdToUrlsMap[post.id] = urlToMetadata
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

  const urls: types.NewsletterLink[] = posts.flatMap((post) => {
    const urls = postIdToUrlsMap[post.id]
    if (!urls) {
      return []
    }

    return Object.keys(urls).map((url) => {
      const metadata = urls[url]

      return {
        ...metadata,
        url,
        postTitle: post.web_title,
        postDate: post.created_at,
        postId: post.id,
        postUrl: post.url
      }
    })
  })

  console.log('found', urls.length, 'links\n\n\n\n')
  console.log(JSON.stringify(urls, null, 2))

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
