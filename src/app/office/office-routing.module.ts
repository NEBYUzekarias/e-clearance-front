import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerComponent} from "../components/customer/customer.component";
import {LoginGuard} from "../guards/login.guard";
import {OfficeHomeComponent} from "./components/office-home/office-home.component";
import {ViewClearanceRequestsComponent} from "./components/view-clearance-requests/view-clearance-requests.component";
import {ViewClearedRequestsComponent} from "./components/view-cleared-requests/view-cleared-requests.component";
import {OfficeGuard} from "../guards/office.guard";
import {ChangePasswordComponent} from '../shared/components/change-password/change-password.component';
import {OfficeSetDbComponent} from "./components/office-set-db/office-set-db.component";

const routes: Routes = [
  {
    path: 'office',
    component: CustomerComponent,
    canActivate: [LoginGuard, OfficeGuard],
    children: [
      {
        path: 'home',
        component: OfficeHomeComponent,
      },
      {
        path: 'pending_requests',
        component: ViewClearanceRequestsComponent,
      },
      {
        path: 'cleared_requests',
        component: ViewClearedRequestsComponent,
      },
      {
        path: 'change_password',
        component: ChangePasswordComponent
      },
      {
        path: 'set_db_config',
        component: OfficeSetDbComponent,
      },
      {
        path: 'set_or_update_debt_list',
        component: OfficeHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
