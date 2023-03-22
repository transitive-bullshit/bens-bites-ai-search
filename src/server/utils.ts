import fs from 'node:fs/promises'
import http from 'node:http'
import https from 'node:https'

import isRelativeUrl from 'is-relative-url'
import pMemoize from 'p-memoize'
import QuickLRU from 'quick-lru'

import { protocolAllowList } from './config'
import got from './got'

const lruLinkCache = new QuickLRU<string, string>({ maxSize: 10000 })
export const resolveLink = pMemoize(resolveLinkImpl, { cache: lruLinkCache })
export const domainAllowList = new Set(['flight.beehiiv.net'])

export const agent = {
  http: new http.Agent(),
  https: new https.Agent({ rejectUnauthorized: false })
}

async function resolveLinkImpl(
  url: string,
  { baseUrl }: { baseUrl?: string } = {}
) {
  try {
    if (isRelativeUrl(url)) {
      if (baseUrl) {
        url = new URL(url, baseUrl).toString()
      }

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
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9'
      },
      agent,
      timeout: {
        request: 30000
      },
      followRedirect: false
    })

    return res.headers.location || url
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
