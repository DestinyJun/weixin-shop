import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineUserAddressComponent } from './mine-user-address.component';

describe('MineUserAddressComponent', () => {
  let component: MineUserAddressComponent;
  let fixture: ComponentFixture<MineUserAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineUserAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineUserAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
