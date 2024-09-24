export const fillPersonalDetails = () => {
  cy.get('input[name="firstName"]').type('Amit')
  cy.get('input[name="lastName"]').type('Bhandari')
  cy.get('input[name="dateOfBirth"]').type('1995-01-01')
  cy.get('input[name="email"]').type('amit@example.com')
  cy.get('input[name="mobile"]').type('1234567890')
  cy.get('input[name="address"]').type('123 Pitt St')
  cy.get('select[name="employmentStatus"]').select('Employed')
  cy.get('input[name="employerName"]').type('Tech Corp')
  cy.get('input[name="annualIncome"]').type('60000')
}

export const fillLoanDetails = () => {
  cy.get('input[name="vehiclePrice"]').type('10000')
  cy.get('input[name="deposit"]').type('3000')
  cy.get('input[name="loanPurpose"]').type('vehicle')
  cy.get('input[name="loanTerm"]').type('5')
}
