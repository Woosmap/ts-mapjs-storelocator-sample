/// <reference types="cypress" />

import userLatLng from "../../cypress/fixtures/userLatLng";
import {getConfig} from "../../src/configuration/config";

describe('Geolocation Use Cases', () => {
    before(() => {
        cy.visitWithGeolocation("http://localhost:1234", userLatLng);
    })
    it(`Geolocate the user on click search__geolocateBtn and display Nearby Stores`, () => {
        cy.get(`#${getConfig().selectors.searchWrapperID}`)
            .find('.search__geolocateBtn')
            .click()
        cy.get(`#${getConfig().selectors.listStoresContainerID}`).should('be.visible')
    })
})

