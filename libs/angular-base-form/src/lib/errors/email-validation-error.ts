import { ValidationError } from './validation-error';

export class EmailValidationError extends ValidationError {
  constructor() {
    super('email', `Diese Email ist ungültig`);
  }
}
