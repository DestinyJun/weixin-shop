import { TestBed } from '@angular/core/testing';

import { RegisteredService } from './registered.service';

describe('RegisteredService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisteredService = TestBed.get(RegisteredService);
    expect(service).toBeTruthy();
  });
});
