import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSetDbComponent } from './office-set-db.component';

describe('OfficeSetDbComponent', () => {
  let component: OfficeSetDbComponent;
  let fixture: ComponentFixture<OfficeSetDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeSetDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSetDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
