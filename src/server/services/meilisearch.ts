import { MeiliSearch } from 'meilisearch'

export const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_URL,
  apiKey: process.env.MEILISEARCH_API_KEY
})
