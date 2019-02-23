import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBalapayComponent } from './wallet-balapay.component';

describe('WalletBalapayComponent', () => {
  let component: WalletBalapayComponent;
  let fixture: ComponentFixture<WalletBalapayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletBalapayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletBalapayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
