import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../errors/validation-error';
import { BaseFormField } from './base-form-field';
import { FormFieldType } from './form-field-type.enum';

export class ListFormField extends BaseFormField<string[]> {
  static readonly notListErrorKey = 'notList';
  static readonly minValuesErrorKey = 'minValueCount';
  static readonly maxValuesErrorKey = 'maxValueCount';

  constructor(
    key: string,
    name: string,
    formState: string[] = [],
    minValues = 0,
    maxValues: number | null = null,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    const validationFunction = (
      control: AbstractControl
    ): ValidationErrors | null => {
      const value = control?.value;
      if (value === null || value === undefined) {
        return null;
      }

      if (!Array.isArray(value)) {
        return { [ListFormField.notListErrorKey]: true };
      }

      if (value.length < minValues) {
        return { [ListFormField.minValuesErrorKey]: true };
      }

      if (maxValues && value.length > maxValues) {
        return { [ListFormField.maxValuesErrorKey]: true };
      }

      return null;
    };

    const notListError = new ValidationError(
      ListFormField.notListErrorKey,
      'Dieses Feld muss eine Liste sein'
    );

    const minValuesError = new ValidationError(
      ListFormField.minValuesErrorKey,
      `Dieses Feld muss mindestens ${minValues} Werte beinhalten`
    );

    const maxValuesError = new ValidationError(
      ListFormField.minValuesErrorKey,
      `Dieses Feld darf maximal ${maxValues} Werte beinhalten`
    );

    super(
      FormFieldType.LIST,
      key,
      name,
      formState,
      true,
      [validationFunction, ...validators],
      [notListError, minValuesError, maxValuesError, ...validationErrors]
    );
  }
}
