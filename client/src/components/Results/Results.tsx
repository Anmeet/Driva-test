import React from 'react'
import { ResultsProps } from '../../types'
import styles from './Results.module.scss'

export const Results: React.FC<ResultsProps> = ({
  loanAmount,
  loanPurpose,
  loanTerm,
  lenders,
}) => {
  return (
    <div className={styles['results-container']}>
      <h2>Loan Summary</h2>
      <div className={styles.summary}>
        <p>
          <strong>Loan Amount:</strong> ${loanAmount}
        </p>
        <p>
          <strong>Loan Purpose:</strong> {loanPurpose}
        </p>
        <p>
          <strong>Loan Term:</strong> {loanTerm} years
        </p>
      </div>

      <h3>Lender Responses</h3>
      <ul className={styles['lender-list']}>
        {lenders.map((lender, index) => (
          <li key={index} className={styles['lender-item']}>
            <h4>{lender.name}</h4>
            <p>
              <strong>Monthly Repayment:</strong> ${lender.monthlyRepayment}
            </p>
            <p>
              <strong>Interest Rate:</strong> {lender.interestRate} APR
            </p>
            <p>
              <strong>Fees:</strong> {lender.fees}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
