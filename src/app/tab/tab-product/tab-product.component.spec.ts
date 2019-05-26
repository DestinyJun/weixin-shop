import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabProductComponent } from './tab-product.component';

describe('TabProductComponent', () => {
  let component: TabProductComponent;
  let fixture: ComponentFixture<TabProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
