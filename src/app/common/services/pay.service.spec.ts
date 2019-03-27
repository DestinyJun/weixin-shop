import { TestBed } from '@angular/core/testing';

import { PayService } from './pay.service';

describe('PayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayService = TestBed.get(PayService);
    expect(service).toBeTruthy();
  });
});
