import delay from 'delay'
import pMap from 'p-map'
import invariant from 'tiny-invariant'
import type { TweetV1, UserV1 } from 'twitter-api-v2'

import * as types from './types'
import { getLinkMetadata } from './services/iframely'
import { getTweetsByIds, getUserById, tweetIdComparator } from './twitter'
import { normalizeUrl } from './url-utils'
import { omit, pick } from './utils'

const domainIgnoreList = new Set(['twitter.com', 'notion.so'])

export async function resolveTwitterData({
  tweetIds,
  usernames,
  twitterV1,
  resolvedTwitterData: partialResolvedTwitterData,
  force = false,
  resolveUrls = false
}: {
  tweetIds: string[]
  usernames: string[]
  twitterV1: types.TwitterClientV1
  resolvedTwitterData?: Partial<types.ResolvedTwitterData>
  force?: boolean
  resolveUrls?: boolean
}): Promise<types.ResolvedTwitterData> {
  partialResolvedTwitterData = {
    tweets: {},
    users: {},

    usernamesToIds: {},
    urls: {},

    ...partialResolvedTwitterData
  }

  const resolvedTwitterData =
    partialResolvedTwitterData as types.ResolvedTwitterData
  const oldNumTweets = Object.keys(resolvedTwitterData.tweets).length
  const oldNumUsers = Object.keys(resolvedTwitterData.users).length
  const oldNumUrls = Object.keys(resolvedTwitterData.urls).length

  const tweet_mode = 'extended'
  const include_entities = true
  const skip_status = true
  const include_ext_alt_text = true

  // Resolve all tweets
  {
    const missingTweetIds = force
      ? tweetIds
      : tweetIds.filter((id) => !resolvedTwitterData.tweets[id])

    const batchSize = 100
    const numTweetBatches = Math.ceil(missingTweetIds.length / batchSize)
    const tweetBatches: string[][] = []
    for (let i = 0; i < numTweetBatches; ++i) {
      const offset = i * batchSize
      tweetBatches.push(missingTweetIds.slice(offset, offset + batchSize))
    }

    for (const batch of tweetBatches) {
      const tweets = await getTweetsByIds(batch, {
        twitterV1,
        tweet_mode,
        include_entities,
        include_ext_alt_text
      })

      for (const tweet of tweets) {
        resolveTweet(tweet, { resolvedTwitterData })
      }
    }
  }

  // Resolve all missing users
  {
    const existingUsers = new Set<string>(
      Object.keys(resolvedTwitterData.usernamesToIds)
        .concat(
          Object.values(resolvedTwitterData.users).map((u) => u.screen_name)
        )
        .filter(Boolean)
    )
    const missingUsernames = usernames.filter(
      (username) => !existingUsers.has(username)
    )

    if (missingUsernames.length) {
      console.log(`fetching ${missingUsernames.length} missing users`)

      const batchSize = 100
      const numBatches = Math.ceil(missingUsernames.length / batchSize)
      const batches: string[][] = []
      for (let i = 0; i < numBatches; ++i) {
        const offset = i * batchSize
        batches.push(missingUsernames.slice(offset, offset + batchSize))
      }

      await pMap(
        batches,
        async (batch, index) => {
          console.log('getUsersByUsername', index, batch)

          const users = await twitterV1.users({
            screen_name: batch,
            include_entities,
            skip_status,
            tweet_mode
          })
          console.log('getUsersByUsername', index, '=>', users.length)

          for (const user of users) {
            resolveUser(user, { resolvedTwitterData })
          }

          await delay(1000)
        },
        {
          concurrency: 1
        }
      )
    }

    for (const userId of Object.keys(resolvedTwitterData.users)) {
      const user = resolvedTwitterData.users[userId]
      resolvedTwitterData.usernamesToIds[user.screen_name] = user.id_str
    }
  }

  // Resolve any URL entities for opengraph metadata
  if (resolveUrls) {
    // TODO: handle user entity URLs as well

    const tweetIds = Object.keys(resolvedTwitterData.tweets)

    function getUrlsInTweetById(
      tweetId: string,
      { depth = 0 }: { depth?: number } = {}
    ): string[] {
      const tweet = resolvedTwitterData.tweets[tweetId]
      let urls: string[] = []

      if (depth === 0) {
        invariant(tweet, `missing tweet ${tweetId}`)
      } else if (!tweet || depth >= 3) {
        return urls
      }

      if (tweet.entities?.urls) {
        urls = urls.concat(tweet.entities.urls.map((url) => url.expanded_url))
      }

      if (
        tweet.retweeted_status_id_str &&
        !resolvedTwitterData[tweet.retweeted_status_id_str]
      ) {
        urls = urls.concat(
          getUrlsInTweetById(tweet.retweeted_status_id_str, {
            depth: depth + 1
          })
        )
      }

      if (
        tweet.quoted_status_id_str &&
        !resolvedTwitterData[tweet.quoted_status_id_str]
      ) {
        urls = urls.concat(
          getUrlsInTweetById(tweet.quoted_status_id_str, {
            depth: depth + 1
          })
        )
      }

      return urls
    }

    const uniqueUrls = Array.from(
      new Set(
        tweetIds
          .flatMap((tweetId) => getUrlsInTweetById(tweetId))
          .map((url) => {
            const normalizedUrl = normalizeUrl(url)
            if (!normalizedUrl) return null

            try {
              const parsedUrl = new URL(normalizedUrl)
              if (domainIgnoreList.has(parsedUrl.hostname)) return null
            } catch (err) {
              return null
            }

            // if (normalizedUrl !== url) {
            //   console.log('normalizeUrl', index, url, '=>', normalizedUrl)
            // }
            return normalizedUrl
          })
          .filter(Boolean)
      )
    ).sort()

    const oldUniqueUrls = new Set(Object.keys(resolvedTwitterData.urls))

    const newUniqueUrls = force
      ? uniqueUrls
      : uniqueUrls.filter((url) => !oldUniqueUrls.has(url))

    if (newUniqueUrls.length) {
      console.log(
        `\nresolving opengraph metadata for ${newUniqueUrls.length} links...\n`
      )

      await pMap(
        newUniqueUrls,
        async (url, index) => {
          const metadata = await getLinkMetadata(url)
          console.log('getLinkMetadata', index, url, metadata)

          if (metadata) {
            resolvedTwitterData.urls[url] = metadata
          } else {
            resolvedTwitterData.urls[url] = {}
          }
        },
        {
          concurrency: 32
        }
      )
    }
  }

  const numTweets = Object.keys(resolvedTwitterData.tweets).length
  const numUsers = Object.keys(resolvedTwitterData.users).length
  const numUrls = Object.keys(resolvedTwitterData.urls).length

  console.log({
    numTweets:
      oldNumTweets === numTweets ? numTweets : `${oldNumTweets} ⇒ ${numTweets}`,
    numUsers:
      oldNumUsers === numUsers ? numUsers : `${oldNumUsers} ⇒ ${numUsers}`,
    numUrls: oldNumUrls === numUrls ? numUrls : `${oldNumUrls} ⇒ ${numUrls}`
  })

  return resolvedTwitterData
}

