'use client'

import * as React from 'react'
import cs from 'clsx'

import * as config from '@/lib/config'
import { Discord, GitHub, Twitter } from '@/icons/index'

import styles from './styles.module.css'

export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={cs(styles.footer, className)}>
      <div className={styles.copyright}>
        <a href={config.twitterUrl} target='_blank' rel='noopener noreferrer'>
          {config.copyright}
        </a>
      </div>

      <div className={styles.poweredBy}>
        <a
          href={config.newsletterUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by Ben&apos;s Bites Newsletter
        </a>
      </div>

      <div className={styles.social}>
        <a
          className={cs(styles.discord, styles.action)}
          href={config.discordUrl}
          title='Discord'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Discord />
        </a>

        <a
          className={cs(styles.twitter, styles.action)}
          href={config.twitterUrl}
          title={`Twitter ${config.twitter}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Twitter />
        </a>

        <a
          className={cs(styles.github, styles.action)}
          href={config.githubRepoUrl}
          title='View source on GitHub'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHub />
        </a>
      </div>
    </footer>
  )
}
