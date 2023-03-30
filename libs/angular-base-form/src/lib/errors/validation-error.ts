export class ValidationError {
  readonly errorKey: string;
  readonly message: string;

  constructor(errorKey: string, message: string) {
    this.errorKey = errorKey;
    this.message = message;
  }
}
