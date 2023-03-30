import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../errors/validation-error';
import { BaseFormField } from './base-form-field';
import { FormFieldType } from "./form-field-type.enum";

export class UrlFormField extends BaseFormField<string> {
  static readonly errorKey = 'urlIncorrect';

  constructor(
    key: string,
    name: string,
    required = true,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    const validateFunction = (
      control: AbstractControl
    ): ValidationErrors | null => {
      const http = 'http://';
      const https = 'https://';

      if (required && control.value) {
        if (control.value.startsWith(http) || control.value.startsWith(https)) {
          return null;
        }
      } else if (!required) {
        return null;
      }

      return { [UrlFormField.errorKey]: true };
    };

    const validationError = new ValidationError(
      UrlFormField.errorKey,
      'Eine gültige URL muss mit https:// oder http:// beginnen'
    );

    super(
      FormFieldType.TEXT,
      key,
      name,
      '',
      required,
      [validateFunction, ...validators],
      [validationError, ...validationErrors]
    );
  }
}
