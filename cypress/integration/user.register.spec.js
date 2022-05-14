describe("user register", () => {
  it("should render register form", () => {
    cy.visit("register").title().should("eq", "STARVING | REGISTER");
  });
});
