/// <reference types="cypress" />

describe('Test Tour of Heroes application', () => {
  it('Test Dashboard and Heroes pages', () => {
    cy.visit('/')
    cy.url().should('include', '/dashboard')
    //visibility on the dashboard page
    cy.getDataCy('dashboard-button-link').should('be.visible')
    cy.getDataCy('heroes-button-link').should('be.visible')
    cy.getDataCy('heroSearch-input-searchBox').should('be.visible')
    cy.getDataCy('message-button-clear').should('be.visible')
    cy.getDataCy('message-div').should('be.visible')
    //contain text and length
    cy.getDataCy('title-h1').should('contain.text', 'Tour of Heroes')
    cy.getDataCy('dashboard-h2').should('contain.text', 'Top Heroes')
    cy.getDataCy('message-h2').should('contain.text', 'Messages')
    cy.getDataCy('heroSearch-label').should('contain.text', 'Hero Search')
    cy.getDataCy('dashboard-link-hero').should('have.length', 4)

    //search for a hero
    cy.getDataCy('heroSearch-input-searchBox').type('Narco').wait(500)
    cy.getDataCy('heroSearch-link-hero').click()
    cy.heroVisibility()
    cy.getDataCy('heroDetail-input-name')
      .invoke('val')
      .then((val) => expect(val).to.equal('Narco'))
    cy.getDataCy('heroDetail-button-save').should('be.visible')
    cy.getDataCy('heroDetail-button-goBack').click()
    //clear messages
    cy.clearMessages()

    //update top heroes
    cy.getDataCy('dashboard-link-hero')
      .its('length')
      .then((heroLength) => {
        for (let i: number = 0; i < heroLength; i++) {
          cy.getDataCy('dashboard-link-hero').eq(i).click()
          cy.heroVisibility()
          //update name
          cy.getDataCy('heroDetail-input-name')
            .clear()
            .type('Test' + i.toString())
            .invoke('val')
            .then((val) => expect(val).to.equal(val))
          cy.getDataCy('hero-h2-name').should('have.text', `TEST${i.toString()} Details`)
          cy.getDataCy('heroDetail-button-goBack').should('be.visible')
          cy.clearMessages()
          cy.getDataCy('heroDetail-button-save').click()
          cy.getDataCy('dashboard-link-hero')
            .eq(i)
            .invoke('text')
            .then((txt) => expect(txt.trim()).to.equal('Test' + i.toString()))
        }
      })
      .wait(1000)

    //go to the heroes page
    cy.getDataCy('heroes-button-link').click().wait(1000)
    cy.url().should('include', '/heroes')
    //visibility on the heroes page
    cy.getDataCy('dashboard-button-link').should('be.visible')
    cy.getDataCy('heroes-button-link').should('be.visible')
    cy.getDataCy('hero-h2').should('contain.text', 'My Heroes')
    cy.getDataCy('hero-input-name').should('be.visible')
    cy.getDataCy('hero-button-add').should('be.visible')
    cy.getDataCy('message-button-clear').should('be.visible')
    cy.getDataCy('message-div').should('be.visible')
    cy.getDataCy('hero-link').should('be.visible')

    //update first hero
    cy.getDataCy('hero-link').eq(0).click()
    cy.getDataCy('heroDetail-input-name').clear().type('Hello')
    cy.getDataCy('heroDetail-button-save').click()
    cy.getDataCy('hero-link')
      .eq(0)
      .invoke('text')
      .then((txt) => expect(txt.substring(3).trim()).to.equal('Hello'))

    //add a new hero
    cy.getDataCy('hero-link').its('length').as('heroLinkLength')
    cy.getDataCy('hero-input-name')
      .clear()
      .type('Test name')
      .invoke('val')
      .then((val) => expect(val).to.equal(val))
    cy.getDataCy('hero-button-add').click().wait(500)
    cy.get('@heroLinkLength').then((oldLength) => {
      cy.getDataCy('hero-link').its('length').should('be.gt', oldLength)
    })

    //delete all the heroes
    cy.getDataCy('hero-button-delete').each(($el) =>
      cy.wrap($el).click({ force: true }).wait(250),
    )
    cy.getDataCy('hero-link').should('not.exist').wait(250)
    //clear meassages
    cy.clearMessages()

    //back to the dashboard
    cy.getDataCy('dashboard-button-link').click()
    cy.getDataCy('dashboard-hero-link').should('not.exist')
  })
})
