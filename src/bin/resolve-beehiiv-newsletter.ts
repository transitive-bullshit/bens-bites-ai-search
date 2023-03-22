import * as fs from 'node:fs/promises'
import path from 'node:path'

import rmfr from 'rmfr'

import * as beehiiv from '@/server/beehiiv'
import * as config from '@/server/config'

async function main() {
  // const url = 'https://t.co/9gy192Ct5d'
  // await resolveLink(url)
  // return

  // const page = await beehiiv.resolveBeeHiivPostContent(
  //   'https://www.bensbites.co/p/wordle-prompts',
  //   //   'https://www.bensbites.co/p/microsoft-stepping-gear',
  //   { baseUrl: config.newsletterUrl }
  // )
  // console.log(page)
  // return

  const newsletter = await beehiiv.resolveBeeHiivNewsletter(
    config.newsletterUrl
  )

  const outDir = config.newsletterDir
  await rmfr(outDir)
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
