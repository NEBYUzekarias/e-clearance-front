import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerComponent} from "../components/customer/customer.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {RouterModule} from "@angular/router";
import { SearchComponent } from './components/search/search.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    NavbarComponent,
    PaginationComponent,
    SearchComponent,
    LoadingComponent,
  ],
  exports: [
    NavbarComponent,
    PaginationComponent,
    SearchComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
