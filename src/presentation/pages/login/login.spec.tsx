import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} />)

  return {
    sut
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const { getByTestId } = sut
    
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
    
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show Email Error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const { getByTestId } = sut
    const email = faker.internet.email()
    const emailInput = getByTestId('email')

    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = getByTestId('email-status') 
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show Password Error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const { getByTestId } = sut
    const password = faker.internet.password()
    const passwordInput = getByTestId('email')

    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = getByTestId('password-status') 
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    const email = faker.internet.email()
    const emailInput = getByTestId('email')

    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = getByTestId('email-status') 
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    const password = faker.internet.password()
    const passwordInput = getByTestId('email')

    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = getByTestId('password-status') 
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    const email = faker.internet.email()
    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const password = faker.internet.password()
    const passwordInput = getByTestId('email')
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    const email = faker.internet.email()
    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const password = faker.internet.password()
    const passwordInput = getByTestId('email')
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)
    
    const spinner = getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
})