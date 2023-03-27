import * as React from 'react'

import * as types from '@/types'
import { SearchResult } from '@/components/SearchResult/SearchResult'

import styles from './styles.module.css'

export const SearchResultsList: React.FC<{
  results: types.SearchResult[]
}> = ({ results }) => {
  // console.log(
  //   'results',
  //   results.map((r) => r.metadata)
  // )

  return (
    <div className={styles.searchResultsList}>
      {results.map((result) => (
        <SearchResult key={result.id} result={result} />
      ))}
    </div>
  )
}
