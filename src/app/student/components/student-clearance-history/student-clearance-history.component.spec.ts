import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClearanceHistoryComponent } from './student-clearance-history.component';

describe('StudentClearanceHistoryComponent', () => {
  let component: StudentClearanceHistoryComponent;
  let fixture: ComponentFixture<StudentClearanceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentClearanceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentClearanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
