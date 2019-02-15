import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInvoiceComponent } from './order-invoice.component';

describe('OrderInvoiceComponent', () => {
  let component: OrderInvoiceComponent;
  let fixture: ComponentFixture<OrderInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
