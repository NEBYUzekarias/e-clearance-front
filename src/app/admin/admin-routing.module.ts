import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerComponent} from "../components/customer/customer.component";
import {LoginGuard} from "../guards/login.guard";
import {AdminHomeComponent} from "./components/admin-home/admin-home.component";
import {AdminGuard} from "../guards/admin.guard";

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
