import { FileFormField } from './file-form-field';
import { AbstractControl } from '@angular/forms';
import { FileTypeValidationError } from '../errors';

export class CategoryThumbnailFormFile extends FileFormField {
  constructor(
    key: string,
    name: string,
    formState: File | null = null,
    required = true
  ) {
    const fileTypeValidationFn = (
      control: AbstractControl
    ): { [key: string]: unknown } | null => {
      if (!required && !control.value) {
        return null;
      }

      if (control.value && control.value.type != 'image/png') {
        return {
          fileType: true
        };
      }

      return null;
    };

    const fileTypeValidationError = new FileTypeValidationError(name, '.png');
    super(
      key,
      name,
      formState,
      required,
      [fileTypeValidationFn],
      [fileTypeValidationError]
    );
  }
}
