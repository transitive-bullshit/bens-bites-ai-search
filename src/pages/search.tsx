import * as React from 'react'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web'

import { Layout } from '@/components/Layout/Layout'
import { PageHead } from '@/components/PageHead/PageHead'
import { SearchResult } from '@/components/SearchResult/SearchResult'

import styles from './search.module.css'

const searchClient = instantMeiliSearch(
  'https://ms-4348b6b077aa-775.nyc.meilisearch.io',
  'f238983a69c91498978daf34cbe9890efe9d575e432a7b1188475bfb431e5484',
  {
    primaryKey: 'id'
  }
)

export default function HomePage() {
  return (
    <Layout>
      <PageHead />

      <div className={styles.page}>
        <div className={styles.body}>
          <InstantSearch
            indexName='bens-bites-links'
            searchClient={searchClient}
          >
            <SearchBox className={styles.search} />

            <Hits hitComponent={Hit} />
          </InstantSearch>
        </div>
      </div>
    </Layout>
  )
}

const Hit = ({ hit }) => {
  return <SearchResult result={hit} />
}
