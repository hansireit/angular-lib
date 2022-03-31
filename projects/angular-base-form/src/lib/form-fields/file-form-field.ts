import { ValidatorFn } from '@angular/forms';
import { ValidationError } from '../errors/validation-error';
import { BaseFormField } from './base-form-field';
import { FormFieldType } from "./form-field-type.enum";

export class FileFormField extends BaseFormField<File> {
  constructor(
    key: string,
    name: string,
    formState: File | null = null,
    required = true,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    super(
      FormFieldType.FILE,
      key,
      name,
      formState,
      required,
      validators,
      validationErrors
    );
  }
}
