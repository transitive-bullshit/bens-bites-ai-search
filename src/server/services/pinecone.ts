import pMap from 'p-map'
import { PineconeClient } from 'pinecone-client'

import * as types from '@/server/types'
import '@/server/config'

export const pinecone = new PineconeClient<types.PineconeMetadata>({
  apiKey: process.env.PINECONE_API_KEY,
  baseUrl: process.env.PINECONE_BASE_URL,
  namespace: process.env.PINECONE_NAMESPACE
})

export async function upsertTweetVectorBatches(
  tweetVectors: types.PineconeVector[],
  {
    batchSize = 100 // max 100
  }: { batchSize?: number } = {}
) {
  const numBatches = Math.ceil(tweetVectors.length / batchSize)
  const batches: types.PineconeVector[][] = []
  for (let i = 0; i < numBatches; ++i) {
    const offset = i * batchSize
    batches.push(tweetVectors.slice(offset, offset + batchSize))
  }

  console.log(
    `\nupserting ${tweetVectors.length} embedding vectors across ${numBatches} batches\n`
  )

  await pMap(
    batches,
    async (batch, index) => {
      // console.log('pinecone upsert batch', index, batch.length)

      try {
        await pinecone.upsert({ vectors: batch, batchSize })
      } catch (err) {
        console.error('error pinecone batch upsert', index, err.toString())
        // delete batch[0].values
        // console.log(JSON.stringify(batch[0], null, 2))
      }
    },
    {
      concurrency: 4
    }
  )
}
