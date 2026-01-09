import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

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

  it('Should present invalid credentials on 401', () => {
    cy.intercept({
      method: 'POST',
      url: /login/
    }, {
      statusCode: 401,
      response: {
        error: faker.random.words()
      }
    })

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas')

    cy.url().should('eq', baseUrl + '/login')
  })

  it('Should present unexpected error on 400', () => {
    cy.intercept({
      method: 'POST',
      url: /login/
    }, {
      statusCode: 400,
      response: {
        error: faker.random.words()
      }
    })

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')

    cy.url().should('eq', baseUrl + '/login')
  })

  // it.only('Should present save accessToken if valid credentials are provided', () => {
  //   cy.intercept({
  //     method: 'POST',
  //     url: /login/
  //   }, {
  //     statusCode: 200,
  //     response: {
  //       accessToken: faker.datatype.uuid()
  //     }
  //   }).as('request')

  //   cy.getByTestId('email').focus()
  //   cy.getByTestId('email').type(faker.internet.email())

  //   cy.getByTestId('password').focus()
  //   cy.getByTestId('password').type(faker.random.alphaNumeric(5))

  //   cy.getByTestId('submit').click()
  //   cy.getByTestId('main-error').should('not.exist')
  //   cy.getByTestId('spinner').should('not.exist')

  //   cy.url().should('eq', baseUrl + '/')
  //   cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  // })

  it('Should prevent multiple submits', () => {
    cy.intercept({
      method: 'POST',
      url: /login/
    }, {
      statusCode: 200,
      response: {
        accessToken: faker.datatype.uuid()
      }
    }).as('request')

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').dblclick()

    cy.get('@request.all').should('have.length', 1)
  })
})
