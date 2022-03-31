import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../errors/validation-error';
import { BaseFormField } from './base-form-field';
import { FormFieldType } from "./form-field-type.enum";

export class PasswordFormField extends BaseFormField<string> {
  static readonly lowerCaseErrorKey = 'NoLowerCase';
  static readonly upperCaseErrorKey = 'NoUpperCase';
  static readonly specialCharErrorKey = 'NoSpecialChar';
  static readonly numberErrorKey = 'NoNumber';
  static readonly minLengthErrorKey = 'NotLongEnough';
  static readonly maxLengthErrorKey = 'TooLong';

  static readonly specialChar = '!@#$%&*()_+.';
  static readonly minLength = 8;
  static readonly maxLength = 256;

  constructor(
    key: string,
    name: string,
    required = true,
    skipValidation = false,
    validators: ValidatorFn[] = [],
    validationErrors: ValidationError[] = []
  ) {
    const validateFunction = (
      control: AbstractControl
    ): ValidationErrors | null => {
      if (skipValidation) {
        return null;
      }

      if (!control.value && !required) {
        return null;
      }

      const lowerCaseTest = new RegExp('[a-z]');
      const upperCaseTest = new RegExp('[A-Z]');
      const numberTest = new RegExp('[0-9]');
      const specialCharTest = new RegExp(
        '[' + PasswordFormField.specialChar + ']'
      );

      if (control.value.length > 0 && !lowerCaseTest.test(control.value)) {
        return { [PasswordFormField.lowerCaseErrorKey]: true };
      }

      if (control.value.length > 0 && !upperCaseTest.test(control.value)) {
        return { [PasswordFormField.upperCaseErrorKey]: true };
      }

      if (control.value.length > 0 && !numberTest.test(control.value)) {
        return { [PasswordFormField.numberErrorKey]: true };
      }

      if (control.value.length > 0 && !specialCharTest.test(control.value)) {
        return { [PasswordFormField.specialCharErrorKey]: true };
      }

      if (control.value.length < PasswordFormField.minLength) {
        return { [PasswordFormField.minLengthErrorKey]: true };
      }

      if (control.value.length > PasswordFormField.maxLength) {
        return { [PasswordFormField.maxLengthErrorKey]: true };
      }

      return null;
    };

    const validationErrorLowerCase = new ValidationError(
      PasswordFormField.lowerCaseErrorKey,
      'Das Passwort muss mindestens einen Kleinbuchstaben beinhalten'
    );

    const validationErrorUpperCase = new ValidationError(
      PasswordFormField.upperCaseErrorKey,
      'Das Passwort muss mindestens einen Großbuchstaben beinhalten'
    );

    const validationErrorSpecialChar = new ValidationError(
      PasswordFormField.specialCharErrorKey,
      'Das Passwort muss mindestens ein Sonderzeichen beinhalte (' +
        PasswordFormField.specialChar +
        ').'
    );

    const validationErrorNumber = new ValidationError(
      PasswordFormField.numberErrorKey,
      'Das Passwort muss mindestens eine Zahl beinhalten'
    );

    const validationErrorMinLength = new ValidationError(
      PasswordFormField.minLengthErrorKey,
      'Das Passwort muss mindestens ' +
        PasswordFormField.minLength +
        ' Zeichen lang sein.'
    );

    const validationErrorMaxLength = new ValidationError(
      PasswordFormField.maxLengthErrorKey,
      'Das Passwort darf maximal ' +
        PasswordFormField.maxLength +
        ' Zeichen lang sein.'
    );

    super(
      FormFieldType.PASSWORD,
      key,
      name,
      '',
      required,
      [validateFunction, ...validators],
      [
        validationErrorUpperCase,
        validationErrorLowerCase,
        validationErrorSpecialChar,
        validationErrorNumber,
        validationErrorMinLength,
        validationErrorMaxLength,
        ...validationErrors
      ]
    );
  }
}
