import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminSideNavComponent } from './components/admin-side-nav/admin-side-nav.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
  declarations: [
    AdminSideNavComponent
  ],
  exports: [
    AdminSideNavComponent
  ]
})
export class AdminModule { }
