import pMemoize from 'p-memoize'
import pRetry from 'p-retry'
import pThrottle from 'p-throttle'

import * as config from './config'
import { openai } from './services/openai'

// https://platform.openai.com/docs/guides/rate-limits/what-are-the-rate-limits-for-our-api
// TODO: enforce TPM
const throttleRPM = pThrottle({
  // 3k per minute instead of 3.5k per minute to add padding
  limit: 3000,
  interval: 60 * 1000,
  strict: true
})

export const createEmbedding = pMemoize(throttleRPM(createEmbeddingImpl))

async function createEmbeddingImpl({
  input,
  model = config.openaiEmbeddingModel,
  maxTokens = config.openaiEmbeddingModelMaxTokens
}: {
  input: string
  model?: string
  maxTokens?: number
}): Promise<number[]> {
  // TODO: enforce max tokens

  const res = await pRetry(
    () =>
      openai.createEmbedding({
        input,
        model
      }),
    {
      retries: 4,
      minTimeout: 1000,
      factor: 2.5
    }
  )

  return res.data.data[0].embedding
}
