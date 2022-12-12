import {defineConfig} from "cypress";
import {WoosmapPublicKey} from "./src/configuration/map.config";
import Urls from "./src/configuration/urls.config";


export default defineConfig({
    video: false,
    modifyObstructiveCode: false,
    env: {
        publicKey: WoosmapPublicKey,
        mapJS: Urls.mapJS
    },
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "http://localhost:1234",
        specPattern: 'cypress/e2e/**/*.spec.ts',
    },
});
