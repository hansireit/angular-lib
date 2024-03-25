import { ControlValueAccessor } from '@angular/forms';
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ValueChangeCallback } from '../types/value-change-callback.type';

@Directive()
export abstract class BaseControlValueAccessor<T = string> implements ControlValueAccessor {
  @Output() valueChanged: EventEmitter<T> = new EventEmitter<T>();

  onChange: ValueChangeCallback<T> | null = null;
  onTouched: VoidFunction | null = null;

  protected _value!: T;

  get value(): T {
    return this._value;
  }

  @Input() set value(value: T) {
    this.markAsTouched();
    this._value = value;
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

  markAsTouched(): void {
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
