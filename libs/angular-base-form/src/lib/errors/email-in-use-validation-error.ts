import { ValidationError } from './validation-error';

export class EmailInUseValidationError extends ValidationError {
  constructor() {
    super('emailInUse', `Diese Email ist bereits registriert`);
  }
}
