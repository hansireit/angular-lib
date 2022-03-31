import { ValidatorFn, Validators } from '@angular/forms';
import { ValidationError } from '../errors/validation-error';
import { BaseFormField } from './base-form-field';
import { MaxLengthValidationError } from '../errors';
import { FormFieldType } from "./form-field-type.enum";

export class ProfileTextFormField extends BaseFormField<string> {
  static readonly defaultMaxProfileFieldLength = 128;

  constructor(
    key: string,
    name: string,
    required = true,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    super(
      FormFieldType.TEXT,
      key,
      name,
      '',
      required,
      [ Validators.maxLength(ProfileTextFormField.defaultMaxProfileFieldLength), ...validators],
      [
        new MaxLengthValidationError(name, ProfileTextFormField.defaultMaxProfileFieldLength),
        ...validationErrors
      ]
    );
  }
}
