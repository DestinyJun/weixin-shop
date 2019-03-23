import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRetreatComponent } from './order-retreat.component';

describe('OrderRetreatComponent', () => {
  let component: OrderRetreatComponent;
  let fixture: ComponentFixture<OrderRetreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRetreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRetreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
