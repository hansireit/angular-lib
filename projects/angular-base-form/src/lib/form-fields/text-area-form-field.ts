import { ValidatorFn } from '@angular/forms';
import { ValidationError } from '../errors/validation-error';
import { BaseFormField } from './base-form-field';
import { FormFieldType } from "./form-field-type.enum";

export class TextAreaFormField extends BaseFormField<string> {
  constructor(
    key: string,
    name: string,
    formState = '',
    required = true,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    super(
      FormFieldType.TEXTAREA,
      key,
      name,
      formState,
      required,
      validators,
      validationErrors
    );
  }
}
