import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdComponent } from './product-ad.component';

describe('ProductAdComponent', () => {
  let component: ProductAdComponent;
  let fixture: ComponentFixture<ProductAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
