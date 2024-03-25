import { ControlValueAccessor } from '@angular/forms';
import { Directive, effect, EventEmitter, model, Output } from '@angular/core';
import { ValueChangeCallback } from '../types/value-change-callback.type';

@Directive()
export abstract class SignalBaseControlValueAccessor<T = string> implements ControlValueAccessor {
  @Output() valueChanged: EventEmitter<T> = new EventEmitter<T>();

  onChange: ValueChangeCallback<T> | null = null;
  onTouched: VoidFunction | null = null;

  protected value = model<T>();

  protected constructor() {
    effect(() => {
      const newValue = this.value();
      if (newValue) {
        this.markAsTouched();
        this.onChange?.(newValue);
        this.valueChanged.emit(newValue);
      }
    });
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

  markAsTouched(): void {
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
