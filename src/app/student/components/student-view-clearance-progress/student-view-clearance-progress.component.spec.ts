import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewClearanceProgressComponent } from './student-view-clearance-progress.component';

describe('StudentViewClearanceProgressComponent', () => {
  let component: StudentViewClearanceProgressComponent;
  let fixture: ComponentFixture<StudentViewClearanceProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentViewClearanceProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewClearanceProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
