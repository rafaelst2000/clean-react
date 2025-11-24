import { FieldValiation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValiation {
  constructor (readonly field: string, private readonly valueToCompare: string) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
