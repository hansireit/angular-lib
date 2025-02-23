import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseControlValueAccessor } from './base-control-value-accessor';
import { FormsModule } from '@angular/forms';

@Component({
  template: `<input [(ngModel)]="value" />`,
  imports: [FormsModule]
})
class TestingComponent extends BaseControlValueAccessor {}

describe('BaseControlValueAccessor', () => {
  let fixture: ComponentFixture<TestingComponent>;
  let component: TestingComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({}).createComponent(TestingComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should write a value to the model', () => {
    component.writeValue('Hello');
    expect(component.value).toBe('Hello');
  });

  it('should trigger onChange and onTouch when a new value is passed to the changed function', () => {
    const changeFn = jest.fn();
    const touchFn = jest.fn();

    component.registerOnChange(changeFn);
    component.registerOnTouched(touchFn);
    component.valueChanged.emit = jest.fn();

    component.value = 'Hej';

    expect(component.value).toBe('Hej');
    expect(changeFn).toHaveBeenCalledWith('Hej');
    expect(component.valueChanged.emit).toHaveBeenCalledWith('Hej');
    expect(touchFn).toHaveBeenCalled();
  });

  it('should trigger onChange and onTouch only once if the same value passed to the changed function', () => {
    const changeFn = jest.fn();
    const touchFn = jest.fn();

    component.registerOnChange(changeFn);
    component.registerOnTouched(touchFn);
    component.valueChanged.emit = jest.fn();

    component.value = 'Hej';
    component.value = 'Hej';
    component.value = 'Hej';
    component.value = 'Hej';

    expect(component.value).toBe('Hej');
    expect(changeFn).toHaveBeenCalledTimes(1);
    expect(touchFn).toHaveBeenCalledTimes(1);
    expect(component.valueChanged.emit).toHaveBeenCalledTimes(1);
  });

  it('should not trigger a value change if the control is disabled', () => {
    const changeFn = jest.fn();
    const touchFn = jest.fn();

    component.registerOnChange(changeFn);
    component.registerOnTouched(touchFn);

    component.setDisabledState(true);
    component.value = 'Hej';

    expect(component.value).toBeUndefined();
    expect(changeFn).not.toHaveBeenCalled();
    expect(touchFn).not.toHaveBeenCalled();
  });

  it('should set the disabled state accordingly', () => {
    expect(component.disabled).toBe(false);
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
    component.setDisabledState(false);
    expect(component.disabled).toBe(false);
  });
});
