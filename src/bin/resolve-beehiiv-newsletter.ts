import * as fs from 'node:fs/promises'
import path from 'node:path'

import pMap from 'p-map'
import rmfr from 'rmfr'

import * as beehiiv from '@/server/beehiiv'
import * as config from '@/server/config'
import * as types from '@/server/types'

async function main() {
  const force = !!process.env.FORCE

  let existingNewsletter: types.beehiiv.Newsletter

  if (!force) {
    try {
      existingNewsletter = JSON.parse(
        await fs.readFile(config.newsletterMetadataPath, 'utf-8')
      )

      const posts = await pMap(
        existingNewsletter.posts,
        async (post) => {
          const postPath = path.join(config.newsletterDir, `${post.slug}.md`)
          const markdown = await fs.readFile(postPath, 'utf-8')
          post.markdown = markdown
          return post
        },
        {
          concurrency: 8
        }
      )
    } catch (err) {
      console.warn('warning unable to read newsletter cache', err.toString())
    }
  }

  const newsletter = await beehiiv.resolveBeeHiivNewsletter(
    config.newsletterUrl,
    {
      newsletter: existingNewsletter
    }
  )

  const outDir = config.newsletterDir
  if (force) {
    await rmfr(outDir)
  }
  await fs.mkdir(outDir, { recursive: true })

  for (const post of newsletter.posts) {
    if (post.markdown) {
      const file = path.join(outDir, `${post.slug}.md`)
      await fs.writeFile(file, post.markdown, 'utf-8')
      delete post.markdown
    }
  }

  await fs.writeFile(
    config.newsletterMetadataPath,
    JSON.stringify(newsletter, null, 2),
    'utf-8'
  )
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
