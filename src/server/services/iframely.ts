import pMemoize from 'p-memoize'
import QuickLRU from 'quick-lru'

import * as types from '../types'
import { protocolAllowList } from '../config'
import got from '../got'
import { pick } from '../utils'

const cache = new QuickLRU<string, types.LinkMetadata | null>({
  maxSize: 10000
})
export const getLinkMetadata = pMemoize(getLinkMetadataImpl, { cache })

async function getLinkMetadataImpl(
  url: string
): Promise<types.LinkMetadata | null> {
  try {
    const parsedUrl = new URL(url)
    if (!protocolAllowList.has(parsedUrl.protocol)) {
      return null
    }

    const res = (await got('https://iframe.ly/api/iframely', {
      searchParams: {
        url,
        api_key: process.env.IFRAMELY_API_KEY,
        media: '0'
      }
    }).json()) as any

    // console.log(JSON.stringify(res, null, 2))

    if (res?.meta) {
      const metadata: types.LinkMetadata = pick(
        res.meta,
        'title',
        'description',
        'site',
        'medium',
        'author',
        'category',
        'shortlink',
        'canonical',
        'date',
        'author_url'
      )

      if (typeof metadata.title === 'number') {
        metadata.title = (metadata.title as any).toString()
      }

      if (res.links?.icon?.length) {
        const images = res.links.icon as types.IFramelyImage[]
        const image =
          images.find((image) => image.type?.startsWith('image/svg')) ||
          images[0]

        if (image?.href) {
          metadata.icon = image.href.replace(/^view-source:/, '')
          metadata.iconWidth = image.media?.width
          metadata.iconHeight = image.media?.height
        }
      }

      if (res.links?.thumbnail?.length) {
        const images = res.links.thumbnail as types.IFramelyImage[]
        const image = images[0]

        if (image?.href) {
          metadata.thumbnail = image.href.replace(/^view-source:/, '')
          metadata.thumbnailWidth = image.media?.width
          metadata.thumbnailHeight = image.media?.height
        }
      }

      return metadata
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}
