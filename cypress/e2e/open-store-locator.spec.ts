/// <reference types="cypress" />
context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:1234/')
    })
    it('looks inside the head content using to check the load of Map JS Library', () => {
        cy.get(`head script[src="${Cypress.env('mapJS')}?key=${Cypress.env('publicKey')}"]`)
    })
})
