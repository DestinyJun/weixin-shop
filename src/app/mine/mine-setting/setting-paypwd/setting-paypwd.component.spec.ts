import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPaypwdComponent } from './setting-paypwd.component';

describe('SettingPaypwdComponent', () => {
  let component: SettingPaypwdComponent;
  let fixture: ComponentFixture<SettingPaypwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPaypwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPaypwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
