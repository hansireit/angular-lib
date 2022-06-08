import { UntypedFormControl, ValidatorFn, Validators } from '@angular/forms';
import { RequiredValidationError } from '../errors/required-validation-error';
import { ValidationError } from '../errors/validation-error';
import { FormFieldType } from './form-field-type.enum';

export class BaseFormField<T> {
  readonly key: string;
  readonly name: string;
  readonly validators: ValidatorFn[];
  readonly formControl: UntypedFormControl;
  readonly type: FormFieldType;
  readonly required: boolean;

  private readonly _validationErrors = new Map<string, ValidationError>();

  constructor(
    type: FormFieldType,
    key: string,
    name: string,
    formState: T | null = null,
    required = true,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    this.type = type;
    this.key = key;
    this.name = name;
    this.validators = validators;
    this.required = required;

    if (required) {
      this.validators.push(Validators.required);
      validationErrors.push(new RequiredValidationError(this.name));
    }

    this.formControl = new UntypedFormControl(formState, this.validators);

    for (const validationError of validationErrors) {
      this._validationErrors.set(validationError.errorKey, validationError);
    }
  }

  getCurrentErrors(onlyFirstError = true, onlyWhenTouched = true): string[] {
    const errors = this.formControl.errors;
    if (!errors) {
      return [];
    }

    if (!this.formControl.touched && onlyWhenTouched) {
      return [];
    }

    const errorMessages: string[] = [];

    for (const [key, validationError] of this._validationErrors) {
      if (errors[key]) {
        errorMessages.push(validationError.message);

        if (onlyFirstError) {
          break;
        }
      }
    }

    return errorMessages;
  }
}
