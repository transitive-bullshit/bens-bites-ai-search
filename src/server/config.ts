import path from 'node:path'

import dotenv from 'dotenv-safe'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  // openai
  OPENAI_API_KEY: z.string().min(1),

  // pinecone
  PINECONE_API_KEY: z.string().min(1),
  PINECONE_BASE_URL: z.string().url(),
  PINECONE_NAMESPACE: z.string().min(1)
})

// ensure that all required env variables are defined
const env = envSchema.safeParse(process.env)

if (env.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(env.error.format(), null, 4)
  )

  process.exit(1)
}

export const openaiEmbeddingModel = 'text-embedding-ada-002'
export const openaiEmbeddingModelMaxTokens = 8191
export const protocolAllowList = new Set(['https:', 'http:'])
export const domainAllowList = new Set(['flight.beehiiv.net', 't.co'])

export const newsletterUrl = process.env.BEEHIIV_URL
export const newsletterParsedUrl = new URL(newsletterUrl)
export const newsletterHostname = newsletterParsedUrl.hostname
export const newsletterDir = path.join('fixtures', newsletterHostname)
export const newsletterMetadataPath = path.join(
  newsletterDir,
  'newsletter.json'
)
export const newsletterLinksCSVPath = path.join(newsletterDir, 'links.csv')
export const newsletterLinksPath = path.join(newsletterDir, 'links.json')
export const twitterDataCachePath = path.join(newsletterDir, 'twitter.json')

export default env
