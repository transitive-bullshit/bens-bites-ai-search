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
}> = ({ result, className }) => {
  return <SearchResultInner link={result.metadata} className={className} />
}

export const SearchResultInner: React.FC<{
  link: types.PineconeMetadata
  className?: string
}> = React.forwardRef(function SearchResultInner({ link, className }, ref) {
  const [thumbnailError, setThumbnailError] = React.useState(null)
  const thumbnailWidth =
    typeof link.thumbnailWidth === 'string' && link.thumbnailWidth
      ? link.thumbnailWidth
      : undefined
  const thumbnailHeight =
    typeof link.thumbnailHeight === 'string' && link.thumbnailHeight
      ? link.thumbnailHeight
      : undefined
  const thumbnail = link.thumbnail
  const iconWidth =
    typeof link.iconWidth === 'string' && link.iconWidth
      ? link.iconWidth
      : undefined
  const iconHeight =
    typeof link.iconHeight === 'string' && link.iconHeight
      ? link.iconHeight
      : undefined
  const icon = link.icon

  const title = link.title || link.site || link.url
  const parsedUrl = new URL(link.url)
  const url = [parsedUrl.hostname.replace(/^www\./, ''), parsedUrl.pathname]
    .map((p) => (p === '/' ? '' : p))
    .filter(Boolean)
    .join('')
  const relativeTime = format(link.date || link.postDate)

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
      href={link.url}
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
            <div className={styles.site}>{link.site || link.author}</div>

            <div className={styles.url}>{url}</div>
          </div>
        </div>

        {link.title?.trim() && (
          <h3 className={cs(styles.title)}>{link.title}</h3>
        )}

        {link.description && (
          <p className={styles.desc}>
            {relativeTime && (
              <span className={styles.timeago}>{relativeTime} — </span>
            )}
            {link.description}
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