function resolveTweet(
  tweetV1: TweetV1,
  { resolvedTwitterData }: { resolvedTwitterData: types.ResolvedTwitterData }
) {
  // const tweet = tweetV1 as types.TweetV1Ext
  const tweet = omit<TweetV1, types.TweetV1Ext>(
    tweetV1,
    'user',
    'quoted_status',
    'retweeted_status',
    'id',
    'source',
    'favorited',
    'retweeted',
    'contributors',
    'place',
    'geo',
    'coordinates',
    'truncated',
    'in_reply_to_status_id',
    'in_reply_to_user_id'
  )

  if (!tweet?.id_str) {
    return
  }

  if (tweet.entities) {
    if (!tweet.entities.hashtags?.length) {
      delete tweet.entities.hashtags
    }
    if (!tweet.entities.media?.length) {
      delete tweet.entities.media
    } else {
      tweet.entities.media = tweet.entities.media.map((media) =>
        pick(
          media,
          'id_str',
          'indices',
          'type',
          'expanded_url',
          'ext_alt_text',
          'media_url_https'
        )
      )
    }
    if (!tweet.entities.polls?.length) {
      delete tweet.entities.polls
    }
    if (!tweet.entities.urls?.length) {
      delete tweet.entities.urls
    }
    if (!tweet.entities.user_mentions?.length) {
      delete tweet.entities.user_mentions
    }
  }

  if (tweet.extended_entities?.media) {
    tweet.extended_entities.media = tweet.extended_entities.media.map((media) =>
      pick(
        media,
        'id_str',
        'type',
        'expanded_url',
        'ext_alt_text',
        'video_info'
      )
    )
  }

  if (tweetV1.quoted_status) {
    tweet.quoted_status_id_str = tweetV1.quoted_status.id_str
    resolveTweet(tweetV1.quoted_status, { resolvedTwitterData })
  }

  if (tweetV1.retweeted_status) {
    tweet.retweeted_status_id_str = tweetV1.retweeted_status.id_str
    resolveTweet(tweetV1.retweeted_status, { resolvedTwitterData })
  }

  if (tweetV1.user) {
    tweet.user_id_str = tweetV1.user.id_str
    resolveUser(tweetV1.user, { resolvedTwitterData })
  }

  resolvedTwitterData.tweets[tweet.id_str] = tweet
  return tweet
}

function resolveUser(
  userV1: UserV1,
  { resolvedTwitterData }: { resolvedTwitterData: types.ResolvedTwitterData }
) {
  if (!userV1?.id_str) {
    return
  }

  const user = omit<UserV1, types.UserV1Ext>(
    userV1,
    'id',
    'utc_offset',
    'status',
    'contributors_enabled',
    'is_translator',
    'is_translation_enabled',
    'profile_background_color',
    'profile_background_image_url',
    'profile_background_tile',
    'profile_image_url',
    'profile_image_extensions_alt_text',
    'profile_banner_extensions_alt_text',
    'profile_link_color',
    'profile_sidebar_border_color',
    'profile_sidebar_fill_color',
    'profile_text_color',
    'profile_use_background_image',
    'has_extended_profile',
    'default_profile',
    'default_profile_image',
    'following',
    'follow_request_sent',
    'notifications',
    'translator_type',
    'withheld_in_countries',
    'needs_phone_verification'
  )

  resolvedTwitterData.users[user.id_str] = user
  return user
}
