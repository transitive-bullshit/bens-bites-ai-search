import * as fs from 'node:fs/promises'
import path from 'node:path'

import { Storage } from '@google-cloud/storage'
import pMap from 'p-map'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

import * as config from '@/server/config'
import * as markdown from '@/server/markdown'
import * as types from '@/server/types'
import * as utils from '@/server/utils'
import got from '@/server/got'
import { resolveTwitterData } from '@/server/resolve-twitter-data'
import { twitterV1 } from '@/server/services/twitter'
import { getThumbnailForUrl } from '@/server/thumbnails'
import { unfurlTweet } from '@/server/unfurl-tweet'
import { getImageSize } from '@/server/url-utils'

async function main() {
  const force = !!process.env.FORCE
  const noop = !!process.env.NOOP

  const newsletter: types.beehiiv.Newsletter = JSON.parse(
    await fs.readFile(config.newsletterMetadataPath, 'utf-8')
  )
  let existingTwitterData: types.ResolvedTwitterData

  const newsletterLinkMap: types.NewsletterLinkMap = {}
  const newsletterLinkMapNew: types.NewsletterLinkMap = {}

  const storage = new Storage()
  const bucket = process.env.GOOGLE_STORAGE_BUCKET

  if (!force) {
    try {
      const newsletterLinks: types.NewsletterLink[] = await utils.readJson(
        config.newsletterLinksPath
      )

      for (const link of newsletterLinks) {
        if (link.url) {
          newsletterLinkMap[link.url] = link
        }
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err
      }

      console.warn('warning unable to read newsletter link cache')
    }

    try {
      existingTwitterData = await utils.readJson(config.twitterDataCachePath)
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err
      }

      console.warn('warning unable to read twitter cache')
    }
  }

  const newsletterLinkMapOld: types.NewsletterLinkMap = { ...newsletterLinkMap }

  const posts = await pMap(
    newsletter.posts,
    async (post) => {
      const postPath = path.join(config.newsletterDir, `${post.slug}.md`)
      const markdown = await fs.readFile(postPath, 'utf-8')
      post.markdown = markdown
      return post
    },
    {
      concurrency: 8
    }
  )
  // great for debugging a single post
  // .slice(0, 1)

  console.log(
    '\nprocessing',
    posts.length,
    'posts',
    `(${Object.keys(newsletterLinkMap).length} cached links)\n`
  )

  await pMap(
    posts,
    async (post) => {
      try {
        console.log('processing post', post.url, `"${post.web_title}"`)

        const ast = unified().use(remarkParse).parse(post.markdown)

        const urlToMetadata = await markdown.resolveMarkdownLinksWithMetadata(
          ast,
          {
            noop,
            isValidLink: (url: string) => {
              if (!url) return false
              if (!force && newsletterLinkMap[url]) {
                delete newsletterLinkMapOld[url]
                return false
              }

              try {
                const parsedUrl = new URL(url)
                if (!config.protocolAllowList.has(parsedUrl.protocol)) {
                  return false
                }

                if (/bensbites/i.test(parsedUrl.hostname)) {
                  return false
                }

                if (
                  parsedUrl.hostname === 'twitter.com' &&
                  parsedUrl.pathname.startsWith('/intent')
                ) {
                  return false
                }

                return true
              } catch (err) {
                return false
              }
            }
          }
        )

        const numLinks = Object.keys(urlToMetadata).length
        if (numLinks <= 0) return

        console.log(
          'post',
          post.url,
          `"${post.web_title}"`,
          'found',
          numLinks,
          'new links'
        )

        for (const url of Object.keys(urlToMetadata)) {
          const metadata = urlToMetadata[url]

          const link = {
            ...metadata,
            url,
            postTitle: post.web_title,
            postDate: post.created_at,
            postId: post.id,
            postUrl: post.url,
            dead: !metadata
          }

          newsletterLinkMap[url] = link
          newsletterLinkMapNew[url] = link
        }
      } catch (err) {
        console.warn(
          'error processing post',
          post.url,
          `"${post.web_title}"`,
          err
        )
      }
    },
    {
      concurrency: 4
    }
  )

  if (!force) {
    const oldLinks = Object.keys(newsletterLinkMapOld)
    if (oldLinks.length > 0) {
      console.log('\nremoving old links', oldLinks.length, '\n')

      for (const url of oldLinks) {
        console.log('removing old link', url)
        delete newsletterLinkMap[url]
      }

      console.log('\nremoved old links', oldLinks.length, '\n')
    } else {
      console.log('\nno outdated links found\n')
    }
  }

  function linkComparator(a: types.NewsletterLink, b: types.NewsletterLink) {
    const diff = new Date(a.postDate).getTime() - new Date(b.postDate).getTime()
    if (diff) {
      return diff
    }

    return a.url.localeCompare(b.url)
  }

  const urls = Object.values(newsletterLinkMap).sort(linkComparator)
  const newUrls = Object.values(newsletterLinkMapNew).sort(linkComparator)

  console.log(
    '\n\n\n\nfound',
    newUrls.length,
    'new links',
    `(${urls.length} total)\n\n\n\n`
  )

  // resolve twitter links
  const twitterUsernames: Record<string, string[]> = {}
  const tweetIds: Record<string, string[]> = {}
  for (const url of newUrls) {
    if (url.dead) continue
    const parsedUrl = new URL(url.url)
    if (parsedUrl.hostname !== 'twitter.com') {
      continue
    }

    const usernameM = parsedUrl.pathname.match(/^\/([a-zA-Z0-9_]+)\/?$/)
    if (usernameM) {
      if (!twitterUsernames[usernameM[1]]) {
        twitterUsernames[usernameM[1]] = []
      }
      twitterUsernames[usernameM[1]].push(url.url)
      continue
    }

    const tweetM = parsedUrl.pathname.match(
      /^\/([a-zA-Z0-9_]+)\/status\/(\d+)$/
    )
    if (tweetM) {
      // if (!twitterUsernames[tweetM[1]]) {
      //   twitterUsernames[tweetM[1]] = []
      // }
      // twitterUsernames[tweetM[1]].push(url.url)

      if (!tweetIds[tweetM[2]]) {
        tweetIds[tweetM[2]] = []
      }
      tweetIds[tweetM[2]].push(url.url)
      continue
    }
  }

  console.log('resolving twitter links', {
    twitterUsernames: Object.keys(twitterUsernames).length,
    tweetIds: Object.keys(tweetIds).length
  })

  console.log(`\nresolving twitter data...${force ? ' (force refresh)' : ''}\n`)
  const resolvedTwitterData = await resolveTwitterData({
    tweetIds: Object.keys(tweetIds),
    usernames: Object.keys(twitterUsernames),
    twitterV1,
    resolvedTwitterData: existingTwitterData,
    resolveUrls: true,
    force
  })
  await utils.writeJson(config.twitterDataCachePath, resolvedTwitterData)

  // update all twitter user profile links
  for (const username of Object.keys(twitterUsernames)) {
    const userId = resolvedTwitterData.usernamesToIds[username]
    if (!userId) continue

    const user = resolvedTwitterData.users[userId]
    if (!user) continue

    const linkedUrls = twitterUsernames[username]
    for (const linkedUrl of linkedUrls) {
      const newsletterLink = urls.find((link) => link.url === linkedUrl)
      if (!newsletterLink) continue

      if (!user) {
        // user is missing or deleted
        newsletterLink.dead = true
        continue
      }

      newsletterLink.author = user.screen_name
      newsletterLink.icon = user.profile_image_url_https
      newsletterLink.title = user.name
      newsletterLink.iconWidth = 48
      newsletterLink.iconHeight = 48
      newsletterLink.thumbnail = user.profile_banner_url
      newsletterLink.thumbnailWidth = 1500
      newsletterLink.thumbnailHeight = 500
      newsletterLink.description = user.description

      // console.log({
      //   url: linkedUrl,
      //   user,
      //   newsletterLink
      // })
    }
  }

  // update all twitter links
  for (const tweetId of Object.keys(tweetIds)) {
    const tweet = resolvedTwitterData.tweets[tweetId]

    // const user = resolvedTwitterData.users[tweet.user_id_str]

    const linkedUrls = tweetIds[tweetId]
    for (const linkedUrl of linkedUrls) {
      const newsletterLink = urls.find((link) => link.url === linkedUrl)
      if (!newsletterLink) {
        continue
      }

      if (!tweet) {
        // tweet is missing or deleted
        newsletterLink.dead = true
        continue
      }

      newsletterLink.description = unfurlTweet(tweet, {
        resolvedTwitterData,
        maxUnfurledUrlLength: 500
      })
      newsletterLink.date = tweet.created_at

      // console.log({
      //   url: linkedUrl,
      //   tweet,
      //   newsletterLink
      // })
    }
  }

  // let maxUrl: types.NewsletterLink = null
  for (const url of urls) {
    // limit max description length
    url.description = url.description?.slice(0, 1000).trim()

    // if (
    //   !maxUrl?.description ||
    //   (url.description && maxUrl.description.length < url.description.length)
    // ) {
    //   maxUrl = url
    // }
  }

  console.log(
    `\nchecking ${urls.length} preview images...${
      force ? ' (force refresh)' : ''
    }\n`
  )
  await pMap(
    urls,
    async (url, index) => {
      if (url.dead) {
        return
      }

      const parsedUrl = new URL(url.url)
      if (
        parsedUrl.hostname === 'twitter.com' ||
        parsedUrl.pathname.endsWith('.pdf')
      ) {
        return
      }

      if (url.thumbnail) {
        try {
          const res = await getImageSize(url.thumbnail)
          console.log(`${index}) found thumbnail`, url.thumbnail)

          url.thumbnailWidth = res.width
          url.thumbnailHeight = res.height
          return
        } catch (err) {
          console.warn(
            `${index}) warning invalid thumbnail probe`,
            url.thumbnail,
            err.toString()
          )
        }
      }

      const id = utils.getNewsletterLinkId(url)
      const name = `${id}.jpg`
      const storageUrl = `https://storage.googleapis.com/${bucket}/${name}`
      let needsPreviewImage = false

      try {
        await got.head(storageUrl, {
          timeout: {
            request: 10000
          }
        })
        console.log(`${index}) found generated thumbnail`, storageUrl)
      } catch (err) {
        if (err.response?.statusCode === 404) {
          needsPreviewImage = true
        }
      }

      if (needsPreviewImage) {
        console.log(`${index}) generating thumbnail for ${url.url}`)
        try {
          const res = await getThumbnailForUrl({
            url: url.url,
            storageUrl,
            storage,
            bucket,
            timeoutMs: 15000
          })
          console.log(`${index}) >>> ${res}`)
          url.thumbnail = res
          url.thumbnailWidth = 1200
          url.thumbnailHeight = 630
        } catch (err) {
          url.dead = true

          console.warn(
            `${index}) error taking screenshot`,
            url.url,
            err.toString()
          )
        }
      }
    },
    {
      concurrency: 16
    }
  )

  console.log(`\ndone checking ${urls.length} preview images...\n`)

  if (noop) {
    console.log(`\nnoop, not writing ${config.newsletterLinksPath}\n`)
    return
  }
  // console.log(JSON.stringify(newUrls, null, 2))

  console.log(`writing ${urls.length} links to ${config.newsletterLinksPath}\n`)

  await utils.writeJson(config.newsletterLinksPath, urls)
  process.exit(0)
}

main().catch((err) => {
  console.error('error', err)
  process.exit(1)
})
