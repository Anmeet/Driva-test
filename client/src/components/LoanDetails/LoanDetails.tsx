import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useFormContext } from '../../context/FormContext'
import { LoanDetails as LoanDetailsType } from '../../types'
import { InputField } from '../InputField'
import { Button } from '../Button'
import styles from './LoanDetails.module.scss'
import useHttp from '../../hooks/useHttp'
import { baseApi } from '../../constants/constants'

const LoanDetailsSchema = z
  .object({
    vehiclePrice: z.coerce
      .number()
      .positive({ message: 'Vehicle Price must be a positive number' })
      .min(2000, { message: 'Minimum vehicle price is $2000' }),
    deposit: z.coerce
      .number()
      .positive({ message: 'Deposit must be a positive number' })
      .min(0, { message: 'Deposit must be at least $0' }),

    loanPurpose: z.string().min(1, { message: 'Loan purpose is required' }),
    loanTerm: z.coerce
      .number()
      .min(1)
      .max(7, { message: 'Loan term must be between 1-7 years' }),
  })

  .refine((data) => data.vehiclePrice - data.deposit > 2000, {
    message:
      'The difference between Vehicle Price and Deposit must be greater than $2000.',
    path: ['deposit'],
  })

type LoanDetailsProps = {
  next: () => void
  prev: () => void
}
export const LoanDetails: React.FC<LoanDetailsProps> = ({ next, prev }) => {
  const { setFormData, formData } = useFormContext()
  const { sendRequest } = useHttp()

  const methods = useForm<LoanDetailsType>({
    mode: 'onChange',
    defaultValues: formData,
    resolver: zodResolver(LoanDetailsSchema),
  })

  const {
    handleSubmit,
    setError,
    getValues,
    watch,
    trigger,
    formState: { errors, isValid },
  } = methods

  const vehiclePrice = watch('vehiclePrice')

  const onSubmit = (data: LoanDetailsType) => {
    if (data.deposit > data.vehiclePrice) {
      setError('deposit', {
        type: 'manual',
        message: 'Deposit cannot exceed vehicle price.',
      })
      return
    }

    sendRequest({
      url: baseApi + 'lenders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        loanAmount: data.vehiclePrice - data.deposit,
        loanTerm: data.loanTerm,
      },
    })
    updateFormData(data)
    next()
  }

  const updateFormData = (data: LoanDetailsType) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  const onPrevClick = () => {
    updateFormData(getValues())
    prev()
  }

  React.useEffect(() => {
    if (vehiclePrice) {
      trigger('deposit')
    }
  }, [vehiclePrice, trigger])

  return (
    <FormProvider {...methods}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <InputField name='vehiclePrice' label='Vehicle Price' type='number' />
        <InputField name='deposit' label='Deposit' type='number' />
        <InputField name='loanPurpose' label='Loan Purpose' />
        <InputField name='loanTerm' label='Loan Term' type='number' />

        <div className={styles['button-container']}>
          <Button type='button' variant='primary' onClick={onPrevClick}>
            Prev
          </Button>
          <Button type='submit' variant='primary'>
            Next
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
