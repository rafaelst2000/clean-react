import { FieldValiation } from '@/validation/protocols'

export class FieldValidationSpy implements FieldValiation {
  error: Error = null
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return this.error
  }
}
