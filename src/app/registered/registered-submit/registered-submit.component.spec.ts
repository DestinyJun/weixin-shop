import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredSubmitComponent } from './registered-submit.component';

describe('RegisteredSubmitComponent', () => {
  let component: RegisteredSubmitComponent;
  let fixture: ComponentFixture<RegisteredSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
