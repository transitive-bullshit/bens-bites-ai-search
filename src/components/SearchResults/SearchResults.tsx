'use client'

import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { SearchResultsList } from '@/components/SearchResultsList/SearchResultsList'
import { Search } from '@/lib/hooks/search'

import styles from './styles.module.css'

export const SearchResults: React.FC = () => {
  const { results, debouncedQuery, error, isEmpty, isLoading } =
    Search.useContainer()

  if (error) {
    return <div>Error loading results</div>
  }

  let content: React.ReactNode

  if ((isEmpty || !results) && !debouncedQuery) {
    content = <EmptyQuery />
  } else if (isLoading) {
    content = (
      <div className={styles.detail}>
        <LoadingSpinner loading={isLoading} />
      </div>
    )
  } else if (results) {
    if (isEmpty) {
      content = <EmptyResults />
    } else {
      content = <SearchResultsList results={results} />
    }
  }

  return <div className={cs(styles.searchResults)}>{content}</div>
}

export const EmptyQuery: React.FC = () => {
  const { setQuery, setDebouncedQuery } = Search.useContainer()

  const fakeNavigation = React.useCallback(
    (query: string) => {
      // router.push({
      //   pathname: '/',
      //   query: {
      //     query
      //   }
      // })
      setQuery(query)
      setDebouncedQuery(query)
    },
    [setQuery, setDebouncedQuery]
  )

  return (
    <div className={styles.emptyResults}>
      <p>Search any topic.</p>

      <p>
        Examples:{' '}
        <Link
          className='link'
          href='/?query=github'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('github')
          }}
        >
          github
        </Link>
        ,&nbsp;
        <Link
          className='link'
          href='/?query=openai+microsoft'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('openai microsoft')
          }}
        >
          openai microsoft
        </Link>
        ,&nbsp;
        <Link
          className='link'
          href='/?query=multimodal'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('multimodal')
          }}
        >
          multimodal
        </Link>
        ,&nbsp;
        <Link
          className='link'
          href='/?query=google+bard'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('google bard')
          }}
        >
          google bard
        </Link>
      </p>
    </div>
  )
}

export const EmptyResults: React.FC = () => {
  return (
    <div className={styles.emptyResults}>
      <p>No results found. Try broadening your search.</p>
    </div>
  )
}
