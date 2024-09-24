export type Lender = {
  name: string
  monthlyRepayment: number
  interestRate: string
  fees: string
}

export type ResultsProps = {
  loanAmount: number
  loanPurpose: string
  loanTerm: number
  lenders: Lender[]
}
