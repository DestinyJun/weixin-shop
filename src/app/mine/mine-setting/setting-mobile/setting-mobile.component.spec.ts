import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingMobileComponent } from './setting-mobile.component';

describe('SettingMobileComponent', () => {
  let component: SettingMobileComponent;
  let fixture: ComponentFixture<SettingMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
