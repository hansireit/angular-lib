import { ValidationError } from './validation-error';

export class MinLengthValidationError extends ValidationError {
  constructor(name: string, minLength: number) {
    const message = `"${name}" muss mindestens ${minLength} Zeichen lang sein`;
    super('minlength', message);
  }
}
