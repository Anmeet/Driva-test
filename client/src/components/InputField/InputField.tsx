import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormData } from '../../types'
import styles from './InputField.module.scss'

type InputFieldProps = {
  name: keyof FormData
  label: string
  type?: string
  placeholder?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const hasError = !!errors[name]?.message

  return (
    <div className={styles['input-field']}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={hasError ? styles.error : ''}
        {...register(name)}
      />
      {errors[name] && (
        <p className={styles['error-message']}>
          {(errors[name]?.message as string) || 'Error'}
        </p>
      )}
    </div>
  )
}
