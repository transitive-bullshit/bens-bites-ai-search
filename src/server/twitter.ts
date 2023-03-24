import pMemoize from 'p-memoize'
import pThrottle from 'p-throttle'
import { type TweetLookupNoMapV1Params } from 'twitter-api-v2'

import * as types from './types'

/**
 * Returns the larger of two Twitter IDs, which is used in several places to
 * keep track of the most recent tweet we've seen or processed.
 */
export function maxTwitterId(tweetIdA?: string, tweetIdB?: string): string {
  if (!tweetIdA && !tweetIdB) {
    return null
  }

  if (!tweetIdA) {
    return tweetIdB
  }

  if (!tweetIdB) {
    return tweetIdA
  }

  if (tweetIdA.length < tweetIdB.length) {
    return tweetIdB
  } else if (tweetIdA.length > tweetIdB.length) {
    return tweetIdA
  }

  if (tweetIdA < tweetIdB) {
    return tweetIdB
  }

  return tweetIdA
}

/**
 * Returns the smaller of two Twitter IDs, which is used in several places to
 * keep track of the least recent tweet we've seen or processed.
 */
export function minTwitterId(tweetIdA?: string, tweetIdB?: string): string {
  if (!tweetIdA && !tweetIdB) {
    return null
  }

  if (!tweetIdA) {
    return tweetIdB
  }

  if (!tweetIdB) {
    return tweetIdA
  }

  if (tweetIdA.length < tweetIdB.length) {
    return tweetIdA
  } else if (tweetIdA.length > tweetIdB.length) {
    return tweetIdB
  }

  if (tweetIdA < tweetIdB) {
    return tweetIdA
  }

  return tweetIdB
}

/**
 * JS comparator function for comparing two Tweet IDs.
 */
export function tweetIdComparator(a: string, b: string): number {
  if (a === b) {
    return 0
  }

  const max = maxTwitterId(a, b)
  if (max === a) {
    return 1
  } else {
    return -1
  }
}

/**
 * JS comparator function for comparing two tweet-like objects.
 */
export function tweetComparator(
  tweetA: { id: string },
  tweetB: { id: string }
): number {
  const a = tweetA.id
  const b = tweetB.id
  return tweetIdComparator(a, b)
}

const getUserByIdThrottle = pThrottle({
  limit: 1,
  interval: 1000,
  strict: true
})

export const getUserById = pMemoize(getUserByIdThrottle(getUserByIdImpl))

async function getUserByIdImpl(
  userId: string,
  {
    twitterV1
  }: {
    twitterV1: types.TwitterClientV1
  }
) {
  const res = await twitterV1.users({ user_id: userId, skip_status: true })
  return res[0]
}

const getTweetsByIdsThrottle = pThrottle({
  limit: 1,
  interval: 1005,
  strict: true
})

export const getTweetsByIds = pMemoize(
  getTweetsByIdsThrottle(getTweetsByIdsImpl)
)

async function getTweetsByIdsImpl(
  tweetIds: string | string[],
  {
    twitterV1
  }: {
    twitterV1: types.TwitterClientV1
  } & TweetLookupNoMapV1Params
) {
  return twitterV1.tweets(tweetIds)
}
