import request from 'supertest'
import { app } from '../app'
import { MonthlyRePaymentCalculation } from '../utils/monthlyRepaymentCalculation'
import { LenderOffer } from '../interfaces/lender.interface'

describe('Lender Offers API with Monthly Calculation', () => {
  it('should return a list of lender offers with Monthly Repayment', async () => {
    const response = await request(app).get('/api/lenders')
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body[0]).toHaveProperty('name')
    expect(response.body[0]).toHaveProperty('monthlyRepayment')
    expect(response.body[0]).toHaveProperty('interestRate')
    expect(response.body[0]).toHaveProperty('fees')
  })

  it('should return a list of lender offers with calculated Monthly Repayment', async () => {
    const loanDetails = {
      loanAmount: 4000,
      loanTerm: 5,
    }
    const response = await request(app).post('/api/lenders').send(loanDetails)

    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)

    response.body.forEach((offer: LenderOffer) => {
      const interestRate = parseFloat(offer.interestRate.split('%')[0])

      const expectedMonthlyRepayment = MonthlyRePaymentCalculation.calculate(
        loanDetails.loanAmount,
        loanDetails.loanTerm,
        interestRate
      ).toFixed(2)

      expect(offer.monthlyRepayment).toBe(`$${expectedMonthlyRepayment}`)
    })
  })

  it('should return validation errors when loan detail are invalid', async () => {
    const invalidLoanDetails = {
      loanAmount: 1000,
      loanTerm: 0,
    }

    const response = await request(app)
      .post('/api/lenders')
      .send(invalidLoanDetails)
    expect(response.status).toBe(400)
    expect(response.body.errors).toContain('Loan Amount must be at least 2000')
    expect(response.body.errors).toContain('Loan Term must be at least 1 year')
  })
})
