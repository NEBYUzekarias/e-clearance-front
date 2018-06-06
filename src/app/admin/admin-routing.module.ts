import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerComponent} from '../components/customer/customer.component';
import {LoginGuard} from '../guards/login.guard';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import {AdminGuard} from '../guards/admin.guard';
import {AdminImportStudentDataComponent} from './components/admin-import-student-data/admin-import-student-data.component';
import {AdminRegisterOfficeUserComponent} from './components/admin-register-office-user/admin-register-office-user.component';
import {AdminSetInfoComponent} from './components/admin-set-info/admin-set-info.component';
import {AdminRegisterStudentComponent} from './components/admin-register-student/admin-register-student.component';
import {ResetForgottenPasswordComponent} from './components/reset-forgotten-password/reset-forgotten-password.component';
import {ChangePasswordComponent} from '../shared/components/change-password/change-password.component';

const routes: Routes = [
  {
    path: 'admin',
    component: CustomerComponent,
    canActivate: [LoginGuard, AdminGuard],
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'import_student_data',
        component: AdminImportStudentDataComponent,
      },
      {
        path: 'register_office_user',
        component: AdminRegisterOfficeUserComponent,
      },
      {
        path: 'register_student_user',
        component: AdminRegisterStudentComponent,
      },
      {
        path: 'set_informations',
        component: AdminSetInfoComponent,
      },
      {
        path: 'reset_password',
        component: ResetForgottenPasswordComponent,
      },
      {
        path: 'change_self_password',
        component: ChangePasswordComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
