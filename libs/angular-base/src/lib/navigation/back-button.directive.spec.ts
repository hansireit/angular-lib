import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import { Component } from '@angular/core';
import { BackButtonDirective } from './back-button.directive';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  template: ` <button ngLibBackButton>Click me</button> `,
  imports: [BackButtonDirective]
})
class TestingComponent {}

describe('NavigationService', () => {
  let navigationService: NavigationService;
  let fixture: ComponentFixture<TestingComponent>;

  beforeEach(() => {
    const navigationServiceMock: Partial<NavigationService> = {
      back: jest.fn()
    };
    fixture = TestBed.configureTestingModule({
      providers: [{ provide: NavigationService, useValue: navigationServiceMock }]
    }).createComponent(TestingComponent);

    fixture.detectChanges();

    navigationService = TestBed.inject(NavigationService);
  });

  it('should call the back function if the button is clicked and the directive is attached to it', () => {
    expect(navigationService.back).not.toHaveBeenCalled();

    const button = fixture.debugElement.query(By.directive(BackButtonDirective));
    button.nativeElement.click();

    expect(navigationService.back).toHaveBeenCalled();
  });
});
