import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterOfficeUserComponent } from './admin-register-office-user.component';

describe('AdminRegisterOfficeUserComponent', () => {
  let component: AdminRegisterOfficeUserComponent;
  let fixture: ComponentFixture<AdminRegisterOfficeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegisterOfficeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisterOfficeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
