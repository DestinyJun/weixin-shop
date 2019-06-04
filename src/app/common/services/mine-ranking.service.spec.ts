import { TestBed } from '@angular/core/testing';

import { MineRankingService } from './mine-ranking.service';

describe('MineRankingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MineRankingService = TestBed.get(MineRankingService);
    expect(service).toBeTruthy();
  });
});
