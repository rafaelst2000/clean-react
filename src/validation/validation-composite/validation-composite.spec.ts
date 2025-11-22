import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any')
    fieldValidationSpy.error = new Error('first error')

    const fieldValidationSpy2 = new FieldValidationSpy('any')
    fieldValidationSpy2.error = new Error('second error')
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2
    ])
    const error = sut.validate('any', 'any_value')
    expect(error).toBe('first error')
  })
})
