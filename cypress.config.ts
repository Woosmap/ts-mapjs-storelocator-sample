import {defineConfig} from "cypress";


export default defineConfig({
    video: false,
    modifyObstructiveCode: false,
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "http://localhost:1234",
        specPattern: 'cypress/e2e/**/*.spec.ts',
    },
});
