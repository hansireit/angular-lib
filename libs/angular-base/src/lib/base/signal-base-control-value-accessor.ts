import { ControlValueAccessor } from '@angular/forms';
import { Directive, model, signal } from '@angular/core';
import { ValueChangeCallback } from '../types/value-change-callback.type';

@Directive()
export abstract class SignalBaseControlValueAccessor<T = string> implements ControlValueAccessor {
  private onChange: ValueChangeCallback<T> | null = null;
  private onTouched: VoidFunction | null = null;

  value = model<T>();

  readonly disabled = signal(false);

  /**
   * Function that will be called by the input to update the value of the form-control and the model
   * @param value The new input value passed by $event in the template
   */
  valueChanged(value: T): void {
    if (this.disabled()) {
      return;
    }

    if (value === this.value()) {
      return;
    }

    this.onTouched?.();
    this.onChange?.(value);
    this.value.set(value);
  }

  writeValue(value: T): void {
    this.value.set(value);
  }

  registerOnChange(onChange: ValueChangeCallback<T>): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: VoidFunction): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }
}
