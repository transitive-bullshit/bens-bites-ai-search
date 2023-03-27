'use client'

import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import * as config from '@/lib/config'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { SearchResultsList } from '@/components/SearchResultsList/SearchResultsList'
import { Search } from '@/lib/hooks/search'
import socialImage from '@/public/social.jpg'

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
      {/* <p className={styles.desc}>
        Search across all of the best resources in AI – powered by{' '}
        <a
          href={config.newsletterUrl}
          className='link'
          target='_blank'
          rel='noopener noreferrer'
        >
          Ben&apos;s Bites AI Newsletter
        </a>{' '}
        and updated daily.
      </p> */}

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
          href='/?query=AGI'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('AGI')
          }}
        >
          AGI
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

      <div className={styles.socialImageWrapper}>
        <Image
          className={styles.socialImage}
          src={socialImage.src}
          alt={config.description}
          width={socialImage.width}
          height={socialImage.height}
          placeholder='blur'
          blurDataURL={socialImage.blurDataURL}
        />
      </div>
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
