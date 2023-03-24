import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'
import TweetEmbed from 'react-tweet-embed'
import { format } from 'timeago.js'

import * as types from '@/types'
import { Globe } from '@/icons'

import styles from './styles.module.css'

export const SearchResult: React.FC<{
  result: types.SearchResult
  className?: string
}> = React.forwardRef(function SearchResult({ result, className }, ref) {
  const [thumbnailError, setThumbnailError] = React.useState(null)
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

  let tweetId: string = null
  if (parsedUrl.hostname === 'twitter.com') {
    const tweetM = parsedUrl.pathname.match(
      /^\/([a-zA-Z0-9_]+)\/status\/(\d+)$/
    )
    if (tweetM?.[2]) {
      tweetId = tweetM[2]
    }
  }

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

        {metadata.title?.trim() && (
          <h3 className={cs(styles.title)}>{metadata.title}</h3>
        )}

        {metadata.description && (
          <p className={styles.desc}>
            {relativeTime && (
              <span className={styles.timeago}>{relativeTime} — </span>
            )}
            {metadata.description}
          </p>
        )}
      </div>

      <div className={styles.frame}>
        {tweetId ? (
          <TweetEmbed tweetId={tweetId} className={styles.thumbnail} />
        ) : (
          thumbnail &&
          !thumbnailError && (
            <Image
              className={styles.thumbnail}
              src={thumbnail}
              alt={title}
              width={thumbnailWidth}
              height={thumbnailHeight}
              unoptimized
              fill={!thumbnailWidth || !thumbnailHeight}
              onError={setThumbnailError}
            />
          )
        )}
      </div>
    </a>
  )
})
