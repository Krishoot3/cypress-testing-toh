/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getDataCy('heroes-button')
     */
    getDataCy(dataCy: string): Chainable<Element>
    /**
     * Custom command to click on message clear button.
     * @example cy.clearMessages()
     */
    clearMessages(): void
    /**
     * Custom command to check element visibility on the hero page.
     * @example cy.heroVisibility()
     */
    heroVisibility(): void
  }
}
