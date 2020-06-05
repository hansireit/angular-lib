import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPickerFrameComponent } from './item-picker-frame.component';

describe('ItemPickerFrameComponent', () => {
  let component: ItemPickerFrameComponent;
  let fixture: ComponentFixture<ItemPickerFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPickerFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPickerFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
