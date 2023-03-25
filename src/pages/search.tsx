import * as React from 'react'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox
} from 'react-instantsearch-dom'

import { Layout } from '@/components/Layout/Layout'
import { PageHead } from '@/components/PageHead/PageHead'
import { Search } from '@/lib/hooks/search'

import styles from './index.module.css'

const searchClient = instantMeiliSearch(
  'https://ms-4348b6b077aa-775.nyc.meilisearch.io',
  'f238983a69c91498978daf34cbe9890efe9d575e432a7b1188475bfb431e5484'
)

export default function HomePage() {
  return (
    <Search.Provider>
      <Layout>
        <PageHead />

        <div className={styles.homePage}>
          <div className={styles.body}>
            <InstantSearch
              indexName='bens-bites-links'
              searchClient={searchClient}
            >
              <SearchBox />

              <Hits hitComponent={Hit} />
            </InstantSearch>
          </div>
        </div>
      </Layout>
    </Search.Provider>
  )
}

const Hit = ({ hit }) => <Highlight attribute='name' hit={hit} />
