import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPlaceComponent } from './order-place.component';

describe('OrderPlaceComponent', () => {
  let component: OrderPlaceComponent;
  let fixture: ComponentFixture<OrderPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
