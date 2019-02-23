import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInviteComponent } from './team-invite.component';

describe('TeamInviteComponent', () => {
  let component: TeamInviteComponent;
  let fixture: ComponentFixture<TeamInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
