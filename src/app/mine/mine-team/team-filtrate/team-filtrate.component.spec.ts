import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFiltrateComponent } from './team-filtrate.component';

describe('TeamFiltrateComponent', () => {
  let component: TeamFiltrateComponent;
  let fixture: ComponentFixture<TeamFiltrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamFiltrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFiltrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
