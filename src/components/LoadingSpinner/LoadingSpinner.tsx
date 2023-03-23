'use client'

import * as React from 'react'
import Loader from 'react-spinners/BeatLoader'

import styles from './styles.module.css'

export const LoadingSpinner: React.FC<{ loading?: boolean }> = ({
  loading = true
}) => {
  return <Loader loading={loading} color='#24292f' className={styles.loading} />
}
