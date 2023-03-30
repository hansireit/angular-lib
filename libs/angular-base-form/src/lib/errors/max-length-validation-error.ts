import { ValidationError } from './validation-error';

export class MaxLengthValidationError extends ValidationError {
  constructor(name: string, maxLength: number) {
    const message = `"${name}" darf nicht mehr als ${maxLength} Zeichen lang sein`;
    super('maxlength', message);
  }
}
