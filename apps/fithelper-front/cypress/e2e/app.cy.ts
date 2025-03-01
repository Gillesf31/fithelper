describe('fithelper-front', () => {
  const selectors = {
    email: 'test@fithelper.com',
    emailPatternError: '[data-testid="alert-email-pattern-error"]',
    emailInput: '[data-testid="email-input"]',
    passwordInput: '[data-testid="password-input"]',
    emailRequiredError: '[data-testid="alert-required-email-error"]',
    loginSubmitBtn: '[data-testid="login-submit-button"]',
  };

  beforeEach(() => cy.visit('/'));

  it('should display display a title', () => {
    cy.get('h1').contains('Login here!');
  });

  it('should display a disabled submit button', () => {
    cy.get(selectors.loginSubmitBtn).should('be.disabled');
  });

  it('should show warning for invalid email with disabled submit button', () => {
    cy.get(selectors.emailInput).type('Test email');
    cy.get(selectors.emailPatternError)
      .should('exist')
      .contains('Your input should be an email!');
  });

  it('should show warning for invalid email with disabled submit button', () => {
    cy.get(selectors.emailInput).type('Test email');
    cy.get(selectors.emailInput).clear();
    cy.get(selectors.emailRequiredError)
      .should('exist')
      .contains('Email is required!');
  });

  it('should enabled submit button', () => {
    cy.get(selectors.emailInput).type('test@test.com');
    cy.get(selectors.passwordInput).type('Test1234');
    cy.get(selectors.loginSubmitBtn).should('not.be.disabled');
  });

  it('should redirect to register page', () => {
    cy.get('[data-testid="register-link"]').click();
    cy.url().should('include', '/register');
  });

  it('should display non existing account error', () => {
    cy.intercept('POST', '**/auth/v1/*', {
      body: {
        email: selectors.email,
        data: {},
        create_user: false,
        gotrue_meta_security: {},
        code_challenge: null,
        code_challenge_method: null,
      },
      status: 400,
    }).as('login');
    cy.get(selectors.emailInput).type(selectors.email);
    cy.get(selectors.passwordInput).type('Test1234');
    cy.get(selectors.loginSubmitBtn).click();
    cy.wait('@login');
    cy.get('[data-testid="error-non-existent-account"]')
      .should('exist')
      .contains(`We couldn't find your account with ${selectors.email} email!`);
  });

  it('should login and redirect to homepage', () => {
    cy.get(selectors.emailInput).type(Cypress.env('PLAYWRIGHT_EMAIL'));
    cy.get(selectors.passwordInput).type(Cypress.env('PLAYWRIGHT_PASSWORD'));
    cy.get(selectors.loginSubmitBtn).click();
    cy.get('h1').contains('Welcome');
  });
});
