/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

interface MockLoanAPIOptions {
  statusCode?: number
}
export const mockLendersResponse = [
  {
    name: 'Lender A',
    monthlyRepayment: '$300.22',
    interestRate: '5.5%',
    fees: '$10 processing fee',
  },
  {
    name: 'Lender B',
    monthlyRepayment: '$290.12',
    interestRate: '5.0%',
    fees: '$15 application fee',
  },
  {
    name: 'Lender C',
    monthlyRepayment: '$310.42',
    interestRate: '6.0%',
    fees: 'No fees',
  },
]

Cypress.Commands.add(
  'mockLoanAPI',
  (options: MockLoanAPIOptions = { statusCode: 200 }) => {
    cy.intercept('POST', 'http://localhost:5000/api/lenders', {
      statusCode: 201,
      body: { success: true },
    }).as('submitLoanDetails')

    cy.intercept('GET', 'http://localhost:5000/api/lenders', (req) => {
      req.reply({
        delay: 100,
        statusCode: options.statusCode || 200,
        body:
          options.statusCode === 200
            ? mockLendersResponse
            : { error: 'An error occurred' },
      })
    }).as('fetchLenderOffers')
  }
)
