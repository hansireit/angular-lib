import { ValidatorFn } from '@angular/forms';
import { ValidationError } from '../errors/validation-error';
import { BaseFormField } from './base-form-field';
import { FormFieldType } from "./form-field-type.enum";

export class NumberFormField extends BaseFormField<number> {
  constructor(
    key: string,
    name: string,
    formState: number | null = null,
    required = true,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    super(
      FormFieldType.NUMBER,
      key,
      name,
      formState,
      required,
      validators,
      validationErrors
    );
  }
}
