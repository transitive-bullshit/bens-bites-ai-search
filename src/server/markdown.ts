import * as visitor from 'unist-util-visit'
import deburr from 'lodash.deburr'
import type { Link, Root, Text } from 'mdast'
import { toMarkdown } from 'mdast-util-to-markdown'
import { toString } from 'mdast-util-to-string'
import pMap from 'p-map'
import remarkInlineLinks from 'remark-inline-links'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

import * as types from './types'
import * as urlUtils from './url-utils'
import { getLinkMetadata } from './services/iframely'

export interface NormalizeMarkdownOptions {
  baseUrl?: string
  concurrency?: number
  noop?: boolean
  isValidLink?: (url: string) => boolean
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
          const resolvedUrl = await urlUtils.resolveLink(url, { baseUrl })
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

export async function replaceMarkdownLinksWithMetadata(
  tree: Root,
  opts: NormalizeMarkdownOptions = {}
) {
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
  const { concurrency = 8, isValidLink, noop = false } = opts
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
        url = urlUtils.normalizeUrl(url)
        if (!url) {
          return
        }

        if (isValidLink && !isValidLink(url)) {
          return
        }

        const metadata = noop ? {} : await getLinkMetadata(url)
        if (metadata) {
          const node = urlToNodeMap[url]
          const text = renderMarkdownNodeAsText(node)
          metadata.linkText = text
          urlToMetadata[url] = metadata
          console.log('metadata', url, metadata)
        } else {
          urlToMetadata[url] = null
        }
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
