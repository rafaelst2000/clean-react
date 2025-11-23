import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={ { state: {} } }>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('Input', () => {
  test('Should begin with readOnly', () => {
    const fieldName = faker.random.word()
    const { getByTestId } = makeSut(fieldName)
    const input = getByTestId(fieldName) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const fieldName = faker.random.word()
    const { getByTestId } = makeSut(fieldName)
    const input = getByTestId(fieldName) as HTMLInputElement
    input.focus()
    expect(input.readOnly).toBe(false)
  })
})