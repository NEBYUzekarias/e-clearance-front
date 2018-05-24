import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import {StudentRequestClearanceComponent} from "./components/student-request-clearance/student-request-clearance.component";
import {StudentViewClearanceProgressComponent} from "./components/student-view-clearance-progress/student-view-clearance-progress.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { StudentSideNavComponent } from './components/student-side-nav/student-side-nav.component';
import { StudentClearanceHistoryComponent } from './components/student-clearance-history/student-clearance-history.component';
import {PaginationComponent} from "../shared/components/pagination/pagination.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentRoutingModule,
    SharedModule,
  ],
  declarations: [
    StudentRequestClearanceComponent,
    StudentViewClearanceProgressComponent,
    StudentHomeComponent,
    StudentSideNavComponent,
    StudentClearanceHistoryComponent,
  ],
  exports: [
    StudentSideNavComponent
  ]
})
export class StudentModule { }
