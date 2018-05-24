import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetInfoComponent } from './admin-set-info.component';

describe('AdminSetInfoComponent', () => {
  let component: AdminSetInfoComponent;
  let fixture: ComponentFixture<AdminSetInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSetInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
