import { AbstractControl, UntypedFormGroup } from '@angular/forms';

export class FormUtil {
  static markAllControlsAsTouched(formGroup: UntypedFormGroup): void {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      control.patchValue(control.value);
      control.markAllAsTouched();
    });
  }
}
