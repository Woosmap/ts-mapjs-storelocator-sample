/// <reference types="cypress" />

import Selectors from "../../src/configuration/selectors.config";
import searchInput from "../fixtures/searchInput";

describe('Searching for locality Use Case', () => {
    beforeEach(() => {
        cy.visit('http://localhost:1234/')
    })
    it(`search for ${searchInput.london} in Localities Widget and display nearby stores`, () => {
        cy.searchLocality(searchInput.london).then(() => {
            cy.get(`#${Selectors.listStoresContainerID}`).should('be.visible')
        })
    })

})
