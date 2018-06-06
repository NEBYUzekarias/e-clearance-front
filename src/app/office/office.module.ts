import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeRoutingModule } from './office-routing.module';
import { OfficeHomeComponent } from './components/office-home/office-home.component';
import { OfficeSideNavComponent } from './components/office-side-nav/office-side-nav.component';
import {ViewClearanceRequestsComponent} from "./components/view-clearance-requests/view-clearance-requests.component";
import {ViewClearedRequestsComponent} from "./components/view-cleared-requests/view-cleared-requests.component";
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OfficeSetDbComponent} from "./components/office-set-db/office-set-db.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OfficeRoutingModule
  ],
  declarations: [
    OfficeHomeComponent,
    OfficeSideNavComponent,
    OfficeSetDbComponent,
    ViewClearanceRequestsComponent,
    ViewClearedRequestsComponent,
  ],
  exports: [
    OfficeSideNavComponent
  ]
})
export class OfficeModule {}
