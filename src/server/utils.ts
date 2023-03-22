import fs from 'node:fs/promises'
import http from 'node:http'
import https from 'node:https'

import * as visitor from 'unist-util-visit'
import isRelativeUrl from 'is-relative-url'
import deburr from 'lodash.deburr'
import type { Link, Root, Text } from 'mdast'
import { toMarkdown } from 'mdast-util-to-markdown'
import { toString } from 'mdast-util-to-string'
import pMap from 'p-map'
import pMemoize from 'p-memoize'
import QuickLRU from 'quick-lru'
import remarkInlineLinks from 'remark-inline-links'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

import * as types from './types'
import { protocolAllowList } from './config'
import got from './got'
import { getLinkMetadata } from './services/iframely'

// import { LinkMetadata, getLinkMetadata } from './metascraper'

const lruLinkCache = new QuickLRU<string, string>({ maxSize: 10000 })
export const resolveLink = pMemoize(resolveLinkImpl, { cache: lruLinkCache })
export const domainAllowList = new Set(['flight.beehiiv.net'])

export const agent = {
  http: new http.Agent(),
  https: new https.Agent({ rejectUnauthorized: false })
}

export interface NormalizeMarkdownOptions {
  baseUrl?: string
  concurrency?: number
}

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Link} Link
 */

export async function normalizeMarkdown(
  markdown: string,
  opts: NormalizeMarkdownOptions = {}
) {
  const output = await unified()
    .use(remarkParse)
    .use(remarkInlineLinks)
    .use(remarkResolveLinks, opts)
    .use(remarkStringify, {
      bullet: '-',
      fences: true,
      listItemIndent: 'one',
      rule: '-'
    })
    .process(markdown)

  return String(output)
}

/**
 * Plugin to resolve markdown links that may be redirects.
 *
 * @type {import('unified').Plugin<[Options?]], Root>}
 */
function remarkResolveLinks(opts: NormalizeMarkdownOptions = {}) {
  const { baseUrl, concurrency = 4 } = opts

  return async (tree: Root) => {
    const urlToNodeMap: Record<string, Link> = {}
    const urlToResolvedUrlMap: Record<string, string> = {}

    visitor.visit(tree, ['link'], (node, index, parent) => {
      if (node.type === 'link' && parent && typeof index === 'number') {
        urlToNodeMap[node.url] = node
      }
    })

    const urls = Object.keys(urlToNodeMap)

    await pMap(
      urls,
      async (url) => {
        try {
          const resolvedUrl = await resolveLink(url, { baseUrl })
          urlToResolvedUrlMap[url] = resolvedUrl
        } catch (err) {
          // ignore for now
        }
      },
      {
        concurrency
      }
    )

    visitor.visit(tree, ['link'], (node, index, parent) => {
      if (node.type === 'link' && parent && typeof index === 'number') {
        const resolvedUrl = urlToResolvedUrlMap[node.url]
        // console.log(node.url, resolvedUrl)

        if (resolvedUrl) {
          const replacement: Link = {
            type: 'link',
            url: resolvedUrl,
            title: node.title,
            children: node.children
          }

          parent.children[index] = replacement
        }
      }
    })
  }
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

export async function replaceMarkdownLinksWithMetadata(
  tree: Root,
  opts: NormalizeMarkdownOptions = {}
) {
  const { concurrency = 8 } = opts
  const urlToNodeMap: Record<string, Link> = {}
  const urlToMetadata = await resolveMarkdownLinksWithMetadata(tree, opts)

  visitor.visit(tree, ['link'], (node, index, parent) => {
    if (node.type === 'link' && parent && typeof index === 'number') {
      const metadata = urlToMetadata[node.url]
      // console.log(node.url, metadata)

      if (metadata) {
        const text = toString(node)
        const value = Array.from(
          new Set(
            [
              text,
              metadata.title,
              metadata.description,
              metadata.site
              // metadata.author,
              // metadata.publisher
            ]
              .map((value) => value?.trim())
              .filter(Boolean)
          )
        ).join(' ')

        const replacement: Text = {
          type: 'text',
          value
        }

        parent.children[index] = replacement
        return [visitor.CONTINUE, index + 1]
      }
    }
  })

  return tree
}

export async function resolveMarkdownLinksWithMetadata(
  tree: Root,
  opts: NormalizeMarkdownOptions = {}
) {
  const { concurrency = 8 } = opts
  const urlToNodeMap: Record<string, Link> = {}
  const urlToMetadata: Record<string, types.LinkMetadata> = {}

  visitor.visit(tree, ['link'], (node, index, parent) => {
    if (node.type === 'link' && parent && typeof index === 'number') {
      urlToNodeMap[node.url] = node
    }
  })

  const urls = Object.keys(urlToNodeMap)

  await pMap(
    urls,
    async (url) => {
      try {
        console.log('>>> metadata', url)
        const metadata = await getLinkMetadata(url)
        if (metadata) {
          const node = urlToNodeMap[url]
          const text = renderMarkdownNodeAsText(node)
          metadata.linkText = text
          urlToMetadata[url] = metadata
        }
        console.log('>>> metadata', url, metadata)
      } catch (err) {
        console.warn('error', url, err)
        // ignore for now
      }
    },
    {
      concurrency
    }
  )

  return urlToMetadata
}

export function renderMarkdownNodeAsMarkdown(node: any): string {
  return toMarkdown(node, {
    bullet: '-',
    fences: true,
    listItemIndent: 'one',
    rule: '-'
  })
}

export function renderMarkdownNodeAsText(node: any): string {
  // deburr converts accents to non-accents
  // déjà vu => deja vu
  const text = deburr(
    toString(node)
      .trim()
      .replace(/\(link\)$/i, '')
  )
    // .normalize('NFD') // normalize diacritics (accents)
    // .replace(/[\u0300-\u036f]/g, '') // remove all accents
    .replace(/[^\x00-\x7F]/g, '') // remove all non-ascii characters
    .trim()

  return text
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
