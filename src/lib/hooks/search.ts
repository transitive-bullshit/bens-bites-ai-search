'use client'

import * as React from 'react'
import { dequal } from 'dequal/lite'
import { useRouter } from 'next/router'
import { useDebounce, useLocalStorage, useRendersCount } from 'react-use'
import useSWR from 'swr'
import { createContainer } from 'unstated-next'

import * as types from '@/types'

const localStorageSearchOptionsKey = 'bens-bites-search-options-v0.0.2'
const retrievalPageSize = 100
const displayPageSize = 25

const fetcher = ({
  url,
  body
}: {
  url: string
  body: types.SearchQuery
}): Promise<types.SearchResult[]> =>
  body
    ? fetch(
        `${url}?${new URLSearchParams({
          query: body.query,
          limit: body.limit ? `${body.limit}` : undefined
        })}`
      ).then((res) => res.json())
    : Promise.resolve([])

const initialSearchOptions: types.ISearchOptions = {
  orderBy: 'recency'
}

function useSearch() {
  const router = useRouter()
  const [query, setQuery] = React.useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = React.useState('')

  const rendersCount = useRendersCount()
  const [cachedSearchOptions, setCachedSearchOptions] = useLocalStorage(
    `${localStorageSearchOptionsKey}-${localStorageSearchOptionsKey}`,
    initialSearchOptions
  )
  const [searchOptions, setSearchOptions] =
    React.useState<types.ISearchOptions>(initialSearchOptions)

  React.useEffect(() => {
    if (cachedSearchOptions && rendersCount === 2) {
      setSearchOptions(cachedSearchOptions)
    }
  }, [cachedSearchOptions, rendersCount])

  React.useEffect(() => {
    const url = new URL(window.location.href)
    const query = url.searchParams.get('query')
    if (query) {
      setQuery(query)
      setDebouncedQuery(query)
    }
  }, [])

  useDebounce(
    () => {
      setDebouncedQuery(query)
    },
    500,
    [query]
  )

  const updateCache = React.useCallback(() => {
    setCachedSearchOptions(searchOptions)
  }, [setCachedSearchOptions, searchOptions])

  useDebounce(updateCache, 1000, [searchOptions])

  const body = React.useMemo<types.SearchQuery>(() => {
    return {
      query: debouncedQuery,
      limit: retrievalPageSize
    }
  }, [debouncedQuery])

  const {
    data: results,
    error,
    isLoading,
    isValidating
  } = useSWR<types.SearchResult[], Error>(
    {
      url: '/api/search',
      body
    },
    fetcher,
    {
      keepPreviousData: false,
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 24 * 60 * 1000
    }
  )

  const onChangeQuery = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    []
  )

  const onClearQuery = React.useCallback(() => {
    setQuery('')
    setDebouncedQuery('')
  }, [])

  // Update local query state if the route reset the query
  React.useEffect(() => {
    if (!router.query.query && debouncedQuery) {
      setQuery('')
      setDebouncedQuery('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  // Update the route's searchParams to match local query state
  React.useEffect(() => {
    const newQuery = {
      ...router.query,
      query: debouncedQuery
    }

    if (!debouncedQuery) {
      delete newQuery.query
    }

    if (!dequal(router.query, newQuery)) {
      router.replace(
        { pathname: router.pathname, query: newQuery },
        { pathname: router.pathname, query: newQuery },
        { shallow: true }
      )
    }
  }, [router, debouncedQuery])

  const onChangeOrderBy = React.useCallback(
    (opts: { value: string } | null) => {
      setSearchOptions((options) => ({
        ...options,
        orderBy: opts?.value || initialSearchOptions.orderBy
      }))
    },
    []
  )

  const sortedResults = React.useMemo(() => {
    const r = results
    if (!r) {
      return []
    }

    if (searchOptions.orderBy === 'relevancy') {
      return r.slice(0, displayPageSize)
    }

    const dates = {}
    for (const result of r) {
      dates[result.id] = new Date(result.date || result.postDate).getTime()
    }

    return r
      .concat([])
      .sort((a, b) => {
        return dates[b.id] - dates[a.id]
      })
      .slice(0, displayPageSize)
  }, [results, searchOptions])

  const isEmpty = React.useMemo(
    () => sortedResults && sortedResults.length === 0,
    [sortedResults]
  )

  // console.log('results', sortedResults.length)

  return {
    results: sortedResults,

    query,
    debouncedQuery,
    searchOptions,

    onChangeQuery,
    onClearQuery,
    onChangeOrderBy,

    setQuery,
    setDebouncedQuery,

    error,
    isEmpty,
    isLoading,
    isValidating
  }
}

export const Search = createContainer(useSearch)
