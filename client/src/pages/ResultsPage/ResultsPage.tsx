import React from 'react'
import { PageHeader, Results } from '../../components'
import { useFormContext } from '../../context/FormContext'
import styles from './ResultsPage.module.scss'

export const ResultsPage = () => {
  const { formData } = useFormContext()

  const loanAmount = (formData.vehiclePrice || 0) - (formData.deposit || 0)

  const lenders = [
    {
      name: 'Lender A',
      monthlyRepayment: 300,
      interestRate: '5.5%',
      fees: '$10 processing fee',
    },
    {
      name: 'Lender B',
      monthlyRepayment: 290,
      interestRate: '5.0%',
      fees: '$15 application fee',
    },
    {
      name: 'Lender C',
      monthlyRepayment: 310,
      interestRate: '6.0%',
      fees: 'No fees',
    },
  ]
  return (
    <PageHeader title='Results Page' className={styles['results-page']}>
      <Results
        loanAmount={loanAmount}
        loanPurpose={formData.loanPurpose}
        loanTerm={formData.loanTerm}
        lenders={lenders}
      />{' '}
    </PageHeader>
  )
}

export default ResultsPage
