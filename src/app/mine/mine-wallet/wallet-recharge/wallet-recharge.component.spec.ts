import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletRechargeComponent } from './wallet-recharge.component';

describe('WalletRechargeComponent', () => {
  let component: WalletRechargeComponent;
  let fixture: ComponentFixture<WalletRechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletRechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
