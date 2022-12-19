// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import './commands'

// Catches an unexplained error experienced while loading the map.
Cypress.on('uncaught:exception', (err, runnable, promise) => {
  // returning false here prevents Cypress from failing the test
  if (
      err.message &&
      err.message.includes("Could not load image because of out of range source coordinates for image copy")
  ) {
    return false;
  }
});
