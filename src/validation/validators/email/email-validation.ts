import { InvalidFieldError } from '@/validation/errors'
import { FieldValiation } from '@/validation/protocols'

export class EmailValidation implements FieldValiation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
