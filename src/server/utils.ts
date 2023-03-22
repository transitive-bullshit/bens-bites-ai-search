import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import http from 'node:http'
import https from 'node:https'

import isRelativeUrl from 'is-relative-url'
import pMemoize from 'p-memoize'
import QuickLRU from 'quick-lru'

import * as types from './types'
import { domainAllowList, protocolAllowList } from './config'
import got from './got'

const lruLinkCache = new QuickLRU<string, string>({ maxSize: 10000 })
export const resolveLink = pMemoize(resolveLinkImpl, { cache: lruLinkCache })

export const agent = {
  http: new http.Agent(),
  https: new https.Agent({ rejectUnauthorized: false })
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

    if (depth >= 2) {
      return url
    }

    const parsedUrl = new URL(url)
    if (!protocolAllowList.has(parsedUrl.protocol)) {
      return url
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

export async function readJson<T = any>(filePath: string): Promise<T> {
  return JSON.parse(await fs.readFile(filePath, 'utf-8'))
}

export async function writeJson<T = any>(filePath: string, json: T) {
  return fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf-8')
}

export function pick<T extends object, U = T>(obj: T, ...keys: string[]): U {
  return Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]])
  ) as U
}

export function omit<T extends object, U = T>(obj: T, ...keys: string[]): U {
  return Object.fromEntries<T>(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  ) as U
}

export function hash(d: Buffer | string): string {
  const buffer = Buffer.isBuffer(d) ? d : Buffer.from(d.toString())
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

export function sanitizePineconeString(input: string): string {
  return input.replace(/[\ud800-\udfff]/g, '').trim()
}

export function getNewsletterLinkId(link: types.NewsletterLink): string {
  return `${link.postId}-${hash(link.url).slice(0, 16)}`
}
