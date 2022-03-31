import { AbstractControl, ValidationErrors } from '@angular/forms';

export const checkboxTrueValidation = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;

  if (value !== true) {
    return {
      required: true
    };
  }

  return null;
};
