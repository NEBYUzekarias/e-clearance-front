import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImportStudentDataComponent } from './admin-import-student-data.component';

describe('AdminImportStudentDataComponent', () => {
  let component: AdminImportStudentDataComponent;
  let fixture: ComponentFixture<AdminImportStudentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminImportStudentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminImportStudentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
