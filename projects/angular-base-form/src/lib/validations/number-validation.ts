import { AbstractControl, ValidationErrors } from '@angular/forms';

export const numberValidation = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const parsedNumber = parseInt(value);
  if (isNaN(parsedNumber)) {
    return {
      number: true
    };
  }

  return null;
};
