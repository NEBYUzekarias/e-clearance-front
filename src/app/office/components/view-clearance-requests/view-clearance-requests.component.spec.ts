import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClearanceRequestsComponent } from './view-clearance-requests.component';

describe('ViewClearanceRequestsComponent', () => {
  let component: ViewClearanceRequestsComponent;
  let fixture: ComponentFixture<ViewClearanceRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClearanceRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClearanceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
