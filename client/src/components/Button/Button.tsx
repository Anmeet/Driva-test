import React from 'react'
import styles from './Button.module.scss'
import cx from 'classnames'

type ButtonProps = {
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  type,
}) => {
  return (
    <button
      className={cx(styles.button, styles[`button-${variant}`])}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
