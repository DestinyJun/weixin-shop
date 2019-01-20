import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredReferrerComponent } from './registered-referrer.component';

describe('RegisteredReferrerComponent', () => {
  let component: RegisteredReferrerComponent;
  let fixture: ComponentFixture<RegisteredReferrerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredReferrerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredReferrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
