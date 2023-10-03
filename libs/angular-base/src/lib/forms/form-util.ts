import { AbstractControl, FormGroup } from '@angular/forms';

export class FormUtil {
  static markAllControlsAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      control.patchValue(control.value);
      control.markAllAsTouched();
    });
  }
}
