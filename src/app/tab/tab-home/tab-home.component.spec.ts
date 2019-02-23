import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabHomeComponent } from './tab-home.component';

describe('TabHomeComponent', () => {
  let component: TabHomeComponent;
  let fixture: ComponentFixture<TabHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
