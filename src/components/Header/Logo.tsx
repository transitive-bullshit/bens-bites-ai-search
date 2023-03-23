'use client'

import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'

import LogoLight from '@/public/logo-light.png'

import styles from './styles.module.css'

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Image
      className={cs(styles.logo, className)}
      src={LogoLight.src}
      alt='Logo'
      width={LogoLight.width}
      height={LogoLight.height}
    />
  )
}
