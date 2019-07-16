import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyaoGoodsComponent } from './moyao-goods.component';

describe('MoyaoGoodsComponent', () => {
  let component: MoyaoGoodsComponent;
  let fixture: ComponentFixture<MoyaoGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoyaoGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoyaoGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
