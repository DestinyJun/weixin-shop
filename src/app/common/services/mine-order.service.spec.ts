import { TestBed } from '@angular/core/testing';

import { MineOrderService } from './mine-order.service';

describe('MineOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MineOrderService = TestBed.get(MineOrderService);
    expect(service).toBeTruthy();
  });
});
