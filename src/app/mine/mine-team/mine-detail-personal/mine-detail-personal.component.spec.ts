import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineDetailPersonalComponent } from './mine-detail-personal.component';

describe('MineDetailPersonalComponent', () => {
  let component: MineDetailPersonalComponent;
  let fixture: ComponentFixture<MineDetailPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineDetailPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineDetailPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
