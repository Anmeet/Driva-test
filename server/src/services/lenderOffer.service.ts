import { LoanDetailDto } from '../dtos/loanDetail.dto'
import { offers } from '../data/lenderOffer.data'
import { MonthlyRePaymentCalculation } from '../utils/monthlyRepaymentCalculation'
import { LenderOffer } from '../interfaces/lender.interface'

export const getLenderOffers = (): LenderOffer[] => {
  return offers
}

export const lenderOfferRepayment = ({
  loanAmount,
  loanTerm,
}: LoanDetailDto): LenderOffer[] => {
  offers.forEach((offer) => {
    offer.monthlyRepayment =
      '$' +
      MonthlyRePaymentCalculation.calculate(
        loanAmount,
        loanTerm,
        parseFloat(offer.interestRate.split('%')[0])
      )
        .toFixed(2)
        .toString()
  })

  return offers
}
