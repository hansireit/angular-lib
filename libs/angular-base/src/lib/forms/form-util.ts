/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, FormGroup } from '@angular/forms';
import { removeNullValuesRecursively } from '../util/remove-nil-values-recursively';

export class FormUtil {
  static markAllControlsAsTouched(formGroup: FormGroup, recursive = true): void {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      if (recursive && control instanceof FormGroup) {
        FormUtil.markAllControlsAsTouched(control);
      } else {
        control.patchValue(control.value);
        control.markAllAsTouched();
      }
    });
  }

  static getUpdatedFormData(objectToAdd: any, oldData: any, newData: any): any {
    for (const newKey in newData) {
      const [, changed] = FormUtil.getDifferenceRecursively(oldData[newKey], newData[newKey]);
      if (changed && newData[newKey]) {
        objectToAdd[newKey] = removeNullValuesRecursively(newData[newKey]);
      }
    }
    return objectToAdd;
  }

  static getDifferenceRecursively(oldData: any, newData: any): [any, boolean] {
    let changed = false;
    let object: any = {};

    if (typeof newData !== typeof oldData) {
      changed = true;
      object = newData;
    } else if (newData && typeof newData === 'object') {
      const allKeys = new Set([...Object.keys(newData), ...Object.keys(oldData)]);
      for (const newKey of allKeys) {
        if (!newData[newKey] && !oldData[newKey]) {
          continue;
        }

        // Check recursively
        const [innerDiff, innerChanged] = FormUtil.getDifferenceRecursively(oldData[newKey], newData[newKey]);
        if (innerChanged) {
          changed = true;
          object[newKey] = innerDiff;
        }
      }
    } else if (newData !== oldData) {
      changed = true;
      object = newData;
    }

    return [object, changed];
  }
}
