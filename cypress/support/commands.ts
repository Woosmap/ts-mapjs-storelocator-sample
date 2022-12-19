/// <reference types="cypress" />

import Selectors from "../../src/configuration/selectors.config";
import tiles from "../fixtures/tiles";
import streets from "../fixtures/streets";
import VisitOptions = Cypress.VisitOptions;

Cypress.Commands.add("getStoreLocator", () => {
    return cy.window().its("woosmapStoreLocator");
});

Cypress.Commands.add("searchLocality", (input: string) => {
    cy.get(`#${Selectors.searchInputID}`).should('be.visible')
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
    cy.visitWaitingMap(url, {
        onBeforeLoad: windowObj => stubGeolocation(windowObj, coords),
    });
});

Cypress.Commands.add("visitWaitingMap", (url, options?: Partial<VisitOptions>) => {
    cy.intercept('GET', 'https://api.woosmap.com/maps/tiles.json?*', (req) => {
        req.reply(res => {
            res.body = tiles;
        })
    }).as('woosmapTilesJSON');

    cy.intercept('GET', 'https://api.woosmap.com/maps/style/streets.json?*', (req) => {
        req.reply(res => {
            res.body = streets;
        })
    }).as('woosmapStreetsJSON');

    cy.intercept({
        method: 'GET',
        url: '**.pbf'
    }).as('woosmapTiles');

    cy.visit(url, options);

    cy.wait('@woosmapTilesJSON')
        .then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });
    cy.wait('@woosmapStreetsJSON')
        .then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });
    cy.wait('@woosmapTiles')
        .then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });
});
