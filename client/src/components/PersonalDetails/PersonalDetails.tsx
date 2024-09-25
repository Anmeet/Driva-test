import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useFormContext } from '../../context/FormContext'
import {
  EmploymentStatus,
  PersonalDetails as PersonalDetailType,
} from '../../types'
import { InputField } from '../InputField'
import { SelectField } from '../SelectField'
import styles from './PersonalDetails.module.scss'
import { Button } from '../Button'

const today = new Date()

const PersonalDetailsSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    dateOfBirth: z
      .string()
      .transform((value) => new Date(value))
      .refine((date) => !isNaN(date.getTime()), {
        message: 'Invalid date format',
      })
      .refine((date) => date < today, {
        message: 'Date of birth must be in the past',
      }),

    email: z.string().email({ message: 'Please enter valid email address' }),
    mobile: z.string().refine((val) => /^\d{10}$/.test(val), {
      message: 'Please enter 10 digit Valid Phone number',
    }),
    address: z.string().min(1, { message: 'Address is required' }),
    employmentStatus: z.nativeEnum(EmploymentStatus, {
      errorMap: () => ({ message: 'Employment status is required' }),
    }),
    employerName: z.string().optional(),
    annualIncome: z.coerce
      .number()
      .positive({ message: 'Annual income must be a positive number' })
      .refine((value) => value > 0, {
        message: 'Annual income must be greater than zero',
      }),
  })

  .superRefine((data, ctx) => {
    if (
      data.employmentStatus === EmploymentStatus.Employed &&
      !data.employerName
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['employerName'],
        message: 'Employer name is required when employed',
      })
    }
  })

type PersonalDetailsProps = {
  next: () => void
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ next }) => {
  const { setFormData, formData } = useFormContext()

  const methods = useForm<PersonalDetailType>({
    mode: 'onChange',
    defaultValues: formData,
    resolver: zodResolver(PersonalDetailsSchema),
  })

  const {
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = methods

  const onSubmit = (data: PersonalDetailType) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
      dateOfBirth: (data.dateOfBirth as unknown as Date)
        .toISOString()
        .substring(0, 10),
    }))
    next()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <InputField
            name='firstName'
            label='First Name'
            placeholder='Enter First Name'
          />
          <InputField
            name='lastName'
            label='Last Name'
            placeholder='Enter Last Name'
          />
          <InputField name='dateOfBirth' label='Date of Birth' type='date' />
          <InputField
            name='email'
            label='Email'
            type='email'
            placeholder='Enter Email'
          />
          <InputField
            name='mobile'
            label='Mobile'
            type='tel'
            placeholder='Enter Mobile Number'
          />
          <InputField
            name='address'
            label='Address'
            placeholder='Enter Address'
          />
          <SelectField
            name='employmentStatus'
            label='Employment Status'
            options={[
              { value: EmploymentStatus.Employed, label: 'Employed' },
              { value: EmploymentStatus.SelfEmployed, label: 'Self-Employed' },
              { value: EmploymentStatus.Unemployed, label: 'Unemployed' },
            ]}
          />

          {watch('employmentStatus') === EmploymentStatus.Employed && (
            <InputField
              name='employerName'
              label='Employer Name'
              placeholder='Enter Employer Name'
            />
          )}
          <InputField
            name='annualIncome'
            label='Annual Income'
            type='number'
            placeholder='Enter Annual Income'
          />

          <Button type='submit' variant='primary'>
            Next
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
