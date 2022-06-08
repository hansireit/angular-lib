import { UntypedFormGroup } from '@angular/forms';
import { FormUtil } from './form-util';

export abstract class BaseForm {
  abstract readonly formGroup: UntypedFormGroup;

  markAllAsTouched(): void {
    FormUtil.markAllControlsAsTouched(this.formGroup);
  }
}
