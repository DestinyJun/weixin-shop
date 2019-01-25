import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredSuccessComponent } from './registered-success.component';

describe('RegisteredSuccessComponent', () => {
  let component: RegisteredSuccessComponent;
  let fixture: ComponentFixture<RegisteredSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
