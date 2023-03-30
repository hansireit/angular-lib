import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcRatioComponent } from './ac-ratio.component';

describe('AcRatioComponent', () => {
  let component: AcRatioComponent;
  let fixture: ComponentFixture<AcRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcRatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
