<a href="https://search.bensbites.co">
  <img alt="Ben's Bites" src="/public/social.jpg">
</a>

<h1 align="center">Ben's Bites Link Search</h1>

<p align="center">
  Search across all of the AI-related links in the <a href="https://www.bensbites.co">Ben's Bites</a> newsletter – using AI-powered semantic search.
</p>

<p align="center">
  <a href="https://github.com/transitive-bullshit/bens-bites-ai-search/actions/workflows/test.yml"><img alt="Build Status" src="https://github.com/transitive-bullshit/bens-bites-ai-search/actions/workflows/test.yml/badge.svg" /></a>
  <a href="https://github.com/transitive-bullshit/bens-bites-ai-search/blob/main/license"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue" /></a>
  <a href="https://prettier.io"><img alt="Prettier Code Formatting" src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg" /></a>
</p>

- [Intro](#intro)
- [How it works](#how-it-works)
  - [Semantic Search](#semantic-search)
  - [Keyword Search](#keyword-search)
- [TODO](#todo)
- [License](#license)

## Intro

The goal of this app is to provide a highly curated search for staying up-to-date with the latest AI resources and news.

All search results are extracted from [Ben's Bites AI Newsletter](https://www.bensbites.co/), which is used as a highly curated data source.

## How it works

A cron job is run every 24 hours to update the database.

The steps involved include:

1. Crawling the source [Beehiiv newsletter](https://www.bensbites.co/)
2. Converting each post to markdown
3. Extracting and resolving unique links
4. Fetching opengraph metadata for each link
5. Fetching provider-specific metadata for some links (e.g. tweet text)
6. Generating vector embeddings for each link using OpenAI
7. Upserting all links into a Pinecone vector database
8. Upserting all links into a Meilisearch database

We're using [IFramely](https://iframely.com/) to extract opengraph metadata for each link, and we also special-case tweet links to extract the tweet text.

Once we have all of the links locally, we upsert them into two databases:

- A [Pinecone](https://www.pinecone.io/) vector database for semantic search
- A [Meilisearch](https://www.meilisearch.com/) database for traditional keyword search

Supporting both of these search indices isn't necessary, but I wanted to have a live comparison of the two approaches in action.

In general, I've found that semantic search is more accurate than keyword search, but keyword search is much faster and can be more intuitive for users.

### Semantic Search

Semantic search is powered by [OpenAI's \`text-embedding-ada-002\` embedding model](https://platform.openai.com/docs/guides/embeddings/) and [Pinecone's hosted vector database](https://www.pinecone.io/).

### Keyword Search

Traditional keyword-based search is powered by [Meilisearch](https://www.meilisearch.com/).

## TODO

- better search UX so back button works
- show the number of posts / links on the home page so it's clear when it was last updated
- acutally sort by recency instead of faking it
- set up cron to update the DB daily
- test on safari/firefox
- display which newsletter the post first appeared in
- explore hybrid search
- infinite scroll so you can keep scrolling results

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

All link data is extracted from [Ben's Bites AI Newsletter](https://www.bensbites.co/) and is licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).

If you found this project interesting, please consider [sponsoring me](https://github.com/sponsors/transitive-bullshit) or <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
