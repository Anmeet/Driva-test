import { mockLendersResponse } from '../support/commands'
import { fillLoanDetails, fillPersonalDetails } from '../support/formUtils'

describe('Multi Step Form Validation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display validation errors when fields are empty', () => {
    cy.contains('Next').click()

    cy.contains('First name is required').should('be.visible')
    cy.contains('Last name is required').should('be.visible')
    cy.contains('Invalid date format').should('be.visible')
    cy.contains('Please enter valid email address').should('be.visible')
    cy.contains('Please enter 10 digit Valid Phone number').should('be.visible')
    cy.contains('Address is required').should('be.visible')
    cy.contains('Employment status is required').should('be.visible')
  })

  it('should enable the Next button once required fields are filled', () => {
    fillPersonalDetails()
    cy.contains('Next').should('not.be.disabled')
  })

  it('should employer name be hidden if employment status is not employed', () => {
    cy.get('select[name="employmentStatus"]').select('Unemployed')
    cy.get('input[name="employerName"]').should('not.exist')
  })

  it('should validate Personal details with incorrect values', () => {
    cy.get('input[name="dateOfBirth"]').type('2026-01-01')
    cy.get('input[name="email"]').type('amitexample.com')
    cy.get('input[name="mobile"]').type('123456789011')

    cy.contains('Date of birth must be in the past').should('be.visible')
    cy.contains('Please enter valid email address').should('be.visible')
    cy.contains('Please enter 10 digit Valid Phone number').should('be.visible')
  })

  it('should navigate to the Loan Details page after completing Personal Details', () => {
    fillPersonalDetails()

    cy.contains('Next').should('not.be.disabled')
    cy.contains('Next').click()

    cy.url().should('include', '/loan')
  })

  it('should validate loan details with incorrect values', () => {
    fillPersonalDetails()
    cy.contains('Next').click()

    cy.get('input[name="vehiclePrice"]').type('1000')
    cy.get('input[name="deposit"]').type('500')
    cy.get('input[name="loanTerm"]').type('12')
    cy.get('input[name="loanPurpose"]').type('Home Insurance').clear()

    cy.contains('Minimum vehicle price is $2000').should('be.visible')
    cy.contains(
      'The difference between Vehicle Price and Deposit must be greater than $2000.'
    ).should('be.visible')
    cy.contains('Loan term must be between 1-7 years').should('be.visible')
    cy.contains('Loan purpose is required')
  })

  it('should successfully move to previous Personal Details page when previous button is clicked from Loan Details Page', () => {
    fillPersonalDetails()
    cy.contains('Next').click()
    fillLoanDetails()
    cy.contains('Prev').click()

    cy.url().should('include', '/')
  })

  it('should successfully retain values in Personal Details page when previous button is clicked from Loan Details Page', () => {
    fillPersonalDetails()
    cy.contains('Next').click()
    fillLoanDetails()
    cy.contains('Prev').click()

    cy.get('input[name="firstName"]').should('have.value', 'Amit')
    cy.get('input[name="lastName"]').should('have.value', 'Bhandari')
    cy.get('input[name="dateOfBirth"]').should('have.value', '1995-01-01')
    cy.get('input[name="email"]').should('have.value', 'amit@example.com')
    cy.get('input[name="mobile"]').should('have.value', '1234567890')
    cy.get('input[name="address"]').should('have.value', '123 Pitt St')
    cy.get('select[name="employmentStatus"]').should('have.value', 'Employed')
    cy.get('input[name="employerName"]').should('have.value', 'Tech Corp')
    cy.get('input[name="annualIncome"]').should('have.value', '60000')

    cy.contains('Next').click()

    cy.get('input[name="vehiclePrice"]').should('have.value', '10000')
    cy.get('input[name="deposit"]').should('have.value', '3000')
    cy.get('input[name="loanTerm"]').should('have.value', '5')
    cy.get('input[name="loanPurpose"]').should('have.value', 'vehicle')
  })

  it('should successfully submit valid loan details and display results', () => {
    fillPersonalDetails()
    cy.contains('Next').click()
    fillLoanDetails()
    cy.contains('Next').click()

    cy.url().should('include', '/results')
    cy.location('pathname').should('eq', '/results')
    cy.contains('Loan Amount: $7000').should('be.visible')
    cy.contains('Loan Purpose: vehicle').should('be.visible')
    cy.contains('Loan Term: 5 years').should('be.visible')
  })

  it('should submit the loan details in LoanDetails Page and fetch lender offers in Results Page', () => {
    cy.mockLoanAPI()

    fillPersonalDetails()
    cy.contains('Next').click()

    fillLoanDetails()

    cy.get('button[type="submit"]').click()

    cy.wait('@submitLoanDetails').its('response.statusCode').should('eq', 201)
    cy.url().should('include', '/results')

    cy.wait('@fetchLenderOffers').its('response.statusCode').should('eq', 200)

    mockLendersResponse.forEach((lender) => {
      cy.contains(lender.name).should('exist')
      cy.contains(`Monthly Repayment: ${lender.monthlyRepayment}`).should(
        'exist'
      )
      cy.contains(`Interest Rate: ${lender.interestRate}`).should('exist')
      cy.contains(`Fees: ${lender.fees}`).should('exist')
    })
  })

  it('should display the error message in Results Page when an error occurs', () => {
    cy.mockLoanAPI({ statusCode: 500 })

    fillPersonalDetails()
    cy.contains('Next').click()

    fillLoanDetails()

    cy.get('button[type="submit"]').click()

    cy.wait('@fetchLenderOffers').its('response.statusCode').should('eq', 500)
    cy.contains('Could Not Load Lender Offers :Request failed!')
  })

  it('should redirect to the main page when accessing /loan or /results directly', () => {
    cy.visit('/loan')
    cy.url().should('include', '/')
    cy.visit('/results')
    cy.url().should('include', '/')
  })

  it('should redirect to the main page for an unknown route', () => {
    cy.visit('/unknown-route')

    cy.url().should('include', '/')
  })
})
