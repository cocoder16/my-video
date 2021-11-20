/// <reference types="Cypress" />

describe("dist integration test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("find video tag", () => {
    cy.get("video");
  });
});
