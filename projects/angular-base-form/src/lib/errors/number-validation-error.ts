import { ValidationError } from './validation-error';

export class NumberValidationError extends ValidationError {
  constructor(name: string) {
    super('required', `"${name}" muss eine Zahl sein`);
  }
}
