import { TestBed } from '@angular/core/testing';

import { AngularAspectContainerService } from './angular-aspect-container.service';

describe('AngularAspectContainerService', () => {
  let service: AngularAspectContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularAspectContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
