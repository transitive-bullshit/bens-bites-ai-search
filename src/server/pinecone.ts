import pMap from 'p-map'

import * as types from './types'
import { getEmbeddingsForPost } from './openai'

export async function upsertEmbeddingsForNewsletter(
  newsletter: types.beehiiv.Newsletter,
  {
    openai,
    pinecone,
    concurrency = 1
  }: {
    openai: types.OpenAIApi
    pinecone: types.PineconeClient
    concurrency?: number
  }
) {
  const posts = newsletter.posts.filter((post) => post.markdown).slice(0, 1)

  return (
    await pMap(
      posts,
      async (post) => {
        try {
          console.log('processing post', post.url, `"${post.web_title}"`)
          const vectors = await getEmbeddingsForPost({
            post,
            openai
          })

          console.log(
            'post',
            post.url,
            `"${post.web_title}"`,
            'upserting',
            vectors.length,
            'vectors'
          )

          await pinecone.upsert({ vectors })

          return post
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
        concurrency
      }
    )
  ).filter(Boolean)
}
