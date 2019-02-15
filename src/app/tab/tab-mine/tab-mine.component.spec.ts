import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMineComponent } from './tab-mine.component';

describe('TabMineComponent', () => {
  let component: TabMineComponent;
  let fixture: ComponentFixture<TabMineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
