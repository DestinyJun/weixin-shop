import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineOrderComponent } from './mine-order.component';

describe('MineOrderComponent', () => {
  let component: MineOrderComponent;
  let fixture: ComponentFixture<MineOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
