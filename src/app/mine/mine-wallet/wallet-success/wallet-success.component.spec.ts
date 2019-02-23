import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSuccessComponent } from './wallet-success.component';

describe('WalletSuccessComponent', () => {
  let component: WalletSuccessComponent;
  let fixture: ComponentFixture<WalletSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
