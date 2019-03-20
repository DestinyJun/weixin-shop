import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSureComponent } from './order-sure.component';

describe('OrderSureComponent', () => {
  let component: OrderSureComponent;
  let fixture: ComponentFixture<OrderSureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
