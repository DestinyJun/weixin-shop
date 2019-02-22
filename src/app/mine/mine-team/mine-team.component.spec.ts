import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineTeamComponent } from './mine-team.component';

describe('MineTeamComponent', () => {
  let component: MineTeamComponent;
  let fixture: ComponentFixture<MineTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
