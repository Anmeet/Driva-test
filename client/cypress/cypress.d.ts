declare namespace Cypress {
  interface Chainable {
    mockLoanAPI(): Chainable<Element> // Adjust the return type as necessary
  }
}
