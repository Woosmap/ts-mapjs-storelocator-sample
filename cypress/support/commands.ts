/// <reference types="cypress" />

import Selectors from "../../src/configuration/selectors.config";

Cypress.Commands.add("getStoreLocator", () => {
  return cy.window().its("woosmapStoreLocator");
});

Cypress.Commands.add("searchLocality", (input: string) => {
    cy.get(`#${Selectors.searchInputID}`)
        .type(input)
    cy.get(`.localities-container li[tabindex=1]`).should('be.visible')
    cy.get(`#${Selectors.searchInputID}`)
        .type("{enter}")
});


const stubGeolocation = (windowObj: Cypress.AUTWindow, coords: GeolocationCoordinates) => {
    cy.stub(windowObj.navigator.permissions, "query").callsFake(
        (permissionDesc) => {
            if (permissionDesc.name === "geolocation") {
                return Promise.resolve({
                    state: "granted",
                });
            }
            return windowObj.navigator.permissions.query(permissionDesc);
        },
    );

    cy.stub(windowObj.navigator.geolocation, "getCurrentPosition").callsFake(
        success => {
            return success({
                coords,
            });
        },
    );
};

Cypress.Commands.add("visitWithGeolocation", (url, coords) => {
    cy.visit(url, {
        onBeforeLoad: windowObj => stubGeolocation(windowObj, coords),
    });
});
