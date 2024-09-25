import React from 'react'
import { PageHeader, Results } from '../../components'
import { useFormContext } from '../../context/FormContext'
import styles from './ResultsPage.module.scss'
import useHttp from '../../hooks/useHttp'
import { Lender } from '../../types'
import { baseApi } from '../../constants/constants'

export const ResultsPage = () => {
  const [lenderOffers, setLenderOffers] = React.useState<Lender[]>([])
  const { formData } = useFormContext()
  const { isLoading, error, sendRequest } = useHttp()

  React.useEffect(() => {
    const getLendersOffer = (data: Lender[]) => {
      setLenderOffers(data)
    }
    const fetchData = async () => {
      try {
        await sendRequest<Lender[]>(
          {
            url: baseApi + 'lenders',
          },
          getLendersOffer
        )
      } catch (err) {
        console.error('error ', err)
      }
    }

    const timer = setTimeout(() => {
      fetchData()
    }, 100)

    return () => clearTimeout(timer)
  }, [sendRequest])

  const loanAmount = (formData.vehiclePrice || 0) - (formData.deposit || 0)

  return (
    <PageHeader title='Results Page' className={styles['results-page']}>
      <Results
        loanAmount={loanAmount}
        loanPurpose={formData.loanPurpose}
        loanTerm={formData.loanTerm}
        lenders={lenderOffers}
        isLoading={isLoading}
        error={error as string}
      />
    </PageHeader>
  )
}

export default ResultsPage
