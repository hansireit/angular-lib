import { ValidatorFn, Validators } from '@angular/forms';
import { EmailValidationError } from '../errors/email-validation-error';
import { ValidationError } from '../errors/validation-error';
import { BaseFormField } from './base-form-field';
import { MaxLengthValidationError } from '../errors';
import { FormFieldType } from "./form-field-type.enum";

export class EmailFormField extends BaseFormField<string> {
  static readonly maxEmailLength = 256;

  constructor(
    key: string,
    name: string,
    required = true,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    const alreadyUsedError = new ValidationError(
      'emailAlreadyUsed',
      'Diese E-Mail ist bereits registriert'
    );

    super(
      FormFieldType.EMAIL,
      key,
      name,
      '',
      required,
      [
        Validators.email,
        Validators.maxLength(EmailFormField.maxEmailLength),
        ...validators
      ],
      [
        new EmailValidationError(),
        new MaxLengthValidationError(name, EmailFormField.maxEmailLength),
        alreadyUsedError,
        ...validationErrors
      ]
    );
  }
}
