/// <reference types="cypress" />

import {SearchLocation} from "../../src/components/search/search";

declare global {
    namespace Cypress {
        interface Chainable {
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
        }
    }
}
