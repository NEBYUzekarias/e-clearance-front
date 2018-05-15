import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeRoutingModule } from './office-routing.module';
import { OfficeHomeComponent } from './components/office-home/office-home.component';
import { OfficeSideNavComponent } from './components/office-side-nav/office-side-nav.component';
import {ViewClearanceRequestsComponent} from "./components/view-clearance-requests/view-clearance-requests.component";
import {ViewClearedRequestsComponent} from "./components/view-cleared-requests/view-cleared-requests.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OfficeRoutingModule
  ],
  declarations: [
    OfficeHomeComponent,
    OfficeSideNavComponent,
    ViewClearanceRequestsComponent,
    ViewClearedRequestsComponent,
  ],
  exports: [
    OfficeSideNavComponent
  ]
})
export class OfficeModule {}
