import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddNewOfficeComponent } from './admin-add-new-office.component';

describe('AdminAddNewOfficeComponent', () => {
  let component: AdminAddNewOfficeComponent;
  let fixture: ComponentFixture<AdminAddNewOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddNewOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddNewOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
