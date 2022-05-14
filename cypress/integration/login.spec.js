describe("should init", () => {
  it("should render main", () => {
    cy.visit("/");
  });

  it("should go head login router", () => {
    cy.visit("/login").title().should("eq", "STARVING | LOGIN");
  });

  it("should fail login if not found user", () => {
    cy.get('[placeholder="이메일주소"]')
      .type("notfound@gmail.com")
      .get('[type="password"]')
      .type("123123123")
      .get(".w-full > .rounded")
      .click();
  });

  it("should fail login if no match password", () => {
    cy.visit("/login")
      .get('[placeholder="이메일주소"]')
      .type("starving@gmail.com")
      .get('[type="password"]')
      .type("123123123")
      .get(".w-full > .rounded")
      .click();
  });

  it("should success login", () => {
    cy.visit("/login")
      .get('[placeholder="이메일주소"]')
      .type("starving@gmail.com")
      .get('[type="password"]')
      .type("abcabc123123")
      .get(".w-full > .rounded")
      .click()
      .title()
      .should("eq", "STARVING");
  });
});
