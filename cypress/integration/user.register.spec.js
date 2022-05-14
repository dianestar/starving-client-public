describe("user register", () => {
  it("should render register form", () => {
    cy.visit("register").title().should("eq", "STARVING | REGISTER");
  });

  it("should click submit then empty fields", () => {
    cy.get(".h-12").click().visit("register");
  });

  it("should render the email format message if not match email validation", () => {
    cy.get('[name="email"]')
      .type("badEmailRequest")
      .get(".text-sm")
      .should("have.text", "이메일을 입력해 주세요");
  });

  it("should success email format", () => {
    cy.get('[name="email"]').clear().type("starving@gmail.com");
  });

  it("should render the nickname format message if not match nickname validation", () => {
    cy.get('[name="nickname"]')
      .type("nick")
      .clear()
      .get(".text-sm")
      .should("have.text", "이름을 입력해주세요");
  });

  it("should success nickname format", () => {
    cy.get('[name="nickname"]').clear().type("mynickname");
  });

  it("should render the password format message if not match password validation", () => {
    cy.get('[name="password"]')
      .type("12345")
      .get(".text-sm")
      .should("have.text", "비밀번호는 최소 8자리 입니다");
  });

  it("should success password format", () => {
    cy.get('[name="password"]').clear().type("1234567890");
  });

  it("should do not match confirm password", () => {
    cy.get(".mb-3")
      .type("1234567899")
      .get(".text-sm")
      .should("have.text", "비밀번호가 일치하지 않습니다");
  });

  it("should match confirm password", () => {
    cy.get(".mb-3").clear().type("1234567890");
  });

  describe("should already fields", () => {
    it("email already to exists", () => {
      cy.get(".h-12").click();
      cy.get('[name="email"]').clear().type("zxczxc@gmail.com");
    });

    it("nickname already to exists", () => {
      cy.get('[name="nickname"]').clear().type("abcxyz11");
      cy.get(".h-12").click();
    });
  });

  describe("should login user", () => {
    it("try login user", () => {
      cy.visit("login");
      cy.get('[placeholder="이메일주소"]')
        .type("zxczxc@gmail.com")
        .get('[type="password"]')
        .type("1234567890")
        .get(".w-full > .rounded")
        .click();
      cy.title().should("eq", "STARVING");
    });
  });
});
