import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineSharedComponent } from './mine-shared.component';

describe('MineSharedComponent', () => {
  let component: MineSharedComponent;
  let fixture: ComponentFixture<MineSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
