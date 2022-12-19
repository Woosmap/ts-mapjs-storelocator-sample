/// <reference types="cypress" />

import {SearchLocation} from "../../src/components/search/search";
import StoreLocator from "../../src/App";

interface Window {
  woosmapStoreLocator: StoreLocator
}

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Get StoreLocator Parent component
             */
            getStoreLocator(): Chainable<StoreLocator>;

            /**
             * Select data range within date range picker component
             */
            searchLocality(searchInput: string): Chainable<void>;

            /**
             * Select locality in suggestion pick list
             */
            pickLocality(selectedLocation: SearchLocation): Chainable<void>;

            /**
             * Visit an URl with navigator geolocation stub for a user Position
             */
            visitWithGeolocation(url: string, coords: GeolocationCoordinates): Chainable<void>;

            /**
             * Visit an URl and wait for Map Tiles to be rendered
             */
            visitWaitingMap(url: string, options?: Partial<VisitOptions>): Chainable<void>;
        }
    }
}
