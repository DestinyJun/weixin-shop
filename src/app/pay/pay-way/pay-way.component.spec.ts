import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayWayComponent } from './pay-way.component';

describe('PayWayComponent', () => {
  let component: PayWayComponent;
  let fixture: ComponentFixture<PayWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
