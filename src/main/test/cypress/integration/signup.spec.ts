import faker from 'faker'
import { localStorageItem, simulateValidSubmit, testHttpCallsCount, testInputStatus, testMainError, testUrl } from '../support/form-helper'
import { mockInvalidCredentialsError, mockOk, mockUnexpectedError } from '../support/login-mocks'

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

  // it('Should present error state if form is invalid', () => {
  //   cy.getByTestId('email').focus()
  //   cy.getByTestId('email').type(faker.random.word())

  //   cy.getByTestId('password').focus()
  //   cy.getByTestId('password').type(faker.random.alphaNumeric(4))

  //   testInputStatus('email', 'Campo inválido')
  //   testInputStatus('password', 'Campo inválido')

  //   cy.getByTestId('submit').should('have.attr', 'disabled')
  //   cy.getByTestId('error-wrap').should('not.have.descendants')
  // })

  // it('Should present valid state if form is valid', () => {
  //   cy.getByTestId('email').focus()
  //   cy.getByTestId('email').type(faker.internet.email())

  //   cy.getByTestId('password').focus()
  //   cy.getByTestId('password').type(faker.random.alphaNumeric(5))

  //   testInputStatus('email')
  //   testInputStatus('password')

  //   cy.getByTestId('submit').should('not.have.attr', 'disabled')
  //   cy.getByTestId('error-wrap').should('not.have.descendants')
  // })

  // it('Should present invalid credentials on 401', () => {
  //   mockInvalidCredentialsError()
  //   simulateValidSubmit()
  //   testMainError('Credenciais inválidas')

  //   testUrl('/login')
  // })

  // it('Should present unexpected error on 400', () => {
  //   mockUnexpectedError()
  //   simulateValidSubmit()
  //   testMainError('Algo de errado aconteceu. Tente novamente em breve.')

  //   testUrl('/login')
  // })

  // it('Should present save accessToken if valid credentials are provided', () => {
  //   mockOk()
  //   simulateValidSubmit()

  //   cy.getByTestId('main-error').should('not.exist')
  //   cy.getByTestId('spinner').should('not.exist')

  //   testUrl('/')
  //   localStorageItem('accessToken')
  // })

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
