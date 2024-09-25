export type Lender = {
  name: string
  monthlyRepayment: string
  interestRate: string
  fees: string
}

export type ResultsProps = {
  loanAmount: number
  loanPurpose: string
  loanTerm: number
  lenders: Lender[]
  isLoading?: boolean
  error?: string
}
