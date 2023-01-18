import * as fs from 'node:fs/promises'
import path from 'node:path'

import rmfr from 'rmfr'

import * as beehiiv from '@/server/beehiiv'
import '@/server/config'

async function main() {
  const newsletterUrl = process.env.BEEHIIV_URL

  const newsletter = await beehiiv.resolveBeeHiivNewsletter(newsletterUrl)
  // console.log(newsletter)

  // const page = await beehiiv.resolveBeeHiivPost(
  //   'https://www.bensbites.co/p/microsoft-stepping-gear'
  // )

  const outDir = `fixtures/${newsletter.domain}`
  await rmfr(outDir)
  await fs.mkdir(outDir, { recursive: true })

  for (const post of newsletter.posts) {
    if (post.markdown) {
      const file = path.join(outDir, `${post.slug}.md`)
      await fs.writeFile(file, post.markdown, 'utf-8')
      delete post.markdown
    }
  }

  const newsletterFile = path.join(outDir, 'newsletter.json')
  await fs.writeFile(
    newsletterFile,
    JSON.stringify(newsletter, null, 2),
    'utf-8'
  )
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
