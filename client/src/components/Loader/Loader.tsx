import React from 'react'
import styles from './Loader.module.scss'

const Loader: React.FC = () => {
  return (
    <div className={styles['loader']}>
      <div className={styles['loader-circle']}></div>
      <p>Loading...</p>
    </div>
  )
}

export default Loader
