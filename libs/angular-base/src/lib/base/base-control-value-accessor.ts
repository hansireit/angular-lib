import { ControlValueAccessor } from '@angular/forms';
import { Directive, Input, output } from '@angular/core';
import { ValueChangeCallback } from '../types/value-change-callback.type';

@Directive()
export abstract class BaseControlValueAccessor<T = string> implements ControlValueAccessor {
  valueChanged = output<T>();

  onChange: ValueChangeCallback<T> | null = null;
  onTouched: VoidFunction | null = null;

  disabled = false;
  protected _value!: T;

  get value(): T {
    return this._value;
  }

  @Input() set value(value: T) {
    if (this.disabled) {
      return;
    }

    if (this._value === value) {
      return;
    }

    this._value = value;
    this.onTouched?.();
    this.onChange?.(this._value);
    this.valueChanged.emit(this._value);
  }

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(onChange: ValueChangeCallback<T>): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: VoidFunction): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
