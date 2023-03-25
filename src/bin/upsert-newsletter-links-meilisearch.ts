import pMap from 'p-map'

import * as config from '@/server/config'
import * as types from '@/server/types'
import * as utils from '@/server/utils'
import { meilisearch } from '@/server/services/meilisearch'

async function main() {
  const force = !!process.env.FORCE
  const timeOutMs = 30000

  const newsletterLinks: types.NewsletterLink[] = await utils.readJson(
    config.newsletterLinksPath
  )
  let newNewsletterLinks: types.NewsletterLink[] = newsletterLinks.filter(
    (link) => !link.dead
  )

  for (const link of newNewsletterLinks) {
    const id = utils.getNewsletterLinkId(link)
    link.id = id
  }

  const meilisearchIndex = process.env.MEILISEARCH_INDEX
  let index: types.MeiliSearchIndex

  try {
    index = await meilisearch.getIndex(meilisearchIndex)
  } catch (err) {
    if (err.httpStatus !== 404) {
      throw err
    }

    console.log(`creating index "${meilisearchIndex}"`)
    const createIndexTask = await meilisearch.createIndex(meilisearchIndex, {
      primaryKey: 'id'
    })
    await meilisearch.waitForTask(createIndexTask.taskUid, {
      timeOutMs
    })

    console.log(`index "${meilisearchIndex}" created; updating settings`)
    index = await meilisearch.getIndex(meilisearchIndex)
  }

  if (force) {
    await index.updateSettings({
      searchableAttributes: [
        'title',
        'site',
        'author',
        'description',
        'linkText',
        'postTitle'
      ]
    })
  }

  console.log(
    `\nmeilisearch index "${index.uid}"`,
    await index.getStats(),
    '\n'
  )

  if (force) {
    console.log(
      `DELETING ALL MEILISEARCH DOCUMENTS in the "${index.uid}" index`
    )
    await index.deleteAllDocuments()
    console.log(
      `\nmeilisearch index "${index.uid}"`,
      await index.getStats(),
      '\n'
    )
  } else {
    const newsletterLinksMapById: Record<string, types.NewsletterLink> = {}
    for (const link of newsletterLinks) {
      if (link.dead) continue
      newsletterLinksMapById[link.id] = link
    }
    const newsletterLinkIds = Object.keys(newsletterLinksMapById)

    console.log(
      `cross-checking ${newsletterLinkIds.length} existing links from meilisearch...`
    )
    // TODO: this can be much more efficient
    await pMap(
      newsletterLinkIds,
      async (id) => {
        try {
          const document = await index.getDocument(id, { fields: ['id'] })
          if (document) {
            delete newsletterLinksMapById[id]
          }
        } catch (err) {}
      },
      { concurrency: 16 }
    )

    newNewsletterLinks = Object.values(newsletterLinksMapById)
  }

  if (!newNewsletterLinks.length) {
    console.log(
      '\nno new newsletter links to upsert',
      `(${newsletterLinks.length} total${force ? ' (force refresh)' : ''})`,
      '\n'
    )
  } else {
    console.log(
      '\nupserting',
      newNewsletterLinks.length,
      'links',
      `(${newsletterLinks.length} total${force ? ' (force refresh)' : ''})`,
      '\n',
      newNewsletterLinks.map((l) => l.url)
    )

    const tasks = await index.addDocumentsInBatches(newNewsletterLinks)
    console.log(
      `\nmeilisearch waiting for ${tasks.length} batch upsert tasks to complete...`
    )
    await index.waitForTasks(
      tasks.map((task) => task.taskUid),
      {
        timeOutMs
      }
    )
  }

  console.log(
    `\nmeilisearch index "${index.uid}"`,
    await index.getStats(),
    '\n'
  )
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
