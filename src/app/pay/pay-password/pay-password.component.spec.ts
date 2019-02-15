import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPasswordComponent } from './pay-password.component';

describe('PayPasswordComponent', () => {
  let component: PayPasswordComponent;
  let fixture: ComponentFixture<PayPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
