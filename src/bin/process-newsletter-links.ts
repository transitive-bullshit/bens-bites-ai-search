import * as fs from 'node:fs/promises'
import path from 'node:path'

import { Configuration, OpenAIApi } from 'openai'
// import { upsertVideoTranscriptsForPlaylist } from '@/server/pinecone'
import pMap from 'p-map'
import papaparse from 'papaparse'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

import * as metascraper from '@/server/metascraper'
import * as types from '@/server/types'
import * as utils from '@/server/utils'
import '@/server/config'

async function main() {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    })
  )

  const input = 'www.bensbites.co'
  const folder = path.join('fixtures', input)
  const newsletterPath = path.join(folder, 'newsletter.json')

  const newsletter: types.beehiiv.Newsletter = JSON.parse(
    await fs.readFile(newsletterPath, 'utf-8')
  )

  const posts = await pMap(
    newsletter.posts,
    async (post) => {
      const postPath = path.join(folder, `${post.slug}.md`)
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

        const urlToMetadata = await utils.resolveMarkdownLinksWithMetadata(ast)

        console.log(
          'post',
          post.url,
          `"${post.web_title}"`,
          'found',
          Object.keys(urlToMetadata).length,
          'links'
        )

        const urls = Object.keys(urlToMetadata)
        for (const url of urls) {
          try {
            const parsedUrl = new URL(url)
            if (/bensbites/.test(parsedUrl.hostname)) {
              delete urlToMetadata[url]
            }
          } catch (err) {
            delete urlToMetadata[url]
          }
        }

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

  const urls = posts.flatMap((post) => {
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
    'out/links.csv',
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
  // await metascraper.closeLinkMetadata()
}

main()
  .catch((err) => {
    console.error('error', err)
    process.exit(1)
  })
  .finally(() => {
    return metascraper.closeLinkMetadata()
  })
