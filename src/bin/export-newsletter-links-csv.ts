import * as fs from 'node:fs/promises'

import papaparse from 'papaparse'

import * as config from '@/server/config'
import * as types from '@/server/types'
import * as utils from '@/server/utils'

async function main() {
  const urls: types.NewsletterLink[] = await utils.readJson(
    config.newsletterLinksPath
  )

  console.log(
    `writing ${urls.length} links to ${config.newsletterLinksCSVPath}\n`
  )

  await fs.writeFile(
    config.newsletterLinksCSVPath,
    papaparse.unparse(urls, {
      columns: [
        'linkText',
        'url',
        'title',
        'site',
        'description',
        'author',
        'category',
        'shortlink',
        'canonical',
        'date',
        'author_url',
        'thumbnail',
        'thumbnailWidth',
        'thumbnailHeight',
        'icon',
        'iconWidth',
        'iconHeight',
        'dead',
        'postTitle',
        'postDate',
        'postId',
        'postUrl'
      ]
    }),
    'utf-8'
  )
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
