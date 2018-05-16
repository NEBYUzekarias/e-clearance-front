import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerComponent} from "../components/customer/customer.component";
import {LoginGuard} from "../guards/login.guard";
import {StudentRequestClearanceComponent} from "./components/student-request-clearance/student-request-clearance.component";
import {StudentViewClearanceProgressComponent} from "./components/student-view-clearance-progress/student-view-clearance-progress.component";
import {StudentHomeComponent} from "./components/student-home/student-home.component";
import {StudentGuard} from "../guards/student.guard";
import {StudentClearanceHistoryComponent} from "./components/student-clearance-history/student-clearance-history.component";
import {ChangePasswordComponent} from '../shared/components/change-password/change-password.component';

const routes: Routes = [
  {
    path: 'student',
    component: CustomerComponent,
    canActivate: [LoginGuard, StudentGuard],
    children: [
      {
        path: 'home',
        component: StudentHomeComponent,
      },
      {
        path: 'request_clearance',
        component: StudentRequestClearanceComponent,
      },
      {
        path: 'view_progress',
        component: StudentViewClearanceProgressComponent,
      },
      {
        path: 'history',
        component: StudentClearanceHistoryComponent,
      },
      {
        path: 'change_password',
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
