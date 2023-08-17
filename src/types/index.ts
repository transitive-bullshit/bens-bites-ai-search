import { z } from 'zod'

import type { PineconeMetadata } from '@/server/types'

export { PineconeMetadata }
export type SearchResult = PineconeMetadata & {
  id: string
}

export const SearchQuerySchema = z.object({
  query: z.string(),
  limit: z.coerce.number().nonnegative().int().min(1).max(100).optional()
})

export const SearchOptionsSchema = z.object({
  orderBy: z.string().optional()
})

export type SearchQuery = z.infer<typeof SearchQuerySchema>
export type ISearchOptions = z.infer<typeof SearchOptionsSchema>
