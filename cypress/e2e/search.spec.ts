/// <reference types="cypress" />

import Selectors from "../../src/configuration/selectors.config";
import searchInput from "../fixtures/searchInput";
import Urls from "../../src/configuration/urls.config";
import {WoosmapPublicKey} from "../../src/configuration/map.config";

const localitiesJSUrl = `${Urls.localitiesWidgetJS}?key=${WoosmapPublicKey}`;

describe('Searching for locality Use Case', () => {
    before(() => {
        cy.visit('http://localhost:1234/')
    })
    it(`search for ${searchInput.london} in Localities Widget and display nearby stores`, () => {
        cy.get(`head script[src="${localitiesJSUrl}"]`).should('exist');
        cy.searchLocality(searchInput.london);
        cy.get(`#${Selectors.listStoresContainerID}`).should('be.visible');
    })

})
