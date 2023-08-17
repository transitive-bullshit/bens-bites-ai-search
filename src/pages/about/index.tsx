import * as React from 'react'
import { InferGetStaticPropsType } from 'next'

import * as config from '@/lib/config'
import { Layout } from '@/components/Layout/Layout'
import { Markdown } from '@/components/Markdown/Markdown'
import { markdownToHtml } from '@/lib/markdown-to-html'

import styles from './styles.module.css'

const markdownContent = `
## About

The goal of this app is to provide a highly curated search for staying up-to-date with the latest AI resources and news.

All search results are extracted from [${config.newsletterTitle}](${config.newsletterUrl}), which is used as a highly curated data source.

## How it works

A cron job is run every 24 hours to update the database.

The steps involved include:

1. Crawling the source [Beehiiv newsletter](${config.newsletterUrl})
2. Converting each post to markdown
3. Extracting and resolving unique links
4. Fetching opengraph metadata for each link
5. Fetching provider-specific metadata for some links (e.g. tweet text)
6. Generating vector embeddings for each link using OpenAI
7. Upserting all links into a Pinecone vector database

We're using [IFramely](https://iframely.com/) to extract opengraph metadata for each link, and we also special-case tweet links to extract the tweet text.

Once we have all of the links locally, we upsert them into a [Pinecone](https://www.pinecone.io/) vector database for semantic search.

### Semantic Search

Semantic search is powered by [OpenAI's \`text-embedding-ada-002\` embedding model](https://platform.openai.com/docs/guides/embeddings/) and [Pinecone's hosted vector database](https://www.pinecone.io/).

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
