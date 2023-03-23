import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'timeago.js'

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
  const parsedUrl = new URL(metadata.url)
  const url = [parsedUrl.hostname.replace(/^www\./, ''), parsedUrl.pathname]
    .map((p) => (p === '/' ? '' : p))
    .filter(Boolean)
    .join('')
  const relativeTime = format(metadata.date || metadata.postDate)

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
            <div className={styles.site}>
              {metadata.site || metadata.author}
            </div>

            <div className={styles.url}>{url}</div>
          </div>
        </div>

        <h3 className={cs('link', styles.title)}>{metadata.title}</h3>

        {metadata.description && (
          <p className={styles.desc}>
            {relativeTime && (
              <span className={styles.timeago}>{relativeTime} — </span>
            )}
            {metadata.description}
          </p>
        )}
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
