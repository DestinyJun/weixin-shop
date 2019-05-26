import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOrderComponent } from './tab-order.component';

describe('TabPlaceComponent', () => {
  let component: TabOrderComponent;
  let fixture: ComponentFixture<TabOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
