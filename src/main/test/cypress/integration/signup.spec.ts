import faker from 'faker'
import { localStorageItem, testHttpCallsCount, testInputStatus, testMainError, testUrl } from '../support/form-helper'
import { mockEmailInUseError, mockUnexpectedError, mockOk } from '../support/signup-mocks'

const simulateValidSubmit = (): void => {
  const password = faker.random.alphaNumeric(5)

  cy.getByTestId('name').focus()
  cy.getByTestId('name').type(faker.name.findName())

  cy.getByTestId('email').focus()
  cy.getByTestId('email').type(faker.internet.email())

  cy.getByTestId('password').focus()
  cy.getByTestId('password').type(password)

  cy.getByTestId('passwordConfirmation').focus()
  cy.getByTestId('passwordConfirmation').type(password)

  cy.getByTestId('submit').click()
}

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    testInputStatus('name', 'Campo obrigatório')
    testInputStatus('email', 'Campo obrigatório')
    testInputStatus('password', 'Campo obrigatório')
    testInputStatus('passwordConfirmation', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus()
    cy.getByTestId('name').type(faker.random.alphaNumeric(4))

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.random.word())

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(4))

    cy.getByTestId('passwordConfirmation').focus()
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(4))

    testInputStatus('name', 'Campo inválido')
    testInputStatus('email', 'Campo inválido')
    testInputStatus('password', 'Campo inválido')
    testInputStatus('passwordConfirmation', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    const password = faker.random.alphaNumeric(5)

    cy.getByTestId('name').focus()
    cy.getByTestId('name').type(faker.name.findName())

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(password)

    cy.getByTestId('passwordConfirmation').focus()
    cy.getByTestId('passwordConfirmation').type(password)

    testInputStatus('name')
    testInputStatus('email')
    testInputStatus('password')
    testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    mockEmailInUseError()
    simulateValidSubmit()
    testMainError('Esse e-mail já está em uso.')

    testUrl('/signup')
  })

  it('Should present UnexpectedRrror on 400', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente em breve.')

    testUrl('/signup')
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    mockOk()
    simulateValidSubmit()

    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')

    testUrl('/')
    localStorageItem('accessToken')
  })

  // it('Should prevent multiple submits', () => {
  //   mockOk()

  //   cy.getByTestId('email').focus()
  //   cy.getByTestId('email').type(faker.internet.email())

  //   cy.getByTestId('password').focus()
  //   cy.getByTestId('password').type(faker.random.alphaNumeric(5))

  //   cy.getByTestId('submit').dblclick()
  //   cy.wait('@request')

  //   testHttpCallsCount(1)
  // })

  // it('Should not call submit if form is invalid', () => {
  //   mockOk()

  //   cy.getByTestId('email').focus()
  //   cy.getByTestId('email').type(faker.internet.email())
  //   cy.getByTestId('email').type('{enter}')

  //   testHttpCallsCount(0)
  // })
})
