import { RenderResult } from '@testing-library/react'

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const { getByTestId } = sut
  const button = getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const { getByTestId } = sut
  const fieldStatus = getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  testElementText(sut, `${fieldName}-status`, validationError ? '🔴' : '🟢')
}

export const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const { getByTestId } = sut
  const element = getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const { getByTestId } = sut
  const element = getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}
