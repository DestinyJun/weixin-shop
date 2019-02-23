import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLogisticsComponent } from './order-logistics.component';

describe('OrderLogisticsComponent', () => {
  let component: OrderLogisticsComponent;
  let fixture: ComponentFixture<OrderLogisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderLogisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
