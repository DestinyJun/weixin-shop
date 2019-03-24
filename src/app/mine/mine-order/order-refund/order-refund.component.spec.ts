import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRefundComponent } from './order-refund.component';

describe('OrderRefundComponent', () => {
  let component: OrderRefundComponent;
  let fixture: ComponentFixture<OrderRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
