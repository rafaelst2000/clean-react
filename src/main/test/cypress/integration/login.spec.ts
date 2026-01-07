import faker from 'faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatório').should('contain.text', '🔴')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo obrigatório').should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.random.word())

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(4))

    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo inválido').should('contain.text', '🔴')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo inválido').should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('email-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟢')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
