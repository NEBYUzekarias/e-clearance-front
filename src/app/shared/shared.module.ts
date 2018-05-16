import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerComponent} from "../components/customer/customer.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {RouterModule} from "@angular/router";
import { SearchComponent } from './components/search/search.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavbarComponent,
    PaginationComponent,
    SearchComponent,
    LoadingComponent,
    ChangePasswordComponent,
  ],
  exports: [
    NavbarComponent,
    PaginationComponent,
    SearchComponent,
    LoadingComponent,
    ChangePasswordComponent
  ]
})
export class SharedModule { }
