import React from 'react'
import styles from './PageHeader.module.scss'
import cx from 'classnames'

type HeaderProps = {
  title: string
  children: React.ReactNode
  className?: string
}
export const PageHeader: React.FC<HeaderProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={cx(styles.header, className)}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  )
}

export default PageHeader
