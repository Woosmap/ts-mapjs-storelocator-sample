/// <reference types="cypress" />
import {getConfig} from "../../src/configuration/config";

const mapJSUrl = `${getConfig().urls.mapJS}?key=${getConfig().map.woosmapPublicKey}&language=en`;
const localitiesJSUrl = `${getConfig().urls.localitiesWidgetJS}?key=${getConfig().map.woosmapPublicKey}&language=en`;

describe('Opening Store Locator', () => {
    before(() => {
        cy.visitWaitingMap('http://localhost:1234/')
    })
    it('Check the scripts loading', () => {
        it('Check Map JS Library', () => {
            cy.get(`head script[src="${mapJSUrl}"]`).should('exist');
        })
        it('Check Localities JS Library', () => {
            cy.get(`head script[src="${localitiesJSUrl}"]`).should('exist');
        })
    })
})
