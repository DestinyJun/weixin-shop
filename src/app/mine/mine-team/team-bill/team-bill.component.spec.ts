import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBillComponent } from './team-bill.component';

describe('TeamBillComponent', () => {
  let component: TeamBillComponent;
  let fixture: ComponentFixture<TeamBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
