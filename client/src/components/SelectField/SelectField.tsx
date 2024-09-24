import React from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './SelectField.module.scss'

type SelectFieldProps = {
  name: string
  label: string
  options: { value: string; label: string }[]
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const hasError = !!errors[name]?.message

  return (
    <div className={styles['select-field']}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        {...register(name)}
        className={hasError ? styles.error : ''}
      >
        <option value=''>Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className='error-message'>
          {(errors[name]?.message as string) || 'Error'}
        </p>
      )}
    </div>
  )
}

export default SelectField
