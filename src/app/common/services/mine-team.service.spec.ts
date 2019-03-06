import { TestBed } from '@angular/core/testing';

import { MineTeamService } from './mine-team.service';

describe('MineTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MineTeamService = TestBed.get(MineTeamService);
    expect(service).toBeTruthy();
  });
});
