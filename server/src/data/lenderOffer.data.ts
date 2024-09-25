import { LenderOffer } from '../interfaces/lender.interface'

export const offers: LenderOffer[] = [
  {
    name: 'Lender A',
    monthlyRepayment: '$300',
    interestRate: '5.5% APR',
    fees: '$10 processing fee',
  },
  {
    name: 'Lender B',
    monthlyRepayment: '$290',
    interestRate: '5.0% APR',
    fees: '$15 application fee',
  },
  {
    name: 'Lender C',
    monthlyRepayment: '$310',
    interestRate: '6.0% APR',
    fees: 'No fees',
  },
]
