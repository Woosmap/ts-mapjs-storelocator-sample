/// <reference types="cypress" />

import Selectors from "../../src/configuration/selectors.config";
import searchInput from "../fixtures/searchInput";
import Urls from "../../src/configuration/urls.config";
import {WoosmapPublicKey} from "../../src/configuration/map.config";

const localitiesJSUrl = `${Urls.localitiesWidgetJS}?key=${WoosmapPublicKey}`;

describe('Searching for locality Use Case', () => {
    before(() => {
        cy.intercept('GET', 'https://api.woosmap.com/localities/autocomplete/**/*')
            .as('localitiesAutocomplete');
        cy.intercept('GET', 'https://api.woosmap.com/stores/search/**/*')
            .as('storesSearch');
        cy.visitWaitingMap('http://localhost:1234/')
    })
    it(`search for ${searchInput.london} in Localities Widget and display nearby stores`, () => {
        cy.get(`head script[src="${localitiesJSUrl}"]`).should('exist');
        cy.searchLocality(searchInput.montpellier);
        cy.wait('@localitiesAutocomplete')
            .then((interception) => {
                expect(interception.response?.statusCode).to.equal(200);
            });
        cy.wait('@storesSearch')
            .then((interception) => {
                expect(interception.response?.statusCode).to.equal(200);
            });
        cy.get(`#${Selectors.listStoresContainerID}`).should('be.visible');
    })

})
