import * as React from 'react'
import cs from 'clsx'
import { Inter } from 'next/font/google'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'

import { RootLayoutProviders } from './providers'
import styles from './styles.module.css'

const inter = Inter({ subsets: ['latin'] })

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cs(styles.container, inter.className)}>
      <RootLayoutProviders>
        <Header className={styles.header} />

        <main className={styles.main}>{children}</main>

        <Footer className={styles.footer} />
      </RootLayoutProviders>
    </div>
  )
}
