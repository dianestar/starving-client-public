import { USER_FORM_CONSTANTS } from "../../../constants/form/user.constants";

describe("user register", () => {
  it("should render register form", () => {
    cy.visit("register").title().should("eq", "STARVING | REGISTER");
  });

  it("should click submit then empty fields", () => {
    cy.get(".input-signup").click().visit("register");
  });

  it("should render the email format message if not match email validation", () => {
    cy.get(".input-email")
      .type("badEmailRequest")
      .get(".error-message-form")
      .should("have.text", USER_FORM_CONSTANTS.PATTERN.email);
  });

  it("should clear email", () => {
    cy.get(".input-email").clear();
    cy.get(".error-message-form").should(
      "have.text",
      USER_FORM_CONSTANTS.REQUIRED.email
    );
    cy.get(".input-email").type("success@gmail.com").end();
  });

  it("should render the nickname format message if not match nickname validation", () => {
    cy.get(".input-nickname")
      .type("x")
      .get(".error-message-form")
      .should("have.text", USER_FORM_CONSTANTS.PATTERN.nickname);
  });

  it("should render the nickname format length", () => {
    cy.get(".input-nickname")
      .type("aaaaabbbbbbbbbb")
      .get(".error-message-form")
      .should("have.text", USER_FORM_CONSTANTS.PATTERN.nickname);
  });

  it("should clear nickname", () => {
    cy.get(".input-nickname").clear();
    cy.get(".error-message-form").should(
      "have.text",
      USER_FORM_CONSTANTS.REQUIRED.nickname
    );
    cy.get(".input-nickname").type("success").end();
  });
  //
  // it("should success nickname format", () => {
  //   cy.get('[name="nickname"]').clear().type("mynickname");
  // });
  //
  // it("should render the password format message if not match password validation", () => {
  //   cy.get('[name="password"]')
  //     .type("12345")
  //     .get(".text-sm")
  //     .should("have.text", "비밀번호는 최소 8자리 입니다");
  // });
  //
  // it("should success password format", () => {
  //   cy.get('[name="password"]').clear().type("1234567890");
  // });
  //
  // it("should do not match confirm password", () => {
  //   cy.get(".mb-3")
  //     .type("1234567899")
  //     .get(".text-sm")
  //     .should("have.text", "비밀번호가 일치하지 않습니다");
  // });
  //
  // it("should match confirm password", () => {
  //   cy.get(".mb-3").clear().type("1234567890");
  // });
  //
  // describe("should already fields", () => {
  //   it("email already to exists", () => {
  //     cy.get(".h-12").click();
  //     cy.get('[name="email"]').clear().type("zxczxc@gmail.com");
  //   });
  //
  //   it("nickname already to exists", () => {
  //     cy.get('[name="nickname"]').clear().type("abcxyz11");
  //     cy.get(".h-12").click();
  //   });
  // });
  //
  // describe("should login user", () => {
  //   it("try login user", () => {
  //     cy.visit("login");
  //     cy.get('[placeholder="이메일주소"]')
  //       .type("zxczxc@gmail.com")
  //       .get('[type="password"]')
  //       .type("1234567890")
  //       .get(".w-full > .rounded")
  //       .click();
  //     cy.title().should("eq", "STARVING");
  //     cy.visit("mypage");
  //     cy.get(".space-x-2 > :nth-child(1)")
  //       .click()
  //       .get(".SnackbarItem-action > :nth-child(2)")
  //       .click()
  //       .visit("/")
  //       .title()
  //       .should("eq", "STARVING");
  //   });
  // });
});
