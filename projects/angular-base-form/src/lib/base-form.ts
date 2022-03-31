import { FormGroup } from '@angular/forms';
import { FormUtil } from './form-util';

export abstract class BaseForm {
  abstract readonly formGroup: FormGroup;

  markAllAsTouched(): void {
    FormUtil.markAllControlsAsTouched(this.formGroup);
  }
}
