import { InvalidFieldError } from '@/validation/errors'
import { FieldValiation } from '@/validation/protocols'

export class EmailValidation implements FieldValiation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return emailRegex.test(value) ? null : new InvalidFieldError()
  }
}
