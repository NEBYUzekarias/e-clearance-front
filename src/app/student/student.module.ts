import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import {StudentRequestClearanceComponent} from "./components/student-request-clearance/student-request-clearance.component";
import {StudentViewClearanceProgressComponent} from "./components/student-view-clearance-progress/student-view-clearance-progress.component";
import {FormsModule} from "@angular/forms";
import { StudentHomeComponent } from './components/student-home/student-home.component';

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
  ]
})
export class StudentModule { }
