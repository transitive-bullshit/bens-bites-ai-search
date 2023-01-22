import * as visitor from 'unist-util-visit'
import deburr from 'lodash.deburr'
import { toMarkdown } from 'mdast-util-to-markdown'
import { toString } from 'mdast-util-to-string'
import pMap from 'p-map'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { inspect } from 'unist-util-inspect'

import * as config from './config'
import * as types from './types'

type PineconePendingVector = {
  id: string
  input: string
  metadata: types.PineconeMetadata
}

export async function getEmbeddingsForPost({
  post,
  openai,
  model = config.openaiEmbeddingModel,
  concurrency = 4
}: {
  post: types.beehiiv.Post
  openai: types.OpenAIApi
  model?: string
  concurrency?: number
}) {
  const postId = post.id

  const pendingVectors: PineconePendingVector[] = []

  const ast = unified().use(remarkParse).parse(post.markdown)

  console.log(inspect(ast, { showPositions: false }))
  let vectorIndex = 0

  let prevHeading: {
    text: string
    markdown: string
  } = null

  visitor.visit(ast, (node, index) => {
    switch (node.type) {
      case 'paragraph':
      case 'heading': {
        const markdown = toMarkdown(node, {
          bullet: '-',
          fences: true,
          listItemIndent: 'one',
          rule: '-'
        })

        // deburr converts accents to non-accents
        // déjà vu => 'deja vu
        const text = deburr(
          toString(node)
            .trim()
            .replace(/\(link\)$/i, '')
        )
          // .normalize('NFD') // normalize diacritics (accents)
          // .replace(/[\u0300-\u036f]/g, '') // remove all accents
          .replace(/[^\x00-\x7F]/g, '') // remove all non-ascii characters
          .trim()
        if (!text) return

        const input =
          prevHeading && node.type !== 'heading'
            ? `${prevHeading.text}\n\n${text}`
            : text

        const vector: PineconePendingVector = {
          id: `${postId}:${vectorIndex++}`,
          input,
          metadata: {
            publicationId: post.publication_id,
            postTitle: post.web_title,
            postUrl: post.url,
            postId,
            markdown,
            text
          }
        }

        if (node.type === 'heading') {
          prevHeading = {
            text,
            markdown
          }
        }

        pendingVectors.push(vector)
        return [visitor.CONTINUE, index + 1]
      }

      default:
        break
    }
  })

  console.log(pendingVectors)

  // TODO
  return []

  // Evaluate all embeddings with a max concurrency
  // const vectors: types.PineconeCaptionVector[] = await pMap(
  //   pendingVectors,
  //   async (pendingVector) => {
  //     const { data: embed } = await openai.createEmbedding({
  //       input: pendingVector.input,
  //       model
  //     })

  //     const vector: types.PineconeCaptionVector = {
  //       id: pendingVector.id,
  //       metadata: pendingVector.metadata,
  //       values: embed.data[0].embedding
  //     }

  //     return vector
  //   },
  //   {
  //     concurrency
  //   }
  // )

  // return vectors
}
