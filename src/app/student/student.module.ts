import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import {StudentRequestClearanceComponent} from "./components/student-request-clearance/student-request-clearance.component";
import {StudentViewClearanceProgressComponent} from "./components/student-view-clearance-progress/student-view-clearance-progress.component";
import {FormsModule} from "@angular/forms";
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { StudentSideNavComponent } from './components/student-side-nav/student-side-nav.component';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
  ],
  declarations: [
    StudentRequestClearanceComponent,
    StudentViewClearanceProgressComponent,
    StudentHomeComponent,
    StudentSideNavComponent,
  ],
  exports: [
    StudentSideNavComponent
  ]
})
export class StudentModule { }
