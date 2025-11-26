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
})
