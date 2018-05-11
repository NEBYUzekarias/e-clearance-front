import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerComponent} from "../components/customer/customer.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    NavbarComponent,
    PaginationComponent,
  ],
  exports: [
    NavbarComponent,
    PaginationComponent,
  ]
})
export class SharedModule { }
