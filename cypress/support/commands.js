/// <reference types="cypress" />

Cypress.Commands.add('getDataCy', (dataCy) => {
  return cy.get(`[data-cy=${dataCy}]`)
})

Cypress.Commands.add('clearMessages', () => {
  cy.getDataCy('message-button-clear').click().wait(250)
  cy.getDataCy('message-div').should('not.exist')
  cy.getDataCy('message-button-clear').should('not.exist')
})

Cypress.Commands.add('heroVisibility', () => {
  cy.getDataCy('dashboard-button-link').should('be.visible')
  cy.getDataCy('heroes-button-link').should('be.visible')
  cy.getDataCy('hero-span-id').should('be.visible')
  cy.getDataCy('title-h1').should('have.text', 'Tour of Heroes')
  cy.url().should('include', '/detail')
})
