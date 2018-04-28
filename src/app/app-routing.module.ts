import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './user-account/home/home.component';
import { StudentRequestClearanceComponent } from './student/components/student-request-clearance/student-request-clearance.component';
import { StudentViewClearanceProgressComponent } from './student/components/student-view-clearance-progress/student-view-clearance-progress.component';
import { ViewClearedRequestsComponent } from './user-account/view-cleared-requests/view-cleared-requests.component';
import { ViewClearanceRequestsComponent } from './user-account/view-clearance-requests/view-clearance-requests.component';
import { AdminImportStudentDataComponent } from './user-account/admin-import-student-data/admin-import-student-data.component';
import { AdminRegisterOfficeUserComponent } from './user-account/admin-register-office-user/admin-register-office-user.component';
import { AdminRegisterStudentComponent } from './user-account/admin-register-student/admin-register-student.component';
import { AdminAddNewOfficeComponent } from './user-account/admin-add-new-office/admin-add-new-office.component';
import {CustomerComponent} from "./components/customer/customer.component";


const routes: Route[] = [

  {path: 'login', component: LoginComponent},
  {path: 'test', component: TestComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'new_clearance',component: StudentRequestClearanceComponent},
  {path: 'clearance_progress', component: StudentViewClearanceProgressComponent},
  {path: 'clearance_history', component: ViewClearedRequestsComponent},
  {path: 'clearance_requests', component: ViewClearanceRequestsComponent },
  {path: 'cleared_requests', component: ViewClearedRequestsComponent},
  {path: 'import_student_data', component: AdminImportStudentDataComponent},
  {path: 'register_office_user', component: AdminRegisterOfficeUserComponent},
  {path: 'register_student', component: AdminRegisterStudentComponent},
  {path: 'add_new_office', component: AdminAddNewOfficeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
