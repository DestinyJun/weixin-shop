import { TestBed } from '@angular/core/testing';

import { MineWalletService } from './mine-wallet.service';

describe('MineWalletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MineWalletService = TestBed.get(MineWalletService);
    expect(service).toBeTruthy();
  });
});
