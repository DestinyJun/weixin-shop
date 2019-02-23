import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPendpayComponent } from './order-pendpay.component';

describe('OrderPendpayComponent', () => {
  let component: OrderPendpayComponent;
  let fixture: ComponentFixture<OrderPendpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPendpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPendpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
