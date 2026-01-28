/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
describe('NavigationService', () => {
  let service: NavigationService;
  let router: Router;
  let location: Location;
  let eventsSubject: Subject<any>;
  beforeEach(() => {
    eventsSubject = new Subject<any>();
    const routerMock: Partial<Router> = {
      events: eventsSubject,
      navigate: jest.fn()
    };
    const locationMock: Partial<Location> = {
      back: jest.fn()
    };
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: Router, useValue: routerMock },
        { provide: Location, useValue: locationMock }
      ]
    });
    service = TestBed.inject(NavigationService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });
  it('should navigate to the fallback-route if no history is defined', () => {
    eventsSubject.next(new NavigationEnd(0, 'init', 'init-after'));
    service.back('/fallback');
    expect(router.navigate).toHaveBeenCalledWith(['/fallback']);
  });
  it('should navigate to the last active route', () => {
    eventsSubject.next(new NavigationEnd(0, 'init', 'init-after'));
    eventsSubject.next(new NavigationEnd(1, 'bla', 'bla-after'));
    eventsSubject.next(new NavigationEnd(2, 'bla2', 'bla2-after'));
    service.back('/fallback');
    expect(router.navigate).not.toHaveBeenCalled();
    expect(location.back).toHaveBeenCalledTimes(1);
    service.back('/fallback');
    expect(router.navigate).not.toHaveBeenCalled();
    expect(location.back).toHaveBeenCalledTimes(2);
    // Now use the fallback
    service.back('/fallback');
    expect(router.navigate).toHaveBeenCalled();
    expect(location.back).toHaveBeenCalledTimes(2);
  });
  it('should reset the history', () => {
    eventsSubject.next(new NavigationEnd(0, 'init', 'init-after'));
    eventsSubject.next(new NavigationEnd(1, 'bla', 'bla-after'));
    eventsSubject.next(new NavigationEnd(2, 'bla2', 'bla2-after'));
    service.reset();
    service.back('/fallback');
    expect(router.navigate).toHaveBeenCalled();
    expect(location.back).not.toHaveBeenCalled();
  });
});
