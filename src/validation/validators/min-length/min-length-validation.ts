import { InvalidFieldError } from '@/validation/errors'
import { FieldValiation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValiation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (value: string): Error {
    return value.length >= this.minLength ? null : new InvalidFieldError()
  }
}
