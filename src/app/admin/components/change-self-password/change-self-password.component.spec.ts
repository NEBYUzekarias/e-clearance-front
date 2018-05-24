import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSelfPasswordComponent } from './change-self-password.component';

describe('ChangeSelfPasswordComponent', () => {
  let component: ChangeSelfPasswordComponent;
  let fixture: ComponentFixture<ChangeSelfPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeSelfPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSelfPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
