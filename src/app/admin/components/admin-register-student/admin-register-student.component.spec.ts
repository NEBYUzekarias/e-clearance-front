import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterStudentComponent } from './admin-register-student.component';

describe('AdminRegisterStudentComponent', () => {
  let component: AdminRegisterStudentComponent;
  let fixture: ComponentFixture<AdminRegisterStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegisterStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisterStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
