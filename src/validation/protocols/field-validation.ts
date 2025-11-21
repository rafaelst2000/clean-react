export interface FieldValiation {
  field: string
  validate: (value: string) => Error
}
