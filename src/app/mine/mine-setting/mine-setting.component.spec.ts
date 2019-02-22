import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineSettingComponent } from './mine-setting.component';

describe('MineSettingComponent', () => {
  let component: MineSettingComponent;
  let fixture: ComponentFixture<MineSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
