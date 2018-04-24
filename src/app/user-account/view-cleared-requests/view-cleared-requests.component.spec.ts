import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClearedRequestsComponent } from './view-cleared-requests.component';

describe('ViewClearedRequestsComponent', () => {
  let component: ViewClearedRequestsComponent;
  let fixture: ComponentFixture<ViewClearedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClearedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClearedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
