import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WjDialogComponent } from './wj-dialog.component';

describe('WjDialogComponent', () => {
  let component: WjDialogComponent;
  let fixture: ComponentFixture<WjDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WjDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WjDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
