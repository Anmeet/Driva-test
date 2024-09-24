import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LoanDetails } from '../../components/LoanDetails'
import { PageHeader } from '../../components'

export const LoanDetailsPage = () => {
  const navigate = useNavigate()
  const nextStep = () => navigate('/results')
  const prevStep = () => navigate('/')
  return (
    <PageHeader title='Loan Details'>
      <LoanDetails next={nextStep} prev={prevStep} />
    </PageHeader>
  )
}

export default LoanDetailsPage
