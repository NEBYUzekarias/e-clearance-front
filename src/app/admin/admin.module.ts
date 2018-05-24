import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminSideNavComponent } from './components/admin-side-nav/admin-side-nav.component';
import {SharedModule} from "../shared/shared.module";
import { AdminImportStudentDataComponent } from './components/admin-import-student-data/admin-import-student-data.component';
import { AdminRegisterOfficeUserComponent } from './components/admin-register-office-user/admin-register-office-user.component';
import { AdminRegisterStudentComponent } from './components/admin-register-student/admin-register-student.component';
import { AdminSetInfoComponent } from './components/admin-set-info/admin-set-info.component';
import { ResetForgottenPasswordComponent } from './components/reset-forgotten-password/reset-forgotten-password.component';
import { ChangeSelfPasswordComponent } from './components/change-self-password/change-self-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
  ],
  declarations: [
    AdminSideNavComponent,
    AdminImportStudentDataComponent,
    AdminRegisterOfficeUserComponent,
    AdminRegisterStudentComponent,
    AdminSetInfoComponent,
    ResetForgottenPasswordComponent,
    ChangeSelfPasswordComponent
  ],
  exports: [
    AdminSideNavComponent
  ]
})
export class AdminModule { }
