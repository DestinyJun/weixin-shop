import { TestBed } from '@angular/core/testing';

import { MineSettingService } from './mine-setting.service';

describe('MineSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MineSettingService = TestBed.get(MineSettingService);
    expect(service).toBeTruthy();
  });
});
