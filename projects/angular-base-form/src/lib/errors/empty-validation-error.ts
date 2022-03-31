import { ValidationError } from './validation-error';

export class EmptyValidationError extends ValidationError {
  constructor(name: string) {
    super('empty', `"${name}" darf nicht leer sein`);
  }
}
