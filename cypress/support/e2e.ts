// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import './commands'

Cypress.on(`window:before:load`, win => {
    cy.stub(win.console, `error`).callsFake(msg => {
        cy.now(`task`, `error`, msg);
        throw new Error(msg);
    });
});

