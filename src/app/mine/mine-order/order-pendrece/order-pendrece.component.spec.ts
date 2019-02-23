import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPendreceComponent } from './order-pendrece.component';

describe('OrderPendreceComponent', () => {
  let component: OrderPendreceComponent;
  let fixture: ComponentFixture<OrderPendreceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPendreceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPendreceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
