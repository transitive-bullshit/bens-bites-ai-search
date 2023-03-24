import pMap from 'p-map'

import * as config from '@/server/config'
import * as types from '@/server/types'
import * as utils from '@/server/utils'

async function main() {
  const force = !!process.env.FORCE

  const newsletterLinks: types.NewsletterLink[] = await utils.readJson(
    config.newsletterLinksPath
  )
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
