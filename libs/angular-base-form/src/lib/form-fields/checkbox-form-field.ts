import { ValidatorFn } from '@angular/forms';
import { ValidationError } from '../errors/validation-error';
import { BaseFormField } from './base-form-field';
import { FormFieldType } from "./form-field-type.enum";

export class CheckboxFormField extends BaseFormField<boolean> {
  constructor(
    key: string,
    name: string,
    formState = false,
    required = true,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    super(
      FormFieldType.CHECKBOX,
      key,
      name,
      formState,
      required,
      [...validators],
      [...validationErrors]
    );
  }
}
