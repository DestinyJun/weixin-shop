import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineWalletComponent } from './mine-wallet.component';

describe('MineWalletComponent', () => {
  let component: MineWalletComponent;
  let fixture: ComponentFixture<MineWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
