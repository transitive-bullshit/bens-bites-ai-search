import * as React from 'react'
import cs from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import * as types from '@/types'

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

  return (
    <motion.div
      className={cs(styles.searchResult, className)}
      initial={{ scale: 0, translateY: -50 }}
      animate={{ scale: 1, translateY: 0 }}
      exit={{ scale: 0, translateY: 50 }}
      ref={ref as any}
    >
      <div className={styles.lhs}>
        <Link
          href={metadata.url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={metadata.title || metadata.site || metadata.url}
          className={cs('link', styles.title)}
        >
          <h3>{metadata.title}</h3>
        </Link>

        {metadata.description && <p>{metadata.description}</p>}
      </div>

      {thumbnail && (
        <Link
          href={metadata.url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='YouTube'
          className={styles.frame}
        >
          <Image
            className={styles.thumbnail}
            src={thumbnail}
            alt={metadata.title || metadata.site || metadata.url}
            width={thumbnailWidth}
            height={thumbnailHeight}
            unoptimized
            fill={!thumbnailWidth || !thumbnailHeight}
          />
        </Link>
      )}
    </motion.div>
  )
})
