import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineUserNameComponent } from './mine-user-name.component';

describe('MineUserNameComponent', () => {
  let component: MineUserNameComponent;
  let fixture: ComponentFixture<MineUserNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineUserNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineUserNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
