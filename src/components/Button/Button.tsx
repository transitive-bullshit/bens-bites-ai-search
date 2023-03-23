import * as React from 'react'
import cs from 'clsx'

import styles from './styles.module.css'

export const Button: React.FC<
  {
    className?: string
    buttonClassName?: string
    children: React.ReactNode
    isLoading?: boolean
    ref?: any
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
> = React.forwardRef(function Button(
  { className, buttonClassName, children, style, isLoading, ...buttonProps },
  ref
) {
  return (
    <div
      className={cs(styles.buttonWrapper, className)}
      style={style}
      ref={ref as any}
    >
      <a className={cs(styles.button, buttonClassName)} {...buttonProps}>
        <div className={styles.buttonContent}>{children}</div>
      </a>
    </div>
  )
})
