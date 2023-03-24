import { htmlUnescape } from 'escape-goat'
import { parse } from 'twemoji-parser'

import * as types from './types'
import './config'
import { normalizeUrl } from './url-utils'

export function unfurlTweet(
  tweet: types.TweetV1Ext,
  opts: {
    resolvedTwitterData?: types.ResolvedTwitterData
    unfurlUrls?: boolean
    unfurlSubtweets?: boolean
  } = {}
): string {
  const {
    resolvedTwitterData,
    unfurlUrls = true,
    unfurlSubtweets = true
  } = opts
  const tweetIdRegex = /\/status\/(\d+)$/
  let text = tweet.full_text

  // console.log('unfurlTweet', tweet.id_str)
  const emojis = parse(text).reverse()

  const entities = [
    tweet.entities.urls?.map((url) => ({ ...url, source: 'url' })),
    tweet.entities.media?.map((media) => ({ ...media, source: 'media' }))
  ]
    .filter(Boolean)
    .flat()
    .sort((a, b) => b.indices[0] - a.indices[0])

  if (entities.length) {
    text = entities.reduce((status, entity) => {
      let index0 = entity.indices[0] >= 0 ? entity.indices[0] : 0
      let index1 = entity.indices[1]

      for (const emoji of emojis) {
        const { indices } = emoji
        const diff = Math.max(0, indices[1] - indices[0] - 1)

        if (diff <= 0) {
          continue
        }

        if (index0 >= emoji.indices[0]) {
          index0 += diff
        }
        if (index1 >= emoji.indices[0]) {
          index1 += diff
        }
      }

      const prefix = status.substring(0, index0)
      const suffix = status.substring(index1)

      const expandedUrl = entity.expanded_url
      let body = ''

      if (entity.source === 'url') {
        body = expandedUrl

        const tweetIdMatch = expandedUrl.match(tweetIdRegex)
        if (tweetIdMatch) {
          const subTweetId = tweetIdMatch[1]
          const subTweet =
            subTweetId === tweet.id_str
              ? null
              : resolvedTwitterData?.tweets[subTweetId]

          if (subTweet && unfurlSubtweets) {
            if (tweet.quoted_status_id_str === subTweetId) {
              body = `${unfurlTweet(subTweet, opts)}`
            } else if (tweet.retweeted_status_id_str === subTweetId) {
              body = `RT ${unfurlTweet(subTweet, opts)}`
            } else {
              body = `${unfurlTweet(subTweet, opts)}`
            }
          } else {
            // if we can't find the tweet, remove the URL
            body = ''
          }
        } else if (unfurlUrls) {
          // Replace the URL with its opengraph metadata for other URLs
          body = unfurlUrl(expandedUrl, { resolvedTwitterData })
        }
      } else if (entity.source === 'media') {
        const id = (entity as any).id_str
        const expandedMediaEntity = tweet.extended_entities?.media?.find(
          (media) => media.id_str === id
        )
        if (expandedMediaEntity?.ext_alt_text) {
          // replace media with alt text
          body = expandedMediaEntity.ext_alt_text
        } else {
          // TODO
        }
      }

      return `${prefix}${body}${suffix}`
    }, text)
  }

  text = text.substring(tweet.display_text_range[0])
  // text = text.replace(/[\ud800-\udfff]/g, '')
  text = htmlUnescape(text).trim()

  return text
}

export function unfurlUrl(
  url: string,
  {
    resolvedTwitterData,
    fallback = url
  }: { resolvedTwitterData?: types.ResolvedTwitterData; fallback?: string } = {}
): string {
  if (!url) return fallback
  if (!resolvedTwitterData) return fallback

  const metadata =
    resolvedTwitterData.urls[url] || resolvedTwitterData.urls[normalizeUrl(url)]
  if (!metadata) return fallback

  const site = metadata.site?.toLowerCase()
  if (site === 'github') {
    return metadata.title
  }

  let values = [metadata.title, metadata.description]
  if (
    site &&
    !values.some((t) =>
      (t ? t.toString() : '').toLowerCase().includes(site.toLowerCase())
    )
  ) {
    values = [metadata.site].concat(values)
  }

  const value = Array.from(
    new Set(values.map((value) => value?.toString().trim()).filter(Boolean))
  ).join(' - ')

  if (!value) {
    return fallback
  }

  return value
}
