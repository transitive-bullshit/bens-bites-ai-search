import http from 'node:http'
import https from 'node:https'

import ExpiryMap from 'expiry-map'
import isRelativeUrl from 'is-relative-url'
import type { Link, Root } from 'mdast'
import pMap from 'p-map'
import pMemoize from 'p-memoize'
import remarkInlineLinks from 'remark-inline-links'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

import got from './got'

const linkCache = new ExpiryMap(60 * 1000)
export const resolveLink = pMemoize(resolveLinkImpl, { cache: linkCache })
export const protocolAllowList = new Set(['https:', 'http:'])
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

    visit(tree, ['link'], (node, index, parent) => {
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

    visit(tree, ['link'], (node, index, parent) => {
      if (node.type === 'link' && parent && typeof index === 'number') {
        const resolvedUrl = urlToResolvedUrlMap[node.url]
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

    // TODO: test this
    return res.headers.location || url
  } catch (err) {
    console.warn('error', url, err.toString(), err)
    // fallback to the original URL
    return url
  }
}
