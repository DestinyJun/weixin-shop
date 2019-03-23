import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAftsaleComponent } from './order-aftsale.component';

describe('OrderAftsaleComponent', () => {
  let component: OrderAftsaleComponent;
  let fixture: ComponentFixture<OrderAftsaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAftsaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAftsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
