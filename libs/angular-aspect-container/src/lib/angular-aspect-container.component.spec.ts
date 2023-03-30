import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularAspectContainerComponent } from './angular-aspect-container.component';

describe('AngularAspectContainerComponent', () => {
  let component: AngularAspectContainerComponent;
  let fixture: ComponentFixture<AngularAspectContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularAspectContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularAspectContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
