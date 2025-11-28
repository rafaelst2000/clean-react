export interface FieldValiation {
  field: string
  validate: (input: object) => Error
}
