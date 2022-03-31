import { ValidationError } from './validation-error';

export class FileTypeValidationError extends ValidationError {
  constructor(name: string, allowedType: string) {
    const errorText = `"${name}" muss eine "${allowedType}"-Datei sein.`;
    super('fileType', errorText);
  }
}
