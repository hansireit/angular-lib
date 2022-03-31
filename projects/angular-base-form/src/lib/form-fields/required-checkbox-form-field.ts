import { ValidatorFn } from '@angular/forms';
import { ValidationError } from '../errors/validation-error';
import { checkboxTrueValidation } from '../validations';
import { CheckboxFormField } from './checkbox-form-field';

export class RequiredCheckboxFormField extends CheckboxFormField {
  constructor(
    key: string,
    name: string,
    requiredErrorString = 'Dieses Feld ist ein Pflichtfeld',
    formState = false,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    const requiredError = new ValidationError('required', requiredErrorString);

    super(
      key,
      name,
      formState,
      false,
      [checkboxTrueValidation, ...validators],
      [requiredError, ...validationErrors]
    );
  }
}
