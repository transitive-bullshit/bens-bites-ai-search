'use client'

import * as React from 'react'
import cs from 'clsx'
import Select from 'react-select'

import { ClearIcon, SearchIcon } from '@/icons/index'
import { Search } from '@/lib/hooks/search'

import styles from './styles.module.css'

const orderByOptions = [
  {
    value: 'recency',
    label: 'Latest (default)'
  },
  {
    value: 'relevancy',
    label: 'Relevance'
  }
]

const selectStyles: any = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#24292f'
  }),
  control: (provided: any) => ({
    ...provided,
    height: '100%'
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer'
  })
}

export const SearchOptions: React.FC = () => {
  const { query, searchOptions, onChangeQuery, onClearQuery, onChangeOrderBy } =
    Search.useContainer()

  const queryInputRef = React.useRef<HTMLInputElement>(null)

  const onClickClearQuery = React.useCallback(() => {
    onClearQuery()

    if (queryInputRef.current) {
      queryInputRef.current.focus()
    }
  }, [onClearQuery, queryInputRef])

  React.useEffect(() => {
    if (queryInputRef.current) {
      queryInputRef.current.focus()
    }
  }, [queryInputRef])

  const onSubmit = React.useCallback((event: any) => {
    event.preventDefault()
  }, [])

  const selectedOrderByValue = React.useMemo(
    () =>
      searchOptions.orderBy
        ? {
            value: searchOptions.orderBy,
            label:
              orderByOptions.find((o) => o.value === searchOptions.orderBy)
                ?.label ?? 'Default'
          }
        : null,
    [searchOptions.orderBy]
  )

  return (
    <form className={styles.searchOptions} onSubmit={onSubmit}>
      <div className={cs(styles.field, styles.queryField)}>
        <label htmlFor='query'>Search</label>

        <div className={cs(styles.searchInput)}>
          <SearchIcon className={styles.searchIcon} />

          <input
            type='text'
            name='query'
            id='query'
            placeholder='Search any AI topic'
            className={cs(styles.input, styles.textInput)}
            value={query}
            onChange={onChangeQuery}
            ref={queryInputRef}
          />

          {query && (
            <div
              className={styles.clearInput}
              onClick={onClickClearQuery}
              aria-hidden='true'
            >
              <ClearIcon className={styles.clearIcon} />
            </div>
          )}
        </div>
      </div>

      <div className={cs(styles.field, styles.orderByField)}>
        <label htmlFor='orderBy' className={styles.labelOrderBy}>
          Sort By
        </label>

        <Select
          name='orderBy'
          id='orderBy'
          instanceId='orderBy'
          aria-label='Sort by'
          className={cs(styles.select, styles.orderBy)}
          options={orderByOptions}
          styles={selectStyles}
          isDisabled={false}
          value={selectedOrderByValue}
          onChange={onChangeOrderBy}
        />
      </div>
    </form>
  )
}
