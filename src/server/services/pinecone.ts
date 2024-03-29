import pMap from 'p-map'
import { PineconeClient } from 'pinecone-client'
import plur from 'plur'

import * as types from '@/server/types'
import '@/server/config'

export const pinecone = new PineconeClient<types.PineconeMetadata>({
  apiKey: process.env.PINECONE_API_KEY,
  baseUrl: process.env.PINECONE_BASE_URL,
  namespace: process.env.PINECONE_NAMESPACE
})

export async function upsertVectors(
  vectors: types.PineconeVector[],
  {
    batchSize = 100, // max 100
    concurrency = 4
  }: { batchSize?: number; concurrency?: number } = {}
) {
  const numBatches = Math.ceil(vectors.length / batchSize)
  const batches: types.PineconeVector[][] = []
  for (let i = 0; i < numBatches; ++i) {
    const offset = i * batchSize
    batches.push(vectors.slice(offset, offset + batchSize))
  }

  console.log(
    `\nupserting ${vectors.length} vectors into pinecone (${numBatches} ${plur(
      'batch',
      numBatches
    )})\n`
  )

  await pMap(
    batches,
    async (batch, index) => {
      console.log('pinecone upsert batch', index, batch.length)

      try {
        await pinecone.upsert({ vectors: batch, batchSize })
      } catch (err) {
        console.error('error pinecone batch upsert', index, err.toString())
        // delete batch[0].values
        // console.log(JSON.stringify(batch[0], null, 2))
      }
    },
    {
      concurrency
    }
  )
}

export async function fetchVectors(
  ids: string[],
  {
    batchSize = 500,
    concurrency = 16
  }: { batchSize?: number; concurrency?: number } = {}
): Promise<types.PineconeVector[]> {
  const batches: string[][] = []
  const numBatches = Math.ceil(ids.length / batchSize)

  for (let i = 0; i < numBatches; i++) {
    const offset = i * batchSize
    batches.push(ids.slice(offset, offset + batchSize))
  }

  console.log(
    `fetching existing pinecone vectors (${ids.length} vectors across ${batches.length} batches)`
  )

  const vectors = (
    await pMap(
      batches,
      async (batchIds, index) => {
        try {
          const res = await pinecone.fetch({ ids: batchIds })
          return Object.values(res.vectors) as types.PineconeVector[]
        } catch (err) {
          console.warn('error fetching pinecone vectors', index, err.toString())
          return []
        }
      },
      {
        concurrency
      }
    )
  ).flat()

  return vectors
}
