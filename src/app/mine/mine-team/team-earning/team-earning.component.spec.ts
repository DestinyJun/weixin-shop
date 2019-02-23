import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEarningComponent } from './team-earning.component';

describe('TeamEarningComponent', () => {
  let component: TeamEarningComponent;
  let fixture: ComponentFixture<TeamEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
