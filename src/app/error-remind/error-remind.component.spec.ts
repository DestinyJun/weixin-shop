import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRemindComponent } from './error-remind.component';

describe('ErrorRemindComponent', () => {
  let component: ErrorRemindComponent;
  let fixture: ComponentFixture<ErrorRemindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorRemindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorRemindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
