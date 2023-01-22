import * as visitor from 'unist-util-visit'
import pMap from 'p-map'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { inspect } from 'unist-util-inspect'

import * as config from './config'
import * as types from './types'
import {
  renderMarkdownNodeAsMarkdown,
  renderMarkdownNodeAsText,
  replaceMarkdownLinksWithMetadata
} from './utils'

type PineconePendingVector = {
  id: string
  input: string
  metadata: types.PineconeMetadata
}

type PendingNode = {
  node: any
  markdown: string
  text: string
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

  const pendingNodes: PendingNode[] = []
  const pendingVectors: PineconePendingVector[] = []

  const ast = unified().use(remarkParse).parse(post.markdown)
  console.log(inspect(ast, { showPositions: false }))
  console.log()
  console.log()
  console.log()

  visitor.visit(ast, (node, index) => {
    switch (node.type) {
      case 'paragraph':
      case 'heading': {
        const markdown = renderMarkdownNodeAsMarkdown(node)
        const text = renderMarkdownNodeAsText(node)

        pendingNodes.push({
          node,
          markdown,
          text
        })

        return [visitor.CONTINUE, index + 1]
      }

      default:
        break
    }
  })

  await replaceMarkdownLinksWithMetadata(ast)
  console.log()
  console.log()
  console.log()

  console.log(inspect(ast, { showPositions: false }))

  let vectorIndex = 0
  let prevHeading: {
    text: string
    markdown: string
  } = null

  for (const pendingNode of pendingNodes) {
    const { markdown, node } = pendingNode
    // TODO: handle URLs

    const text = renderMarkdownNodeAsText(node)
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
        text: pendingNode.text
      }
    }

    if (node.type === 'heading') {
      prevHeading = {
        text,
        markdown
      }
    }

    pendingVectors.push(vector)
  }

  console.log(pendingVectors)
  return []

  // const vectors: types.PineconeVector[] = await pMap(
  //   pendingVectors,
  //   async (pendingVector) => {
  //     const { data: embed } = await openai.createEmbedding({
  //       input: pendingVector.input,
  //       model
  //     })

  //     const vector: types.PineconeVector = {
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
