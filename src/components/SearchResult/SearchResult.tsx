import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import * as types from '@/types'
import { Globe } from '@/icons'

import styles from './styles.module.css'

export const SearchResult: React.FC<{
  result: types.SearchResult
  className?: string
}> = React.forwardRef(function SearchResult({ result, className }, ref) {
  const { metadata } = result
  const thumbnailWidth =
    typeof metadata.thumbnailWidth === 'string' && metadata.thumbnailWidth
      ? metadata.thumbnailWidth
      : undefined
  const thumbnailHeight =
    typeof metadata.thumbnailHeight === 'string' && metadata.thumbnailHeight
      ? metadata.thumbnailHeight
      : undefined
  const thumbnail = metadata.thumbnail
  const iconWidth =
    typeof metadata.iconWidth === 'string' && metadata.iconWidth
      ? metadata.iconWidth
      : undefined
  const iconHeight =
    typeof metadata.iconHeight === 'string' && metadata.iconHeight
      ? metadata.iconHeight
      : undefined
  const icon = metadata.icon

  const title = metadata.title || metadata.site || metadata.url

  return (
    <a
      className={cs(styles.searchResult, className)}
      ref={ref as any}
      href={metadata.url}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={title}
    >
      <div className={styles.lhs}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            {icon ? (
              <div
                className={styles.icon}
                style={{
                  backgroundImage: `url(${icon})`
                }}
              />
            ) : (
              <Globe className={cs(styles.icon, styles.globe)} />
            )}
          </div>

          <div className={styles.headerRhs}>
            <div className={styles.site}>{metadata.site}</div>
            <div className={styles.url}>{metadata.url}</div>
          </div>
        </div>

        <Link
          href={metadata.url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={title}
          className={cs('link', styles.title)}
        >
          <h3>{metadata.title}</h3>
        </Link>

        {metadata.description && <p>{metadata.description}</p>}
      </div>

      {thumbnail && (
        <div className={styles.frame}>
          <Image
            className={styles.thumbnail}
            src={thumbnail}
            alt={title}
            width={thumbnailWidth}
            height={thumbnailHeight}
            unoptimized
            fill={!thumbnailWidth || !thumbnailHeight}
          />
        </div>
      )}
    </a>
  )
})
