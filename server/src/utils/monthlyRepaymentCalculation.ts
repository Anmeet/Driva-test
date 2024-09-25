export class MonthlyRePaymentCalculation {
  public static calculate(
    loanAmount: number,
    loanTerm: number,
    interestRate: number
  ) {
    const monthlyInterestRate = interestRate / 12 / 100
    const numberOfPayments = loanTerm * 12
    return (
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
    )
  }
}
