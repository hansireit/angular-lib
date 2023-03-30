import { ValidationError } from './validation-error';

export class RequiredValidationError extends ValidationError {
  constructor(name: string | null = null) {
    const defaultError = 'Dieses Feld ist ein Pflichtfeld';
    const errorText = name ? `"${name}" ist ein Pflichtfeld` : defaultError;
    super('required', errorText);
  }
}
