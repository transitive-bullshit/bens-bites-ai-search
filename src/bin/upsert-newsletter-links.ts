import * as fs from 'node:fs/promises'

import pMap from 'p-map'
import papaparse from 'papaparse'

import * as config from '@/server/config'
import * as types from '@/server/types'

async function main() {
  const parsed = papaparse.parse(
    await fs.readFile(config.newsletterLinksPath, 'utf-8'),
    {
      header: true
    }
  )
  const newsletterLinks: types.NewsletterLink[] = parsed.data

  console.log('\nprocessing', newsletterLinks.length, 'links\n')

  await pMap(
    newsletterLinks,
    async (link) => {
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

        if (
          link.url ===
          'https://twitter.com/alonsorobots/status/1587913514210840576?s=12&t=_ejXXak9WwXSFjlt1Tlb-Q'
        ) {
          console.log('NALAAAAAAA', { link, desc })
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
        ).join('\n\n')

        console.log({ url: link.url, input })
        console.log()
      } catch (err) {
        console.warn('error processing link', link.url, `"${link.title}"`, err)
      }
    },
    {
      concurrency: 1
    }
  )
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
