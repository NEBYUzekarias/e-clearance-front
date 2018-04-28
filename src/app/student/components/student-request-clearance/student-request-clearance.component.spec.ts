import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestClearanceComponent } from './student-request-clearance.component';

describe('StudentRequestClearanceComponent', () => {
  let component: StudentRequestClearanceComponent;
  let fixture: ComponentFixture<StudentRequestClearanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRequestClearanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRequestClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
