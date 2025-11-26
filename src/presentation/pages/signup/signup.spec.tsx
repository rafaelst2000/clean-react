import React from 'react'
import Signup from './signup'
import { cleanup, render, RenderResult } from '@testing-library/react'
import { populateField, testButtonIsDisabled, testChildCount, testStatusForField, ValidationStub } from '@/presentation/test'
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
  const sut = render(
      <Signup
        validation={validationStub}
      />
  )

  return { sut }
}

describe('Signup Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show Name Error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'name')
    testStatusForField(sut, 'name', validationError)
  })

  test('Should show Email Error if Validation fails', () => {
    const validationError = faker.internet.email()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'email')
    testStatusForField(sut, 'email', validationError)
  })

  test('Should show Password Error if Validation fails', () => {
    const validationError = faker.internet.password()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'password')
    testStatusForField(sut, 'password', validationError)
  })

  test('Should show PasswordConfirmation Error if Validation fails', () => {
    const validationError = faker.internet.password()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'passwordConfirmation')
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'name')
    testStatusForField(sut, 'name')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'email')
    testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'password')
    testStatusForField(sut, 'password')
  })

  test('Should show valid password confirmation state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'password')
    testStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateField(sut, 'name')
    populateField(sut, 'email')
    populateField(sut, 'password')
    populateField(sut, 'passwordConfirmation')
    testButtonIsDisabled(sut, 'submit', false)
  })
})
