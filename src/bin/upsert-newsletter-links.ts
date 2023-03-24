import * as fs from 'node:fs/promises'

import pMap from 'p-map'
import papaparse from 'papaparse'

import * as config from '@/server/config'
import * as types from '@/server/types'
import * as utils from '@/server/utils'
import { createEmbedding } from '@/server/embedding'
import {
  fetchVectors,
  pinecone,
  upsertVectors
} from '@/server/services/pinecone'

async function main() {
  const force = !!process.env.FORCE

  const parsed = papaparse.parse(
    await fs.readFile(config.newsletterLinksPath, 'utf-8'),
    {
      header: true
    }
  )

  console.log('\npinecone', await pinecone.describeIndexStats(), '\n')

  const newsletterLinks: types.NewsletterLink[] = parsed.data
  let newNewsletterLinks: types.NewsletterLink[] = newsletterLinks

  if (force) {
    console.log(
      `DELETING ALL PINECONE VECTORS in the "${pinecone.namespace}" namespace`
    )
    await pinecone.delete({ deleteAll: true })
    console.log('\npinecone', await pinecone.describeIndexStats(), '\n')
  } else {
    const newsletterLinksMapById: Record<string, types.NewsletterLink> = {}
    for (const link of newsletterLinks) {
      if (!link.alive) continue
      const id = utils.getNewsletterLinkId(link)
      newsletterLinksMapById[id] = link
    }
    const newsletterLinkIds = Object.keys(newsletterLinksMapById)

    const existingVectors = await fetchVectors(newsletterLinkIds)
    const existingVectorsMapById: Record<string, types.PineconeVector> = {}
    for (const vector of existingVectors) {
      existingVectorsMapById[vector.id] = vector
    }
    newNewsletterLinks = newsletterLinkIds
      .map((id) =>
        existingVectorsMapById[id] ? null : newsletterLinksMapById[id]
      )
      .filter(Boolean)
  }

  console.log(
    '\nprocessing',
    newNewsletterLinks.length,
    'links',
    `(${newsletterLinks.length} total${force ? ' (force refresh)' : ''})`,
    '\n'
  )

  const vectors = (
    await pMap(
      newNewsletterLinks,
      async (link, index) => {
        if (!link.alive) return

        try {
          let desc = link.description
          const url = new URL(link.url)

          // TODO: more special casing for tweets since embedly produces some invalid tweet text with URLs smushed together
          if (url.hostname === 'twitter.com' || url.hostname === 't.co') {
            desc = desc?.replaceAll(/https:\/\/t.co\/\w+/g, ' ')
            desc = desc?.replaceAll(/https:\/\/pic.twitter.com\/\w+—?/g, ' ')
            desc = desc?.replaceAll(/pic.twitter.com\/\w+—?/g, ' ')
            // pic.twitter.com/IvPV3QHaxn—
          }

          const input = Array.from(
            new Set(
              [
                link.title,
                link.linkText?.trim().toLowerCase() === 'link'
                  ? ''
                  : link.linkText,
                link.author,
                link.site,
                desc
              ]
                .filter(Boolean)
                .map((s) => s.trim())
                .filter(Boolean)
            )
          )
            .join('\n\n')
            .trim()

          if (!input) {
            return
          }

          console.log(`${index}) ${link.url} "${link.title}"`)

          const id = utils.getNewsletterLinkId(link)
          const values = await createEmbedding({ input })

          const vector: types.PineconeVector = {
            id,
            values,
            metadata: {
              ...link,
              description: utils.sanitizePineconeString(link.description),
              linkText: utils.sanitizePineconeString(link.linkText),
              author: utils.sanitizePineconeString(link.author),
              site: utils.sanitizePineconeString(link.site),
              title: utils.sanitizePineconeString(link.title),
              postTitle: utils.sanitizePineconeString(link.postTitle)
            }
          }

          return vector
        } catch (err) {
          console.warn(
            'error processing link',
            link.url,
            `"${link.title}"`,
            err.toString()
          )
        }
      },
      {
        concurrency: 8
      }
    )
  ).filter(Boolean)

  await upsertVectors(vectors)
  console.log('\npinecone', await pinecone.describeIndexStats(), '\n')
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
