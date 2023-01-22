import * as fs from 'node:fs/promises'
import path from 'node:path'

import { Configuration, OpenAIApi } from 'openai'
// import { upsertVideoTranscriptsForPlaylist } from '@/server/pinecone'
import pMap from 'p-map'
import { PineconeClient } from 'pinecone-client'

import * as metascraper from '@/server/metascraper'
import * as types from '@/server/types'
import { upsertEmbeddingsForNewsletter } from '@/server'
import '@/server/config'

async function main() {
  // const metadata = await metascraper.getLinkMetadata(
  //   'https://arxiv.org/abs/2301.07958'
  // )
  // console.log(metadata)
  // await metascraper.closeLinkMetadata()
  // return

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    })
  )

  const pinecone = new PineconeClient<types.PineconeMetadata>({
    apiKey: process.env.PINECONE_API_KEY,
    baseUrl: process.env.PINECONE_BASE_URL,
    namespace: process.env.PINECONE_NAMESPACE
  })

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
      return markdown
    },
    {
      concurrency: 8
    }
  )

  console.log(newsletter)
  console.log(posts.length, 'posts')

  await upsertEmbeddingsForNewsletter(newsletter, {
    openai,
    pinecone
  })
}

main()
  .catch((err) => {
    console.error('error', err)
    process.exit(1)
  })
  .finally(() => {
    return metascraper.closeLinkMetadata()
  })
