import * as React from 'react'
import { InferGetStaticPropsType } from 'next'

import * as config from '@/lib/config'
import { Layout } from '@/components/Layout/Layout'
import { Markdown } from '@/components/Markdown/Markdown'
import { markdownToHtml } from '@/lib/markdown-to-html'

import styles from './styles.module.css'

const markdownContent = `
## About

This webapp is aimed at providing the best search experience for AI resources. It's works by extracting all of the curated links published daily in the [${config.newsletterTitle}](${config.newsletterUrl}), processing them, and making them searchable.

## Semantic Search

Semantic search is powered by [OpenAI's \`text-embedding-ada-002\` embedding model](https://platform.openai.com/docs/guides/embeddings/) and [Pinecone's hosted vector database](https://www.pinecone.io/).

## Keyword Search

Traditional keyword-based search is powered by [Meilisearch](https://www.meilisearch.com/).

## License

This webapp is [open source](${config.githubRepoUrl}). MIT © [${config.author}](${config.twitterUrl})

All link data is extracted from [${config.newsletterTitle}](${config.newsletterUrl}) and is licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).
`

export default function AboutPage({
  content
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className={styles.aboutPage}>
        <div className={styles.meta}>
          <h1 className={styles.title}>{config.title}</h1>
        </div>

        <Markdown content={content} />
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const content = await markdownToHtml(markdownContent)

  return {
    props: {
      content
    }
  }
}
