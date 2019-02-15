import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineUserComponent } from './mine-user.component';

describe('MineUserComponent', () => {
  let component: MineUserComponent;
  let fixture: ComponentFixture<MineUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
