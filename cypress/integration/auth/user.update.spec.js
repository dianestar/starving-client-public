after("delete user", () => {
  cy.get(".space-x-2 > :nth-child(1)").click();
  cy.get(".SnackbarItem-action > :nth-child(2)")
    .click()
    .title()
    .should("eq", "STARVING");
});

describe("user update", () => {
  const mockUser = {
    email: "e2e@gmail.com",
    nickname: "mocking",
    password: "mockPassword123",
    confirmPassword: "mockPassword123",
  };

  describe("update nickname", () => {
    it("should fail my page if not found user", () => {
      cy.visit("mypage");
      cy.title().should("eq", "STARVING | LOGIN");
    });

    it("should register user account", () => {
      cy.visit("register");
      cy.get('[name="email"]').type(`${mockUser.email}`);
      cy.get('[name="nickname"]').type(`${mockUser.nickname}`);
      cy.get('[name="password"]').type(`${mockUser.password}`);
      cy.get(".mb-3").type(`${mockUser.confirmPassword}`);
      cy.get(".h-12").click();
      cy.title().should("eq", "STARVING | LOGIN");
    });

    it("should update nickname", () => {
      cy.visit("/login")
        .get('[placeholder="이메일주소"]')
        .type(`${mockUser.email}`)
        .get('[type="password"]')
        .type(`${mockUser.password}`)
        .get(".w-full > .rounded")
        .click()
        .title()
        .should("eq", "STARVING");
      cy.wait(1000);
      cy.visit("mypage")
        .title()
        .should("eq", "STARVING | MYPAGE")
        .get(":nth-child(1) > .border-b")
        .type("z")
        .get("form > .flex > :nth-child(2) > .text-sm")
        .should("have.text", "닉네임은 2자리 이상 12자리 이하입니다.");
      cy.get(":nth-child(1) > .border-b")
        .clear()
        .type("testMad")
        .get("form > :nth-child(2) > .px-5")
        .click()
        .title()
        .should("eq", "STARVING | LOGIN");
    });

    it("login again", () => {
      cy.visit("/login")
        .get('[placeholder="이메일주소"]')
        .type(`${mockUser.email}`)
        .get('[type="password"]')
        .type(`${mockUser.password}`)
        .get(".w-full > .rounded")
        .click()
        .title()
        .should("eq", "STARVING");
      cy.wait(1000);
      cy.visit("mypage").title().should("eq", "STARVING | MYPAGE");
    });
  });
});
