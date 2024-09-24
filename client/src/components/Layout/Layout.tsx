import React from 'react'
import styles from './Layout.module.scss'

type LayoutProps = {
  children: React.ReactNode
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className={styles['layout-container']}>{children}</div>
}

export default Layout
