import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPersonalComponent } from './team-personal.component';

describe('TeamPersonalComponent', () => {
  let component: TeamPersonalComponent;
  let fixture: ComponentFixture<TeamPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
