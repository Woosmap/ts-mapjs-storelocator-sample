/// <reference types="cypress" />

import userLatLng from "../../cypress/fixtures/userLatLng";
import Selectors from "../../src/configuration/selectors.config";

describe('Geolocation Use Cases', () => {
    before(() => {
        cy.visitWithGeolocation("http://localhost:1234", userLatLng);
    })
    it(`Geolocate the user on click search__geolocateBtn and display Nearby Stores`, () => {
        cy.get(`#${Selectors.searchWrapperID}`)
            .find('.search__geolocateBtn')
            .click()
        cy.get(`#${Selectors.listStoresContainerID}`).should('be.visible')
    })
})

