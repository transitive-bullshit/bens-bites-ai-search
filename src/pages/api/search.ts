import QuickLRU from 'quick-lru'

import * as config from '@/lib/config'
import { createAPIHandler } from '@/server/api'
import '@/server/config'
import { createEmbedding } from '@/server/embedding'
import { pinecone } from '@/server/services/pinecone'
import { pick } from '@/server/utils'
import { SearchQuery, SearchQuerySchema, SearchResult } from '@/types'

const embeddingCache = new QuickLRU<string, number[]>({
  maxSize: 4096
})

export default createAPIHandler<SearchQuery, never, SearchResult[]>(
  {
    methods: ['GET'],
    query: SearchQuerySchema
  },
  async function searchHandler(req, res, { query }) {
    const input = query.query
    const limit = query.limit ?? 25

    const inputL = input.toLowerCase().trim()
    let searchResults: SearchResult[] = []
    if (inputL) {
      // const tokens = inputL
      //   .split(/\s/)
      //   .map((token) => token.trim())
      //   .filter(Boolean)

      let inputEmbedding = embeddingCache.get(inputL)

      if (!inputEmbedding) {
        inputEmbedding = await createEmbedding({
          input
        })

        embeddingCache.set(inputL, inputEmbedding)
      }

      const results = await pinecone.query({
        vector: inputEmbedding,
        topK: limit,
        includeMetadata: true,
        includeValues: false
      })

      searchResults = results.matches.map((result) => {
        const searchResult = pick<Partial<SearchResult>>(
          result,
          'id',
          'score',
          'metadata'
        )

        // extract direct match highlights
        // let html = result.metadata.text
        // for (const token of tokens) {
        //   html = html
        //     .replaceAll(/\s+/g, ' ')
        //     .replaceAll(
        //       new RegExp(`\\b(${token})\\b`, 'ig'),
        //       `<span class="match">$1</span>`
        //     )
        // }
        // searchResult.matchedHtml = html

        return searchResult as SearchResult
      })
    }

    // add an extra long delay to accentuate any client-side swr cache misses
    // (for debugging purposes)
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 5000)
    // })

    if (!config.isDev) {
      res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
      )
    }

    return res.status(200).json(searchResults)
  }
)
