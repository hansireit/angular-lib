import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../errors/validation-error';
import { BaseFormField } from './base-form-field';
import { PasswordFormField } from './password-form-field';
import { FormFieldType } from "./form-field-type.enum";

export class PasswordConfirmationFormField extends BaseFormField<string> {
  static readonly errorKey = 'passwordsDoNotMatch';

  constructor(
    key: string,
    name: string,
    required = true,
    passwordFormField: PasswordFormField,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    const validateFunction = (
      control: AbstractControl
    ): ValidationErrors | null => {
      if (control?.value === passwordFormField.formControl?.value) {
        return null;
      }

      return { [PasswordConfirmationFormField.errorKey]: true };
    };

    const validationError = new ValidationError(
      PasswordConfirmationFormField.errorKey,
      'Die Passwörter stimmen nicht überein'
    );

    super(
      FormFieldType.PASSWORD,
      key,
      name,
      '',
      required,
      [validateFunction, ...validators],
      [validationError, ...validationErrors]
    );
  }
}
