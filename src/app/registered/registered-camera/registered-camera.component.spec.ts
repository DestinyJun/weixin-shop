import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCameraComponent } from './registered-camera.component';

describe('RegisteredCameraComponent', () => {
  let component: RegisteredCameraComponent;
  let fixture: ComponentFixture<RegisteredCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
