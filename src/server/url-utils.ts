import http from 'node:http'
import https from 'node:https'

import isRelativeUrl from 'is-relative-url'
import normalizeUrlImpl from 'normalize-url'
import pMemoize from 'p-memoize'
import QuickLRU from 'quick-lru'

import { domainAllowList, protocolAllowList } from './config'
import got from './got'

const normalizedUrlCache = new QuickLRU<string, string>({ maxSize: 4000 })

const lruLinkCache = new QuickLRU<string, string>({ maxSize: 10000 })
export const resolveLink = pMemoize(resolveLinkImpl, { cache: lruLinkCache })

export const agent = {
  http: new http.Agent(),
  https: new https.Agent({ rejectUnauthorized: false })
}

export function normalizeUrl(url: string): string {
  let normalizedUrl: string

  try {
    if (!url || isRelativeUrl(url)) {
      return null
    }

    if (normalizedUrlCache.has(url)) {
      return normalizedUrlCache.get(url)
    }

    const parsedUrl = new URL(url)
    let stripWWW = false

    if (
      parsedUrl.hostname === 'twitter.com' ||
      parsedUrl.hostname === 'www.twitter.com'
    ) {
      parsedUrl.searchParams.delete('s')
      parsedUrl.searchParams.delete('t')
      url = parsedUrl.toString()
      stripWWW = true
    }

    if (!protocolAllowList.has(parsedUrl.protocol)) {
      return null
    }

    normalizedUrl = normalizeUrlImpl(url, {
      stripWWW,
      defaultProtocol: 'https',
      normalizeProtocol: true,
      forceHttps: true,
      stripHash: true,
      stripTextFragment: true,
      // removeQueryParameters: [/^utm_\w+/i, 'ref'],
      removeTrailingSlash: true,
      removeSingleSlash: true,
      removeExplicitPort: true,
      sortQueryParameters: true
    })
  } catch (err) {
    // ignore invalid urls
    normalizedUrl = null
  }

  normalizedUrlCache.set(url, normalizedUrl)
  return normalizedUrl
}

async function resolveLinkImpl(
  url: string,
  { baseUrl, depth = 0 }: { baseUrl?: string; depth?: number } = {}
) {
  try {
    if (isRelativeUrl(url)) {
      if (baseUrl) {
        url = new URL(url, baseUrl).toString()
      }

      return url
    }

    if (depth >= 8) {
      return url
    }

    const parsedUrl = new URL(url)
    if (!protocolAllowList.has(parsedUrl.protocol)) {
      return url
    }

    if (
      parsedUrl.hostname === 'www.google.com' ||
      parsedUrl.hostname === 'google.com'
    ) {
      if (parsedUrl.pathname === '/url') {
        const q = parsedUrl.searchParams.get('q')
        if (q) {
          const resolvedLink = await resolveLink(q, {
            baseUrl,
            depth: depth + 1
          })

          if (resolvedLink) {
            return resolvedLink
          }
        }
      }
    }

    if (
      parsedUrl.hostname === 'twitter.com' ||
      parsedUrl.hostname === 't.co' ||
      parsedUrl.hostname === 'www.twitter.com'
    ) {
      parsedUrl.searchParams.delete('s')
      parsedUrl.searchParams.delete('t')
      url = parsedUrl.toString()
    }

    if (!domainAllowList.has(parsedUrl.hostname)) {
      return url
    }

    const res = await got(url, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'user-agent': 'HTTPie/3.2.1'
      },
      agent,
      timeout: {
        request: 30000
      },
      followRedirect: false
    })

    const location = res.headers.location
    if (location) {
      const resolvedLink = await resolveLink(location, {
        baseUrl,
        depth: depth + 1
      })

      if (resolvedLink) {
        return resolvedLink
      }
    }

    return url
  } catch (err) {
    console.warn('error', url, err.toString(), err)
    // fallback to the original URL
    return url
  }
}
