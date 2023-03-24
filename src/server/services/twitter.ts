import { TwitterApi } from 'twitter-api-v2'

import '../config'

const twitterApi = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_API_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_API_ACCESS_SECRET
})
const { v1: twitterV1 } = twitterApi
export { twitterV1 }
