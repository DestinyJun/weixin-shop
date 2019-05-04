import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredScanComponent } from './registered-scan.component';

describe('RegisteredScanComponent', () => {
  let component: RegisteredScanComponent;
  let fixture: ComponentFixture<RegisteredScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
