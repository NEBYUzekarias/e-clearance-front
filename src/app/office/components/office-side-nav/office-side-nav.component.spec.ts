import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSideNavComponent } from './office-side-nav.component';

describe('OfficeSideNavComponent', () => {
  let component: OfficeSideNavComponent;
  let fixture: ComponentFixture<OfficeSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
